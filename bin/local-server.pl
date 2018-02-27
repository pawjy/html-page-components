use strict;
use warnings;
use Path::Tiny;
require scalar path (__FILE__)->parent->parent->child ('t_deps/server.pl')->absolute;
use AnyEvent;

my $server = server (0, 6444);
warn "Server: http://0:6444\n";

AE::cv->recv;
