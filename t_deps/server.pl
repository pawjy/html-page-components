use strict;
use warnings;
use Path::Tiny;
use lib glob path (__FILE__)->parent->parent->child ('t_deps/modules/*/lib');
use AnyEvent::Socket;
use JSON::PS;
use Web::Transport::PSGIServerConnection;

my $root_path = path (__FILE__)->parent->parent;

sub server ($$) {
  my ($host, $port) = @_;
  my $PSGIApp = sub {
    my $env = $_[0];
    if ($env->{REQUEST_URI} =~ m{\A/submit/([0-9]+)(|.json)\z}) {
      my $status = $1;
      my $type = $2;
      my $length = $env->{CONTENT_LENGTH};
      my $buf = '';
      $env->{'psgi.input'}->read ($buf, $length);
      if ($type eq '.json') {
        return [$status, [], [perl2json_bytes +{
          mime => $env->{CONTENT_TYPE},
          origin => $env->{HTTP_ORIGIN},
          referrer => $env->{HTTP_REFERER},
          method => $env->{REQUEST_METHOD},
          body_text => $buf,
          testdata => {abc => 533},
        }]];
      } else {
        return [$status, ['content-type' => $env->{CONTENT_TYPE}], [$buf]];
      }
    } elsif ($env->{REQUEST_URI} =~ m{\A((?:/[A-Za-z0-9_-][.A-Za-z0-9_-]*)+)(?:\?|\z)}) {
      my $path = $root_path->child ($1);
      return [200, [], [$path->slurp]] if $path->is_file;
    } elsif ($env->{REQUEST_URI} eq '/') {
      my $s = '<!DOCTYPE HTML><title>page-components</title><ul>';
      for (sort { $a cmp $b }
           ($root_path->child ('demo')->children (qr/\A[A-Za-z0-9_-]+\.html\z/)),
           ($root_path->child ('t')->children (qr/\A[A-Za-z0-9_-]+\.html\z/))) {
        my $label = $_->relative ($root_path);
        $s .= sprintf '<li><a href="%s">%s</a>', $label, $label;
      }
      $s .= '</ul>';
      return [200, ['content-type','text/html;charset=utf-8'], [$s]];
    }
    return [404, [], []];
  };
  my $HTTPServer = tcp_server $host, $port, sub {
    Web::Transport::PSGIServerConnection->new_from_app_and_ae_tcp_server_args
          ($PSGIApp, [@_]);
  };
  return $HTTPServer;
} # server

1;

=head1 LICENSE

Copyright 2017-2018 Wakaba <wakaba@suikawiki.org>.

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
