WGET = wget
SAVEURL = $(WGET) -O

all: leaflet.js leaflet.css LICENSE

leaflet.js:
	$(SAVEURL) $@ https://unpkg.com/leaflet@1.7.1/dist/leaflet.js

leaflet.css:
	$(SAVEURL) $@ https://unpkg.com/leaflet@1.7.1/dist/leaflet.css

LICENSE:
	$(SAVEURL) $@ https://raw.githubusercontent.com/Leaflet/Leaflet/master/LICENSE

## License: Public Domain.
