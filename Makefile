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
intermediate/leaflet/BoundaryCanvas.js: intermediate-leaflet
intermediate/leaflet/LICENSE.boundary: intermediate-leaflet

intermediate-mlgl:
	cd intermediate/maplibregl && $(MAKE) all
intermediate/maplibregl/maplibre.css: intermediate-mlgl
intermediate/maplibregl/maplibre.js: intermediate-mlgl
intermediate/maplibregl/LICENSE: intermediate-mlgl
intermediate/maplibregl/leafletmaplibre.js: intermediate-mlgl
intermediate/maplibregl/LICENSE.maplibre-gl-leaflet: intermediate-mlgl

intermediate-pmtiles:
	cd intermediate/pmtiles && $(MAKE) all
intermediate/pmtiles/LICENSE: intermediate-pmtiles
intermediate/pmtiles/pmtiles.js: intermediate-pmtiles

src/maps.js: src/maps-src.js \
    intermediate/leaflet/leaflet.js intermediate/leaflet/LICENSE \
    intermediate/leaflet/BoundaryCanvas.js \
    intermediate/leaflet/LICENSE.boundary \
    intermediate/maplibregl/maplibre.js \
    intermediate/maplibregl/LICENSE \
    intermediate/maplibregl/leafletmaplibre.js \
    intermediate/maplibregl/LICENSE.maplibre-gl-leaflet \
    intermediate/pmtiles/pmtiles.js \
    intermediate/pmtiles/LICENSE
	echo "" > $@
	cat $< | perl -n -e ' \
	    s{/\*\@\@\@leaflet.js\@\@\@\*/}{open $$f, "<", "intermediate/leaflet/leaflet.js"; join "", <$$f>}ge; \
	    s{/\*\@\@\@BoundaryCanvas.js\@\@\@\*/}{open $$f, "<", "intermediate/leaflet/BoundaryCanvas.js"; join "", <$$f>}ge; \
	    s{/\*\@\@\@maplibre.js\@\@\@\*/}{open $$f, "<", "intermediate/maplibregl/maplibre.js"; join "", <$$f>}ge; \
	    s{/\*\@\@\@leafletmaplibre.js\@\@\@\*/}{open $$f, "<", "intermediate/maplibregl/leafletmaplibre.js"; join "", <$$f>}ge; \
	    s{/\*\@\@\@pmtiles.js\@\@\@\*/}{open $$f, "<", "intermediate/pmtiles/pmtiles.js"; join "", <$$f>}ge; \
	    s{^//# sourceMappingURL=}{//}gm; s{\xEF\xBB\xBF}{}gm; print' >> $@
	echo '/* Leaflet */' >> $@
	echo '/*' >> $@
	cat intermediate/leaflet/LICENSE >> $@
	echo '*/' >> $@
	echo '/*' >> $@
	cat intermediate/leaflet/LICENSE.boundary >> $@
	echo '*/' >> $@
	echo '/* MapLibre GL */' >> $@
	echo '/*' >> $@
	cat intermediate/maplibregl/LICENSE >> $@
	echo '*/' >> $@
	echo '/* maplibre-gl-leaflet */' >> $@
	echo '/*' >> $@
	cat intermediate/maplibregl/LICENSE.maplibre-gl-leaflet >> $@
	echo '*/' >> $@
	echo '/* PMTiles */' >> $@
	echo '/*' >> $@
	cat intermediate/pmtiles/LICENSE >> $@
	echo '*/' >> $@

css/default.css: \
    css/default-import.css \
    css/default-src.css \
    intermediate/leaflet/leaflet.css intermediate/leaflet/LICENSE \
    intermediate/maplibregl/maplibre.css \
    intermediate/maplibregl/LICENSE
	cat css/default-import.css > $@
	echo '/* Leaflet default styles */' >> $@
	cat intermediate/leaflet/leaflet.css >> $@
	echo '/*' >> $@
	cat intermediate/leaflet/LICENSE >> $@
	echo '*/' >> $@
	echo '/* MapLibre GL default styles */' >> $@
	cat intermediate/maplibregl/maplibre.css >> $@
	echo '/*' >> $@
	cat intermediate/maplibregl/LICENSE >> $@
	echo '*/' >> $@
	cat css/default-src.css >> $@

build: build-deps build-main
build-deps:
build-main: src/qrcode.js src/maps.js css/default.css

build-github-pages:

## ------ Tests ------

test: test-deps test-main

test-deps: deps

# XXX requires TEST_WD_URL
test-main:
	TEST_MAX_CONCUR=1 WEBUA_DEBUG=2 $(PERL) t_deps/run-qunit-tests.pl

## License: Public Domain.
