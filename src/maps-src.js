(function () {
  console.pcMaps = {};
  (function () {
    /*@@@leaflet.js@@@*/
  }).apply ({});
  var L = console.pcMaps.L = window.L;
  L.noConflict ();

  var define = function (def) {
    var e = document.createElementNS ('data:,pc', 'element');
    e.pcDef = def;
    document.head.appendChild (e);
  }; // define
  
  var noImageURL = 'https://rawgit.com/wakaba/html-page-components/master/css/noimage.svg';
  // Credit required by GSI.
  var gsiCreditHTML = "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank' lang=ja>\u56FD\u571F\u5730\u7406\u9662</a>";
  var gsiPhotoCreditHTML = "<details is=pc-map-credit-details><summary lang=ja>\u56FD\u571F\u5730\u7406\u9662\u4ED6</summary><p>"+gsiCreditHTML+"<p lang=ja>\u30C7\u30FC\u30BF\u30BD\u30FC\u30B9\uFF1ALandsat8\u753B\u50CF\uFF08GSI,TSIC,GEO Grid/AIST\uFF09, Landsat8\u753B\u50CF\uFF08courtesy of the U.S. Geological Survey\uFF09, \u6D77\u5E95\u5730\u5F62\uFF08GEBCO\uFF09<p lang=en>Images on \u4E16\u754C\u885B\u661F\u30E2\u30B6\u30A4\u30AF\u753B\u50CF obtained from site <a href=https://lpdaac.usgs.gov/data_access target=_blank>https://lpdaac.usgs.gov/data_access</a> maintained by the NASA Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and Science (EROS) Center, Sioux Falls, South Dakota, (Year). Source of image data product.</details>";
  
  var ColorOpacities = console.pcMaps.ColorOpacities = {
    '0,0,0': 1,
    '30,30,30': 1,
    '50,50,50': 1,
    '80,80,80': 1,
    '100,100,100': 1,
    '200,200,200': 0.05,
    '213,213,213': 0.02,
    '233,233,233': 0,
    '255,255,255': 0,
    '0,90,60': 1,
    '94,189,108': 0.4,
    '190,210,255': 0.1,
    '105,150,255': 0.2,
    '20,90,255': 0.2,
    '96,25,133': 1,
    '253,134,75': 0.2,
    '199,136,137': 0.4,
    '219,199,149': 0.001,
    '203,165,72': 0.001,
    '216,194,137': 0.001,
    '251,221,206': 0.001,
    '255,255,230': 0,
    '255,255,0': 0.4,
    '255,230,190': 0.4,
  }; // ColorOpacities
  var PaletteColors = Object.keys (ColorOpacities).map (_ => _.split (/,/));
  
  console.pcMaps.printPaletteColors = () => {
    var l = document.createElement ('ul');
    PaletteColors.forEach (pRGB => {
      var li = document.createElement ('li');
      var c = document.createElement ('span');
      c.textContent = c.style.background = 'rgb(' + pRGB + ')';
      li.appendChild (c);
      li.appendChild (document.createTextNode (' : '));
      var op = document.createElement ('span');
      op.style.background = 'rgb(' + pRGB + ')';
      op.textContent = op.style.opacity = ColorOpacities[pRGB];
      li.appendChild (op);
      l.appendChild (li);
    });
    document.body.appendChild (l);
    l.scrollIntoView ();
  }; // console.pcMaps.printPaletteColors

  function ddRGB ([r1, g1, b1], [r2, g2, b2]) {
    var r = r1-r2;
    var g = g1-g2;
    var b = b1-b2;
    return r*r*3 + g*g*5 + b*b;
  } // ddRGB
  
  function computeColorOpacities (colors) {
    Object.keys (colors).map (key => {
      var rgb = colors[key];

      var minRGB = null;
      var minDD = Infinity;
      PaletteColors.forEach (pRGB => {
        var dd = ddRGB (pRGB, rgb);
        if (dd < minDD) {
          minDD = dd;
          minRGB = pRGB;
        }
      });
      
      ColorOpacities[rgb] = ColorOpacities[minRGB];
    }); // colors
  } // computeColorOpacities

  L.GridLayer.TileImages = L.GridLayer.extend ({
    createTile: function (coords, done) {
      var img = document.createElement ('img');
      var tileSize = this.getTileSize ();
      img.width = tileSize.x;
      img.height = tileSize.y;

      var u;
      var srcs = this.options.srcs;
      for (var i = 0; i < srcs.length; i++) {
        var src = srcs[i];
        if (src.minZoom <= coords.z && coords.z <= src.maxZoom) {
          u = src.url;
          break;
        }
      }
      
      new Promise ((ok, ng) => {
        img.src = u.replace (/\{x\}/, coords.x)
                   .replace (/\{y\}/, coords.y)
                   .replace (/\{z\}/, coords.z);
        img.onload = ok;
        img.onerror = ng
      }).then (() => {
        done (null, img);
      }, err => {
        img.src = this.options.errorTileUrl;
      });

      return img;
    }, // createTile
  }); // L.GridLayer.TileImages
  L.gridLayer.tileImages = function (opts) {
    return new L.GridLayer.TileImages (opts);
  };

  L.GridLayer.GSIOverlay = L.GridLayer.extend ({
    createTile: function (coords, done) {
      var canvas = document.createElement ('canvas');
      var tileSize = this.getTileSize ();
      canvas.width = tileSize.x;
      canvas.height = tileSize.y;
      var ctx = canvas.getContext ('2d');
      
      var img = document.createElement ('img');
      new Promise ((ok, ng) => {
        img.setAttribute ('crossorigin', '');
        var u = 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png';
        img.src = u.replace (/\{x\}/, coords.x)
                   .replace (/\{y\}/, coords.y)
                   .replace (/\{z\}/, coords.z);
        img.onload = ok;
        img.onerror = ng
      }).then (() => {
        ctx.drawImage (img, 0, 0, img.naturalWidth, img.naturalHeight);

        var id = ctx.getImageData (0, 0, canvas.width, canvas.height);
        var colors = {}; // {(r,g,b): (# of pixels), ...}
        for (var i = 0; i < id.data.byteLength; i+=4) {
          var rgb = [id.data[i], id.data[i+1], id.data[i+2]];
          if (ColorOpacities[rgb] === undefined) colors[rgb] = rgb;
        }
        computeColorOpacities (colors);
        for (var i = 0; i < id.data.byteLength; i+=4) {
          var rgb = [id.data[i], id.data[i+1], id.data[i+2]];
          id.data[i+3] = 0xFF * ColorOpacities[rgb];
        }
        ctx.putImageData (id, 0, 0);
        
        done (null, canvas);
      }, err => { // err is img.onerror's error
        var img = document.createElement ('img');
        return new Promise ((ok, ng) => {
          img.setAttribute ('crossorigin', '');
          img.src = this.options.errorTileUrl;
          img.onload = ok;
          img.onerror = ng
        }).then (() => {
          ctx.drawImage (img, 0, 0, canvas.width, canvas.height);
        });
      });

      return canvas;
    }, // createTile
  }); // L.GridLayer.GSIOverlay
  L.gridLayer.gsiOverlay = function (opts) {
    return new L.GridLayer.GSIOverlay (opts);
  };

  L.Control.ElementControl = L.Control.extend ({
    onAdd: function (map) {
      var e = this.options.element;
      e.pcMap = map;
      if (this.options.styling) this.options.styling (e);
      return e;
    }, // onAdd
  });
  L.control.elementControl = function (opts) {
    return new L.Control.ElementControl (opts);
  };
  L.control.fullscreenButton = function (opts) {
    var b = document.createElement ('button');
    b.className = 'paco-control-button paco-fullscreen-control-button';
    b.type = 'button';
    b.textContent = '\u26F6';
    b.onclick = async () => {
      var e = b.pcMap.getContainer ();
      if (document.fullscreenElement) {
        document.exitFullscreen ();
      } else {
        e.requestFullscreen ();
      }
    };
    opts.element = b;
    opts.styling = b => {
      var e = b.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-fullscreen-title'), 'Fullscreen');
      b.title = m;
    };
    return new L.Control.ElementControl (opts);
  }; // L.control.fullscreenButton
  L.control.currentPositionButton = function (opts) {
    var b = document.createElement ('button');
    b.className = 'paco-control-button paco-currentposition-control-button';
    b.type = 'button';
    b.textContent = '\u26EF';
    b.onclick = async () => {
      var e = b.pcMap.getContainer ();
      e.pcLocateCurrentPosition ({pan: true});
    };
    opts.element = b;
    opts.styling = b => {
      var e = b.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-currentposition-title'), 'Current position');
      b.title = m;
    };
    return new L.Control.ElementControl (opts);
  }; // L.control.currentPositionButton
  L.control.mapTypeMenu = function (opts) {
    var m = document.createElement ('popup-menu');
    m.className = 'paco-map-type-menu';
    m.innerHTML = '<button type=button class="paco-control-button">\u{1F5FA}</button><menu-main><menu-item><a data-href-template="https://www.google.com/maps?ll={lat},{lon}&z={zoomLevel}" target=_blank rel=noreferrer>Google Maps</a></menu-item><menu-item><a data-href-template="https://www.openstreetmap.org/?mlat={lat}&mlon={lon}&zoom={zoomLevel}" target=_blank rel=noreferrer>OpenStreetMap</a></menu-item><menu-item><a data-href-template="https://geohack.toolforge.org/geohack.php?params={lat};{lon}" target=_blank rel=noreferrer>Others...</a></menu-item><menu-item><a data-href-template="geo:{lat},{lon}" is=copy-url>Copy</a></menu-item></menu-main>';
    m.addEventListener ('dblclick', ev => ev.stopPropagation ());
    opts.element = m;
    opts.styling = m => {
      var e = m.pcMap.getContainer ();
      
      // recompute!
      var s = getComputedStyle (e);
      m.firstChild.title = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-title'), 'Map type');
      var mi = m.querySelectorAll ('a');
      mi[0].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-googlemaps-text'), 'Open in Google Maps');
      mi[1].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-openstreetmap-text'), 'Open in OpenStreetMap');
      mi[2].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-geohack-text'), 'Open in others...');
      mi[3].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-copy-center-text'), 'Copy center coordinates');

      if (e.hasAttribute ('jma')) {
        var mm = m.querySelector ('menu-main');
        var nodes = document.createElement ('div');
        nodes.innerHTML = '<menu-item><label><input type=checkbox> <span>Rain</span></label></menu-item><hr>';
        nodes.querySelector ('input').onchange = (ev) => e.toggleJMANowc (ev.target.checked);
        var sRain = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jmanowc-current-text'), 'Rain');
        nodes.querySelector ('label span').textContent = sRain;
        Array.prototype.slice.call (nodes.childNodes).reverse ().forEach (_ => mm.insertBefore (_, mm.firstChild));
      } // jma=""

      if (e.hasAttribute ('gsi')) {
        var mm = m.querySelector ('menu-main');
        var nodes = document.createElement ('div');
        nodes.innerHTML = '<menu-item data-class-field=mapClassName data-true=gsi-standard-hillshade data-false=gsi-lang><button>Map</button> <label><input type=checkbox> <span>Hillshade</span></label></menu-item><menu-item data-class-field=photoClassName data-true=gsi-photo-standard data-false=gsi-photo><button>Photo</button> <label><input type=checkbox> <span>Map</span></label></menu-item><menu-item data-class-field=hillshadeClassName data-true=gsi-hillshade-standard data-false=gsi-hillshade><button>Hillshade</button> <label><input type=checkbox> <span>Map</span></label></menu-item><hr>';
        var mis = nodes.querySelectorAll ('menu-item');
        mis[0].onclick = mis[1].onclick = mis[2].onclick = function () {
          e.setMapType (this.getAttribute ('data-' + this.querySelector ('input[type=checkbox]').checked));
          this.dispatchEvent (new Event ('toggle', {bubbles: true}));
        };
        var sMap = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-map-text'), 'Map');
        var sHillshade = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-hillshade-text'), 'Hillshade');
        var sPhoto = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-photo-text'), 'Photo');
        mis[0].querySelector ('button').textContent = sMap;
        mis[0].querySelector ('span').textContent = sHillshade;
        mis[1].querySelector ('button').textContent = sPhoto;
        mis[1].querySelector ('span').textContent = sMap;
        mis[2].querySelector ('button').textContent = sHillshade;
        mis[2].querySelector ('span').textContent = sMap;
        Array.prototype.slice.call (nodes.childNodes).reverse ().forEach (_ => mm.insertBefore (_, mm.firstChild));
      } // gsi=""

      m.addEventListener ('toggle', () => {
        if (m.hasAttribute ('open')) {
          var mapClassName = '';
          var hillshadeClassName = '';
          var photoClassName = '';
          var mt = e.pcMapType;
          if (mt === 'gsi-lang' || mt === 'gsi-standard-hillshade') {
            mapClassName = 'selected';
          }
          if (mt === 'gsi-photo' || mt === 'gsi-photo-standard') {
            photoClassName = 'selected';
          }
          if (mt === 'gsi-hillshade' || mt === 'gsi-hillshade-standard') {
            hillshadeClassName = 'selected';
          }
          e.pcInternal.$fill (m, {
            lat: e.maCenter.lat,
            lon: e.maCenter.lon,
            zoomLevel: e.pcZoomLevel,
            mapClassName,
            hillshadeClassName,
            photoClassName,
          });
        }
      });
    };
    return new L.Control.ElementControl (opts);
  }; // L.control.mapTypeMenu
  
  L.control.timestampControl = function (opts) {
    var t = document.createElement ('map-controls');
    t.className = 'paco-timestamp-control paco-jma-timestamp-control';
    t.innerHTML = '<a href=https://www.jma.go.jp/ target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>\u300C<a href=https://www.jma.go.jp/bosai/nowc/ target=_blank rel=noreferrer>\u96E8\u96F2\u306E\u52D5\u304D</a>\u300D <time data-format=abstime></time>';
    opts.element = t;
    opts.styling = b => {
      var e = b.pcMap.getContainer ();
      var time = b.querySelector ('time');
      var tzo = e.getAttribute ('tzoffset');
      if (tzo) time.setAttribute ('data-tzoffset', tzo);
    };
    opts.setTimeElement (t.querySelector ('time'));
    return new L.Control.ElementControl (opts);
  }; // L.control.timestampControl
  L.tileLayer.jmaNowc = function (opts) {
    var getTime = () => {
      var realNow = (new Date).valueOf ();
      var now = realNow - 100*1000;
      var prev = Math.floor (now / (5*60*1000)) * 5*60*1000;
      var next = prev + 5*60*1000;
      var delta = next - now;
          // next + 100*1000 - realNow
          // = next + 100*1000 - (now + 100*1000)
      if (delta < 60*1000) delta = 60*1000;
      var prevHTML = new Date (prev).toISOString ();
      var prevFormatted = prevHTML
          .replace (/(?:\.[0-9]+|)Z$/, '').replace (/[-:T]/g, '');
      return {realNow, prev, prevFormatted, prevHTML, next, delta};
    }; // getTime

    var time = getTime ();
    var u = 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp}/none/{urlTimestamp}/surf/hrpns/{z}/{x}/{y}.png';
    var layer = L.tileLayer (u, {
      attribution: '<a href=https://www.jma.go.jp/jma/kishou/info/coment.html target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>',
      errorTileUrl: opts.errorTileUrl,
      maxNativeZoom: 10,
      minNativeZoom: 4,
      opacity: 0.8,
      urlTimestamp: time.prevFormatted,
    });
    
    var needReload = false;
    var timeout;
    var timeElement;
    var requestReload = (layer, time) => {
      if (!needReload) return;
      time = time || getTime ();
      timeout = setTimeout (() => {
        if (!needReload) return;
        var time = getTime ();
        layer.options.urlTimestamp = time.prevFormatted;
        layer.setUrl (u, false);
        timeElement.textContent = time.prevHTML;
        timeElement.removeAttribute ('datetime');
        requestReload (layer, time);
      }, time.delta);
    }; // requestReload

    var ts = L.control.timestampControl ({
      position: 'bottomleft',
      setTimeElement: _ => {
        timeElement = _;
        timeElement.textContent = time.prevHTML;
        timeElement.removeAttribute ('datetime');
      },
    });

    var map;
    var ba = layer.beforeAdd;
    layer.beforeAdd = function (_) {
      map = _;
      return ba.apply (this, arguments);
    };

    layer.on ('add', ev => {
      needReload = true;
      requestReload (ev.target, null);
      ts.addTo (map);
    });
    layer.on ('remove', ev => {
      needReload = false;
      clearTimeout (timeout);
      ts.remove ();
    });

    return layer;
  }; // L.tileLayer.jmaNowc
  
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

  define ({
    name: 'map-area',
    pcInternal: true,
    props: {
      pcInit: function () {
        this.maRedrawNeedUpdated = {};
        this.ready = new Promise ((r) => this.maRedrawNeedUpdated.onready = r);
        
        this.maEngine = this.getAttribute ('engine');
        if (this.maEngine === 'googlemaps') {
          return this.maInitGoogleMaps ();
        } else if (this.maEngine === 'googlemapsembed') {
          return this.maInitGoogleMapsEmbed ();
        } else {
          this.maEngine = 'leaflet';
          return this.pcInitLeaflet ();
        }
      }, // pcInit
      maInitGoogleMaps: function () {
        Object.defineProperty (this, 'googleMap', {
          get: function () {
            return this.maGoogleMap || null;
          },
        });

        loadGoogleMaps ().then (() => {
          var controls = [];
          Array.prototype.slice.call (this.children).forEach (e => {
            if (e.localName === 'map-controls') {
              controls.push (e);
            }
          });

          var mapOpts = {
            zoom: 8,
          };
          var center = {lat: this.maAttrFloat ('lat', 0),
                        lng: this.maAttrFloat ('lon', 0)};
          if (center.lat || center.lng) mapOpts.center = center;
          this.maGoogleMap = new google.maps.Map (this, mapOpts);

          if (this.hasAttribute ('gsi')) {
            this.maGoogleMap.setOptions ({
              mapTypeId: google.maps.MapTypeId.TERRAIN,
              mapTypeControlOptions: {mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN,
                google.maps.MapTypeId.SATELLITE,
                google.maps.MapTypeId.HYBRID,
                this.maGoogleMapTypeGSI,
              ]},
            });
            this.maEnableGoogleMapGSI ();
          }

          var applyControls = () => {
            var opts = {};
            var value = this.getAttribute ('controls');
            if (value === null) {
              opts.scaleControl = opts.fullscreenControl =
              opts.zoomControl = opts.streetViewControl =
              opts.mapTypeControl = true;
            } else {
              opts.scaleControl = opts.fullscreenControl =
              opts.zoomControl = opts.streetViewControl =
              opts.mapTypeControl = false;
              var values = value.split (/\s+/);
              values.forEach (v => {
                var key = {
                  scale: 'scaleControl',
                  fullscreen: 'fullscreenControl',
                  streetview: 'streetViewControl',
                  zoom: 'zoomControl',
                  type: 'mapTypeControl',
                }[v];
                if (key) opts[key] = true;
              });
            }
            this.maGoogleMap.setOptions (opts);
          }; // applyControls
          new MutationObserver (applyControls)
              .observe (this, {attributeFilter: ['controls']});
          applyControls ();
          
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
          this.maCenter = {
            lat: this.maAttrFloat ('lat', 0),
            lon: this.maAttrFloat ('lon', 0),
          };
          
          var moc = new MutationObserver ((mutations) => {
            this.maRedraw ({controls: true});
          }).observe (this, {childList: true});
          controls.forEach (e => this.appendChild (e));
          
          this.maRedraw ({all: true});
        }).then (() => {
          this.maISObserver = new IntersectionObserver (() => {
            setTimeout (() => {
              this.maRedraw ({size: true, relocate: true});
            }, 0);
          });
          this.maISObserver.observe (this);
        });
      }, // maInitGoogleMaps
      maInitGoogleMapsEmbed: function () {
        var mo = new MutationObserver ((mutations) => {
          this.maCenter = {
            lat: this.maAttrFloat ('lat', 0),
            lon: this.maAttrFloat ('lon', 0),
          };
          this.maRedraw ({all: true});
        });
        mo.observe (this, {attributeFilter: ['lat', 'lon']});
        this.maCenter = {
          lat: this.maAttrFloat ('lat', 0),
          lon: this.maAttrFloat ('lon', 0),
        };
        return Promise.resolve ().then (() => this.maRedraw ({all: true}));
      }, // maInitGoogleMapsEmbed
      pcInitLeaflet: function () {
        (new MutationObserver ((mutations) => {
          this.pcLMap.panTo ({
            lat: this.maAttrFloat ('lat', 0),
            lng: this.maAttrFloat ('lon', 0),
          });
        })).observe (this, {attributeFilter: ['lat', 'lon']});
        this.maCenter = {
          lat: this.maAttrFloat ('lat', 0),
          lon: this.maAttrFloat ('lon', 0),
        };

        var c = this.getAttribute ('controls');
        var controls = {};
        if (c !== null) {
          c = c.split (/\s+/).filter (_ => _.length);
          if (c.length) {
            c.forEach (_ => controls[_] = true);
          } else {
            controls = {zoom: true, scale: true, fullscreen: true,
                        currentposition: true, type: true};
          }
        }

        var map = this.pcLMap = L.map (this, {
          zoomControl: false,
        });

        if (controls.zoom) {
          // recompute!
          var s = getComputedStyle (this);
          var zoomInTitle = this.pcInternal.parseCSSString (s.getPropertyValue ('--paco-zoomin-title'), 'Zoom in');
          var zoomOutTitle = this.pcInternal.parseCSSString (s.getPropertyValue ('--paco-zoomout-title'), 'Zoom out');
          L.control.zoom ({
            zoomInTitle,
            zoomOutTitle,
            position: 'bottomright',
          }).addTo (map);
        }
        if (controls.scale) L.control.scale ({}).addTo (map);

        if (controls.type) {
          L.control.mapTypeMenu ({
            position: 'topleft',
          }).addTo (map);
        }
        if (controls.fullscreen) L.control.fullscreenButton ({}).addTo (map);

        if (controls.currentposition) {
          L.control.currentPositionButton ({
            position: 'bottomright',
          }).addTo (map);
          if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query ({name: "geolocation"}).then (ps => {
              if (ps.state === 'granted') this.pcLocateCurrentPosition ({});
            });
          }
        }

        // Map need to be recomputed if it is initialized when not
        // shown.
        this.maISObserver = new IntersectionObserver (() => {
          this.maRedraw ({relocate: true});
        });
        this.maISObserver.observe (this);

        map.on ('load viewreset zoomend moveend', ev => {
          var c = map.getCenter ();
          this.maCenter = {lat: c.lat, lon: c.lng};
          this.pcZoomLevel = map.getZoom ();
          this.maRedrawEvent ();
        });
        map.setView (this.maCenter, 8);

        if (this.hasAttribute ('gsi')) {
          this.setMapType ('gsi-lang');
        }
        
        new MutationObserver ((mutations) => {
          this.maRedraw ({controls: true});
        }).observe (this, {childList: true});
        this.maRedraw ({controls: true});
      }, // pcInitLeaflet
      
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
        
        if (this.maRedrawNeedUpdated.relocate) {
          if (this.maEngine === 'leaflet') {
            this.pcLMap.invalidateSize ();
          } else if (this.maEngine === 'googlemaps') {
            if (this.maCenter) this.maGoogleMap.setCenter ({
              lat: this.maCenter.lat,
              lng: this.maCenter.lon,
            });
          }
          delete this.maRedrawNeedUpdated.relocate;
        }

        if (this.maRedrawNeedUpdated.mapType) {
          if (this.maEngine === 'leaflet') {
            this.pcChangeMapType ();
          }
          delete this.maRedrawNeedUpdated.mapType;
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
            if (this.maEngine === 'googlemaps') {
              google.maps.event.trigger (this.maGoogleMap, 'resize');
            } else if (this.maEngine === 'googlemapsembed') {
              if (!this.maIframe) {
                this.maIframe = document.createElement ('iframe');
                this.maIframe.className = 'googlemapsembed';
                this.maIframe.setAttribute ('sandbox', 'allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-top-navigation-by-user-activation');
                this.maIframe.setAttribute ('allowfullscreen', '');
                this.maIframe.onload = () => this.maRedrawEvent ();
                this.appendChild (this.maIframe);
              }
              this.maIframe.src = "https://www.google.com/maps/embed/v1/view?key=" + encodeURIComponent (document.documentElement.getAttribute ('data-google-maps-key')) + "&center=" + encodeURIComponent (this.maCenter.lat) + "," + encodeURIComponent (this.maCenter.lon) + "&zoom=8";
              // &maptype=satellite
            }
          }

          if (updates.controls || updates.all) {
            if (this.maEngine === 'leaflet') {
              Array.prototype.slice.call (this.children).forEach (e => {
                if (e.localName === 'map-controls') {
                  var position = {
                    'top-left': 'topleft',
                    'top-center': 'topleft',
                    'top-right': 'topright',
                    'bottom-left': 'bottomleft',
                    'bottom-center': 'bottomleft',
                    'left-top': 'topleft',
                    'left-center': 'topleft',
                    'left-bottom': 'bottomleft',
                    'right-top': 'topright',
                    'right-center': 'topright',
                    'right-bottom': 'bottomright',
                  }[e.getAttribute ('position')] || 'bottomright';
                  var c = L.control.elementControl ({
                    element: e,
                    position,
                  });
                  c.addTo (this.pcLMap);
                }
              });
            } else if (this.maEngine === 'googlemaps') {
              Array.prototype.slice.call (this.children).forEach (e => {
                if (e.localName === 'map-controls') {
                  // <https://developers.google.com/maps/documentation/javascript/controls>
                  var pos = {
                    'top-left': 'TOP_LEFT',
                    'top-center': 'TOP_CENTER',
                    'top-right': 'TOP_RIGHT',
                    'bottom-left': 'BOTTOM_LEFT',
                    'bottom-center': 'BOTTOM_CENTER',
                    'left-top': 'LEFT_TOP',
                    'left-center': 'LEFT_CENTER',
                    'left-bottom': 'LEFT_BOTTOM',
                    'right-top': 'RIGHT_TOP',
                    'right-center': 'RIGHT_CENTER',
                    'right-bottom': 'RIGHT_BOTTOM',
                  }[e.getAttribute ('position')] || 'BOTTOM_RIGHT';
                  this.maGoogleMap.controls[google.maps.ControlPosition[pos]].push (e);
                }
              });
            }
          } // controls
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
        if (this.pcLMap) {
          var bounds = this.pcLMap.getBounds ();
          return {
            north: bounds.getNorthEast ().lat,
            east: bounds.getNorthEast ().lng,
            south: bounds.getSouthWest ().lat,
            west: bounds.getSouthWest ().lng,
          };
        }
        
        if (this.maGoogleMap) {
          var bounds = this.maGoogleMap.getBounds ();
          return {
            north: bounds.getNorthEast ().lat (),
            east: bounds.getNorthEast ().lng (),
            south: bounds.getSouthWest ().lat (),
            west: bounds.getSouthWest ().lng (),
          };
        }

        throw new DOMException ('The map engine does not support this operation', 'NotSupportedError');
      }, // getMapBounds

      maGoogleMapTypeGSI: 'GSI',
      maEnableGoogleMapGSI: function  () {
        var map = this.googleMap;

        // <https://maps.gsi.go.jp/development/ichiran.html>
        // <https://maps.gsi.go.jp/help/use.html>
        map.mapTypes.set (this.maGoogleMapTypeGSI, {
          name: this.getAttribute ('gsi') || '国土地理院',
          alt: this.getAttribute ('gsititle') || '国土地理院の地理院タイル (標準地図) を見る',
          tileSize: new google.maps.Size (256, 256),
          minZoom: 2,
          maxZoom: 18,
          getTile: (coord, zoom, doc) => {
            var tile = document.createElement ('img');
            tile.style.width = '256px';
            tile.style.height = '256px';
            var x = coord.x % Math.pow (2, zoom);
            var y = coord.y;
            tile.src = 'https://cyberjapandata.gsi.go.jp/xyz/std/' + zoom + '/' + x + '/' + y + '.png';
            tile.onerror = () => {
              tile.src = this.getAttribute ('noimgsrc') || noImageURL;
            };
            return tile;
          }, // getTile
        });

        // Credit required by GSI.
        var credit = document.createElement ('map-credit');
        credit.hidden = true;
        credit.innerHTML = gsiCreditHTML;
        map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push (credit);
        google.maps.event.addListener (map, 'maptypeid_changed', () => {
          credit.hidden = ! (map.getMapTypeId () === this.maGoogleMapTypeGSI);
        });
      }, // maEnableGoogleMapGSI

      setMapType: function (type) {
        this.pcMapType = type;
        this.maRedraw ({mapType: true});
      }, // setMapType
      toggleJMANowc: function (_) {
        this.pcJMANowc = !!_;
        this.maRedraw ({mapType: true});
      }, // toggleJMANowc
      pcChangeMapType: function () {
        var sType = this.pcMapType;
        var map = this.pcLMap;

        var layers = [];

        var type = sType;
        if (sType === 'gsi-lang') {
          var s = getComputedStyle (this);
          var lang = s.getPropertyValue ('--paco--gsi-lang') || '';
          lang = lang.replace (/^\s+/, '').replace (/\s+$/, '');
          if (lang === 'gsi-english-standard') {
            type = 'gsi-english-standard';
          } else {
            type = 'gsi-standard';
          }
        }

        var errorTileUrl = this.getAttribute ('noimgsrc') || noImageURL;
        if (type === 'gsi-standard') {
          var lStd = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 18,
                minNativeZoom: 2,
              });
          layers.push (lStd);
        } else if (type === 'gsi-english') {
          var lEng = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 11,
                minNativeZoom: 5,
              });
          layers.push (lEng);
        } else if (type === 'gsi-hillshade') {
          var lShade = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 16,
                minNativeZoom: 2,
              });
          layers.push (lShade);
        } else if (type === 'gsi-photo') {
          var lPhoto = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 18,
                minNativeZoom: 2,
              });
          layers.push (lPhoto);
        } else if (type === 'gsi-standard-hillshade') {
          var lShade = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                opacity: 0.8,
              });
          layers.push (lShade);
          var lStd = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                opacity: 0.8,
              });
          layers.push (lStd);
        } else if (type === 'gsi-hillshade-standard') {
          var lGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
          });
          var lShade = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                opacity: 0.6,
              });
          layers.push (lShade);
          layers.push (lGSI);
        } else if (type === 'gsi-photo-standard') {
          var lGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
          });
          var lPhoto = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 18,
                minNativeZoom: 2,
             });
          layers.push (lPhoto);
          layers.push (lGSI);
        } else if (type === 'gsi-english-standard') {
          var lGSI = L.gridLayer.tileImages ({
            srcs: [
              {
                url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
                maxZoom: 18,
                minZoom: 12,
              },
              {
                url: 'https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png',
                maxZoom: 11,
                minZoom: 5,
              },
            ],
            attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 5,
          });
          layers.push (lGSI);
        }

        if (this.pcJMANowc) {
          var lNowc = L.tileLayer.jmaNowc ({
            errorTileUrl,
          });
          layers.push (lNowc);
        }
        
        map.eachLayer (l => map.removeLayer (l));
        layers.forEach (l => map.addLayer (l));
      }, // pcChangeMapType

      pcLocateCurrentPosition: function (opts) {
        if (opts.pan) {
          if (this.pcCurrentPosition) {
            this.pcLMap.panTo ({
              lat: this.pcCurrentPosition.lat,
              lng: this.pcCurrentPosition.lon,
            });
          } else {
            this.pcLocateCurrentPositionPanRequested = true;
          }
        }
        if (this.pcWatchPosition) return;
        this.pcWatchPosition = navigator.geolocation.watchPosition ((p) => {
          this.pcCurrentPosition = {
            lat: p.coords.latitude,
            lon: p.coords.longitude,
            //latLonAccuracy: p.coords.accuracy,
          };
          if (this.pcLocateCurrentPositionPanRequested) {
            this.pcLMap.panTo ({
              lat: this.pcCurrentPosition.lat,
              lng: this.pcCurrentPosition.lon,
            });
            delete this.pcLocateCurrentPositionPanRequested;
          }
        }, e => {
          if (e.code === GeolocationPositionError.PERMISSION_DENIED) {
            delete this.pcWatchPosition;

            // recompute!
            var m = this.pcInternal.parseCSSString (getComputedStyle (this).getPropertyValue ('--paco-geolocation-failed-message'), 'Failed to get the current position');
            this.pcInternal.$paco.showToast ({text: m, className: 'paco-geolocation-failed'});
          }
          console.log (e);
        });
      }, // pcLocateCurrentPosition
      
    },
  }); // <map-area>

}) ();

/*

Copyright 2017-2021 Wakaba <wakaba@suikawiki.org>.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Affero General Public License for more details.

You does not have received a copy of the GNU Affero General Public
License along with this program, see <https://www.gnu.org/licenses/>.

*/
