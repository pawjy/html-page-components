WGET = wget
SAVEURL = $(WGET) -O

all: leaflet.js leaflet.css \
    marker-icon.png marker-icon-2x.png marker-shadow.png LICENSE \
    BoundaryCanvas.js LICENSE.boundary

leaflet.js:
	$(SAVEURL) $@ https://unpkg.com/leaflet@1.7.1/dist/leaflet.js

leaflet.css:
	$(SAVEURL) $@ https://unpkg.com/leaflet@1.7.1/dist/leaflet.css

marker-icon.png:
	$(SAVEURL) $@ https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png
marker-icon-2x.png:
	$(SAVEURL) $@ https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png
marker-shadow.png:
	$(SAVEURL) $@ https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png

LICENSE:
	$(SAVEURL) $@ https://raw.githubusercontent.com/Leaflet/Leaflet/master/LICENSE

LICENSE.boundary:
	$(SAVEURL) $@ https://raw.githubusercontent.com/aparshin/leaflet-boundary-canvas/refs/heads/master/LICENSE
BoundaryCanvas.js:
	$(SAVEURL) $@ https://raw.githubusercontent.com/aparshin/leaflet-boundary-canvas/refs/heads/master/src/BoundaryCanvas.js

## License: Public Domain.
