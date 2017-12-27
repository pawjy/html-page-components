(function () {
  var define = function (def) {
    var e = document.createElementNS ('data:,pc', 'element');
    e.pcDef = def;
    document.head.appendChild (e);
  }; // define

  var gmPromise;
  var loadGoogleMaps = () => {
    return gmPromise = gmPromise || new Promise ((resolve, reject) => {
      var functionName = ("maGoogleLoaded" + Math.random ()).replace (/\./g, '');
      var script = document.createElement ('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent (document.documentElement.getAttribute ('data-google-maps-key')) + '&callback=' + encodeURIComponent (functionName);
      var ls = document.documentElement.getAttribute ('data-google-maps-libraries');
      if (ls) script.src += '&libraries=' + encodeURIComponent (ls);
      script.async = true;
      //script.onload = resolve;
      script.onerror = () => {
        reject (new Error ("Failed to load Google Maps"));
        delete window[functionName];
      };
      window[functionName] = () => {
        resolve ();
        delete window[functionName];
      };
      document.head.appendChild (script);
    });
  }; // loadGoogleMaps

  var isOb = new Promise ((resolve, reject) => {
    if (window.IntersectionObserver) return resolve ();

    // Safari does not support IntersectionObserver yet.
    var script = document.createElement ('script');
    script.src = 'https://rawgit.com/w3c/IntersectionObserver/master/polyfill/intersection-observer.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild (script);
  });
  
  define ({
    name: 'map-area',
    props: {
      pcInit: function () {
        Object.defineProperty (this, 'googleMap', {
          get: function () {
            return this.maGoogleMap || null;
          },
        });

        this.maRedrawNeedUpdated = {};
        this.ready = new Promise ((r) => this.maRedrawNeedUpdated.onready = r);
        loadGoogleMaps ().then (() => {
          this.maGoogleMap = new google.maps.Map (this, {
            center: {lat: this.maAttrFloat ('lat', 0),
                     lng: this.maAttrFloat ('lon', 0)},
            zoom: 8,
          });
          this.maGoogleMap.addListener ('bounds_changed', () => {
            var v = this.maGoogleMap.getCenter ();
            this.maCenter = {
              lat: v.lat (),
              lon: v.lng (),
            };
            this.maRedrawEvent ();
          });
          var mo = new MutationObserver ((mutations) => {
            this.maGoogleMap.setCenter ({
              lat: this.maAttrFloat ('lat', 0),
              lng: this.maAttrFloat ('lon', 0),
            });
          });
          mo.observe (this, {attributeFilter: ['lat', 'lon']});
          this.maRedraw ({all: true, _ByInit: true});
          return isOb;
        }).then (() => {
          this.maISObserver = new IntersectionObserver (() => {
            this.maRedraw ({size: true, _ByIntersection: true});
          });
          this.maISObserver.observe (this);
        });
      }, // pcInit
      maRedrawEvent: function () {
        clearTimeout (this.maRedrawEventTimer);
        this.maRedrawEventTimer = setTimeout (() => this.ma_RedrawEvent (), 100);
      }, // maRedrawEvent
      ma_RedrawEvent: function () {
        var isShown = this.offsetWidth > 0 && this.offsetHeight > 0;
        if (!isShown) return;
        
        this.dispatchEvent (new Event ('pcRedraw', {bubbles: true}));
      }, // ma_RedrawEvent
      maRedraw: function (opts) {
        for (var n in opts) {
          if (opts[n]) this.maRedrawNeedUpdated[n] = true;
        }
        clearTimeout (this.maRedrawTimer);
        this.maRedrawTimer = setTimeout (() => this.ma_Redraw (), 300);
      }, // maRedraw
      ma_Redraw: function () {
        var isShown = this.offsetWidth > 0 && this.offsetHeight > 0;
        
        var updates = this.maRedrawNeedUpdated;
        if (isShown) {
          this.maShown = true;
          this.maRedrawNeedUpdated = {};

          if (updates.size || updates.all) {
            google.maps.event.trigger (this.maGoogleMap, 'resize');
            if (this.maCenter) this.maGoogleMap.setCenter ({
              lat: this.maCenter.lat,
              lng: this.maCenter.lon,
            });
          }
        } // isShown
        
        if (updates.onready) {
          updates.onready ();
          delete updates.onready;
        }
      }, // ma_Redraw

      maAttrFloat: function (name, def) {
        var value = parseFloat (this.getAttribute (name));
        if (Number.isFinite (value)) {
          return value;
        } else {
          return def;
        }
      }, // maAttrFloat

      getMapCenter: function () {
        return this.maCenter; // or null
      }, // getMapCenter
      getMapBounds: function () {
        if (!this.maGoogleMap) return null;
        var bounds = this.maGoogleMap.getBounds ();
        return {
          north: bounds.getNorthEast ().lat (),
          east: bounds.getNorthEast ().lng (),
          south: bounds.getSouthWest ().lat (),
          west: bounds.getSouthWest ().lng (),
        };
      }, // getMapBounds
    },
  });

}) ();
