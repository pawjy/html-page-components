all:

WGET = wget
CURL = curl
GIT = git
PERL = ./perl

updatenightly: local/bin/pmbp.pl
	$(CURL) -s -S -L -f https://gist.githubusercontent.com/wakaba/34a71d3137a52abb562d/raw/gistfile1.txt | sh
	$(GIT) add t_deps/modules
	perl local/bin/pmbp.pl --update
	$(GIT) add config
	$(CURL) -sSLf https://raw.githubusercontent.com/wakaba/ciconfig/master/ciconfig | RUN_GIT=1 REMOVE_UNUSED=1 perl

## ------ Setup ------

deps: git-submodules pmbp-install

git-submodules:
	$(GIT) submodule update --init

PMBP_OPTIONS=

local/bin/pmbp.pl:
	mkdir -p local/bin
	$(CURL) -s -S -L -f https://raw.githubusercontent.com/wakaba/perl-setupenv/master/bin/pmbp.pl > $@
pmbp-upgrade: local/bin/pmbp.pl
	perl local/bin/pmbp.pl $(PMBP_OPTIONS) --update-pmbp-pl
pmbp-update: git-submodules pmbp-upgrade
	perl local/bin/pmbp.pl $(PMBP_OPTIONS) --update
pmbp-install: pmbp-upgrade
	perl local/bin/pmbp.pl $(PMBP_OPTIONS) --install \
            --create-perl-command-shortcut @perl \
            --create-perl-command-shortcut @prove \
	    --create-bootstrap-script "bin/lserver.in lserver"
	chmod u+x lserver

intermediate-qr:
	cd intermediate/qr && $(MAKE) all
intermediate/qr/qr.js: intermediate-qr
src/qrcode.js: src/qrcode-src.js intermediate/qr/qr.js
	cat $< | perl -n -e 's{/\*\@\@\@qr.js\@\@\@\*/}{open $$f, "<", "local/qr.js"; join "", <$$f>}ge; print' > $@

intermediate-leaflet:
	cd intermediate/leaflet && $(MAKE) all
intermediate/leaflet/leaflet.js: intermediate-leaflet
intermediate/leaflet/leaflet.css: intermediate-leaflet
intermediate/leaflet/LICENSE: intermediate-leaflet

src/maps.js: src/maps-src.js \
    intermediate/leaflet/leaflet.js intermediate/leaflet/LICENSE
	cat $< | perl -n -e 's{/\*\@\@\@leaflet.js\@\@\@\*/}{open $$f, "<", "intermediate/leaflet/leaflet.js"; join "", <$$f>}ge; s{^//# sourceMappingURL=}{//}gm; print' > $@
	echo '/* Leaflet */' >> $@
	echo '/*' >> $@
	cat intermediate/leaflet/LICENSE >> $@
	echo '*/' >> $@

css/default.css: \
    css/default-import.css \
    css/default-src.css \
    intermediate/leaflet/leaflet.css intermediate/leaflet/LICENSE
	cat css/default-import.css > $@
	echo '/* Leaflet default styles */' >> $@
	cat intermediate/leaflet/leaflet.css >> $@
	echo '/*' >> $@
	cat intermediate/leaflet/LICENSE >> $@
	echo '*/' >> $@
	cat css/default-src.css >> $@

build: build-deps build-main
build-deps:
build-main: src/qrcode.js src/maps.js css/default.css

## ------ Tests ------

test: test-deps test-main

test-deps: deps

# XXX requires TEST_WD_URL
test-main:
	TEST_MAX_CONCUR=1 WEBUA_DEBUG=2 $(PERL) t_deps/run-qunit-tests.pl

## License: Public Domain.
