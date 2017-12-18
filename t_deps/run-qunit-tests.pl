use strict;
use warnings;
use Path::Tiny;
use lib glob path (__FILE__)->parent->parent->child ('t_deps/modules/*/lib');
use IO::File;
use JSON::PS;
use Promise;
use Web::URL;
use Web::Driver::Client::Connection;
use AnyEvent::Socket;
use Web::Transport::PSGIServerConnection;

my $root_path = path (__FILE__)->parent->parent;

{
  use Socket;
  my $EphemeralStart = 1024;
  my $EphemeralEnd = 5000;

  sub is_listenable_port ($) {
    my $port = $_[0];
    return 0 unless $port;
    
    my $proto = getprotobyname('tcp');
    socket(my $server, PF_INET, SOCK_STREAM, $proto) || die "socket: $!";
    setsockopt($server, SOL_SOCKET, SO_REUSEADDR, pack("l", 1)) || die "setsockopt: $!";
    bind($server, sockaddr_in($port, INADDR_ANY)) || return 0;
    listen($server, SOMAXCONN) || return 0;
    close($server);
    return 1;
  } # is_listenable_port

  my $using = {};
  sub find_listenable_port () {
    for (1..10000) {
      my $port = int rand($EphemeralEnd - $EphemeralStart);
      next if $using->{$port}++;
      return $port if is_listenable_port $port;
    }
    die "Listenable port not found";
  } # find_listenable_port
}

my $HTTPHost = '0';
my $HTTPPort = find_listenable_port;
my $PSGIApp = sub {
  my $env = $_[0];
  if ($env->{REQUEST_URI} =~ m{\A((?:/[A-Za-z0-9_-][.A-Za-z0-9_-]*)+)(?:\?|\z)}) {
    my $path = $root_path->child ($1);
    return [200, [], [$path->slurp]] if $path->is_file;
  }
  return [404, [], []];
};
my $HTTPServer = tcp_server $HTTPHost, $HTTPPort, sub {
  Web::Transport::PSGIServerConnection->new_from_app_and_ae_tcp_server_args
        ($PSGIApp, [@_]);
};
my $BrowserHTTPHost = $ENV{TEST_HTTP_HOST} || $HTTPHost;

sub run_tests {
  my $test_wd_url = $ENV{TEST_WD_URL} || die 'Environment variable `TEST_WD_URL` must be set`';
  my $test_results_path = defined $ENV{TEST_RESULTS_DIR} ? path ($ENV{TEST_RESULTS_DIR}) : $root_path->child ("local/test/results");
  my $query_string = defined $ENV{TEST_URL_QUERY_STRING} ? '?' . $ENV{TEST_URL_QUERY_STRING} : '';
  my $wd_desired_capabilities = defined $ENV{TEST_WD_DESIRED_CAPABILITIES} ?
      json_bytes2perl $ENV{TEST_WD_DESIRED_CAPABILITIES} : {};

  my $pattern = qr/@{[$ENV{TEST_METHOD} || ".*"]}/;

  $test_results_path->mkpath;
  my $exit_code = 0;
  for my $path ($root_path->child ('t')->children (qr/\.html\z/)) {
    my $url = "http://$BrowserHTTPHost:$HTTPPort/${path}${query_string}";
    my $result_path = $test_results_path->child ($path->basename);
    next unless $path =~ /$pattern/o;
    print "# $path\n";
    my $pass = execute_test_html_file ($test_wd_url, $wd_desired_capabilities, $url, $result_path);
    if ($pass) {
      print "ok - $url -> $result_path\n";
    } else {
      print "not ok - $url -> $result_path\n";
      $exit_code = 1;
    }
  }
  return $exit_code;
}

sub execute_test_html_file {
  my ($test_wd_url, $wd_desired_capabilities, $test_url, $test_result_file_path) = @_;
  my $all_tests_passed = 0;

  my $wd_url = Web::URL->parse_string ($test_wd_url);
  Promise->resolve (1)->then (sub {
    my $wd = Web::Driver::Client::Connection->new_from_url ($wd_url);
    my $p = $wd->new_session (desired => $wd_desired_capabilities)->then (sub {
      my $session = $_[0];
      my $p = Promise->resolve (1)->then (sub {
        return set_script_timeout ($wd, $session->session_id, 15000);
      })->then (sub {
        return $session->go (Web::URL->parse_string ($test_url));
      })->then (sub {
        return execute_async ($wd, $session->session_id, q{
          return Promise.resolve().then(function () {
            var bannerElem = document.querySelector("#qunit-banner");
            var testFinished = bannerElem.classList.contains("qunit-pass") || bannerElem.classList.contains("qunit-fail");
            if (!testFinished) {
              return new Promise(function (resolve, reject) {
                QUnit.done(function () { resolve() });
              });
            }
          }).then(function () {
            var bannerElem = document.querySelector("#qunit-banner");
            var allTestsPassed = bannerElem.classList.contains("qunit-pass");
            var html = document.documentElement.cloneNode (true);
            html.querySelectorAll ('script, #qunit-testrunner-toolbar, #qunit-testresult').forEach (function (e) {
              e.remove ();
            });
            return {
              allTestsPassed: allTestsPassed,
              testResultsHtmlString: "<!DOCTYPE html>" + html.outerHTML,
            };
          });
        })->then (sub {
          my $result = $_[0];
          $all_tests_passed = $result->{value}->{allTestsPassed};

          my $fh = IO::File->new($test_result_file_path, ">:encoding(utf-8)");
          die "File open failed: $test_result_file_path" if not defined $fh;
          print $fh $result->{value}->{testResultsHtmlString};
          undef $fh;
        }, sub {
          my $error = $_[0];
          return $session->screenshot->then (sub {
            my $image = $_[0];

            my $fh = IO::File->new("$test_result_file_path.png", ">");
            die "File open failed: $test_result_file_path" if not defined $fh;
            print $fh $image;
            undef $fh;
            die $error;
          });
        });
      })->then (sub {
        # If test HTML document has an element for screenshot (which is element with id `for-screenshot`),
        # screenshot will be taken.
        return $session->execute (q{
          var screenshotTargetElem = document.querySelector("#for-screenshot");
          if (screenshotTargetElem) {
            screenshotTargetElem.style.display = "block";
            document.querySelector("#qunit").style.display = "none";
            return {
              screenshotNeeded: true
            };
          } else {
            return {
              screenshotNeeded: false
            };
          }
        })->then (sub {
          my $res = $_[0];
          if ($res->json->{value}->{screenshotNeeded}) {
            return $session->screenshot->then (sub {
              my $image = $_[0];

              my $fh = IO::File->new("$test_result_file_path.png", ">");
              die "File open failed: $test_result_file_path" if not defined $fh;
              print $fh $image;
              undef $fh;
            });
          }
        });
      });
      return $p->catch (sub {})->then (sub {
        return $session->close;
      })->then (sub { return $p; });
    });
    return $p->catch (sub {})->then (sub {
      return $wd->close;
    })->then (sub { return $p; });
  })->to_cv->recv;

  return $all_tests_passed;
}

sub set_script_timeout {
  my ($wd, $session_id, $timeout_ms) = @_;
  return $wd->http_post (['session', $session_id, 'timeouts'], {
    type => 'script',
    ms => $timeout_ms,
  })->then (sub {
    my $res = $_[0];
    die $res if $res->is_error;
  });
}

sub execute_async {
  my ($wd, $session_id, $script) = @_;
  return $wd->http_post (['session', $session_id, 'execute_async'], {
    script => qq{
      // Callback for Execute Async Script command.
      var callback = arguments[arguments.length - 1];
      Promise.resolve().then(function () {
        $script
      }).then(function (value) { callback(value) });
    },
    args => [],
  })->then (sub {
    my $res = $_[0];
    die $res if $res->is_error;
    return $res->json;
  });
}

my $exit_code = run_tests();
exit $exit_code;

=head1 LICENSE

Copyright 2017 Wakaba <wakaba@suikawiki.org>.  All rights reserved.
Copyright 2017 Hatena <http://hatenacorp.jp/>.  All rights reserved.

This program is free software; you can redistribute it and/or
modify it under the same terms as Perl itself.

Alternatively, the contents of this file may be used
under the following terms (the "MPL/GPL/LGPL"),
in which case the provisions of the MPL/GPL/LGPL are applicable instead
of those above. If you wish to allow use of your version of this file only
under the terms of the MPL/GPL/LGPL, and not to allow others to
use your version of this file under the terms of the Perl, indicate your
decision by deleting the provisions above and replace them with the notice
and other provisions required by the MPL/GPL/LGPL. If you do not delete
the provisions above, a recipient may use your version of this file under
the terms of any one of the Perl or the MPL/GPL/LGPL.

"MPL/GPL/LGPL":

Version: MPL 1.1/GPL 2.0/LGPL 2.1

The contents of this file are subject to the Mozilla Public License Version
1.1 (the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at
<http://www.mozilla.org/MPL/>

Software distributed under the License is distributed on an "AS IS" basis,
WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
for the specific language governing rights and limitations under the
License.

The Original Code is TER code.

The Initial Developer of the Original Code is Wakaba.
Portions created by the Initial Developer are Copyright (C) 2008
the Initial Developer. All Rights Reserved.

Contributor(s):
  Wakaba <wakaba@suikawiki.org>

Alternatively, the contents of this file may be used under the terms of
either the GNU General Public License Version 2 or later (the "GPL"), or
the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
in which case the provisions of the GPL or the LGPL are applicable instead
of those above. If you wish to allow use of your version of this file only
under the terms of either the GPL or the LGPL, and not to allow others to
use your version of this file under the terms of the MPL, indicate your
decision by deleting the provisions above and replace them with the notice
and other provisions required by the LGPL or the GPL. If you do not delete
the provisions above, a recipient may use your version of this file under
the terms of any one of the MPL, the GPL or the LGPL.

=cut
