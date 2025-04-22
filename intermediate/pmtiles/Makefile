WGET = wget
SAVEURL = $(WGET) -O

all: LICENSE pmtiles.js

LICENSE:
	$(SAVEURL) $@ https://raw.githubusercontent.com/protomaps/PMTiles/refs/heads/main/LICENSE
pmtiles.js:
	$(SAVEURL) $@ https://unpkg.com/pmtiles@4.3.0/dist/pmtiles.js

## License: Public Domain.
