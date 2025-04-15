WGET = wget
SAVEURL = $(WGET) -O

all: LICENSE maplibre.css maplibre.js \
    LICENSE.maplibre-gl-leaflet leafletmaplibre.js

LICENSE:
	$(SAVEURL) $@ https://raw.githubusercontent.com/maplibre/maplibre-gl-js/refs/tags/v5.3.0/LICENSE.txt
maplibre.css:
	$(SAVEURL) $@ https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.css
maplibre.js:
	$(SAVEURL) $@ https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.js

LICENSE.maplibre-gl-leaflet:
	$(SAVEURL) $@ https://raw.githubusercontent.com/maplibre/maplibre-gl-leaflet/refs/heads/main/LICENSE
leafletmaplibre.js:
	$(SAVEURL) $@ https://raw.githubusercontent.com/maplibre/maplibre-gl-leaflet/refs/heads/main/leaflet-maplibre-gl.js

## License: Public Domain.
