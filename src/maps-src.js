(function () {
  console.pcMaps = {};
  (function () {
    /*@@@leaflet.js@@@*/
    /*@@@maplibre.js@@@*/
    /*@@@leafletmaplibre.js@@@*/
    /*@@@pmtiles.js@@@*/
    {
      let protocol = new pmtiles.Protocol;
      maplibregl.addProtocol ("pmtiles", protocol.tile);
    }
    console.pcMaps.maplibregl = maplibregl;
  }).apply ({});
  var L = console.pcMaps.L = window.L;
  L.noConflict ();
  (function () {
    /*@@@BoundaryCanvas.js@@@*/
  }).apply ({});

  var define = function (def) {
    var e = document.createElementNS ('data:,pc', 'element');
    e.pcDef = def;
    document.head.appendChild (e);
  }; // define
  
  var noImageURL = 'https://rawgit.com/wakaba/html-page-components/master/css/noimage.svg';
  // Credit required by GSI.
  var gsiCreditHTML = "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank' lang=ja>\u56FD\u571F\u5730\u7406\u9662</a>";
  var gsiPhotoCreditHTML = "<details is=pc-map-credit-details><summary lang=ja>\u56FD\u571F\u5730\u7406\u9662\u4ED6</summary><p>"+gsiCreditHTML+"<p lang=ja>\u30C7\u30FC\u30BF\u30BD\u30FC\u30B9\uFF1ALandsat8\u753B\u50CF\uFF08GSI,TSIC,GEO Grid/AIST\uFF09, Landsat8\u753B\u50CF\uFF08courtesy of the U.S. Geological Survey\uFF09, \u6D77\u5E95\u5730\u5F62\uFF08GEBCO\uFF09<p lang=en>Images on \u4E16\u754C\u885B\u661F\u30E2\u30B6\u30A4\u30AF\u753B\u50CF obtained from site <a href=https://lpdaac.usgs.gov/data_access target=_blank>https://lpdaac.usgs.gov/data_access</a> maintained by the NASA Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and Science (EROS) Center, Sioux Falls, South Dakota, (Year). Source of image data product.</details>";
  // <https://operations.osmfoundation.org/policies/tiles/>
  let osmCreditHTML = '<a href=https://www.openstreetmap.org/copyright lang=en>OpenStreetMap</a> (<a href=https://www.openstreetmap.org/fixthemap title="Fix problems" lang=en>Fix</a>)';
  
  let JPBoundary = [
    {"lat":35.262290171262606,"lon":129.52549541458012},
    {"lat":33.63563443112933,"lon":128.11152711598143},
    {"lat":27.350347623784252,"lon":122.69130149811586},
    {"lat":22.818018713458926,"lon":122.42140894091759},
    {"lat":21.46928247377045,"lon":125.74416177967775},
    {"lat":22.451602587213536,"lon":127.43306430310153},
    {"lat":19.910331362180518,"lon":132.72485690436136},
    {"lat":17.550912179219264,"lon":133.21061202970304},
    {"lat":16.53723722190111,"lon":138.13503721601717},
    {"lat":20.22565975490805,"lon":140.48645650704304},
    {"lat":24.577877843701554,"lon":146.08591144544644},
    {"lat":18.180686409947512,"lon":157.28310995076697},
    {"lat":23.502592722918372,"lon":160.08685089215786},
    {"lat":49.547861062839964,"lon":159.3554522102241},
    {"lat":56.39427546745975,"lon":144.1097173256088},
    {"lat":54.936641506776475,"lon":141.51017029606572},
    {"lat":52.18604106241055,"lon":141.58175707690273},
    {"lat":49.968503479436386,"lon":141.37523485646417},
    {"lat":45.97493268294697,"lon":140.02162914620013},
    {"lat":40.57302091108701,"lon":135.0996451677164},
    {"lat":39.391052033518854,"lon":131.81659632507836},
    {"lat":35.721172006694296,"lon":130.9465206056198},
    {"lat":35.262290171262606,"lon":129.52549541458012},
  ];
  let JPGSIMapBoundary = [
    {"lat":35.262290171262606,"lon":129.52549541458012},
    {"lat":33.63563443112933,"lon":128.11152711598143},
    {"lat":27.350347623784252,"lon":122.69130149811586},
    {"lat":22.818018713458926,"lon":122.42140894091759},
    {"lat":21.46928247377045,"lon":125.74416177967775},
    {"lat":22.451602587213536,"lon":127.43306430310153},
    {"lat":19.910331362180518,"lon":132.72485690436136},
    {"lat":17.550912179219264,"lon":133.21061202970304},
    {"lat":16.53723722190111,"lon":138.13503721601717},
    {"lat":20.22565975490805,"lon":140.48645650704304},
    {"lat":24.577877843701554,"lon":146.08591144544644},
    {"lat":18.180686409947512,"lon":157.28310995076697},
    {"lat":46.7195903678211,"lon":148.71198705249572},
    {"lat":45.31730227791727,"lon":145.14328950844268},
    {"lat":45.97493268294697,"lon":140.02162914620013},
    {"lat":40.57302091108701,"lon":135.0996451677164},
    {"lat":39.391052033518854,"lon":131.81659632507836},
    {"lat":35.721172006694296,"lon":130.9465206056198},
    {"lat":35.262290171262606,"lon":129.52549541458012},
  ];

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


  // Hubeny's distance with WGS84
  let distanceH84 = function (p1, p2) {
    var d2r = (deg) => deg * Math.PI / 180;

    var lat1 = d2r (p1.lat);
    var lat2 = d2r (p2.lat);

    var latDelta = lat1 - lat2;
    var lonDelta = Math.abs (d2r (p1.lon) - d2r (p2.lon));
    if (lonDelta > Math.PI) lonDelta = 2 * Math.PI - lonDelta;
    var latAvg = (lat1 + lat2) / 2;

    // WGS84
    var a = 6378137.000;
    var e2 = 0.00669437999019758; // e^2 = (a^2 - b^2) / a^2
    var a1e2 = 6335439.32729246; // a * (1 - e^2)

    var W2 = 1 - e2 * Math.pow (Math.sin (latAvg), 2);
    var W = Math.pow (W2, 0.5);
    var M = a1e2 / (W2 * W);
    var N = a / W;

    return Math.sqrt (Math.pow (latDelta * M, 2) +
                      Math.pow (lonDelta * N * Math.cos (latAvg), 2));
  }; // distanceH84

  let sphereDistance = function (p1, p2) {
    var d2r = (deg) => deg * Math.PI / 180;

    var lat1 = d2r (p1.lat);
    var lat2 = d2r (p2.lat);
    var avgLat = (lat1 - lat2) / 2;
    var avgLon = (d2r (p1.lon) - d2r (p2.lon)) / 2;

    return 2 * Math.asin (Math.sqrt (
      Math.pow (Math.sin (avgLat), 2) +
      Math.cos (lat1) * Math.cos (lat2) * Math.pow (Math.sin (avgLon), 2)
    )) * 6378137;
  }; // sphereDistance

  /* ------ Caches ------ */

  class LRU {
    constructor(limit = 2000) {
      this.limit = limit;
      this.map = new Map();
    }

    get(key) {
      if (!this.map.has(key)) {
        return undefined;
      }
      
      const value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }

    set(key, value) {
      if (this.map.has(key)) {
        this.map.delete(key);
        this.map.set(key, value);
        return;
      }

      if (this.map.size >= this.limit) {
        const oldestKey = this.map.keys().next().value;
        this.map.delete(oldestKey);
      }
      
      this.map.set(key, value);
    }
  }
  let cachedData = new LRU;

  /* ------ Tiles ------ */

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

  L.tileLayer.evenZoomOnly = function (url, opts) {
    return new L.TileLayer.EvenZoomOnly (url, opts);
  };
  L.TileLayer.EvenZoomOnly = L.TileLayer.extend ({
    initialize: function (url, options) {
      L.TileLayer.prototype.initialize.call (this, url, options);
    },
    
    createTile: function (coords, done) {
      let zoom = coords.z;
      if (zoom % 2 === 0 ||
          zoom < this.options.minNativeZoom ||
          zoom > this.options.maxNativeZoom) {
        return L.TileLayer.prototype.createTile.call (this, coords, done);
      }

      let tile = document.createElement ('canvas');
      tile.width = tile.height = 256;
      let ctx = tile.getContext ('2d');

      let nativeZ = zoom - 1;
      let scale = Math.pow (2, zoom - nativeZ);
      let nativeX = Math.floor (coords.x / scale);
      let nativeY = Math.floor (coords.y / scale);
      let offsetX = -(coords.x - nativeX * scale) * 256;
      let offsetY = -(coords.y - nativeY * scale) * 256;

      let urlOpts = {
        ...this.options,
        x: nativeX,
        y: nativeY,
        z: nativeZ,
      };
      let url = this._url.replace (/\{([^{}]+)\}/g, (_, x) => urlOpts[x]);

      let img = document.createElement ('img');
      new Promise ((ok, ng) => {
        img.crossOrigin = '';
        img.onload = ok;
        img.onerror = ng;
        img.src = url;
      }).then (() => {
        ctx.setTransform (scale, 0, 0, scale, offsetX, offsetY);
        ctx.drawImage (img, 0, 0);
        done (null, tile);
      }, ev => {
        done (ev, tile);
      });
      
      return tile;
    },
  });

  maplibregl.addProtocol ('paco-even', (params, signal) => {
    let cached = cachedData.get (params.url);
    if (cached) return cached;

    let z;
    let url1 = params.url.replace (/^[^:]+:\/\/([0-9]+)\//, (_, a) => {
      z = parseInt (a);
      return '';
    });
    if (z % 2 !== 0) {
      return Promise.reject (new Error ('No image'));
    }
    return new Promise ((ok, ng) => {
      let img = document.createElement ('img');
      img.crossOrigin = '';
      img.onload = () => ok (img);
      img.onerror = ng;
      img.src = url1;
    }).then (img => {
      let canvas = document.createElement ('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      let ctx = canvas.getContext ('2d');
      ctx.drawImage (img, 0, 0);

      let {data} = ctx.getImageData (0, 0, canvas.width, canvas.height);

      let isTransparent = true;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] !== 0) {
          isTransparent = false;
          break;
        }
      }

      return new Promise (ok => canvas.toBlob (ok));
    }).then (async blob => {
      let data = await blob.arrayBuffer ();
      cachedData.set (params.url, data);
      return {data};
    });
  });

  maplibregl.addProtocol ('paco-nontransparent', (params, signal) => {
    let cached = cachedData.get (params.url);
    if (cached) return cached;
    
    let url1 = params.url.replace (/^[^:]+:\/\/\//, '');
    return new Promise ((ok, ng) => {
      let img = document.createElement ('img');
      img.crossOrigin = '';
      img.onload = () => ok (img);
      img.onerror = ng;
      img.src = url1;
    }).then (img => {
      let canvas = document.createElement ('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      let ctx = canvas.getContext ('2d');
      ctx.drawImage (img, 0, 0);

      let {data} = ctx.getImageData (0, 0, canvas.width, canvas.height);

      let isTransparent = true;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] !== 0) {
          isTransparent = false;
          break;
        }
      }

      if (isTransparent) {
        throw new Error ('No data');
      } else {
        return new Promise (ok => canvas.toBlob (ok));
      }
    }).then (async blob => {
      let data = await blob.arrayBuffer ();
      cachedData.set (params.url, data);
      return {data};
    });
  });
  
  /* ------ GSI tiles and vector maps ------ */

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
        if (!this.options.errorTileUrl) throw err;
        
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

  {
    function lonLatToTilePixel(lon, lat, z) {
      const tileSize = 256;
      const scale = (1 << z) * tileSize;
      const x = (lon + 180) / 360;
      const sinLat = Math.sin(lat * Math.PI / 180);
      const y = 0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI);
      return { x: x * scale, y: y * scale };
    }
    let tileSize = 256;
    maplibregl.addProtocol ('paco-clipped', (params, signal) => {
      let cached = cachedData.get (params.url);
      if (cached) return cached;

      let [x, y, z, mode, url1] = params.url.replace (/^[^:]+:\/\/\//, '').split (/;/, 5);
      let color = "";
      mode = mode.replace (/,(\w+)$/, (_, c) => {
        color = '#' + c;
        return '';
      });
      return new Promise ((ok, ng) => {
        let img = document.createElement ('img');
        img.crossOrigin = '';
        img.onload = () => ok (img);
        img.onerror = ng;
        img.src = url1;
      }).then (img => {
        let canvas = document.createElement ('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        let ctx = canvas.getContext ('2d');
        
        const origin = { x: x * tileSize, y: y * tileSize };
        const polyPx = JPGSIMapBoundary.map(({ lat, lon }) => {
          const { x: px, y: py } = lonLatToTilePixel(lon, lat, z);
          return { x: px - origin.x, y: py - origin.y };
        });
        
        if (mode === 'all') {
          ctx.save();
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect (0, 0, tileSize, tileSize);
          }
          ctx.drawImage(img, 0, 0, tileSize, tileSize);
          ctx.restore();
        } else if (mode === 'jp') {
          ctx.save();
          ctx.beginPath();
          polyPx.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
          ctx.closePath();
          ctx.clip ();
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect (0, 0, tileSize, tileSize);
          }
          ctx.drawImage(img, 0, 0, tileSize, tileSize);
          ctx.restore();
        } else if (mode === 'nonjp') {
          ctx.save();
          ctx.beginPath();
          polyPx.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
          ctx.closePath();
          ctx.rect(0, 0, tileSize, tileSize);
          ctx.clip('evenodd');
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect (0, 0, tileSize, tileSize);
          }
          ctx.drawImage (img, 0, 0, tileSize, tileSize);
          ctx.restore();
        }

        return new Promise (ok => canvas.toBlob (ok));
      }).then (async blob => {
        let data = await blob.arrayBuffer ();
        cachedData.set (params.url, data);
        return {data};
      });
    });
  }

  L.GridLayer.gsiOptimalBvmap = opts => {
    let gl = L.maplibreGL ({
      ...opts,
      style: "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json",
    });

    gl.on ('add', () => {
      let glmap = gl.getMaplibreMap ();
      glmap.on ("load", () => {
        //let layers = glmap.getStyle ().layers;
        [
          'background',
          '\u884C\u653F\u533A\u753B', '\u6C34\u57DF', '\u5730\u5F62\u8868\u8A18\u9762',
          '\u5EFA\u7BC9\u72690', '\u5EFA\u7BC9\u72691', '\u5EFA\u7BC9\u72692', '\u5EFA\u7BC9\u72693', '\u5EFA\u7BC9\u72694',
        ].forEach (layerId => {
          glmap.setLayoutProperty (layerId, "visibility", 'none');
        });
        [
          '\u9053\u8DEF\u4E2D\u5FC3\u7DDA\u8272',
          '\u9053\u8DEF\u4E2D\u5FC3\u7DDA\u30AF\u30AF\u30EA',
          '\u9053\u8DEF\u4E2D\u5FC3\u7DDA\u8272\u6A4B',
          '\u9053\u8DEF\u4E2D\u5FC3\u7DDA\u30AF\u30AF\u30EA\u6A4B',
        ].forEach (layerId => {
          glmap.setPaintProperty (layerId + 0, "line-opacity", 0.3);
          glmap.setPaintProperty (layerId + 1, "line-opacity", 0.3);
          glmap.setPaintProperty (layerId + 2, "line-opacity", 0.3);
          glmap.setPaintProperty (layerId + 3, "line-opacity", 0.3);
          glmap.setPaintProperty (layerId + 4, "line-opacity", 0.3);
        });
        if (!opts.contour) {
          glmap.getStyle ().layers.forEach (layer => {
            // 等高線 等深線
            if (/\u7B49(?:\u9AD8|\u6DF1)\u7DDA/.test (layer.id)) {
              glmap.setLayoutProperty (layer.id, "visibility", 'none');
            }
          });
        }
      });
    });
    return gl;
  }; // L.GridLayer.gsiOptimalBvmap

  /* ------ Elevation data ------ */

  /*

    Elevations from GSI tiles.

    <https://maps.gsi.go.jp/development/ichiran.html#demgm>
    <https://maps.gsi.go.jp/development/demtile.html>
    <https://maps.gsi.go.jp/development/elevation.html>

    License of the reference implementation from which this code derived:

      『地理院地図｜標高を求めるプログラム』を加工して作成。

      出典: 『地理院地図｜標高を求めるプログラム』, Geospatial
      Information Authority of Japan,
      <https://maps.gsi.go.jp/development/elevation.html> (R7.9.17 閲覧)
      
      <https://maps.gsi.go.jp/help/termsofuse.html> ->
      <https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html> ->
      PDL1.0 <https://www.digital.go.jp/resources/open_data/public_data_license_v1.0>

  */
  L.GSIElevationLoader = L.Evented.extend ({
    initialize: function (map, options) {
      this._map = map;

      this._demUrlList = [
        {
          "title": "DEM1A",
          "url": "https://cyberjapandata.gsi.go.jp/xyz/dem1a_png/{z}/{x}/{y}.png",
          "minzoom": 17,
          "maxzoom": 17,
          "fixed": 1
        },
        {
          "title": "DEM5A",
          "url": "https://cyberjapandata.gsi.go.jp/xyz/dem5a_png/{z}/{x}/{y}.png",
          "minzoom": 15,
          "maxzoom": 15,
          "fixed": 1
        },
        {
          "title": "DEM5B",
          "url": "https://cyberjapandata.gsi.go.jp/xyz/dem5b_png/{z}/{x}/{y}.png",
          "minzoom": 15,
          "maxzoom": 15,
          "fixed": 1
        },
        {
          "title": "DEM5C",
          "url": "https://cyberjapandata.gsi.go.jp/xyz/dem5c_png/{z}/{x}/{y}.png",
          "minzoom": 15,
          "maxzoom": 15,
          "fixed": 1
        },
        {
          "title": "DEM10B",
          "url": "https://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png",
          "minzoom": 14,
          "maxzoom": 14,
          "fixed": 0
        },
        {
          "title": "DEMGM",
          "url": "https://cyberjapandata.gsi.go.jp/xyz/demgm_png/{z}/{x}/{y}.png",
          "minzoom": 8,
          "maxzoom": 8,
          "fixed": 0
        },
      ];
    
      this.pow2_8 = Math.pow(2, 8);
      this.pow2_16 = Math.pow(2, 16);
      this.pow2_23 = Math.pow(2, 23);
      this.pow2_24 = Math.pow(2, 24);
    },
    
    load: function (pos) {
      this._destroyImage();

      this._current = {
        pos: pos,
        urlList: this._makeUrlList(pos)
      }
      
      this._load(this._current);
    },

    _makeUrlList: function (pos) {
      var list = [];
      for (var i = 0; i < this._demUrlList.length; i++) {
        var demUrl = this._demUrlList[i];
        
        if (demUrl.maxzoom < demUrl.minzoom) {
          var buff = demUrl.maxzoom;
          demUrl.maxzoom = demUrl.minzoom;
          demUrl.minzoom = buff;
        }

        var minzoom = demUrl.minzoom;

        for (var z = demUrl.maxzoom; z >= minzoom; z--) {
          list.push({
            "title": demUrl.title,
            "zoom": z,
            "url": demUrl.url,
            "fixed": demUrl.fixed
          });
        }
        
      }
      return list;
    },

    _destroyImage: function () {
      if (this._img) {
        this._img.removeEventListener("load", this._imgLoadHandler);
        this._img.removeEventListener("error", this._imgLoadErrorHandler);
        
        this._imgLoadHandler = null;
        this._imgLoadErrorHandler = null;
        
        delete this._img;
        this._img = null;
      }
    },

    cancel: function () {
      this._destroyImage();
    },

    _load: function (current) {
      this._destroyImage();

      if (this._current != current) return;

      if (!this._current.urlList || this._current.urlList.length <= 0) {
        // not found
        this.fire("load", {
          h: undefined,
          pos: current.pos
        })
        return;
      }

      var url = this._current.urlList.shift();

      var tileInfo = this._getTileInfo(this._current.pos.lat, this._current.pos.lng, url.zoom);
      this._img = document.createElement("img");
      this._img.setAttribute("crossorigin", "anonymous");
      
      this._imgLoadHandler = L.bind(this._onImgLoad, this, url, current, tileInfo, this._img);
      this._imgLoadErrorHandler = L.bind(this._onImgLoadError, this, url, current, tileInfo, this._img);

      this._img.addEventListener("load", this._imgLoadHandler);
      this._img.addEventListener("error", this._imgLoadErrorHandler);

      function makeUrl(url, tileInfo) {
        var result = url.url.replace("{x}", tileInfo.x);
        result = result.replace("{y}", tileInfo.y);
        result = result.replace("{z}", url.zoom);
        return result;
      }

      this._img.src = makeUrl(url, tileInfo);
    },

    _onImgLoad: function (url, current, tileInfo, img) {
      if (current != this._current) return;

      if (!this._canvas) {
        this._canvas = document.createElement("canvas");
        this._canvas.width = 256;
        this._canvas.height = 256;
      }

      var ctx = this._canvas.getContext("2d", {willReadFrequently: true});
      ctx.drawImage(img, 0, 0);

      var imgData = ctx.getImageData(0, 0, 256, 256);
      var idx = (tileInfo.pY * 256 * 4) + (tileInfo.pX * 4);
      var r = imgData.data[idx + 0];
      var g = imgData.data[idx + 1];
      var b = imgData.data[idx + 2];
      var h = 0;

      if (r != 128 || g != 0 || b != 0) {
        var d = r * this.pow2_16 + g * this.pow2_8 + b;
        h = (d < this.pow2_23) ? d : d - this.pow2_24;
        if (h == -this.pow2_23) h = 0;
        else h *= 0.01;
        this._destroyImage();

        this.fire("load", {
          h: h,
          title: url.title,
          fixed: url.fixed,
          pos: current.pos
        })
      } else {
        this._onImgLoadError(url, current, tileInfo, img);
      }
    },

    _onImgLoadError: function (url, current, tileInfo, img) {
      if (current != this._current) return;
      this._load(current);
    },

    _getTileInfo: function (lat, lng, z) {
      var lng_rad = lng * Math.PI / 180;
      var R = 128 / Math.PI;
      var worldCoordX = R * (lng_rad + Math.PI);
      var pixelCoordX = worldCoordX * Math.pow(2, z);
      var tileCoordX = Math.floor(pixelCoordX / 256);

      var lat_rad = lat * Math.PI / 180;
      var worldCoordY = -R / 2 * Math.log((1 + Math.sin(lat_rad)) / (1 - Math.sin(lat_rad))) + 128;
      var pixelCoordY = worldCoordY * Math.pow(2, z);
      var tileCoordY = Math.floor(pixelCoordY / 256);

      return {
        x: tileCoordX,
        y: tileCoordY,
        pX: Math.floor(pixelCoordX - tileCoordX * 256),
        pY: Math.floor(pixelCoordY - tileCoordY * 256)
      };
    }
  }); // L.GSIElevationLoader

  let getElevation = console.pcMaps.getElevation = (lat, lon) => {
    return new Promise ((ok, ng) => {
      let loader = new L.GSIElevationLoader;
      loader.on ("load", (e) => { ok (e.h) }); // or undefined
      loader.on ('error', ng);
      loader.load ({ lat, lng: lon , zoom: 17 })
    });
  }; // getElevation


  {
    /*
      シームレス標高タイル, 産業技術総合研究所
      <https://gbank.gsj.jp/seamless/elev/>

      Original: <https://qiita.com/shi-works/items/2d712456ccc91320cd1d#maplibre-gl-js%E3%81%A8%E7%94%A3%E7%B7%8F%E7%A0%94-%E3%82%B7%E3%83%BC%E3%83%A0%E3%83%AC%E3%82%B9%E6%A8%99%E9%AB%98%E3%82%BF%E3%82%A4%E3%83%AB%E3%81%A73d%E5%9C%B0%E5%BD%A2%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B>
      > 変換モジュールは、現在はライセンスが設定されていませんが、オープンソース（Apache License 2.0）として公開していただけるとのことでしたので、それに準じていただければと思います。
      
    */
    
    // numPngProtocol.js, 2023-11-27　西岡 芳晴 ( NISHIOKA Yoshiharu )
    let protocol = 'numpng';
    let factor = 0.01;
    let invalidValue = -( 2 ** 23 );
    maplibregl.addProtocol (protocol, (params, signal) => {
      let cached = cachedData.get (params.url);
      if (cached) return cached;
      
      return new Promise ((ok, ng) => {
	let img = document.createElement ('img');
	img.crossOrigin = 'anonymous';
        img.onload = () => ok (img);
        img.onerror = ng;
        img.src = params.url.replace (protocol + '://', 'https://');
      }).then (img => {
	const canvas = document.createElement ('canvas');
	const ctx = canvas.getContext ('2d');
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	ctx.drawImage (img, 0, 0);
        
	const imageData = ctx.getImageData (0, 0, canvas.width, canvas.height);
	for ( let i = 0; i < imageData.data.length; i += 4 ) {
	  const [ r, g, b, a ] = imageData.data.slice( i, i + 4 );
	  const r2 = ( r < 128 ) ? r : r - 256;
	  const n = r2 * 65536 + g * 256 + b;
	  const height = ( n == invalidValue || a !== 255 ) ? 0 : factor * n;
	  const n2 = Math.max( ( height + 10000 ) * 10, 0 );
	  imageData.data.set( [ 0xff & n2 >> 16, 0xff & n2 >> 8, 0xff & n2, 255 ], i );
	}
	ctx.putImageData( imageData, 0, 0 );
	return new Promise (ok => canvas.toBlob (ok));
      }).then (async blob => {
        let data = await blob.arrayBuffer ();
        cachedData.set (params.url, data);
        return {data};
      });
    });
  }
  
  /* ------ HTML element-based controls ------ */
  
  L.Control.ElementControl = L.Control.extend ({
    onAdd: function (map) {
      var e = this.options.element;
      e.pcMap = map;
      if (this.options.isLegend) e.classList.toggle ('paco-legend-control', true);
      if (this.options.styling) this.options.styling (e);
      L.DomEvent.disableClickPropagation (e);
      ['change'].forEach (x => e.addEventListener (x, ev => ev.stopPropagation ()));
      return e;
    }, // onAdd
    onRemove: function (map) {
      let e = this.options.element;
      if (this.options.remove) this.options.remove (e, map);
    }, // onRemove
  });
  L.control.elementControl = function (opts) {
    return new L.Control.ElementControl (opts);
  };
  class MLElementControl {
    constructor (e, opts) {
      this.element = e;
      this.options = opts;
    };
    onAdd (map) {
      let e = this.element;
      e.pcMap = map;
      e.classList.toggle ('maplibregl-ctrl', true);
      if (this.options.isLegend) e.classList.toggle ('paco-legend-control', true);
      if (this.options.styling) this.options.styling (e);
      ['click', 'dblclick', 'mousedown', 'touchstart',
       'change'].forEach (x => e.addEventListener (x, ev => ev.stopPropagation ()));

      if (this.options.attribution) {
        map.getContainer ().pc_AddAttribution (this.options.attribution);
      }
      
      return e;
    };
    onRemove (map) {
      let e = this.element;
      if (this.options.remove) this.options.remove (e, map);
      map.getContainer ().pc_RemoveAttribution (this.options.attribution);
      e.remove ();
    };
  }; // MLElementControl
  function ElementControl (code) {
    let l = function (opts) {
      code (opts);
      return new L.Control.ElementControl (opts);
    };
    let ml = class extends MLElementControl {
      constructor (opts) {
        opts.mapLibre = true;
        code (opts);
        return super (opts.element, opts);
      };
    };
    return [l, ml];
  } // ElementControl
  
  let MLFullscreenButtonControl;
  [L.control.fullscreenButton, MLFullscreenButtonControl] = ElementControl ((opts) => {
    var c = document.createElement ('div');
    c.className = 'paco-button-container';
    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-fullscreen-title'), 'Fullscreen');
      c.title = m;
    };
    
    var b = document.createElement ('button');
    b.className = 'paco-control-button paco-fullscreen-control-button';
    b.type = 'button';
    b.textContent = '\u26F6';
    b.onclick = async () => {
      var e = c.pcMap.getContainer ();
      if (document.fullscreenElement) {
        document.exitFullscreen ();
      } else {
        e.requestFullscreen ();
      }
    };
    c.appendChild (b);
  }); // MLFullscreenButtonControl
  
  let MLCurrentPositionButtonControl;
  [L.control.currentPositionButton, MLCurrentPositionButtonControl] = ElementControl ((opts) => {
    var c = document.createElement ('div');
    c.className = 'paco-button-container';
    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-currentposition-title'), 'Current position');
      c.title = m;
    };
    
    var b = document.createElement ('button');
    b.className = 'paco-control-button paco-currentposition-control-button';
    b.type = 'button';
    b.textContent = '\u26EF';
    b.onclick = async () => {
      var e = c.pcMap.getContainer ();
      e.pcLocateCurrentPosition ({pan: true});
    };
    c.appendChild (b);
    
    return new L.Control.ElementControl (opts);
  }); // L.control.currentPositionButton
  
  let MLStreetViewButtonControl;
  [L.control.streetViewButton, MLStreetViewButtonControl] = ElementControl ((opts) => {
    var c = document.createElement ('div');
    c.className = 'paco-button-container';
    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-streetview-title'), 'Street View');
      c.title = m;
    };

    var b = document.createElement ('button');
    b.className = 'paco-control-button paco-streetview-control-button';
    b.type = 'button';
    b.textContent = '\u{1F6B6}';
    b.setAttribute ('draggable', 'true');
    b.ondragstart = () => {
      var e = c.pcMap.getContainer ();
      e.pcStartStreetViewDragMode (b);
    };
    c.appendChild (b);
  }); // MLStreetViewButtonControl

  let x;
  let MLPitchButtonControl;
  [x, MLPitchButtonControl] = ElementControl ((opts) => {
    var c = document.createElement ('div');
    c.className = 'paco-button-container paco-pitch-button-container';
    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-map-pitch'), 'Pitch');
      c.title = m;
    };

    let step = 5;
    {
      let b = document.createElement ('button');
      b.className = 'paco-control-button paco-pitch-control-button';
      b.type = 'button';
      b.textContent = '\u25B2';
      b.onclick = () => {
        let map = c.pcMap;
        let currentPitch = map.getPitch ();
        map.flyTo ({pitch: currentPitch - step});
      };
      c.appendChild (b);
    }
    {
      let b = document.createElement ('button');
      b.className = 'paco-control-button paco-pitch-control-button';
      b.type = 'button';
      b.textContent = '\u25BC';
      b.onclick = () => {
        let map = c.pcMap;
        let currentPitch = map.getPitch ();
        map.flyTo ({pitch: currentPitch + step});
      };
      c.appendChild (b);
    }
  }); // MLPitchButtonControl


  let MLMapTypeMenuControl;
  [L.control.mapTypeMenu, MLMapTypeMenuControl] = ElementControl ((opts) => {
    var c = document.createElement ('span');
    c.className = 'paco-menu-container';
    
    var m = document.createElement ('popup-menu');
    m.className = 'paco-map-type-menu';
    m.setAttribute ('menucontainer', 'map-area');
    m.innerHTML = '<button type=button class="paco-control-button paco-maptype-control-button">\u{1F5FA}</button><menu-main><menu-item><label><input type=checkbox class=paco-map-state-control value=coordinates> <span>Coordinates</span></label></menu-item><menu-item><label><input type=checkbox class=paco-map-state-control value=distance> <span>Distance</span></label></menu-item><menu-item><a data-href-template="https://www.google.com/maps?ll={lat},{lon}&z={zoomLevel}" target=_blank rel=noreferrer>Google Maps</a></menu-item><menu-item><a data-href-template="https://www.openstreetmap.org/?mlat={lat}&mlon={lon}&zoom={zoomLevel}" target=_blank rel=noreferrer>OpenStreetMap</a></menu-item><menu-item><a data-href-template="https://geohack.toolforge.org/geohack.php?params={lat};{lon}" target=_blank rel=noreferrer>Others...</a></menu-item></menu-main>';
    m.addEventListener ('toggle', ev => {
      if (m.hasAttribute ('open')) {
        var e = c.pcMap.getContainer ();
        e.pcInternal.$fill (c, {
          lat: e.maCenter.lat,
          lon: e.maCenter.lon,
          zoomLevel: e.pcZoomLevel,
        });
      }
    });
    m.addEventListener ('dblclick', ev => ev.stopPropagation ());
    c.appendChild (m);

    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      var m = c.querySelector ('popup-menu.paco-map-type-menu');
      
      // recompute!
      var s = getComputedStyle (e);
      m.firstChild.title = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-title'), 'Map type');
      var mi = m.querySelectorAll ('a');
      mi[0].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-googlemaps-text'), 'Open in Google Maps');
      mi[1].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-openstreetmap-text'), 'Open in OpenStreetMap');
      mi[2].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-geohack-text'), 'Open in others...');
      {
        let coords = m.querySelector ('input[value=coordinates]');
        coords.checked = !! e.pc_CoordinatesControl;
        coords.onclick = () => e.pc_ToggleCoordinatesControl (coords.checked);
        coords.nextElementSibling.textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-show-coordinates-text'), 'Show coordinates');
      }
      {
        let button = m.querySelector ('input[value=distance]');
        button.checked = !! e.pc_DistanceControl;
        button.onclick = () => e.pc_ToggleDistanceMode (button.checked);
        button.nextElementSibling.textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-show-distance-text'), 'Distance');
      }
      
      if (e.hasAttribute ('jma')) {
        var mm = m.querySelector ('menu-main');
        var nodes = document.createElement ('div');
        nodes.innerHTML = '<menu-item><label><input type=checkbox value=rain> <span data-x=jmanowc-current-text>Rain</span></label></menu-item><menu-item><popup-menu class=paco-jma-weather-submenu><button type=button class=paco-control-button><span data-x=menu-meteorological>Meteorological</span></button><menu-main><menu-item><label><input type=checkbox value=thns> <span data-x=jmanowc-thns-current-text>Thunder</span></label></menu-item><menu-item><label><input type=checkbox value=trns> <span data-x=jmanowc-trns-current-text>Tornado</span></label></menu-item><menu-item><label><input type=checkbox value=temp> <span data-x=jma-amedas-temp-text>Temperature</span></label></menu-item><menu-item><label><input type=checkbox value=wind> <span data-x=jma-amedas-wind-text>Wind</span></label></menu-item><menu-item><label><input type=checkbox value=precipitation10m> <span data-x=jma-amedas-precipitation10m-text>Precipitation 10m</span></label></menu-item><menu-item><label><input type=checkbox value=precipitation1h> <span data-x=jma-amedas-precipitation1h-text>Precipitation 1h</span></label></menu-item><menu-item><label><input type=checkbox value=precipitation3h> <span data-x=jma-amedas-precipitation3h-text>Precipitation 3h</span></label></menu-item><menu-item><label><input type=checkbox value=precipitation24h> <span data-x=jma-amedas-precipitation24h-text>Precipitation 24h</span></label></menu-item><menu-item><label><input type=checkbox value=snow> <span data-x=jma-amedas-snow-text>Snow</span></label></menu-item><menu-item><label><input type=checkbox value=snow6h> <span data-x=jma-amedas-snow6h-text>Snow 6h</span></label></menu-item><menu-item><label><input type=checkbox value=snow12h> <span data-x=jma-amedas-snow12h-text>Snow 12h</span></label></menu-item><menu-item><label><input type=checkbox value=snow24h> <span data-x=jma-amedas-snow24h-text>Snow 24h</span></label></menu-item><menu-item><label><input type=checkbox value=humidity> <span data-x=jma-amedas-humidity-text>Humidity</span></label></menu-item><menu-item><label><input type=checkbox value=sun1h> <span data-x=jma-amedas-sun1h-text>Sun 1h</span></label></menu-item></menu-main></popup-menu></menu-item><hr>';
        nodes.querySelectorAll ('input').forEach (i => {
          i.onchange = (ev) => e.toggleJMANowc (i.checked, i.value);
        });
        nodes.querySelectorAll ('span[data-x]').forEach (x => {
          x.textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-' + x.getAttribute ('data-x')), x.textContent);
        });
        Array.prototype.slice.call (nodes.childNodes).reverse ().forEach (_ => mm.insertBefore (_, mm.firstChild));
      } // jma=""

      let gsh = 'gsi-standard-hillshade';
      let gshFalse = 'gsi-lang';
      let gph = 'gsi-photo-optimal_bvmap'; // gsi-photo-standard
      let gphFalse = 'gsi-photo';
      let ghs = 'gsi-hillshade-optimal_bvmap-nocontour'; // 'gsi-hillshade-standard';
      let hig = 'himawari+gsi-optimal_bvmap'; // himawari+gsi-standard
      let osmTrue = 'osm-gsi-hillshade';
      let osmFalse = 'osm';
      if (opts.mapLibre) {
        gsh = 'gsi-optimal_bvmap-nocontour-hillshade';
        gshFalse = 'gsi-optimal_bvmap';
        gph = 'gsi-photo-optimal_bvmap-nocontour';
        osmTrue = 'osm-gsi-hillshade+gsi-optimal_bvmap-label';
      }
      if (e.hasAttribute ('gsi')) {
        var mm = m.querySelector ('menu-main');
        var nodes = document.createElement ('div');
        nodes.innerHTML = '<menu-item><popup-menu data-true='+gsh+' data-false='+gshFalse+'><button type=button class=paco-control-button>Map</button><menu-main class=paco-map-menu-main><menu-item><label><input type=checkbox> <span>Hillshade</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><popup-menu data-true='+gph+' data-false='+gphFalse+' data-label=photo><button type=button class=paco-control-button>Photo</button><menu-main class=paco-photo-menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><popup-menu data-true='+ghs+' data-false=gsi-hillshade><button type=button class=paco-control-button>Hillshade</button><menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><button type=button class=paco-maptype-button data-true=none>None</button></menu-item><hr>';
        let nb = nodes.querySelector ('menu-item:last-of-type button');
        let nps = [nodes.querySelector ('.paco-photo-menu-main')];
        let mps = [nodes.querySelector ('.paco-map-menu-main')];
        
        var pms = Array.prototype.slice.call (nodes.querySelectorAll ('popup-menu'));
        Array.prototype.slice.call (nodes.childNodes).reverse ().forEach (_ => mm.insertBefore (_, mm.firstChild));
        
        if (opts.buttons) {
          var n = document.createElement ('span');
          n.className = 'paco-menu-button-container';
          n.innerHTML = '<popup-menu data-true='+gsh+' data-false='+gshFalse+'><button type=button class=paco-control-button>Map</button><menu-main class=paco-map-menu-main><menu-item><label><input type=checkbox> <span>Hillshade</span></label></menu-item></menu-main></popup-menu><popup-menu data-true='+gph+' data-false='+gphFalse+' data-label=photo><button type=button class=paco-control-button>Photo</button><menu-main class=paco-photo-menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu><popup-menu data-true='+ghs+' data-false=gsi-hillshade><button type=button class=paco-control-button>Hillshade</button><menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu>';
          pms = pms.concat (Array.prototype.slice.call (n.querySelectorAll ('popup-menu')));

          c.insertBefore (n, c.firstChild);
          m.firstChild.textContent = '\u22EF';
          nps.push (n.querySelector ('.paco-photo-menu-main'));
          mps.push (n.querySelector ('.paco-map-menu-main'));
        } // controls=typebuttons

        var sMap = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-map-text'), 'Map');
        var sMapLabel = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-maplabel-text'), 'Labels');
        var sHillshade = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-hillshade-text'), 'Hillshade');
        var sNone = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-none-text'), 'None');
        var buttonLabels = {
          [gshFalse]: sMap,
          'photo': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-photo-text'), 'Photo'),
          [gphFalse]: e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-gsi-photo-text'), 'Photo'),
          'gsi-hillshade': sHillshade,
          [gsh]: sHillshade,
          [gph]: sMapLabel,
          [ghs]: sMapLabel,
          'himawari:B13/TBB': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-ir-text'), 'Himawari (B13/TBB)'),
          'himawari:B03/ALBD': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-vis-text'), 'Himawari (B03/ALBD)'),
          'himawari:B08/TBB': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-vap-text'), 'Himawari (B08/TBB)'),
          'himawari:REP/ETC': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-color-text'), 'Himawari (REP/ETC)'),
          'himawari:SND/ETC': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-strengthen-text'), 'Himawari (SND/ETC)'),
          'osm': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-osm-text'), 'OpenStreetMap'),
          'gsi': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-gsi-text'), 'GSI Tile'),
        };

        if (e.hasAttribute ('jma')) {
          nps.forEach (p => {
            let m = document.createElement ('menu-item');
            p.appendChild (m);
            m.outerHTML = '<menu-item><button type=button data-false='+gphFalse+' data-true='+gph+'>Photo</button></menu-item><menu-item><button type=button data-false=himawari:B13/TBB data-true='+hig+':B13/TBB>Himawari (B13/TBB)</button></menu-item><menu-item><button type=button data-false=himawari:B03/ALBD data-true='+hig+':B03/ALBD>Himawari (B03/ALBD)</button></menu-item><menu-item><button type=button data-false=himawari:B08/TBB data-true='+hig+':B08/TBB>Himawari (B08/TBB)</button></menu-item><menu-item><button type=button data-false=himawari:REP/ETC data-true='+hig+':REP/ETC>Himawari (REP/ETC)</button></menu-item><menu-item><button type=button data-false=himawari:SND/ETC data-true='+hig+':SND/ETC>Himawari (SND/ETC)</button></menu-item>';
          });
        }

        if (e.hasAttribute ('osm')) {
          mps.forEach (p => {
            let m = document.createElement ('menu-item');
            p.appendChild (m);
            m.outerHTML = '<menu-item><button type=button data-true='+gsh+' data-false='+gshFalse+' data-label=gsi></button></menu-item><menu-item><button type=button data-true='+osmTrue+' data-false='+osmFalse+' data-label=osm></button></menu-item>';
          });
        }

        pms.forEach (pm => {
          let buttons = pm.querySelectorAll ('button');
          buttons.forEach (button => {
            button.addEventListener ('click', function () {
              let checked = pm.querySelector ('input[type=checkbox]').checked;
              let newType = button.getAttribute ('data-' + checked) || pm.getAttribute ('data-' + checked);
              e.setMapType (newType);
            });
            button.textContent = buttonLabels[button.getAttribute ('data-label') || button.getAttribute ('data-false') || pm.getAttribute ('data-label') || pm.getAttribute ('data-false')];
          });
          pm.querySelector ('input[type=checkbox]').onclick = function () {
            let newType = (this.checked ? this.trueMapType : this.falseMapType) || pm.getAttribute ('data-' + this.checked);
            e.setMapType (newType);
          };
          pm.querySelector ('span').textContent = buttonLabels[pm.getAttribute ('data-true')];
        });

        nb.textContent = sNone;
        nb.onclick = () => {
          e.setMapType ('none');
        };
      } // gsi=""

      e.addEventListener ('pcMapTypeChange', () => {
        let mt = e.pcMapType;
        if (e.pcMapTypeParam1) mt += ":" + e.pcMapTypeParam1;
        c.querySelectorAll ('popup-menu[data-true], .paco-maptype-button[data-true]').forEach (pm => {
          let trueType = pm.getAttribute ('data-true');
          let falseType = pm.getAttribute ('data-false');
          let tt = mt === trueType;
          let ff = mt === falseType;
          let hasTrue = tt;
          pm.classList.toggle ('selected', tt || ff);
          pm.querySelectorAll ('button[data-true]').forEach (b => {
            let tType = b.getAttribute ('data-true');
            let fType = b.getAttribute ('data-false');
            let tt = mt === tType;
            let ff = mt === fType;
            b.classList.toggle ('selected', tt || ff);
            if (tt) hasTrue = true;
            if (tt || ff) {
              trueType = tType;
              falseType = fType;
            }
          });
          pm.querySelectorAll ('input[type=checkbox]').forEach (_ => {
            _.checked = hasTrue;
            _.trueMapType = trueType;
            _.falseMapType = falseType;
          });
        });
        e.pcInternal.$fill (c, {
          lat: e.maCenter.lat,
          lon: e.maCenter.lon,
          zoomLevel: e.pcZoomLevel,
        });
      });
    };
  }); // map type menu

  L.control.legendToggleButton = function (opts) {
    var c = document.createElement ('div');
    c.className = 'paco-button-container paco-legend-toggle-button-container';
    opts.element = c;
    
    var b = document.createElement ('button');
    b.className = 'paco-control-toggle-button paco-control-legend-toggle-button';
    b.type = 'button';
    c.appendChild (b);

    var active = true;
    var sync = () => {
      var e = c.pcMap.getContainer ();
      e.classList.toggle ('paco-legend-hidden', !active);

      b.classList.toggle ('active', active);
      if (active) {
        b.textContent = b.getAttribute ('data-hide-text');
      } else {
        b.textContent = b.getAttribute ('data-show-text');
      }
    }; // sync
    
    b.onclick = async () => {
      active = !active;
      sync ();
    };
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      var p = getComputedStyle (e);
      // recompute!
      var m1 = e.pcInternal.parseCSSString (p.getPropertyValue ('--paco-legend-show-text'), 'Show legend');
      var m2 = e.pcInternal.parseCSSString (p.getPropertyValue ('--paco-legend-hide-text'), 'Hide legend');
      var initial = (p.getPropertyValue ('--paco-map-legend-initial') || 'shown').replace (/^\s+/, '').replace (/\s+$/, '');

      if (initial === 'hidden') active = false;
      
      b.setAttribute ('data-show-text', m1);
      b.setAttribute ('data-hide-text', m2);
      sync ();
    };
    
    return new L.Control.ElementControl (opts);
  }; // L.control.legendToggleButton
  class MLLegendToggleButtonControl extends MLElementControl {
    constructor (opts) {
      let c = document.createElement ('div');
    c.className = 'paco-button-container paco-legend-toggle-button-container';
    opts.element = c;
    
    var b = document.createElement ('button');
    b.className = 'paco-control-toggle-button paco-control-legend-toggle-button';
    b.type = 'button';
    c.appendChild (b);

    var active = true;
    var sync = () => {
      var e = c.pcMap.getContainer ();
      e.classList.toggle ('paco-legend-hidden', !active);

      b.classList.toggle ('active', active);
      if (active) {
        b.textContent = b.getAttribute ('data-hide-text');
      } else {
        b.textContent = b.getAttribute ('data-show-text');
      }
    }; // sync
    
    b.onclick = async () => {
      active = !active;
      sync ();
    };
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      var p = getComputedStyle (e);
      // recompute!
      var m1 = e.pcInternal.parseCSSString (p.getPropertyValue ('--paco-legend-show-text'), 'Show legend');
      var m2 = e.pcInternal.parseCSSString (p.getPropertyValue ('--paco-legend-hide-text'), 'Hide legend');
      var initial = (p.getPropertyValue ('--paco-map-legend-initial') || 'shown').replace (/^\s+/, '').replace (/\s+$/, '');

      if (initial === 'hidden') active = false;
      
      b.setAttribute ('data-show-text', m1);
      b.setAttribute ('data-hide-text', m2);
      sync ();
    };
            
      return super (c, opts);
    };
  }; // MLLegendToggleButtonControl
  
  let MLTimestampControl;
  [L.control.timestampControl, MLTimestampControl] = ElementControl ((opts) => {
    var t = document.createElement ('map-controls');
    t.className = 'paco-timestamp-control paco-jma-timestamp-control';
    let type = {
      nowc: '<a href=https://www.jma.go.jp/bosai/nowc/ target=_blank rel=noreferrer>\u30CA\u30A6\u30AD\u30E3\u30B9\u30C8</a>',
      umimesh: '<a href=https://www.jma.go.jp/bosai/umimesh/ target=_blank rel=noreferrer>\u6D77\u4E0A\u5206\u5E03\u4E88\u5831</a>',
      himawari: '<a href=https://www.jma.go.jp/bosai/map.html#contents=himawari target=_blank rel=noreferrer>\u6C17\u8C61\u885B\u661F\u3072\u307E\u308F\u308A</a>',
      amedas: '<a href=https://www.jma.go.jp/bosai/map.html#contents=amedas target=_blank rel=noreferrer>\u30A2\u30E1\u30C0\u30B9</a>',
    }[opts.type];
    t.innerHTML = '<a href=https://www.jma.go.jp/ target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>'+type+'\u7B49 <time data-format=abstime></time> <span class=paco-jma-timestamp-control-base><time data-format=monthdaytime></time>\u57FA\u6E96</span>';
    opts.element = t;
    opts.styling = b => {
      var e = b.pcMap.getContainer ();
      var time = b.querySelector ('time');
      var tzo = e.getAttribute ('tzoffset');
      if (tzo) time.setAttribute ('data-tzoffset', tzo);
    };
    {
      let tel = t.querySelector ('time');
      let bc = t.querySelector ('.paco-jma-timestamp-control-base');
      let bctel = bc.querySelector ('time');
      opts.setTimeElementUpdater (time => {
        tel.textContent = time.prevHTML;
        tel.removeAttribute ('datetime');
        if (time.prevHTML !== time.baseHTML) {
          bc.hidden = false;
          bctel.textContent = time.baseHTML;
          bctel.removeAttribute ('datetime');
          bctel.setAttribute ('data-reftime', time.prevHTML);
        } else {
          bc.hidden = true;
        }
      });
    }
  }); // L.control.timestampControl
  
  let MLCoordinatesControl;
  [L.control.coordinatesControl, MLCoordinatesControl] = ElementControl ((opts) => {
    let t = document.createElement ('map-controls');
    t.className = 'paco-coordinates-control';
    opts.element = t;
    t.innerHTML = '<can-copy buttonclass="paco-control-button paco-coordnates-control-button"><output><unit-number type=lat data-field=lat></unit-number> <unit-number type=lon data-field=lon></unit-number> <unit-number type=elevation data-field=elevation></unit-number></output> <popup-menu class=paco-more-menu><button type=button class=paco-control-button>\u22EF</button><menu-main><menu-item><button type=button is=copy-button>Copy</button></menu-item><menu-item><a data-href-template=geo:{lat},{lon} is=copy-url>Copy</a></menu-main></popup-menu></can-copy>'; 
    let handler = (map, changes) => {
      let v;
      if (map.pc_ValueMarker && !map.pc_ValueMarker.none) {
        if (!changes.value) return;
        v = map.valueAsLatLon;
      } else {
        if (!changes.redraw) return;
        v = map.getMapCenter ();
      }
      map.pcInternal.$fill (t, v);
      getElevation (v.lat, v.lon).then (elevation => {
        v.elevation = elevation || 0;
        map.pcInternal.$fill (t, v);
      });
    };
    opts.attribution = gsiCreditHTML;
    opts.styling = b => {
      b.pcMap.pcAddCoordinatesSetter (handler);

      let e = b.pcMap.getContainer ();
      let s = getComputedStyle (e);
      // recompute!
      t.querySelectorAll ('button[is=copy-button]').forEach (b => {
        b.textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-copy-button-label'), 'Copy');
      });
      t.querySelectorAll ('a[is=copy-url]').forEach (b => {
        b.textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-copy-geourl-text'), 'Copy coordinates URL');
      });
    };
    opts.remove = (b, map) => {
      map.pcRemoveCoordinatesSetter (handler);
    };
  }); // L.control.coordinatesControl
  
  let MLDistanceControl;
  [L.control.distanceControl, MLDistanceControl] = ElementControl ((opts) => {
    let t = document.createElement ('map-controls');
    t.className = 'paco-distance-control';
    opts.element = t;
    t.innerHTML = '<button type=button is=paco-map-close-button class=paco-control-button>\u00D7</button> <can-copy buttonclass="paco-control-button paco-distance-control-button"><output><unit-number type=distance data-field=distance></unit-number> <unit-number type=elevation delta data-field=deltaElevation></unit-number></output> <popup-menu class=paco-more-menu><button type=button class=paco-control-button>\u22EF</button><menu-main><menu-item><button type=button is=copy-button>Copy</button></menu-item></popup-menu></can-copy>';
    let handler = (map) => {
      let pp = map.pc_DistancePoints || [];
      let d = 0;
      for (let i = 1; i < pp.length; i++) {
        d += distanceH84 (pp[i-1], pp[i]);
      }
      map.pcInternal.$fill (t, {distance: d, deltaElevation: 0});
      if (pp.length > 1) {
        Promise.all ([
          getElevation (pp.at (-1).lat, pp.at (-1).lon),
          getElevation (pp[0].lat, pp[0].lon),
        ]).then (([a, b]) => map.pcInternal.$fill (t, {
          distance: d, deltaElevation: (a||0) - (b||0),
        }));
      }
    }; // distanceHandler
    opts.styling = b => {
      b.pcMap.pcAddDistanceSetter (handler);
      
      let e = b.pcMap.getContainer ();
      let s = getComputedStyle (e);
      // recompute!
      t.querySelectorAll ('button[is=copy-button]').forEach (b => {
        b.textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-copy-button-label'), 'Copy');
      });
      t.querySelectorAll ('button[is=paco-map-close-button]').forEach (b => {
        b.onclick = () => e.pc_ToggleDistanceMode (false);
      });

      if (!e.pc_DistancePoints) {
        let points = [];
        let bb = e.getMapBounds ();
        let lat = (bb.north + bb.south) / 2;
        let w = Math.abs (bb.east - bb.west);
        points.push ({lat, lon: bb.west + w/4});
        points.push ({lat, lon: bb.west + w/4 + w/2});
        e.pc_DistancePoints = points;
        e.maRedraw ({distanceMarkers: true});
        handler (e);
      }
    };
    opts.remove = (b, map) => {
      map.pcRemoveDistanceSetter (handler);
      let e = map.getContainer ();
      e.maRedraw ({distanceMarkers: true, distanceLines: true});
    };
  }); // distance

  let JMAMaps = {
    hrpns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/hrpns/{z}/{x}/{y}.png',
      mapLibrePattern: 'paco-even://{z}/https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/hrpns/{z}/{x}/{y}.png',
      evenZoomOnly: true,
      nextDelta: 5,
      currentDelta: 5,
      nowDelta: 2,
      maxNativeZoom: 10,
      opacity: 0.8,
      zooms: [],
    },
    thns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/thns/{z}/{x}/{y}.png',
      mapLibrePattern: 'paco-even://{z}/https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/thns/{z}/{x}/{y}.png',
      evenZoomOnly: true,
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 5,
      maxNativeZoom: 8, // was 9
      opacity: 0.5,
      zooms: [],
    },
    trns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/trns/{z}/{x}/{y}.png',
      mapLibrePattern: 'paco-even://{z}/https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/trns/{z}/{x}/{y}.png',
      evenZoomOnly: true,
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 5,
      maxNativeZoom: 8, // was 9
      opacity: 0.5,
      zooms: [],
    },
    rasrf: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/rasrf/{urlTimestamp0}/none/{urlTimestamp}/surf/rasrf/{z}/{x}/{y}.png',
      isRasrf: true,
      nextDelta: 60,
      currentDelta: 60,
      nowDelta: 5,
      maxNativeZoom: 9,
      opacity: 0.5,
      zooms: [],
    },
    rasrfimmed: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/rasrf/{urlTimestamp0}/immed/{urlTimestamp}/surf/rasrf/{z}/{x}/{y}.png',
      isRasrf: true,
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 5,
      maxNativeZoom: 9,
      opacity: 0.5,
      zooms: [],
    },
    himawari: {
      // https://www.jma.go.jp/bosai/himawari/data/satimg/20240902070000/jp/20240902070000/B13/TBB/6/57/24.jpg
      pattern: 'https://www.jma.go.jp/bosai/himawari/data/satimg/{urlTimestamp}/jp/{urlTimestamp}/{param1}/{z}/{x}/{y}.jpg',
      params: "B13/TBB", // B13/TBB B03/ALBD B08/TBB REP/ETC SND/ETC
      nextDelta: 2.5,
      currentDelta: 2.5,
      nowDelta: 11, // 17:00 -> 17:03, 17:03:30 -> 17:13, 17:07:30 -> 17:13
      noFuture: true,
      minNativeZoom: 3, // 6,
      maxNativeZoom: 6,
      opacity: 1,
      zooms: [],
      jmaLinkType: 'himawari',
      mapLibreBackground: true,
    },
    umimeshwind: {
      // https://www.jma.go.jp/bosai/umimesh/#lat:36.341678/lon:136.842957/zoom:8/colordepth:deep/elements:wind
      // https://www.jma.go.jp/bosai/jmatile/data/umimesh/20240904000000/none/20240904060000/surf/ws/8/223/100.png
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/umimesh/{urlTimestamp0}/none/{urlTimestamp}/surf/ws/{z}/{x}/{y}.png',
      nextDelta: 60*6,
      currentDelta: 60*6,
      now0Delta: 60*3+5,
      nowDelta: 0,
      noCurrent: true,
      minNativeZoom: 4,
      maxNativeZoom: 8,
      opacity: 1,
      zooms: [],
      isUmiWind: true,
      jmaLinkType: 'umimesh',
    },
    umimeshwinddir: {
      //https://www.jma.go.jp/bosai/jmatile/data/umimesh/20240904000000/none/20240904060000/surf/wd/data.geojson?id=wd
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/umimesh/{urlTimestamp0}/none/{urlTimestamp}/surf/wd/data.geojson?id=wd',
      nextDelta: 60*6,
      currentDelta: 60*6,
      now0Delta: 60*3+5,
      nowDelta: 0,
      noCurrent: true,
      minNativeZoom: 4,
      maxNativeZoom: 8,
      opacity: 1,
      zooms: [],
      isGeoJSON: true,
      jmaLinkType: 'umimesh',
    },
    amedas: {
      // https://www.jma.go.jp/bosai/amedas/data/map/20240905145000.json
      pattern: 'https://www.jma.go.jp/bosai/amedas/data/map/{urlTimestamp}.json',
      params: 'temp', // precipitation10m precipitation1h precipitation3h precipitation24h wind windDirection temp sun1h snow snow6h snow12h snow24h humidity 
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 20, // :57 -> :40 :59 -> :50
      constDelta: 9*60,
      noFuture: true,
      //minNativeZoom: 4,
      //maxNativeZoom: 8,
      opacity: 1,
      zooms: [],
      isGeoJSON: true,
      jmaLinkType: 'amedas',
    },
  }; // JMAMaps

  JMAMaps.himawari.zooms[6] = JMAMaps.himawari;
  JMAMaps.himawari.zooms[3] = 
  JMAMaps.himawari.zooms[4] = 
  JMAMaps.himawari.zooms[5] = {
    pattern: 'https://www.jma.go.jp/bosai/himawari/data/satimg/{urlTimestamp}/fd/{urlTimestamp}/{param1}/{z}/{x}/{y}.jpg',
    params: "B13/TBB", // B13/TBB B03/ALBD B08/TBB REP/ETC SND/ETC
    nextDelta: 10,
    currentDelta: 10,
    nowDelta: 11,
    noFuture: true,
    minNativeZoom: 3,
    maxNativeZoom: 5,
    opacity: 1,
    zooms: [],
    jmaLinkType: 'himawari',
  };

  {
    let p;
    function getAmedasTable () {
      return p = p || fetch ('https://www.jma.go.jp/bosai/amedas/const/amedastable.json', {
        referrerPolicy: 'no-referrer',
      }).then (res => {
        if (res.status !== 200) throw res;
        return res.json ();
      }).catch (e => {
        p = null;
        throw e;
      });
    }
  }
  
  L.tileLayer.jma = function (opts) {
    // https://www.jma.go.jp/bosai/jmatile/data/map/none/none/none/surf/mask/8/222/99.png
    // https://www.jma.go.jp/bosai/jmatile/data/nowc/20221226045500/none/20221226045500/surf/hrpns/8/223/101.png
    // https://www.jma.go.jp/bosai/jmatile/data/map/none/none/none/surf/mask/9/452/201.png
    // https://www.jma.go.jp/bosai/jmatile/data/nowc/20221226051000/none/20221226051000/surf/thns/8/227/100.png
    // https://www.jma.go.jp/bosai/jmatile/data/nowc/20221226051000/none/20221226051000/surf/trns/6/57/24.png
    // https://www.jma.go.jp/bosai/jmatile/data/rasrf/20221227020000/none/20221227110000/surf/rasrf/10/909/389.png
    // https://www.jma.go.jp/bosai/jmatile/data/rasrf/20221227020000/immed/20221227050000/surf/rasrf/8/226/98.png
    // https://www.jma.go.jp/bosai/jmatile/data/rasrf/20221227021000/immed/20221227051000/surf/rasrf/8/226/98.png
    var type = opts.type || 'rain'; // rain thns trns [hrpns rasrf rasrfimmed]
    var mapDef = type === 'rain' ? JMAMaps.hrpns : JMAMaps[type];
    if (!mapDef) throw new Error ("Bad type |"+type+"|");
    
    let currentZ = null;
    var explicitTime;
    var getTime = () => {
      let md = mapDef;
      md = md.zooms[currentZ] || md;
      var realNow = (new Date).valueOf ();
      let now = realNow - md.nowDelta*60*1000;
      var cur;
      var urlTimestamp0 = null;
      if (explicitTime) {
        if (now < explicitTime) {
          if (type === 'rain') {
            if (now + 6*60*60*1000 <= explicitTime) {
              md = JMAMaps.rasrf;
            } else if (now + 1*60*60*1000 <= explicitTime) {
              md = JMAMaps.rasrfimmed;
            }
          }
          if (!md.noFuture) {
            cur = md.currentDelta * 60*1000;
            now = explicitTime;
          }
        } else {
          now = explicitTime;
        }
      }
      var nextDelta = md.nextDelta;
      var prev = Math.floor (now / (nextDelta*60*1000)) * nextDelta*60*1000;
      var next = prev + nextDelta*60*1000;
      var delta = next - now;
          // next + 100*1000 - realNow
          // = next + 100*1000 - (now + 100*1000)
      if (delta < 60*1000) delta = 60*1000;
      let prevHTML = new Date (prev).toISOString ();
      let prevFormatted = prevHTML
          .replace (/(?:\.[0-9]+|)Z$/, '').replace (/[-:T]/g, '');
      if (md.constDelta) {
        prevFormatted = new Date (prev + md.constDelta*60*1000).toISOString ()
            .replace (/(?:\.[0-9]+|)Z$/, '').replace (/[-:T]/g, '');
      }
      if (md.noCurrent) cur = md.currentDelta * 60*1000;
      let baseHTML;
      if (cur) {
        let ct = Math.floor (realNow / cur) * cur;
        if (md.noCurrent) {
          let now0 = realNow - md.now0Delta*60*1000;
          ct = Math.floor (now0 / cur) * cur;
          while (prev <= ct) ct -= nextDelta*60*1000;
        }
        if (md.isRasrf) {
          var f = 60*60*1000;
          var x = (prev - ct) % f;
          ct -= f - x;
        }
        baseHTML = new Date (ct).toISOString ();
        urlTimestamp0 = baseHTML
            .replace (/(?:\.[0-9]+|)Z$/, '').replace (/[-:T]/g, '');
      }
      return {realNow, prev, prevFormatted, prevHTML, next, delta,
              urlTimestamp0: urlTimestamp0 || prevFormatted,
              baseHTML: baseHTML || prevHTML,
              mapDef: md};
    }; // getTime
    
    var time = getTime ();
    let layer;
    let refetch = () => {};
    let needUpdate = false;
    if (mapDef.isGeoJSON) {
      needUpdate = true;
      let mapper = (_, __) => _;
      let dataType = 'direction';
      let propKey = 'value';
      let inKey = 'value';
      if (mapDef.jmaLinkType === 'amedas') {
        inKey = opts.param1 || mapDef.param1;
        mapper = (json, amedas) => {
          let features = [];
          Object.keys (json).forEach (aKey => {
            let w = json[aKey];
            let v = w[inKey];
            if (v && v[1] == 0) {
              let a = amedas[aKey] || {lat: [], lon: []};
              features.push ({
                type: 'Feature',
                properties: {
                  value: v[0],
                  wind: (w.wind || [])[0], // Leaflet, MapLibre
                  windDirection: (w.windDirection || [])[0], // MapLibre
                },
                geometry: {
                  type: 'Point',
                  coordinates: [
                    a.lon[0] + a.lon[1] / 60,
                    a.lat[0] + a.lat[1] / 60,
                  ],
                },
              });
            }
          });
          return {type: "FeatureCollection", features};
        };
        dataType = inKey || 'value';
      } else {
        propKey = 'windDir';
      }
      let pointToLayer;
      let toTextColor;
      if (dataType === 'direction' || dataType === 'windDirection') {
        pointToLayer = function (feature, latlng) {
          let wd = feature.properties[propKey];
          let value = feature.properties.wind;
          let color = Math.floor (value / 5) * 5;
          let html = {
            // amedas
            0: '&#x2193;', // north
            1: '<div style="transform: rotate(22.5deg);">&#x2193;</div>',
            2: '&#x2199;',
            3: '<div style="transform: rotate(67.5deg);">&#x2193;</div>',
            4: '&#x2190;', // east
            5: '<div style="transform: rotate(112.5deg);">&#x2193;</div>',
            6: '&#x2196;',
            7: '<div style="transform: rotate(157.5deg);">&#x2193;</div>',
            8: '&#x2191;', // south
            9: '<div style="transform: rotate(202.5deg);">&#x2193;</div>',
            10: '&#x2197;',
            11: '<div style="transform: rotate(247.5deg);">&#x2193;</div>',
            12: '&#x2192;', // west
            13: '<div style="transform: rotate(292.5deg);">&#x2193;</div>',
            14: '&#x2198;',
            15: '<div style="transform: rotate(337.5deg);">&#x2193;</div>',
            16: '&#x2193;',
            
            // umimesh
            S: '&#x2191;',
            SW: '&#x2197;',
            W: '&#x2192;',
            NW: '&#x2198;',
            N: '&#x2193;',
            NE: '&#x2199;',
            E: '&#x2190;',
            SE: '&#x2196;',
          }[wd];
          let icon = L.divIcon ({
            html: '<data>' + html + '</data>',
            className: 'paco-map-value-' + dataType + ' paco-map-value-key-' + inKey + ' paco-map-value-wind-' + color,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
          return L.marker (latlng, {icon});
        };
      } else {
        let sub = {
          temp: 1,
          precipitation10m: 0,
          precipitation1h: 0,
          precipitation3h: 0,
          precipitation24h: 0,
          wind: 0,
          humidity: 0,
          sun1h: 1,
          snow: 0,
          snow6h: 0,
          snow12h: 0,
          snow24h: 0,
        }[dataType];
        let toColor = {
          temp: _ => Math.floor (_ / 5) * 5,
          wind: _ => Math.floor (_ / 5) * 5,
          humidity: _ => Math.floor (_ / 10) * 10,
          sun1h: _ => Math.floor (_ * 10 / 2) * 2 / 10,
          precipitation10m: _ => {
            return _ >= 30 ? 30 : _ >= 20 ? 20 : _ >= 15 ? 15 :
              _ >= 10 ? 10 : _ >= 5 ? 5 : _ >= 3 ? 3 : _ >= 1 ? 1 : 0;
          },
          precipitation1h: _ => {
            return _ >= 80 ? 80 : _ >= 50 ? 50 : _ >= 30 ? 30 :
              _ >= 20 ? 20 : _ >= 10 ? 10 : _ >= 5 ? 5 : _ >= 1 ? 1 : 0;
          },
          precipitation3h: _ => {
            return _ >= 150 ? 150 : _ >= 120 ? 120 : _ >= 100 ? 100 :
              _ >= 80 ? 80 : _ >= 60 ? 60 : _ >= 40 ? 40 : _ >= 20 ? 20 : 0;
          },
          precipitation24h: _ => {
            return _ >= 300 ? 300 : _ >= 250 ? 250 : _ >= 200 ? 200 :
              _ >= 150 ? 150 : _ >= 100 ? 100 : _ >= 80 ? 80 : _ >= 50 ? 50 : 0;
          },
          snow: _ => {
            return _ >= 200 ? 200 : _ >= 150 ? 150 : _ >= 100 ? 100 :
              _ >= 50 ? 50 : _ >= 20 ? 20 : _ >= 5 ? 5 : _ >= 1 ? 1 : 0;
          },
          snow6h: _ => {
            return _ >= 50 ? 50 : _ >= 30 ? 30 : _ >= 20 ? 20 :
              _ >= 15 ? 15 : _ >= 10 ? 10 : _ >= 5 ? 5 : _ >= 1 ? 1 : 0;
          },
          snow12h: _ => {
            return _ >= 70 ? 70 : _ >= 50 ? 50 : _ >= 30 ? 30 :
              _ >= 20 ? 20 : _ >= 10 ? 10 : _ >= 5 ? 5 : _ >= 1 ? 1 : 0;
          },
          snow24h: _ => {
            return _ >= 100 ? 100 : _ >= 70 ? 70 : _ >= 50 ? 50 :
              _ >= 30 ? 30 : _ >= 20 ? 20 : _ >= 10 ? 10 : _ >= 1 ? 1 : 0;
          },
          sun1h: _ => {
            return _ >= 1 ? 1 : _ >= 0.8 ? 0.8 : _ >= 0.6 ? 0.6 :
              _ >= 0.4 ? 0.4 : _ >= 0.2 ? 0.2 : 0;
          },
        }[dataType];
        pointToLayer = function (feature, latlng) {
          let value = feature.properties[propKey];
          let div = document.createElement ('div');
          div.innerHTML = '<data></data>';
          div.firstChild.textContent = value.toFixed (sub);
          div.firstChild.className = 'paco-map-value-' + dataType + '-' + toColor (value);
          let icon = L.divIcon ({
            html: div.innerHTML,
            className: 'paco-map-value-value paco-map-value-key-' + inKey,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
          return L.marker (latlng, {icon});
        };
        toTextColor = {
          temp: [
            "case",
            [">=", ["get", propKey], 35], 'rgb(180, 0, 104)',
            [">=", ["get", propKey], 30], 'rgb(255, 40, 0)',
            [">=", ["get", propKey], 25], 'rgb(255, 153, 0)',
            [">=", ["get", propKey], 20], 'rgb(250, 245, 0)',
            [">=", ["get", propKey], 15], 'rgb(255, 255, 150)',
            [">=", ["get", propKey], 10], 'rgb(255, 255, 240)',
            [">=", ["get", propKey],  5], 'rgb(185, 235, 255)',
            [">=", ["get", propKey],  0], 'rgb(0, 150, 255)',
            [">=", ["get", propKey], -5], 'rgb(0, 65, 255)',
            [">=", ["get", propKey],-10], 'rgb(0, 32, 128)',
            'black',
          ],
          humidity: [
            "case",
            [">=", ["get", propKey], 100], 'rgb(1, 31, 125)',
            [">=", ["get", propKey],  90], 'rgb(0, 75, 150)',
            [">=", ["get", propKey],  80], 'rgb(0, 114, 154)',
            [">=", ["get", propKey],  70], 'rgb(31, 194, 211)',
            [">=", ["get", propKey],  60], 'rgb(128, 248, 231)',
            [">=", ["get", propKey],  50], 'rgb(255, 255, 240)',
            [">=", ["get", propKey],  40], 'rgb(255, 200, 70)',
            [">=", ["get", propKey],  30], 'rgb(231, 135, 7)',
            [">=", ["get", propKey],  20], 'rgb(171, 74, 1)',
            [">=", ["get", propKey],  10], 'rgb(118, 17, 0)',
            [">=", ["get", propKey],   0], 'rgb(84, 6, 0)',
            'black',
          ],
          sun1h: [
            "case",
            [">=", ["get", propKey], 1  ], 'rgb(180, 0, 104)',
            [">=", ["get", propKey], 0.8], 'rgb(255, 40, 0)',
            [">=", ["get", propKey], 0.6], 'rgb(255, 153, 0)',
            [">=", ["get", propKey], 0.4], 'rgb(250, 245, 0)',
            [">=", ["get", propKey], 0.2], 'rgb(185, 235, 255)',
            [">=", ["get", propKey],   0], 'rgb(0, 65, 255)',
            'black',
          ],
          precipitation10m: [
            "case",
            [">=", ["get", propKey],  30], 'rgb(180, 0, 104)',
            [">=", ["get", propKey],  20], 'rgb(255, 40, 0)',
            [">=", ["get", propKey],  15], 'rgb(255, 153, 0)',
            [">=", ["get", propKey],  10], 'rgb(250, 245, 0)',
            [">=", ["get", propKey],   5], 'rgb(0, 65, 255)',
            [">=", ["get", propKey],   3], 'rgb(33, 140, 255)',
            [">=", ["get", propKey],   1], 'rgb(160, 210, 255)',
            [">=", ["get", propKey],   0], 'rgb(242, 242, 255)',
            'black',
          ],
          precipitation1h: [
            "case",
            [">=", ["get", propKey],  80], 'rgb(180, 0, 104)',
            [">=", ["get", propKey],  50], 'rgb(255, 40, 0)',
            [">=", ["get", propKey],  30], 'rgb(255, 153, 0)',
            [">=", ["get", propKey],  20], 'rgb(250, 245, 0)',
            [">=", ["get", propKey],  10], 'rgb(0, 65, 255)',
            [">=", ["get", propKey],   5], 'rgb(33, 140, 255)',
            [">=", ["get", propKey],   1], 'rgb(160, 210, 255)',
            [">=", ["get", propKey],   0], 'rgb(242, 242, 255)',
            'black',
          ],
          precipitation3h: [
            "case",
            [">=", ["get", propKey], 150], 'rgb(180, 0, 104)',
            [">=", ["get", propKey], 120], 'rgb(255, 40, 0)',
            [">=", ["get", propKey], 100], 'rgb(255, 153, 0)',
            [">=", ["get", propKey],  80], 'rgb(250, 245, 0)',
            [">=", ["get", propKey],  60], 'rgb(0, 65, 255)',
            [">=", ["get", propKey],  40], 'rgb(33, 140, 255)',
            [">=", ["get", propKey],  20], 'rgb(160, 210, 255)',
            [">=", ["get", propKey],   0], 'rgb(242, 242, 255)',
            'black',
          ],
          precipitation24h: [
            "case",
            [">=", ["get", propKey], 300], 'rgb(180, 0, 104)',
            [">=", ["get", propKey], 250], 'rgb(255, 40, 0)',
            [">=", ["get", propKey], 200], 'rgb(255, 153, 0)',
            [">=", ["get", propKey], 150], 'rgb(250, 245, 0)',
            [">=", ["get", propKey], 100], 'rgb(0, 65, 255)',
            [">=", ["get", propKey],  80], 'rgb(33, 140, 255)',
            [">=", ["get", propKey],  50], 'rgb(160, 210, 255)',
            [">=", ["get", propKey],   0], 'rgb(242, 242, 255)',
            'black',
          ],
          snow: [
            "case",
            [">=", ["get", propKey], 200], 'rgb(180, 0, 104)',
            [">=", ["get", propKey], 150], 'rgb(255, 40, 0)',
            [">=", ["get", propKey], 100], 'rgb(255, 153, 0)',
            [">=", ["get", propKey],  50], 'rgb(250, 245, 0)',
            [">=", ["get", propKey],  20], 'rgb(0, 65, 255)',
            [">=", ["get", propKey],   5], 'rgb(33, 140, 255)',
            [">=", ["get", propKey],   1], 'rgb(160, 210, 255)',
            [">=", ["get", propKey],   0], 'rgb(242, 242, 255)',
            'black',
          ],
          snow6h: [
            "case",
            [">=", ["get", propKey], 50], 'rgb(180, 0, 104)',
            [">=", ["get", propKey], 30], 'rgb(255, 40, 0)',
            [">=", ["get", propKey], 20], 'rgb(255, 153, 0)',
            [">=", ["get", propKey], 15], 'rgb(250, 245, 0)',
            [">=", ["get", propKey], 10], 'rgb(0, 65, 255)',
            [">=", ["get", propKey],  5], 'rgb(33, 140, 255)',
            [">=", ["get", propKey],  1], 'rgb(160, 210, 255)',
            [">=", ["get", propKey],  0], 'rgb(242, 242, 255)',
            'black',
          ],
          snow12h: [
            "case",
            [">=", ["get", propKey], 70], 'rgb(180, 0, 104)',
            [">=", ["get", propKey], 50], 'rgb(255, 40, 0)',
            [">=", ["get", propKey], 30], 'rgb(255, 153, 0)',
            [">=", ["get", propKey], 20], 'rgb(250, 245, 0)',
            [">=", ["get", propKey], 10], 'rgb(0, 65, 255)',
            [">=", ["get", propKey],  5], 'rgb(33, 140, 255)',
            [">=", ["get", propKey],  1], 'rgb(160, 210, 255)',
            [">=", ["get", propKey],  0], 'rgb(242, 242, 255)',
            'black',
          ],
          snow24h: [
            "case",
            [">=", ["get", propKey],100], 'rgb(180, 0, 104)',
            [">=", ["get", propKey], 70], 'rgb(255, 40, 0)',
            [">=", ["get", propKey], 50], 'rgb(255, 153, 0)',
            [">=", ["get", propKey], 30], 'rgb(250, 245, 0)',
            [">=", ["get", propKey], 20], 'rgb(0, 65, 255)',
            [">=", ["get", propKey], 10], 'rgb(33, 140, 255)',
            [">=", ["get", propKey],  1], 'rgb(160, 210, 255)',
            [">=", ["get", propKey],  0], 'rgb(242, 242, 255)',
            'black',
          ],
          wind: [
            "case",
            [">=", ["get", "wind"], 25], 'rgb(180, 0, 104)',
            [">=", ["get", "wind"], 20], 'rgb(255, 40, 0)',
            [">=", ["get", "wind"], 15], 'rgb(255, 153, 0)',
            [">=", ["get", "wind"], 10], 'rgb(250, 245, 0)',
            [">=", ["get", "wind"],  5], 'rgb(0, 65, 255)',
            [">=", ["get", "wind"],  0], 'rgb(242, 242, 255)',
            'black',
          ],
        }[dataType];
      }
      if (opts.mapLibre) {
        layer = {
          sourceId: opts.type + '-' + opts.param1,
          source: {
            type: 'geojson',
            data: {type: "FeatureCollection", features: []},
            attribution: '<a href=https://www.jma.go.jp/jma/kishou/info/coment.html target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>',
          },
          layers: [{
            layerId: opts.type + '-' + opts.param1,
            layer: {
              id: opts.type + '-' + opts.param1,
              source: opts.type + '-' + opts.param1,
              type: "circle",
              layout: {
              },
              paint: {
                "circle-radius": ((dataType === 'wind' || dataType === 'direction') ? 16 : 20),
                "circle-color": "gray",
                //"circle-stroke-color": "black",
                //"circle-stroke-width": 1,
                "circle-opacity": 0.4,
              },
              //filter: ['==', ['geometry-type'], 'Point'],
            },
          }, {
            layerId: opts.type + '-' + opts.param1 + '-text',
            layer: {
              id: opts.type + '-' + opts.param1 + '-text',
              source: opts.type + '-' + opts.param1,
              type: "symbol",
              layout: {
                'text-font': ['NotoSansJP-Regular'],
                'text-field': ["get", propKey],
                'text-size': 16,
                'text-offset': [0, 0],
                'text-anchor': 'center',
                'text-allow-overlap': true,
                'text-rotation-alignment': 'viewport',
                //'text-rotation-alignment': 'map',
              },
              paint: {
                'text-color': ((dataType === 'wind' || dataType === 'direction') ? 'white' : toTextColor),
                'text-halo-color': 'white',
                'text-halo-width': 2,
              },
            },
          }],
        };
        if (dataType === 'direction' || dataType === 'wind') {
          layer.layers.splice (0, (dataType === 'direction' ? 2 : 0), {
            layerId: opts.type + '-' + opts.param1 + '-dir',
            layer: {
              id: opts.type + '-' + opts.param1 + '-dir',
              source: opts.type + '-' + opts.param1,
              type: "symbol",
              layout: {
                'text-font': ['NotoSansJP-Regular'],
                'text-field': "\u2B06",
                'text-size': 64,
                'text-offset': [0, -0.1],
                'text-anchor': 'center',
                'text-allow-overlap': true,
                'text-rotation-alignment': 'map',
                'text-rotate': (dataType === 'wind' ? [
                  'match',
                  ['get', 'windDirection'],
                  0, 0, 1, 22.5, 2, 45, 3, 67.5,
                  4, 90, 5, 112.5, 6, 135, 7, 157.5,
                  8, 180, 9, 202.5, 10, 225, 11, 247.5,
                  12, 270, 13, 292.5, 14, 315, 15, 337.5,
                  16, 0,
                  0,
                ] : [
                  'match',
                  ['get', 'windDir'],
                  'N', 0, 'NE', 45, 'E', 90, 'SE', 135,
                  'S', 180, 'SW', 225, 'W', 270, 'NW', 315,
                  0,
                ]),
              },
              paint: {
                'text-color': (dataType === 'direction' ? 'black' : toTextColor),
                'text-halo-color': 'white',
                'text-halo-color': 'rgba(0,0,0,0.5)',
                'text-halo-width': 1,
              },
            },
          });
        }
      } else {
        layer = L.geoJSON ({type: "FeatureCollection", features: []}, {
          pointToLayer,
        });
      }
      let prevU = null;
      refetch = (map, time, mapLayer) => {
        let u = L.Util.template (mapDef.pattern, {
          urlTimestamp0: time.urlTimestamp0,
          urlTimestamp: time.prevFormatted,
        });
        if (u === prevU) return;
        prevU = u;
        Promise.all ([
          fetch (u, {
            referrerPolicy: 'no-referrer',
          }).then (res => {
            if (res.status !== 200) throw res;
            return res.json ();
          }),
          (mapDef.jmaLinkType === 'amedas' ? getAmedasTable () : null),
        ]).then (([json, amedas]) => {
          if (opts.mapLibre) {
            map.getSource (layer.sourceId).setData (mapper (json, amedas));
          } else {
            mapLayer.clearLayers ();
            mapLayer.addData (mapper (json, amedas));
          }
        }).catch (e => {
          prevU = null;
          throw e;
        });
      };
    } else {
      if (opts.mapLibre) {
        layer = {
          sourceId: opts.type,
          source: {
            type: 'raster',
            tiles: [(mapDef.mapLibrePattern || mapDef.pattern)
                    .replace (/\{urlTimestamp0\}/g, time.urlTimestamp0)
                    .replace (/\{urlTimestamp\}/g, time.prevFormatted)
                    .replace (/\{param1\}/g, opts.param1 || mapDef.param1)],
            tileSize: 256,
            attribution: '<a href=https://www.jma.go.jp/jma/kishou/info/coment.html target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>',
          },
          layers: [{
            layerId: opts.type,
            layer: {
              id: opts.type, type: "raster", source: opts.type,
              paint: {
                'raster-opacity': mapDef.opacity,
              },
            },
            background: mapDef.mapLibreBackground,
          }],
        };
        if (mapDef.minNativeZoom) layer.source.minzoom = mapDef.minNativeZoom;
        if (mapDef.maxNativeZoom) layer.source.maxzoom = mapDef.maxNativeZoom;
        refetch = (map, time, layer) => {
          map.getSource (opts.type).setTiles
              ([(mapDef.mapLibrePattern || mapDef.pattern)
                    .replace (/\{urlTimestamp0\}/g, time.urlTimestamp0)
                    .replace (/\{urlTimestamp\}/g, time.prevFormatted)
                    .replace (/\{param1\}/g, opts.param1 || mapDef.param1)]);
          //map.triggerRepaint ();
        };
      } else {
        let tileOpts = {
          attribution: '<a href=https://www.jma.go.jp/jma/kishou/info/coment.html target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>',
          errorTileUrl: opts.errorTileUrl,
          maxNativeZoom: mapDef.maxNativeZoom,
          minNativeZoom: mapDef.minNativeZoom || 4,
          maxZoom: opts.maxZoom,
          opacity: mapDef.opacity,
          urlTimestamp0: time.urlTimestamp0,
          urlTimestamp: time.prevFormatted,
          param1: opts.param1 || mapDef.param1,
        };
        if (mapDef.evenZoomOnly) {
          layer = L.tileLayer.evenZoomOnly (mapDef.pattern, tileOpts);
        } else {
          layer = L.tileLayer (mapDef.pattern, tileOpts);
        }
        refetch = (map, time, layer) => {
          layer.options.urlTimestamp = time.prevFormatted;
          layer.options.urlTimestamp0 = time.urlTimestamp0;
          layer.options.param1 = opts.param1 || time.mapDef.param1;
          layer.setUrl (time.mapDef.pattern, false);
        };
      }
    }
    
    let needReload = false;
    let timeout;
    let updateTimeElements = () => {};
    let prevTimePrev = null;
    let requestReload = (layer, map, time) => {
      if (!needReload) return;
      time = time || getTime ();
      if (prevTimePrev === time.prev) return;
      prevTimePrev = time.prev;
      if (needUpdate) clearTimeout (timeout);
      timeout = setTimeout (() => {
        if (!needReload) return;
        let time = getTime ();
        refetch (map, time, layer);
        updateTimeElements (time);
        if (explicitTime) needReload = false;
        requestReload (layer, map, time);
      }, needUpdate ? 0 : time.delta);
      needUpdate = false;
    }; // requestReload

    let legends = [];
    if (!opts.noTimestamp) {
      if (opts.mapLibre) {
        let ts = new MLTimestampControl ({
          setTimeElementUpdater: _ => {
            updateTimeElements = _;
            _ (time);
          },
          type: mapDef.jmaLinkType || 'nowc',
          isLegend: true,
        });
        legends.push ({element: ts, position: 'bottom-left'});
      } else {
        let ts = L.control.timestampControl ({
          position: 'bottomleft',
          setTimeElementUpdater: _ => {
            updateTimeElements = _;
            _ (time);
          },
          type: mapDef.jmaLinkType || 'nowc',
          isLegend: true,
        });
        legends.push (ts);
      }
    }

    if (mapDef.isUmiWind) {
      let t = document.createElement ('map-controls');
      t.className = 'paco-jma-legend-control';
      t.innerHTML = '<img src=https://www.jma.go.jp/bosai/umimesh/images/legend_deep_ws.svg referrerpolicy=no-referrer>';
      if (opts.mapLibre) {
        let ec = new MLElementControl (t, {
          isLegend: true,
        });
        legends.push ({element: ec, position: 'bottom-left'});
      } else {
        let ec = new L.Control.ElementControl ({
          element: t,
          position: 'bottomleft',
          isLegend: true,
        });
        legends.push (ec);
      }
    }

    let map;
    if (!opts.mapLibre) { // leaflet
      let ba = layer.beforeAdd;
      if (ba) {
        layer.beforeAdd = function (_) {
          map = _;
          return ba.apply (this, arguments);
        };
      } else {
        map = opts.map;
      }
    }

    var timeSetter = (newTime) => {
      explicitTime = newTime * 1000; // or NaN
      needReload = needUpdate = true;
      requestReload (layer, map, null);
    }; // timeSetter

    let zoomChanged = null;
    if (mapDef.zooms.length) {
      zoomChanged = () => {
        let newZ = map.getZoom ();
        if (mapDef.zooms[newZ] !== mapDef.zooms[currentZ]) {
          needReload = needUpdate = true;
        }
        currentZ = newZ;
        requestReload (layer, map, null);
      }; // zoomChanged
    }

    if (opts.mapLibre) {
      layer.onAdd = (e, m) => {
        map = m;
        needReload = true;
        requestReload (null, map, null);
        legends.forEach (_ => map.addControl (_.element, _.position));
        map.pcAddTimeSetter (timeSetter);
        if (zoomChanged) map.on ('zoomend', zoomChanged);
      };
      layer.onRemove = (e, m) => {
        needReload = false;
        clearTimeout (timeout);
        legends.forEach (_ => map.removeControl (_.element));
        map.pcRemoveTimeSetter (timeSetter);
        if (zoomChanged) map.off ('zoomend', zoomChanged);
      };
    } else { // Leaflet
      layer.on ('add', ev => {
        needReload = true;
        requestReload (ev.target, map, null);
        legends.forEach (_ => _.addTo (map));
        map.pcAddTimeSetter (timeSetter);
        if (zoomChanged) map.on ('zoomend', zoomChanged);
      });
      layer.on ('remove', ev => {
        needReload = false;
        clearTimeout (timeout);
        legends.forEach (_ => _.remove ());
        map.pcRemoveTimeSetter (timeSetter);
        if (zoomChanged) map.off ('zoomend', zoomChanged);
      });
    }

    return layer;
  }; // L.tileLayer.jma
  
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
        let onready;
        this.ready = new Promise ((r) => onready = r);

        let initialValue = this.valueAsLatLon;
        this.pcCoordinatesSetters = [];
        this.pcDistanceSetters = [];
        if (initialValue) {
          this.setAttribute ('lat', initialValue.lat);
          this.setAttribute ('lon', initialValue.lon);
        }
        Object.defineProperty (this, 'valueAsLatLon', {
          get: function () {
            return {
              lat: this.pcValue.lat,
              lon: this.pcValue.lon,
            };
          },
          set: function (newValue) {
            newValue = newValue || {};
            this.pcValue = {lat: parseFloat (newValue.lat),
                            lon: parseFloat (newValue.lon)};
            if (!Number.isFinite (this.pcValue.lat)) this.pcValue.lat = 0;
            if (!Number.isFinite (this.pcValue.lon)) this.pcValue.lon = 0;
            this.maRedraw ({valueMarker: true, valueMarkerHandlers: true});
          },
        });

        (new MutationObserver ((mutations) => {
          if (!this.pc_NewView) this.pc_NewView = {};
          this.pc_NewView._source = 'mutation';
          var latlon = false;
          mutations.forEach (mr => {
            if (mr.attributeName === 'lat') {
              this.pcValue.lat = 
              this.pc_NewView.lat = this.maAttrFloat ('lat', 0);
              this.pc_NewView.noAnimation = true;
              this.maRedraw ({view: true, valueMarker: true});
            } else if (mr.attributeName === 'lon') {
              this.pcValue.lon = 
              this.pc_NewView.lon = this.maAttrFloat ('lon', 0);
              this.pc_NewView.noAnimation = true;
              this.maRedraw ({view: true, valueMarker: true});
            } else if (mr.attributeName === 'zoom') {
              this.pc_NewView.zoom = this.maAttrFloat ('zoom', 8);
              this.pc_NewView.noAnimation = true;
              this.maRedraw ({view: true});
            } else if (mr.attributeName === 'pitch') {
              this.pc_NewView.pitch = this.maAttrFloat ('pitch', 0);
              this.pc_NewView.noAnimation = true;
              this.maRedraw ({view: true});
            } else if (mr.attributeName === 'bearing') {
              this.pc_NewView.bearing = this.maAttrFloat ('bearing', 0);
              this.pc_NewView.noAnimation = true;
              this.maRedraw ({view: true});
            } else if (mr.attributeName === 'terrain') {
              this.pc_NewView.terrain = this.maAttrFloat ('terrain', 0);
              this.pc_NewView.noAnimation = true;
              this.maRedraw ({view: true});
            } else if (mr.attributeName === 'readonly') {
              this.maRedraw ({readonly: true});
            } else if (mr.attributeName === 'maptype') {
              this.setMapType (this.getAttribute ('maptype'));
            }
          });
        })).observe (this, {attributeFilter: ['lat', 'lon', 'readonly',
                                              'zoom', 'maptype', 'terrain',
                                              'pitch', 'bearing']});
        this.pc_NewView = {
          initial: true,
          lat: this.maAttrFloat ('lat', 0),
          lon: this.maAttrFloat ('lon', 0),
          zoom: this.maAttrFloat ('zoom', 8),
          pitch: this.maAttrFloat ('pitch', 0),
          bearing: this.maAttrFloat ('bearing', 0),
          terrain: this.hasAttribute ('terrain'),
          _source: 'initial',
        };
        this.maCenter = this.pcValue = this.pc_NewView;
        this.pcZoomLevel = this.pc_NewView.zoom;

        this.pcExplicitTime = null;
        this.pcTimeSetters = [];
        Object.defineProperty (this, 'explicitTime', {
          get: () => this.pcExplicitTime,
          set: function (newValue) {
            this.pcExplicitTime = parseFloat (newValue) || null;
            Promise.resolve ().then (() => {
              this.pcTimeSetters.forEach (_ => _ (this.pcExplicitTime));
            });
          },
        });

        this.pcNoMapDraggable = !!this.noMapDraggable;
        Object.defineProperty (this, 'noMapDraggable', {
          get: () => this.pcNoMapDraggable,
          set: function (newValue) {
            this.pcNoMapDraggable = !!newValue;
            this.maRedraw ({mapDraggable: true});
          },
        });

        new MutationObserver (() => this.maRedraw ({redrawMarkers: true}))
              .observe (this, {attributeFilter: ['style']});

        
        this.maEngine = this.getAttribute ('engine');
        if (this.maEngine === 'googlemaps') {
          return this.maInitGoogleMaps (onready);
        } else if (this.maEngine === 'googlemapsembed') {
          return this.maInitGoogleMapsEmbed (onready);
        } else if (this.maEngine === 'maplibre') { // MapLibre GL JS
          return this.pc_InitMapLibre (onready);
        } else {
          this.maEngine = 'leaflet';
          return this.pcInitLeaflet (onready);
        }
      }, // pcInit
      maInitGoogleMaps: function (onready) {
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
            //zoom: this.pcZoomLevel,
            gestureHandling: "greedy",
            styles: [
              {featureType: "poi", elementType: "all", stylers: [{visibility: "off"}]},
              {featureType: "landscape", elementType: "all", stylers: [{visibility: "off"}]},
            ],
            draggable: !this.pcNoMapDraggable,
            //center: {lat, lng},
          };
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
            var cp = false;
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
                if (v === 'currentposition') cp = true;
              });
            } // value
            this.maGoogleMap.setOptions (opts);

            if (cp && !this.pcCurrentPositionButtonAdded) {
              this.pcCurrentPositionButtonAdded = true;
              var e = document.createElement ('map-controls');
              e.setAttribute ('position', 'right-bottom');
              e.className = 'paco-currentposition-container';
              var b = document.createElement ('button');
              b.className = 'paco-control-button paco-currentposition-control-button';
              b.type = 'button';
              b.textContent = '\u26EF';
              b.onclick = () => {
                this.pcLocateCurrentPosition ({pan: true});
              };
              
              // recompute!
              var mCP = this.pcInternal.parseCSSString (getComputedStyle (this).getPropertyValue ('--paco-currentposition-title'), 'Current position');
              b.title = mCP;
              
              e.appendChild (b);
              if (controls) {
                controls.push (e);
              } else {
                this.appendChild (e);
                this.maRedraw ({controls: true});
              }
              this.pcInitCurrentPosition ();
            } // cp
          }; // applyControls
          new MutationObserver (applyControls)
              .observe (this, {attributeFilter: ['controls']});
          applyControls ();
          
          this.maGoogleMap.addListener ('bounds_changed', () => {
            var v = this.maGoogleMap.getCenter ();
            this.maCenter = v ? {
              lat: v.lat (),
              lon: v.lng (),
            } : {lat: 0, lon: 0};
            if (this.maCenter.lon < -180) {
              this.maCenter.lon += 360;
            }
            this.pcZoomLevel = this.maGoogleMap.getZoom ();
            this.maRedrawEvent ();
          });
          
          var moc = new MutationObserver ((mutations) => {
            this.maRedraw ({controls: true});
          }).observe (this, {childList: true});
          controls.forEach (e => this.appendChild (e));
          controls = null;

          // recompute!
          var s = getComputedStyle (this);
          var v = s.getPropertyValue ('--paco-map-click-action') || 'none';
          var w = s.getPropertyValue ('--paco-map-touch-scroll-viewport') || 'auto';
          
          if (v.match (/^\s*set-value\s*$/)) {
            this.maGoogleMap.addListener ('click', ev => {
              var p = ev.latLng;
              this.pc_MarkerMoveEnd
                  ('pc_ValueMarker', {lat: p.lat (), lon: p.lng ()});
              this.maRedraw ({valueMarker: true, userActivated: true,
                              valueMarkerHandlers: true});
            });
          }

          if (w.match (/^\s*none\s*$/)) {
            // Disable viewport scrolling behavior triggerred by touch
            // (when map scrolling is disabled)
            this.addEventListener ('touchstart', (ev) => {
              var t = ev.target;
              if ({
                'map-credit': true,
                'label': true,
                'a': true,
                'button': true,
              }[t.localName] ||
              t.hasAttribute ('aria-label') ||
              t.hasAttribute ('controlwidth') ||
              (t.localName === 'img' && t.parentNode.localName === 'button')) {
                return;
              }
              ev.preventDefault ();
            }, {passive: false});
          }
          
          this.maRedrawNeedUpdated.onready = onready;
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
      maInitGoogleMapsEmbed: function (onready) {
        this.pc_GMEmbed = true;
        this.maRedrawNeedUpdated.onready = onready;
        return Promise.resolve ().then (() => this.maRedraw ({all: true}));
      }, // maInitGoogleMapsEmbed
      pcInitLeaflet: function (onready) {
        var c = this.getAttribute ('controls');
        var controls = {};
        if (c !== null) {
          c = c.split (/\s+/).filter (_ => _.length);
          if (c.length) {
            c.forEach (_ => controls[_] = true);
          } else {
            controls = {zoom: true, scale: true, fullscreen: true,
                        currentposition: true, type: true,
                        streetview: true};
          }
        }

        // recompute!
        var s = getComputedStyle (this);
        var w = s.getPropertyValue ('--paco-map-touch-scroll-viewport') || 'auto';
        var za = s.getPropertyValue ('--paco-map-zoom-animation') || 'auto';

        var opts = {
          zoomControl: false,
          wheelPxPerZoomLevel: 60 * 3,
          dragging: !this.pcNoMapDraggable,
        };
        if (za.match (/^\s*none\s*$/)) opts.zoomAnimation = false;
        var map = this.pcLMap = L.map (this, opts);

        map.pcAddTimeSetter = (code) => {
          this.pcTimeSetters.push (code);
        }; // addTimeSetter
        map.pcRemoveTimeSetter = (code) => {
          this.pcTimeSetters = this.pcTimeSetters.filter (_ => _ !== code);
        }; // removeTimeSetter
        map.pcAddCoordinatesSetter = (code) => {
          this.pcCoordinatesSetters.push (code);
        }; // addCoordinatesSetter
        map.pcRemoveCoordinatesSetter = (code) => {
          this.pcCoordinatesSetters = this.pcCoordinatesSetters.filter (_ => _ !== code);
        }; // removeCoordinatesSetter
        map.pcAddDistanceSetter = (code) => {
          this.pcDistanceSetters.push (code);
        }; // addDistanceSetter
        map.pcRemoveDistanceSetter = (code) => {
          this.pcDistanceSetters = this.pcDistanceSetters.filter (_ => _ !== code);
        }; // removeDistanceSetter

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

        if (controls.togglelegend) {
          L.control.legendToggleButton ({
            position: 'bottomleft',
          }).addTo (map);
        }
        
        if (controls.scale) L.control.scale ({}).addTo (map);

        if (controls.type) {
          L.control.mapTypeMenu ({
            position: 'topleft',
            buttons: controls.typebuttons,
          }).addTo (map);
        }
        if (controls.fullscreen && this.requestFullscreen) L.control.fullscreenButton ({}).addTo (map);

        if (controls.streetview) {
          L.control.streetViewButton ({
            position: 'bottomright',
          }).addTo (map);
        }

        if (controls.currentposition) {
          L.control.currentPositionButton ({
            position: 'bottomright',
          }).addTo (map);
          this.pcInitCurrentPosition ();
        }

        if (controls.coordinates) {
          this.pc_ToggleCoordinatesControl (true);
        }

        // Map need to be recomputed if it is initialized when not
        // shown.
        this.maISObserver = new IntersectionObserver (() => {
          this.maRedraw ({relocate: true});
        });
        this.maISObserver.observe (this);
        this.maRSObserver = new ResizeObserver (() => {
          this.maRedraw ({relocate: true});
        });
        this.maRSObserver.observe (this);

        map.on ('load viewreset zoomend moveend', ev => {
          var c = map.getCenter ();
          this.maCenter = {lat: c.lat, lon: c.lng};
          this.pcZoomLevel = map.getZoom ();
          this.maRedrawEvent ();
        });
        map.setView (this.maCenter, this.pcZoomLevel);

        map.on ('click', ev => {
          // recompute!
          let v = s.getPropertyValue ('--paco-map-click-action') || 'none';
          if (v.match (/^\s*set-value\s*$/)) {
            let p = ev.latlng;
            this.pc_MarkerMoveEnd ('pc_ValueMarker', {lat: p.lat, lon: p.lng});
            this.maRedraw ({valueMarker: true, userActivated: true,
                            valueMarkerHandlers: true});
          } else if (v.match (/^\s*add-distance-point\s*$/)) {
            let p = ev.latlng;
            this.pc_MarkerMoveEnd (['pc_DistanceMarker', null], {lat: p.lat, lon: p.lng});
            this.maRedraw ({distanceMarkers: true, userActivated: true,
                            distanceHandlers: true});
          }
        });

        if (w.match (/^\s*none\s*$/)) {
          this.classList.toggle ('paco-touch-scroll-viewport-none', true);
        }

        var initialMapType = this.getAttribute ('maptype');
        if (this.hasAttribute ('gsi') && !initialMapType) {
          initialMapType = 'gsi-lang';
        }
        if (this.hasAttribute ('osm') && !initialMapType) {
          initialMapType = 'osm';
        }
        if (initialMapType) this.setMapType (initialMapType);

        (this.getAttribute ('credits') || '').split (/\s+/).forEach (_ => {
          if (_ === 'gsi') {
            this.pc_AddAttribution (gsiCreditHTML);
          } else if (_ === '') {
            //
          } else {
            console.log ("Bad |credits| value |"+_+"|");
          }
        });
        
        this.maRedrawNeedUpdated.onready = onready;
        new MutationObserver ((mutations) => {
          this.maRedraw ({controls: true});
        }).observe (this, {childList: true});
        this.maRedraw ({controls: true,
                        valueMarker: true, valueMarkerHandlers: true,
                        relocate: true});
      }, // pcInitLeaflet
      pc_InitMapLibre: function (onready) {
        var c = this.getAttribute ('controls');
        var controls = {};
        if (c !== null) {
          c = c.split (/\s+/).filter (_ => _.length);
          if (c.length) {
            c.forEach (_ => controls[_] = true);
          } else {
            controls = {zoom: true, scale: true, fullscreen: true,
                        currentposition: true, type: true,
                        streetview: true, pitch: true};
          }
        }

        // recompute!
        var s = getComputedStyle (this);
        var w = s.getPropertyValue ('--paco-map-touch-scroll-viewport') || 'auto';
        var za = s.getPropertyValue ('--paco-map-zoom-animation') || 'auto';

        if (za.match (/^\s*none\s*$/)) opts.zoomAnimation = false;
        let map = new maplibregl.Map ({
          container: this,
          //center: [1, 0],
          //zoom: 8,
          style: {
            version: 8,
            sources: {},
            layers: [],
          },
          maxPitch: 85,
        });
        
        map.scrollZoom.setWheelZoomRate (1 / (60 * 3));
        if (this.pcNoMapDraggable) {
          map.dragPan.disable ();
        } else {
          map.dragPan.enable ();
        }
        
        map.pcAddTimeSetter = (code) => {
          this.pcTimeSetters.push (code);
        }; // addTimeSetter
        map.pcRemoveTimeSetter = (code) => {
          this.pcTimeSetters = this.pcTimeSetters.filter (_ => _ !== code);
        }; // removeTimeSetter
        map.pcAddCoordinatesSetter = (code) => {
          this.pcCoordinatesSetters.push (code);
        }; // addCoordinatesSetter
        map.pcRemoveCoordinatesSetter = (code) => {
          this.pcCoordinatesSetters = this.pcCoordinatesSetters.filter (_ => _ !== code);
        }; // removeCoordinatesSetter
        map.pcAddDistanceSetter = (code) => {
          this.pcDistanceSetters.push (code);
        }; // addDistanceSetter
        map.pcRemoveDistanceSetter = (code) => {
          this.pcDistanceSetters = this.pcDistanceSetters.filter (_ => _ !== code);
        }; // removeDistanceSetter

        // recompute!
        let cs = getComputedStyle (this);
        this.querySelectorAll ('.maplibregl-ctrl-attrib-button').forEach (at => {
          at.title = at.ariaLabel = this.pcInternal.parseCSSString
              (cs.getPropertyValue ('--paco-toggle-attribution'), 'Attribution');
        });

        if (controls.zoom) {
          map.addControl (new maplibregl.NavigationControl ({}), 'bottom-right');
          this.querySelectorAll ('.maplibregl-ctrl-zoom-in').forEach (b => {
            b.title = b.ariaLabel = this.pcInternal.parseCSSString (cs.getPropertyValue ('--paco-zoomin-title'), 'Zoom in');
          });
          this.querySelectorAll ('.maplibregl-ctrl-zoom-out').forEach (b => {
            b.title = b.ariaLabel = this.pcInternal.parseCSSString (cs.getPropertyValue ('--paco-zoomout-title'), 'Zoom out');
          }); 
          this.querySelectorAll ('.maplibregl-ctrl-compass').forEach (b => {
            b.title = b.ariaLabel = this.pcInternal.parseCSSString (cs.getPropertyValue ('--paco-compass-north-title'), 'Reset bearing to north');
          });
        }

        if (controls.togglelegend) {
          map.addControl (new MLLegendToggleButtonControl ({}), 'bottom-left');
        }
        
        if (controls.scale) {
          map.addControl (new maplibregl.ScaleControl ({
            //maxWidth: 80,
            unit: 'imperial',
          }));
          map.addControl (new maplibregl.ScaleControl ({
            //maxWidth: 80,
          }));
        }

        if (controls.type) {
          map.addControl (new MLMapTypeMenuControl ({
            buttons: controls.typebuttons,
          }), 'top-left');
        }
        if (controls.fullscreen && this.requestFullscreen) {
          map.addControl (new MLFullscreenButtonControl ({}));
        }

        if (controls.pitch) {
          map.addControl (new MLPitchButtonControl ({}));
        }

        if (controls.streetview) {
          map.addControl (new MLStreetViewButtonControl ({}), 'bottom-right');
        }

        if (controls.currentposition) {
          map.addControl (new MLCurrentPositionButtonControl ({}), 'bottom-right');
          //map.addControl (new maplibregl.GeolocateControl ({}), 'bottom-right');
          this.pcInitCurrentPosition ();
        }

        // Map need to be recomputed if it is initialized when not
        // shown.
        this.maISObserver = new IntersectionObserver (() => {
          this.maRedraw ({relocate: true});
        });
        this.maISObserver.observe (this);
        this.maRSObserver = new ResizeObserver (() => {
          this.maRedraw ({relocate: true});
        });
        this.maRSObserver.observe (this);

        //map.setZoom (this.pcZoomLevel);
        //map.setCenter (this.maCenter);
        // Executed soon
        map.on ('moveend', () => {
          let c = map.getCenter ();
          this.maCenter = {lat: c.lat, lon: c.lng};
          this.pcZoomLevel = map.getZoom ();
          this.pc_Pitch = map.getPitch ();
          this.pc_Bearing = map.getBearing ();
          this.maRedrawEvent ();
        });
        //map.on('zoomend', () => { })

        map.on ('click', ev => {
          // recompute!
          let v = s.getPropertyValue ('--paco-map-click-action') || 'none';
          if (v.match (/^\s*set-value\s*$/)) {
            let p = ev.lngLat;
            this.pc_MarkerMoveEnd ('pc_ValueMarker', {lat: p.lat, lon: p.lng});
            this.maRedraw ({valueMarker: true, userActivated: true,
                            valueMarkerHandlers: true});
          } else if (v.match (/^\s*add-distance-point\s*$/)) {
            let p = ev.lngLat;
            this.pc_MarkerMoveEnd (['pc_DistanceMarker', null],
                                   {lat: p.lat, lon: p.lng});
            this.maRedraw ({distanceMarkers: true, userActivated: true,
                            distanceHandlers: true});
          }
        });

        if (w.match (/^\s*none\s*$/)) {
          this.classList.toggle ('paco-touch-scroll-viewport-none', true);
        }

        var initialMapType = this.getAttribute ('maptype');
        if (this.hasAttribute ('gsi') && !initialMapType) {
          initialMapType = 'gsi-lang';
        }
        if (this.hasAttribute ('osm') && !initialMapType) {
          initialMapType = 'osm';
        }
        if (initialMapType) this.setMapType (initialMapType);

        this.pc_AttributionHTMLs = [];
        (this.getAttribute ('credits') || '').split (/\s+/).forEach (_ => {
          if (_ === 'gsi') {
            this.pc_AddAttribution (gsiCreditHTML);
          } else if (_ === '') {
            //
          } else {
            console.log ("Bad |credits| value |"+_+"|");
          }
        });

        map.on ('load', () => {
          this.pc_MLMap = map;
          this.maRedrawNeedUpdated.onready = onready;

          if (controls.coordinates) {
            this.pc_ToggleCoordinatesControl (true);
          }
          
          new MutationObserver ((mutations) => {
            this.maRedraw ({controls: true});
          }).observe (this, {childList: true});
          this.maRedraw ({controls: true,
                          valueMarker: true, valueMarkerHandlers: true,
                          relocate: true,
                          mapType: true});
          this.maRedrawEvent ();
        });
      }, // pc_InitMapLibre
      
      maRedrawEvent: function () {
        clearTimeout (this.maRedrawEventTimer);
        this.maRedrawEventTimer = setTimeout (() => this.ma_RedrawEvent (), 100);
      }, // maRedrawEvent
      ma_RedrawEvent: function () {
        var isShown = this.offsetWidth > 0 && this.offsetHeight > 0;
        if (!isShown) return;
        if (this.pc_NewView && this.pc_NewView.initial) return;
        
        this.pcCoordinatesSetters.forEach (_ => _ (this, {redraw: true}));
        this.dispatchEvent (new Event ('pcRedraw', {bubbles: true}));
      }, // ma_RedrawEvent
      maRedraw: function (opts) {
        for (var n in opts) {
          if (opts[n]) this.maRedrawNeedUpdated[n] = opts[n];
        }

        if (this.maRedrawNeedUpdated.mapDraggable) {
          if (this.pcLMap) {
            if (this.pcNoMapDraggable) {
              this.pcLMap.dragging.disable ();
            } else {
              this.pcLMap.dragging.enable ();
            }
          }
          if (this.pc_MLMap) {
            if (this.pcNoMapDraggable) {
              this.pc_MLMap.dragPan.disable ();
            } else {
              this.pc_MLMap.dragPan.enable ();
            }
          }
          if (this.maGoogleMap) {
            this.maGoogleMap.setOptions ({draggable: !this.pcNoMapDraggable});
          }
          delete this.maRedrawNeedUpdated.mapDraggable;
        }
        
        if (this.maRedrawNeedUpdated.relocate) {
          if (this.pcLMap) this.pcLMap.invalidateSize ();
          if (this.pc_MLMap) this.pc_MLMap.resize ();
          if (this.maGoogleMap) {
            if (this.maCenter) this.maGoogleMap.setCenter ({
              lat: this.maCenter.lat,
              lng: this.maCenter.lon,
            });
          }
          delete this.maRedrawNeedUpdated.relocate;
        }

        if (this.pc_NewView && this.pc_NewView.terrain != null) {
          if (this.pc_Terrain !== this.pc_NewView.terrain) {
            this.pc_Terrain = this.pc_NewView.terrain;
            this.maRedrawNeedUpdated.mapType = true;

            // force maptype reset
            this.pc_MLCurrentStyleURL = undefined;
            this.pc_MLCurrentStyleMode = undefined;
          }
        }
        if (this.maRedrawNeedUpdated.mapType) {
          if (this.pcLMap || this.pc_MLMap) {
            this.pcChangeMapType ();
          }
          delete this.maRedrawNeedUpdated.mapType;
        }

        clearTimeout (this.maRedrawTimer);
        if (this.maRedrawNeedUpdated.userActivated) {
          requestAnimationFrame (() => this.ma_Redraw ());
        } else {
          this.maRedrawTimer = setTimeout (() => this.ma_Redraw (), 300);
        }
      }, // maRedraw
      ma_Redraw: function () {
        var isShown = this.offsetWidth > 0 && this.offsetHeight > 0;

        var updates = this.maRedrawNeedUpdated;
        if (isShown) {
          this.maShown = true;
          this.maRedrawNeedUpdated = {};

          // updates.view
          if (this.pc_NewView) {
            //console.log ("View update: ", this.pc_NewView._source);
            if (this.pcLMap || this.pc_MLMap ||
                this.maGoogleMap || this.pc_GMEmbed) {
              let p = {lat: this.pc_NewView.lat, lon: this.pc_NewView.lon};
              if (p.lat != null || p.lon != null) {
                if (p.lat == null) p.lat = this.maCenter.lat;
                if (p.lon == null) p.lon = this.maCenter.lon;
                p.lng = p.lon;
                if (this.pc_GMEmbed) {
                  this.maCenter = p;
                  updates.all = true;
                }
              } else {
                p = undefined;
              }
              if (this.pcLMap) {
                if (p) {
                  this.pcLMap.setView (p, this.pc_NewView.zoom || this.pcZoomLevel);
                } else {
                  this.pcLMap.setZoom (this.pc_NewView.zoom);
                }
              }
              if (this.pc_MLMap) {
                this.pc_NewView.center = p;
                if (this.pc_NewView.initial || this.pc_NewView.noAnimation) {
                  this.pc_MLMap.jumpTo (this.pc_NewView);
                } else {
                  this.pc_MLMap.easeTo (this.pc_NewView);
                  //this.pc_MLMap.flyTo (this.pc_NewView);
                }
              }
              if (this.maGoogleMap) {
                if (p) {
                  if (this.pc_NewView.initial || this.pc_NewView.noAnimation) {
                    this.maGoogleMap.setCenter (p);
                  } else {
                    this.maGoogleMap.panTo (p);
                  }
                }
                if (this.pc_NewView.zoom != null) {
                  this.maGoogleMap.setZoom (this.pc_NewView.zoom);
                }
              }
              delete this.pc_NewView;
            }
          } // updates.view

          if (updates.size || updates.all) {
            if (this.pcLMap) this.pcLMap.invalidateSize ();
            if (this.maGoogleMap) {
              google.maps.event.trigger (this.maGoogleMap, 'resize');
            }
          }
          if (updates.size || updates.zoom || updates.all) {
            if (this.pc_GMEmbed) {
              if (!this.maIframe) {
                this.maIframe = document.createElement ('iframe');
                this.maIframe.className = 'googlemapsembed';
                this.maIframe.setAttribute ('sandbox', 'allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-top-navigation-by-user-activation');
                this.maIframe.setAttribute ('allowfullscreen', '');
                this.maIframe.onload = () => this.maRedrawEvent ();
                this.appendChild (this.maIframe);
              }
              this.maIframe.src = "https://www.google.com/maps/embed/v1/view?key=" + encodeURIComponent (document.documentElement.getAttribute ('data-google-maps-key')) + "&center=" + encodeURIComponent (this.maCenter.lat) + "," + encodeURIComponent (this.maCenter.lon) + "&zoom=" + encodeURIComponent (this.pcZoomLevel);
              // &maptype=satellite
            }
          }

          if (updates.controls || updates.all) {
            if (this.pcLMap) {
              Array.prototype.slice.call (this.children).forEach (e => {
                if (e.localName === 'map-controls') {
                  var position = {
                    'top-left': 'topleft',
                    'top-center': 'topleft', // not supported
                    'top-right': 'topright',
                    'bottom-left': 'bottomleft',
                    'bottom-center': 'bottomleft', // not supported
                    'left-top': 'topleft',
                    'left-center': 'topleft', // not supported
                    'left-bottom': 'bottomleft',
                    'right-top': 'topright',
                    'right-center': 'topright', // not supported
                    'right-bottom': 'bottomright',
                  }[e.getAttribute ('position')] || 'bottomright';
                  var c = L.control.elementControl ({
                    element: e,
                    position,
                    isLegend: e.hasAttribute ('legend'),
                  });
                  c.addTo (this.pcLMap);
                }
              });
            }
            if (this.pc_MLMap) {
              Array.prototype.slice.call (this.children).forEach (e => {
                if (e.localName === 'map-controls') {
                  let position = {
                    'top-left': 'top-left',
                    'top-center': 'top-left', // not supported
                    'top-right': 'top-right',
                    'bottom-left': 'bottom-left',
                    'bottom-center': 'bottom-left', // not supported
                    'left-top': 'top-left',
                    'left-center': 'top-left', // not supported
                    'left-bottom': 'bottom-left',
                    'right-top': 'top-right',
                    'right-center': 'top-right', // not supported
                    'right-bottom': 'bottom-right',
                  }[e.getAttribute ('position')] || 'bottom-right';
                  this.pc_MLMap.addControl (new MLElementControl (e, {
                    isLegend: e.hasAttribute ('legend'),
                  }), position);
                }
              });
            }
            if (this.maGoogleMap) {
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

          let computedStyle;
          var updateMarker = (markerName, propName, pos, opts) => {
            if (opts.redraw || opts.remove) {
              if (this[markerName]) {
                this[markerName].lItems.forEach (_ => _.remove ());
                this[markerName].mlItems.forEach (_ => _.remove ());
                this[markerName].mlMoveHandlers.forEach (_ => this.pc_MLMap.off ('move', _));
                this[markerName].gmItems.forEach (_ => _.setMap (null));
              }
              delete this[markerName];
              if (opts.remove) return;
            }

            // Style changes are not supported (at least for now).
            if (this[markerName]) {
              this[markerName].lItems.forEach (_ => {
                _.setLatLng (pos);
                if (_.dragging) {
                  if (opts.draggable) {
                    _.dragging.enable ();
                  } else {
                    _.dragging.disable ();
                  }
                }
              });
              this[markerName].mlItems.forEach (_ => {
                _.setLngLat (pos);
                _.setDraggable (!!opts.draggable);
              });
              this[markerName].gmItems.forEach (_ => {
                _.setPosition ({lat: pos.lat, lng: pos.lon});
                this[markerName].setOptions ({draggable: !!opts.draggable});
              });
              return;
            }
              
            // recompute!
            computedStyle = computedStyle || getComputedStyle (this);
            let w = computedStyle.getPropertyValue (propName) || 'none';

            if (w.match (/^\s*none\s*$/)) {
              this[markerName] = {none: true, lItems: [], mlItems: [],
                                  mlMoveHandlers: [], gmItems: []};
              return;
            }
            
            let mk = this[markerName] = {lItems: [], mlItems: [],
                                         mlMoveHandlers: [], gmItems: []};
            for (let v of w.split (/\s\/\s/)) {
              let icon = null;
              let m = v.match (/^\s*("[^"]*"|'[^']*')\s+(\S+)\s+(\S+)\s*$/);
              if (m) {
                var mt = document.createElement ('span');
                var s = this.pcInternal.parseCSSString (m[1], null);
                if (s) {
                  mt.textContent = s;
                  var mc = document.createElement ('span');
                mc.textContent = m[2];
                var ms = document.createElement ('span');
                ms.textContent = m[3];
                let m3 = parseFloat (m[3]);
                icon = {iconSize: [m3, m3],
                        iconAnchor: [m3/2, m3/2]};
                var mss = ms.innerHTML;
                icon.iconUrl = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent ('<svg xmlns="http://www.w3.org/2000/svg" width="'+parseFloat(mss)+'" height="'+parseFloat(mss)+'"><text x="calc('+mss+'/2)" y="calc('+mss+'/2)" width="'+mss+'" height="'+mss+'" font-size="'+mss+'" text-anchor="middle" alignment-baseline="central" fill="'+mc.innerHTML+'">'+mt.innerHTML+'</text></svg>');
              }
            } else {
              let m = v.match (/^\s*url\(((?:[^()"'\\]|\\[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])+)\)\s+([0-9.]+)px\s+([0-9.]+)px\s*$/);
              if (m) {
                icon = {
                  iconAnchor: [parseFloat (m[2]), parseFloat (m[3])],
                  popupAnchor: [1, -34],
                  tooltipAnchor: [16, -28],
                };
                icon.iconUrl = m[1].replace (/\\(.)/g, (_, v) => v);
              } else {
                let m = v.match (/^\s*url\(((?:[^()"'\\]|\\[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])+)\)\s*$/);
                if (m) {
                  // backcompat syntax which does not support explicit hotpoint specification
                  icon = {
                    iconAnchor: [12, 41], // best for our default image
                    popupAnchor: [1, -34],
                    tooltipAnchor: [16, -28],
                  };
                  icon.iconUrl = m[1].replace (/\\(.)/g, (_, v) => v);
                } else {
                  m = v.match (/^\s*circle\s+(\S+)\s+(?:([0-9.]+)px\s+(\S+)\s+|)([0-9.]+)px\s*$/);
                  //               w           r
                  // circle COLOR 123px COLOR 123px
                  // circle COLOR             123px
                  if (m) {
                    var s = document.createElement ('span');
                    s.textContent = m[1];
                    let c1 = s.innerHTML;
                    s.textContent = m[3] || m[1];
                    let c2 = s.innerHTML;
                    let w = parseFloat (m[2] || 0);
                    var r = parseFloat (m[4]);
                    let d = (w + r) * 2;
                    icon = {iconSize: [d, d],
                            iconAnchor: [d/2, d/2]};
                    icon.iconUrl = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent ('<svg xmlns="http://www.w3.org/2000/svg" width="'+d+'" height="'+d+'"><circle cx="'+(d/2)+'" cy="'+(d/2)+'" r="'+r+'" stroke="'+c1+'" stroke-width="'+w+'" fill="'+c2+'"/></svg>');
                  }
                }
              }
            }

              if (icon) {
                if (this.pcLMap) {
                  let mm = L.marker (pos, {
                    draggable: !!opts.draggable,
                    //title: "",
                    icon: L.icon (icon),
                  });
                  mm.addTo (this.pcLMap);
                  mk.lItems.push (mm);
                  mm.on ('moveend', ev => {
                    let p = mm.getLatLng ();
                    mk.lItems.filter (_=>_!==mm).forEach(_ => _.setLatLng (p));
                    this.pc_MarkerMoveEnd (markerName, {
                      lat: p.lat,
                      lon: p.lng,
                    });
                  });
                }
                if (this.pc_MLMap) {
                  let el = document.createElement('div');
                  let img = document.createElement ('img');
                  img.src = icon.iconUrl;
                  img.width = icon.iconSize?.[0];
                  img.height = icon.iconSize?.[1];
                  el.appendChild (img);
                  el.className = 'paco-maplibre-interactive';
                  el.style.transform = `translate(${-icon.iconAnchor?.[0]}px, ${-icon.iconAnchor?.[1]}px)`;
                  
                  let mm = new maplibregl.Marker({
                    element: el,
                    draggable: !!opts.draggable,
                  });
                  mm.setLngLat (pos);
                  
                  // For some unknown reasons (maybe related to
                  // animation), sometimes markers are left
                  // opacity:0.2
                  setTimeout (() => mm.setOpacity (), 2000);

                  mm.addTo(this.pc_MLMap);
                  mk.mlItems.push(mm);

                  mm.on ('dragend', () => {
                    let p = mm.getLngLat ();
                    mk.mlItems.filter(_=>_!==mm).forEach(_ => _.setLngLat(p));
                    this.pc_MarkerMoveEnd (markerName, {
                      lat: p.lat, lon: p.lng,
                    });
                  });
                }                
                if (this.maGoogleMap) {
                  var size = null;
                  if (icon.iconSize) size = { // must be in px
                    width: parseFloat (icon.iconSize[0]),
                    height: parseFloat (icon.iconSize[1]),
                  };
                let mm = new google.maps.Marker ({
                  position: {
                    lat: pos.lat,
                    lng: pos.lon,
                  },
                  map: this.googleMap,
                  draggable: !!opts.draggable,
                  //title: "",
                  icon: {
                    url: icon.iconUrl,
                    size,
                    anchor: (icon.iconAnchor ? {x: icon.iconAnchor[0], y: icon.iconAnchor[1]} : undefined),
                  },
                });
                mk.gmItems.push (mm);
                mm.addListener ('dragend', ev => {
                  let p = ev.latLng;
                  mk.gmItems.filter(_=>_!==mm).forEach(_ => _.setPosition (p));
                  this.pc_MarkerMoveEnd (markerName, {
                    lat: p.lat (),
                    lon: p.lng (),
                  });
                });
                }
                continue;
              } // icon

              m = v.match (/^\s*circle\s+(\S+)\s+([0-9.]+)m\s+(\S+)\s+([0-9.]+)px\s*$/);
              // circle COLOR 123m COLOR 123px
              if (m) {
                var fill = m[1];
                var radius = parseFloat (m[2]);
                var stroke = m[3];
                var strokeSize = parseFloat (m[4]);
                if (this.pcLMap) {
                  let mm = L.circle (pos, {
                    fill: true,
                    fillColor: fill,
                    fillOpacity: 1,
                    radius: radius,
                    color: stroke,
                    weight: strokeSize,
                  });
                  mk.lItems.push (mm);
                  mm.addTo (this.pcLMap);
                }
                if (this.pc_MLMap) {
                  let div = document.createElement ('div');
                  div.style.background = fill;
                  div.style.borderRadius = "100%";
                  div.style.boxSizing = "border-box";
                  div.style.borderWidth = strokeSize + "px";
                  div.style.borderStyle = "solid";
                  div.style.borderColor = stroke;
                  div.style.transform = "translate(-50%, -50%)";

                  let handler = () => {
                    let p1 = this.pc_MLMap.project (pos);
                    let pos2 = this.pc_MLMap.unproject ([p1.x + 100, p1.y]);
                    let pixelsToMeters = distanceH84 (pos, {
                      lat: pos2.lat,
                      lon: pos2.lng,
                    }) / 100;
                    let radiusPx = radius / pixelsToMeters;
                    div.style.width = div.style.height = (radiusPx + strokeSize)*2 + "px";
                  };
                  this.pc_MLMap.on ('move', handler);
                  mk.mlMoveHandlers.push (handler);
                
                  let mm = new maplibregl.Marker ({
                    element: div,
                    pitchAlignment: "map",
                  });
                  mm.setLngLat (pos);
                  mk.mlItems.push (mm);
                  mm.addTo (this.pc_MLMap);
                }
                if (this.maGoogleMap) {
                  let mm = new google.maps.Circle ({
                    center: {lat: pos.lat, lng: pos.lon},
                    radius,
                    fillColor: fill,
                    strokeColor: stroke,
                    strokeWeight: strokeSize,
                    map: this.googleMap,
                  });
                  mk.gmItems.push (mm);
                }
                continue;
              } // circle

              // Bad value
              console.log ("Bad |"+propName+"| value: |"+v+"|");
              mk.lItems.forEach (_ => _.remove ());
              mk.mlItems.forEach (_ => _.remove ());
              mk.mlMoveHandlers.forEach (_ => this.pc_MLMap.off ('move', _));
              mk.gmItems.forEach (_ => _.setMap (null));
              return;
            } // v
          }; // updateMarker

          if (updates.currentPositionMarker || updates.all) {
            if (this.pcCurrentPosition) {
              updateMarker ('pcCurrentPositionMarker', '--paco-marker-currentposition', this.pcCurrentPosition, {
                redraw: updates.redrawMarkers || this.pcCurrentPosition.needRedraw,
              });
              delete this.pcCurrentPosition.needRedraw;
            }
          } // currentPositionMarker

          if (updates.valueMarker || updates.readonly ||
              updates.valueMarkerHandlers || updates.all) {
            if (updates.valueMarker || updates.readonly || updates.all) {
              updateMarker ('pc_ValueMarker', '--paco-marker-value', this.pcValue, {
                draggable: !this.hasAttribute ('readonly'),
                redraw: updates.redrawMarkers,
              });
            }
            if (updates.valueMarkerHandlers) {
              this.pcCoordinatesSetters.forEach (_ => _ (this, {value: true}));
            }
          } // valueMarker

          if (updates.distanceMarkers || updates.distanceLines ||
              updates.distanceHandlers || updates.all) {
            if (updates.distanceMarkers || updates.distanceLines ||
                updates.all) {
              let pp = this.pc_DistancePoints || [];
              if (updates.distanceMarkers || updates.all) {
                for (let i = pp.length; i < this.pc_DistanceMarkerLength || 0; i++) {
                  updateMarker (['pc_DistanceMarker', i], '--', {}, {
                    remove: true,
                  });
                }
              }
              if (this.pcLMap) {
                if (pp.length) {
                  if (!this.pc_DistanceLines) {
                    // recompute!
                    computedStyle = computedStyle || getComputedStyle (this);
                    let v = computedStyle.getPropertyValue
                        ('--paco-line-distance') || 'none';
                    this.pc_DistanceLines = [];
                    for (let w of v.split (/\s+\/\s+/)) {
                      let m = w.match (/^\s*(\S+)\s+([0-9.]+)px\s*$/);
                      if (m) {
                        this.pc_DistanceLines.push (L.polyline ([], {
                          color: m[1],
                          weight: parseFloat (m[2]),
                        }).addTo (this.pcLMap));
                      } else {
                        console.log ("Bad |--paco-line-distance| property value: |"+v+"|");
                        delete this.pc_DistanceLines;
                        break;
                      }
                    } // w
                  }
                  (this.pc_DistanceLines || []).forEach
                      (_ => _.setLatLngs (pp.map (_ => ({lat: _.lat, lng: _.lon}))));
                } else {
                  if (this.pc_DistanceLines) {
                    this.pc_DistanceLines.forEach (_ => _.remove ());
                    delete this.pc_DistanceLines;
                  }
                }
              } // pcLMap
              if (this.pc_MLMap) {
                let lines = [];
                if (pp.length) {
                  // recompute!
                  computedStyle = computedStyle || getComputedStyle (this);
                  let v = computedStyle.getPropertyValue
                      ('--paco-line-distance') || 'none';
                  for (let w of v.split (/\s+\/\s+/)) {
                    let m = w.match (/^\s*(\S+)\s+([0-9.]+)px\s*$/);
                    if (m) {
                      lines.push ({
                        type: 'Feature',
                        geometry: {
                          type: 'LineString',
                          coordinates: pp.map (c => [c.lon, c.lat]),
                        },
                        properties: {
                          color: m[1],
                          width: parseFloat (m[2]),
                        },
                      });
                    } else {
                      console.log ("Bad |--paco-line-distance| property value: |"+v+"|");
                      break;
                    }
                  } // w
                }
                this.pc_MLMap.getSource ('pc_DistanceLines').setData ({type: "FeatureCollection", features: lines});
              } // pc_MLMap
              if (updates.distanceMarkers) {
                let i = 0;
                (this.pc_DistancePoints || []).forEach ((p) => {
                  updateMarker (['pc_DistanceMarker', i++], '--paco-marker-distance-point', p, {
                    draggable: true,
                    redraw: updates.redrawMarkers,
                  });
                });
                this.pc_DistanceMarkerLength = i;
              }
            }
            if (updates.distanceHandlers) {
              this.pcDistanceSetters.forEach (_ => _ (this));
            }
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
        if (this.pcLMap || this.pc_MLMap) {
          let bounds = (this.pcLMap || this.pc_MLMap).getBounds ();
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

        throw new DOMException
            ('The map engine does not support this operation',
             'NotSupportedError');
      }, // getMapBounds

      pcScroll: function (opts) {
        /*
          m.pcScroll ({center})
          m.pcScroll ({center, ifNeeded: true})
          m.pcScroll ({center, setValue: true})
          m.pcScroll ({intoView: true})
          m.pcScroll ({intoView: true, ifNeeded: true})
        */

        if (opts.center) {
          var p = {
            lat: parseFloat (opts.center.lat),
            lon: parseFloat (opts.center.lon),
          };
          if (!Number.isFinite (p.lat)) p.lat = 0;
          if (!Number.isFinite (p.lon)) p.lon = 0;
          if (opts.ifNeeded) {
            var bounds = this.getMapBounds ();
            var h = bounds.north - bounds.south;
            var w = bounds.east - bounds.west;
            if (bounds.north - h/4 > p.lat && p.lat > bounds.south + h/4 &&
                bounds.east - w/4 > p.lon && p.lon > bounds.west + w/4) {
              //
            } else {
              if (!this.pc_NewView) this.pc_NewView = {};
              this.pc_NewView._source = 'scroll1';
              this.pc_NewView.lat = p.lat;
              this.pc_NewView.lon = p.lon;
              if (opts.noAnimation) this.pc_NewView.noAnimation = true;
              this.maRedraw ({view: true, valueMarker: opts.setValue});
              if (opts.setValue) this.pcValue = p;
            }
          } else {
            if (!this.pc_NewView) this.pc_NewView = {};
            this.pc_NewView._source = 'scroll2';
            this.pc_NewView.lat = p.lat;
            this.pc_NewView.lon = p.lon;
            if (opts.noAnimation) this.pc_NewView.noAnimation = true;
            this.maRedraw ({view: true, valueMarker: opts.setValue});
            if (opts.setValue) this.pcValue = p;
          }
        }

        if (opts.bounds || opts.includes) {
          var bounds = {};
          if (opts.bounds) {
            bounds.north = opts.bounds.north;
            bounds.south = opts.bounds.south;
            bounds.east = opts.bounds.east;
            bounds.west = opts.bounds.west;
          }
          if (opts.includes && opts.includes.length) {
            bounds.north = bounds.south = opts.includes[0].lat;
            bounds.east = bounds.west = opts.includes[0].lon;
            opts.includes.forEach (_ => {
              if (_.lat < bounds.south) bounds.south = _.lat;
              if (bounds.north < _.lat) bounds.north = _.lat;
              // XXX if _.lon ~ 180, ...
              if (_.lon < bounds.west) bounds.west = _.lon;
              if (bounds.east < _.lon) bounds.east = _.lon;
            });
          }
          if (Number.isFinite (bounds.north)) {
            if (this.pcLMap) this.pcLMap.fitBounds ([
              [bounds.north, bounds.west],
              [bounds.south, bounds.east],
            ]);
            if (this.pc_MLMap) this.pc_MLMap.fitBounds ([
              [bounds.west, bounds.south],
              [bounds.east, bounds.north],
            ]);
            if (this.maGoogleMap) this.maGoogleMap.fitBounds (bounds);
          }
        }

        if (opts.intoView) {
          if (opts.ifNeeded) {
            this.scrollIntoViewIfNeeded ();
          } else {
            this.scrollIntoView ();
          }
        }
      }, // pcScroll

      pc_AddAttribution: function (html) {
        if (this.pcLMap) this.pcLMap.attributionControl.addAttribution (html);
        if (this.pc_AttributionHTMLs) {
          this.pc_AttributionHTMLs.push (html);
          this.pc_UpdateAttribution ();
        }
      }, // pc_AddAttribution
      pc_RemoveAttribution: function (html) {
        if (this.pcLMap) this.pcLMap.attributionControl.removeAttribution (html);
        if (this.pc_AttributionHTMLs) {
          let index = this.pc_AttributionHTMLs.indexOf (html);
          if (index !== -1) this.pc_AttributionHTMLs.splice (index, 1);
          this.pc_UpdateAttribution ();
        }
      }, // pc_RemoveAttribution
      pc_UpdateAttribution: function (html) {
        if (this.pc_MLMap) {
          let map = this.pc_MLMap;
          let layers = (map.getStyle () || {}).layers || [];
          let ll = layers.filter (_ => _.id.match (/^paco-attribution-/));
          ll.forEach (_ => [map.removeLayer (_.id), map.removeSource (_.id)]);

          if (layers.length === 0 && this.pc_AttributionHTMLs.length === 0) {
            // Some of MapLibre GL features are broken when there is no layer.
            {
              let key = "paco-attribution-" + Math.random ();
              map.addSource (key, {
                type: 'geojson',
                data: {type: 'FeatureCollection', features: []},
              });
              map.addLayer ({
                id: key,
                type: 'symbol',
                source: key,
                layout: {'icon-image': 'marker-15'},
              });
            }
          } else {
            this.pc_AttributionHTMLs.forEach (html => {
              let key = "paco-attribution-" + Math.random ();
              map.addSource (key, {
                type: 'geojson',
                data: {type: 'FeatureCollection', features: []},
                attribution: html,
              });
              map.addLayer ({
                id: key,
                type: 'symbol',
                source: key,
                layout: {'icon-image': 'marker-15'},
              });
            });
          }
        }
      }, // pc_UpdateAttribution
      
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
        if (this.pcMapType !== type) {
          [this.pcMapType, this.pcMapTypeParam1] = type.split (/:/);
          this.maRedraw ({mapType: true});
        }
      }, // setMapType
      toggleJMANowc: function (_, type) {
        type = type || 'rain';
        this["pcJMANowc_" + type] = !!_;
        this.maRedraw ({mapType: true});
      }, // toggleJMANowc
      pcChangeMapType: function () {
        let sType = this.pcMapType;
        let sTypeParam1 = this.pcMapTypeParam1;
        let waits = [];

        if (this.pcLMap) {
          let map = this.pcLMap;
          let layers = [];
          let layers2 = [];

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

          let maxZoom = 21;
          let errorTileUrl = this.getAttribute ('noimgsrc') || noImageURL;
          let noTimestamp = false;
        if (type === 'gsi-standard') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push ({layer: wLayer});
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayerClipped});
        } else if (type === 'gsi-english') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 5,
                maxZoom,
              });
          layers.push ({layer: wLayer});
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 11,
                minNativeZoom: 5,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayerClipped});
        } else if (type === 'gsi-english-standard') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 5,
                maxZoom,
              });
          layers.push ({layer: wLayer});

          let jpLayer1 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 12,
                maxZoom,
                minZoom: 12,
              });
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 11,
                minNativeZoom: 5,
                maxZoom: Math.min (11, maxZoom) || 11,
                minZoom: 9,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer1Clipped});
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer2Clipped});
        } else if (type === 'gsi-hillshade') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 0,
                maxZoom,
              });
          layers.push ({layer: wLayer});

          let jpLayer1 = L.tileLayer
          ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23ededed'/%3E%3C/svg%3E", {
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer1Clipped});
          
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer2Clipped});
        } else if (type === 'gsi-standard-hillshade') {
          let wLayerH = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 0,
                maxZoom,
              });
          layers.push ({layer: wLayerH});

          let wLayerS = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
                opacity: 0.8,
              });
          layers.push ({layer: wLayerS});
          
          let jpLayer1 = L.tileLayer
          ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23ededed'/%3E%3C/svg%3E", {
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer1Clipped});
          
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer2Clipped});
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
                opacity: 0.8,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayerClipped});
        } else if (type === 'gsi-hillshade-standard') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 0,
                maxZoom,
                opacity: 0.6,
              });
          layers.push ({layer: wLayer});

          let jpLayer1 = L.tileLayer
          ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23ededed'/%3E%3C/svg%3E", {
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
                opacity: 0.6,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer1Clipped});
          
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
                opacity: 0.6,
              });
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer2Clipped});

          /*
          var wGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            //errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers2.push ({layer: wGSI});
          */
          
          let jpGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            //errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
            //minZoom: 9,
          });
          layers2.push ({layer: jpGSI});
          /*
          let jpGSIClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpGSI, {boundary: JPGSIMapBoundary});
              layers.push ({layer: jpGSIClipped});
          */
        } else if (type === 'gsi-hillshade-optimal_bvmap' ||
                   type === 'gsi-hillshade-optimal_bvmap-nocontour') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 0,
                maxZoom,
                opacity: 0.6,
              });
          layers.push ({layer: wLayer});

          let jpLayer1 = L.tileLayer
          ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23ededed'/%3E%3C/svg%3E", {
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
                opacity: 0.6,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer1Clipped});
          
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
                opacity: 0.6,
              });
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayer2Clipped});

          let gl = L.GridLayer.gsiOptimalBvmap ({
            maxZoom,
            contour: type === 'gsi-hillshade-optimal_bvmap',
          });
          let jpGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            //errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
            //minZoom: 9,
            //contour: false, (true not implemented)
          });
          layers2.push ({layer: gl, fallbackLayer: jpGSI});
        } else if (type === 'gsi-photo') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push ({layer: wLayer});
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayerClipped});
        } else if (type === 'gsi-photo-standard') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push ({layer: wLayer});
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayerClipped});

          let lGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers2.push ({layer: lGSI});
        } else if (type === 'gsi-photo-optimal_bvmap' ||
                   type === 'gsi-photo-optimal_bvmap-nocontour') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push ({layer: wLayer});          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push ({layer: jpLayerClipped});

          let gl = L.GridLayer.gsiOptimalBvmap ({
            maxZoom,
            contour: type === 'gsi-photo-optimal_bvmap',
          });
          let lGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
            //contour: false only
          });
          layers2.push ({layer: gl, fallbackLayer: lGSI});
        } else if (type === 'himawari') {
          let lHimawari = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'himawari',
            param1: sTypeParam1,
            noTimestamp,
          });
          layers.push ({layer: lHimawari});
          noTimestamp = true;
        } else if (type === 'himawari+gsi-standard') {
          let lHimawari = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'himawari',
            param1: sTypeParam1,
            noTimestamp,
          });
          layers.push ({layer: lHimawari});
          noTimestamp = true;
          let lGSI = L.gridLayer.gsiOverlay ({
            attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers2.push ({layer: lGSI});
        } else if (type === 'himawari+gsi-optimal_bvmap') {
          let lHimawari = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'himawari',
            param1: sTypeParam1,
            noTimestamp,
          });
          layers.push ({layer: lHimawari});
          noTimestamp = true;

          let gl = L.GridLayer.gsiOptimalBvmap ({
            maxZoom,
          });
          let lGSI = L.gridLayer.gsiOverlay ({
            attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers2.push ({layer: gl, fallbackLayer: lGSI});
        } else if (type === 'jma-umimesh-wind') {
          let layer = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'umimeshwind',
            noTimestamp,
          });
          layers.push ({layer: layer});
          noTimestamp = true;
          let layerD = L.tileLayer.jma ({
            maxZoom,
            type: 'umimeshwinddir',
            noTimestamp,
            map,
          });
          layers.push ({layer: layerD});
        } else if (type === 'jma-umimesh-wind+gsi-standard') {
          let layer = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'umimeshwind',
            noTimestamp,
          });
          layers.push ({layer: layer});
          noTimestamp = true;
          let layerD = L.tileLayer.jma ({
            maxZoom,
            type: 'umimeshwinddir',
            noTimestamp,
            map,
          });
          layers.push ({layer: layerD});
          let lGSI = L.gridLayer.gsiOverlay ({
            attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers2.push ({layer: lGSI});
        } else if (type === 'osm') {
          // <https://operations.osmfoundation.org/policies/tiles/>
          // <https://osmfoundation.org/wiki/Licence/Attribution_Guidelines>
          let wLayer = L.tileLayer
              ('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: osmCreditHTML,
                errorTileUrl,
                maxNativeZoom: 19,
                maxZoom,
              });
          layers.push ({layer: wLayer});
        } else if (type === 'osm-gsi-hillshade' ||
                   type === 'osm-gsi-hillshade+gsi-optimal_bvmap-label' ||
                   type === 'osm-gsi-hillshade+gsi-optimal_bvmap-contour-label') {
          let lShade = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                opacity: 0.8,
              });
          layers.push ({layer: lShade});
          let wLayer = L.tileLayer
              ('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: osmCreditHTML,
                errorTileUrl,
                maxNativeZoom: 19,
                maxZoom,
                opacity: 0.8,
              });
          layers.push ({layer: wLayer});
          // osm-gsi-hillshade+gsi-optimal_bvmap-label and
          // osm-gsi-hillshade+gsi-optimal_bvmap-contour-label not
          // supported, fallbacked here.
        } else if (type === 'gsi-optimal_bvmap' ||
                   type === 'gsi-optimal_bvmap-hillshade' ||
                   type === 'gsi-optimal_bvmap-nocontour-hillshade') {
          let gl = L.maplibreGL ({
            style: "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json",
            maxZoom,
          });
          layers.push ({layer: gl});
          // gsi-optimal_bvmap-hillshade and
          // gsi-optimal_bvmap-nocontour-hillshade not supported,
          // fallbacked to here.
        } else if (type === 'none') {
          //
        }

        if (this.pcJMANowc_rain) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'rain',
            noTimestamp,
          });
          layers.push ({layer: lNowc});
          noTimestamp = true;
        }
        if (this.pcJMANowc_thns) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'thns',
            noTimestamp,
          });
          layers.push ({layer: lNowc});
          noTimestamp = true;
        }
        if (this.pcJMANowc_trns) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'trns',
            noTimestamp,
          });
          layers.push ({layer: lNowc});
          noTimestamp = true;
        }
        ['precipitation10m', 'precipitation1h', 'precipitation3h',
         'precipitation24h', 'temp', 'sun1h', 'humidity',
         'snow', 'snow6h', 'snow12h', 'snow24h'].forEach (k => {
          if (this['pcJMANowc_' + k]) {
            let l = L.tileLayer.jma ({
              maxZoom,
              errorTileUrl,
              type: 'amedas',
              param1: k,
              noTimestamp,
              map,
            });
            layers.push ({layer: l});
            noTimestamp = true;
          }
        });
        if (this.pcJMANowc_wind) {
          let l = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'windDirection',
            noTimestamp,
            map,
          });
          layers.push ({layer: l});
          noTimestamp = true;
          let m = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'wind',
            noTimestamp,
            map,
          });
          layers.push ({layer: m});
        }

        layers = layers.concat (layers2);

        map.eachLayer (l => {
          if (l.pcIsMapTypeLayer) {
            try {
              map.removeLayer (l);
            } catch (e) {
              console.log ("Failed to remove map layer", e);
            }
          }
        });
        layers.forEach (l => {
          l.layer.pcIsMapTypeLayer = true;
          try {
            map.addLayer (l.layer);
          } catch (e) {
            console.log ("Failed to add map layer", e);
            try {
              map.removeLayer (l.layer);
            } catch (e) { }

            if (l.fallbackLayer) {
              l.fallbackLayer.pcIsMapTypeLayer = true;
              map.addLayer (l.fallbackLayer);
            }
          }
        });
        } // this.pcLMap

        if (this.pc_MLMap) {
          let map = this.pc_MLMap;
          let requested = [];
          let jmaLayers = [];
          let newStyleURL = null;
          let newStyleMode = null;

          let type = sType;
          if (sType === 'gsi-lang') {
            let s = getComputedStyle (this);
            let lang = s.getPropertyValue ('--paco--gsi-lang') || '';
            lang = lang.replace (/^\s+/, '').replace (/\s+$/, '');
            if (lang === 'gsi-english-standard') {
              type = 'gsi-english-standard';
            } else {
              type = 'gsi-standard';
            }
          }
          
          let noTimestamp = false;
          if (type === 'gsi-standard') {
            requested.push ('gsi-standard:8-');
            requested.push ('gsi-standard:9+');
          } else if (type === 'gsi-english') {
            requested.push ('gsi-english:8-');
            requested.push ('gsi-english:9+');
          } else if (type === 'gsi-english-standard') {
            requested.push ('gsi-english:8-');
            requested.push ('gsi-english:9-11');
            requested.push ('gsi-standard:12+');
          } else if (type === 'gsi-hillshade') {
            requested.push ('gsi-hillshade:8-');
            requested.push ('gsi-hillshade:9+');
          } else if (type === 'gsi-standard-hillshade') {
            requested.push ('gsi-hillshade:8-');
            requested.push ('gsi-standard:8-:overlay');
            requested.push ('gsi-hillshade:9+');
            requested.push ('gsi-standard:9+:overlay');
          } else if (type === 'gsi-hillshade-standard') {
            // not implemented
          } else if (type === 'gsi-hillshade-optimal_bvmap') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            newStyleMode = 'overlay';
            requested.push ('gsi-hillshade:8-');
            requested.push ('gsi-hillshade:9+');
          } else if (type === 'gsi-hillshade-optimal_bvmap-nocontour') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            newStyleMode = 'overlay-contour';
            requested.push ('gsi-hillshade:8-');
            requested.push ('gsi-hillshade:9+');
          } else if (type === 'gsi-photo') {
            requested.push ('gsi-photo:8-');
            requested.push ('gsi-photo:9+');
          } else if (type === 'gsi-photo-standard') {
            // not impplemented
          } else if (type === 'gsi-photo-optimal_bvmap') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            newStyleMode = 'overlay';
            requested.push ('gsi-photo:8-');
            requested.push ('gsi-photo:9+');
          } else if (type === 'gsi-photo-optimal_bvmap-nocontour') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            newStyleMode = 'overlay-contour';
            requested.push ('gsi-photo:8-');
            requested.push ('gsi-photo:9+');
          } else if (type === 'gsi-optimal_bvmap') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            requested.push ('gsi-standard:background');
          } else if (type === 'gsi-optimal_bvmap-hillshade') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            //newStyleMode = 'overlay';
            requested.push ('gsi-standard:background');
            requested.push ('gsi-hillshade:8-:shadow');
            requested.push ('gsi-hillshade:9+:shadow');
          } else if (type === 'gsi-optimal_bvmap-nocontour-hillshade') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            newStyleMode = '-contour';
            requested.push ('gsi-standard:background');
            requested.push ('gsi-hillshade:8-:shadow');
            requested.push ('gsi-hillshade:9+:shadow');
          } else if (type === 'himawari') {
            jmaLayers.push (L.tileLayer.jma ({
              //maxZoom,
              //errorTileUrl,
              type: 'himawari',
              param1: sTypeParam1,
              noTimestamp,
              mapLibre: true,
            }));
            noTimestamp = true;
          } else if (type === 'himawari+gsi-standard') {
            // Not implemented
          } else if (type === 'himawari+gsi-optimal_bvmap') {
            jmaLayers.push (L.tileLayer.jma ({
              //maxZoom,
              //errorTileUrl,
              type: 'himawari',
              param1: sTypeParam1,
              noTimestamp,
              mapLibre: true,
            }));
            noTimestamp = true;
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            newStyleMode = 'overlay';
          } else if (type === 'jma-umimesh-wind') {
            jmaLayers.push (L.tileLayer.jma ({
              //maxZoom,
              //errorTileUrl,
              type: 'umimeshwind',
              noTimestamp,
              mapLibre: true,
            }));
            noTimestamp = true;
            jmaLayers.push (L.tileLayer.jma ({
              //maxZoom,
              type: 'umimeshwinddir',
              noTimestamp,
              map,
              mapLibre: true,
            }));
          } else if (type === 'jma-umimesh-wind+gsi-standard') {
            // Not implemented
          } else if (type === 'osm') {
            // <https://operations.osmfoundation.org/policies/tiles/>
            // <https://osmfoundation.org/wiki/Licence/Attribution_Guidelines>
            requested.push ('osm');
          } else if (type === 'osm-gsi-hillshade') {
            requested.push ('gsi-hillshade:8-:overlay');
            requested.push ('gsi-hillshade:9+:overlay');
            requested.push ('osm:overlay');
          } else if (type === 'osm-gsi-hillshade+gsi-optimal_bvmap-label') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            newStyleMode = 'label';
            requested.push ('gsi-hillshade:8-:overlay');
            requested.push ('gsi-hillshade:9+:overlay');
            requested.push ('osm:overlay');
          } else if (type === 'osm-gsi-hillshade+gsi-optimal_bvmap-contour-label') {
            newStyleURL = "https://raw.githubusercontent.com/gsi-cyberjapan/optimal_bvmap/refs/heads/main/style/std.json";
            newStyleMode = 'contour+label';
            requested.push ('gsi-hillshade:8-:overlay');
            requested.push ('gsi-hillshade:9+:overlay');
            requested.push ('osm:overlay');
          } else if (type === 'none') {
            //
          }

          if (this.pcJMANowc_rain) {
            jmaLayers.push (L.tileLayer.jma ({
              //maxZoom,
              //errorTileUrl,
              type: 'rain',
              noTimestamp,
              mapLibre: true,
            }));
            noTimestamp = true;
          }
          if (this.pcJMANowc_thns) {
            jmaLayers.push (L.tileLayer.jma ({
              //maxZoom,
              //errorTileUrl,
              type: 'thns',
              noTimestamp,
              mapLibre: true,
            }));
            noTimestamp = true;
          }
          if (this.pcJMANowc_trns) {
            jmaLayers.push (L.tileLayer.jma ({
              //maxZoom,
              //errorTileUrl,
              type: 'trns',
              noTimestamp,
              mapLibre: true,
            }));
            noTimestamp = true;
          }
          ['precipitation10m', 'precipitation1h', 'precipitation3h',
           'precipitation24h', 'temp', 'sun1h', 'humidity',
           'snow', 'snow6h', 'snow12h', 'snow24h'].forEach (k => {
            if (this['pcJMANowc_' + k]) {
              jmaLayers.push (L.tileLayer.jma ({
                //maxZoom,
                //errorTileUrl,
                type: 'amedas',
                param1: k,
                noTimestamp,
                map,
                mapLibre: true,
              }));
              noTimestamp = true;
            }
          });
          if (this.pcJMANowc_wind) {
            jmaLayers.push (L.tileLayer.jma ({
              //maxZoom,
              //errorTileUrl,
              type: 'amedas',
              param1: 'wind',
              noTimestamp,
              map,
              mapLibre: true,
            }));
            noTimestamp = true;
          }

          waits.push (Promise.resolve ().then (() => {
            if (this.pc_MLCurrentStyleURL === newStyleURL &&
                this.pc_MLCurrentStyleMode === newStyleMode) return false;
            if (newStyleURL === null) {
              map.setStyle (null);
              map.setGlyphs ("https://gsi-cyberjapan.github.io/optimal_bvmap/glyphs/{fontstack}/{range}.pbf");
              this.pc_MLCurrentStyleURL = null;
              this.pc_MLCurrentStyleMode = null;
              this.pc_CurrentMLLayerIds = [];
              this.pc_CurrentMLSourceIds = [];
              (this.pc_CurrentMLLayerRemoves || []).forEach (_ => _ (this, map));
              this.pc_CurrentMLLayerRemoves = [];
              this.pc_UpdateAttribution ();
              return true;
            }

            this.pc_MLCurrentStyleURL = newStyleURL;
            this.pc_CurrentMLLayerIds = [];
            this.pc_CurrentMLSourceIds = [];
            (this.pc_CurrentMLLayerRemoves || []).forEach (_ => _ (this, map));
            this.pc_CurrentMLLayerRemoves = [];
            this.pc_MLCurrentStyleMode = newStyleMode;
            return new Promise ((ok, ng) => {
              //style: 'https://demotiles.maplibre.org/style.json',
              map.setStyle (newStyleURL, {
                transformStyle: (a, b) => {
                  ok (new Promise (ok => map.once ('styledata', ok)));
                  return b;
                },
              });
            }).then (() => {
              map.setLayoutProperty ("background", "visibility", 'none');
              if (newStyleMode === 'overlay' ||
                  newStyleMode === 'overlay-contour') {
                [
                  '\u884C\u653F\u533A\u753B', '\u6C34\u57DF', '\u5730\u5F62\u8868\u8A18\u9762',
                  '\u5EFA\u7BC9\u72690', '\u5EFA\u7BC9\u72691', '\u5EFA\u7BC9\u72692', '\u5EFA\u7BC9\u72693', '\u5EFA\u7BC9\u72694',
                ].forEach (layerId => {
                  map.setLayoutProperty (layerId, "visibility", 'none');
                });
        [
          '\u9053\u8DEF\u4E2D\u5FC3\u7DDA\u8272',
          '\u9053\u8DEF\u4E2D\u5FC3\u7DDA\u30AF\u30AF\u30EA',
          '\u9053\u8DEF\u4E2D\u5FC3\u7DDA\u8272\u6A4B',
          '\u9053\u8DEF\u4E2D\u5FC3\u7DDA\u30AF\u30AF\u30EA\u6A4B',
        ].forEach (layerId => {
          map.setPaintProperty (layerId + 0, "line-opacity", 0.3);
          map.setPaintProperty (layerId + 1, "line-opacity", 0.3);
          map.setPaintProperty (layerId + 2, "line-opacity", 0.3);
          map.setPaintProperty (layerId + 3, "line-opacity", 0.3);
          map.setPaintProperty (layerId + 4, "line-opacity", 0.3);
        });
                if (newStyleMode === 'overlay-contour') {
                  map.getStyle ().layers.forEach (layer => {
                    // 等高線 等深線
                    if (/\u7B49(?:\u9AD8|\u6DF1)\u7DDA/.test (layer.id)) {
                      map.setLayoutProperty (layer.id, "visibility", 'none');
                    }
                  });
                }
              } else if (newStyleMode === 'label') {
                map.getStyle ().layers.forEach (layer => {
                  // 注記
                  if (!/\u6CE8\u8A18/.test (layer.id)) {
                    map.setLayoutProperty (layer.id, "visibility", 'none');
                  }
                });
              } else if (newStyleMode === '-contour') {
                map.getStyle ().layers.forEach (layer => {
                  // 等高線 等深線
                  if (/\u7B49(?:\u9AD8|\u6DF1)\u7DDA/.test (layer.id)) {
                    map.setLayoutProperty (layer.id, "visibility", 'none');
                  }
                });
              } else if (newStyleMode === 'contour+label') {
                map.getStyle ().layers.forEach (layer => {
                  // 等高線 等深線 | 注記
                  if (!/\u7B49(?:\u9AD8|\u6DF1)\u7DDA|\u6CE8\u8A18/.test (layer.id)) {
                    map.setLayoutProperty (layer.id, "visibility", 'none');
                  }
                });
              } else {
                map.setPaintProperty ('\u6C34\u57DF', "fill-color", "rgba(190,210,255,0.3)");
              }
              this.pc_UpdateAttribution ();
              return true;
            });
          }).then (reloaded => {
            if (!reloaded) return;
            if (!this.pc_Terrain) {
              map.setTerrain (null);
              return;
            }
            
            /*
            map.addSource ("joerd", {
              type: 'raster-dem',
              tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
              attribution: '<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md">Tilezen Joerd: Attribution</a>',
              encoding: "terrarium",
            });
            map.setTerrain({source:"joerd", 'exaggeration': this.pc_Terrain});
            */

            /*
            map.addSource ("gsidem", {
              type: 'raster-dem',
              tiles: ['numpng://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png'],
              "minzoom": 1,
              "maxzoom": 14,
              attribution: gsiCreditHTML,
              tileSize: 256,
            });
            map.setTerrain ({'source': 'gsidem', 'exaggeration': this.pc_Terrain});
            */

            map.addSource ("aist-dem", {
              type: 'raster-dem',
              tiles: ['numpng://tiles.gsj.jp/tiles/elev/mixed/{z}/{y}/{x}.png'],
              attribution: '<a href="https://tiles.gsj.jp/tiles/elev/tiles.html">\u7523\u696D\u6280\u8853\u7DCF\u5408\u7814\u7A76\u6240 \u30B7\u30FC\u30E0\u30EC\u30B9\u6A19\u9AD8\u30BF\u30A4\u30EB(\u7D71\u5408DEM)</a>',
              tileSize: 256,
            });
            map.setTerrain ({source: 'aist-dem', 'exaggeration': this.pc_Terrain});
          }).then (() => {
            (this.pc_CurrentMLLayerIds || []).forEach (id => {
              try {
                map.removeLayer (id);
              } catch (e) {
                console.log (e);
              }
            });
            (this.pc_CurrentMLSourceIds || []).forEach (id => {
              try {
                map.removeSource (id);
              } catch (e) {
                console.log (e);
              }
            });
            (this.pc_CurrentMLLayerRemoves || []).forEach (_ => _ (this, map));
            this.pc_CurrentMLLayerRemoves = [];

            let sources = [];
            let layers = [];
            requested.forEach (id => {
              if (id === 'gsi-standard:8-') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                  maxzoom: 8,
                });
                map.addLayer ({id, type: "raster", source: id});
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-standard:8-:overlay') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                  maxzoom: 8,
                });
                map.addLayer ({id, type: "raster", source: id, paint: {
                  'raster-opacity': 0.8,
                }});
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-standard:9+') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp;https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                });
                map.addLayer({id: id, type: "raster", source: id, minzoom: 9});
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-standard:9+:overlay') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp;https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                });
                map.addLayer({id: id, type: "raster", source: id, paint: {
                  'raster-opacity': 0.8,
                }, minzoom: 9});
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-standard:12+') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp;https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                });
                map.addLayer({id: id, type: "raster", source: id, minzoom:12});
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-standard:background') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                  maxzoom: 8,
                });
                let ll = map.getStyle ().layers;
                map.addLayer ({
                  id: id,
                  type: 'raster',
                  source: id,
                }, (ll[0] || []).id);
                sources.push (id);
                layers.push (id);
                map.addSource ("jpmask", {
                  type: "geojson",
                  data: {
                    type: "Polygon",
                    coordinates: [JPGSIMapBoundary.map (_ => [_.lon, _.lat])],
                  },
                });
                sources.push ("jpmask");
                map.addLayer({
                  id: "jpmask",
                  type: "fill",
                  source: "jpmask",
                  minzoom: 4,
                  paint: {
                    "fill-color": "#ecf2f5",
                    "fill-opacity": 1,
                  },
                }, ll[0].id);
                layers.push ("jpmask");
              } else if (id === 'gsi-english:8-') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                  maxzoom: 8,
                });
                map.addLayer ({id, type: "raster", source: id});
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-english:9+') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp;https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                });
                map.addLayer({id: id, type: "raster", source: id, minzoom: 9});
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-english:9-11') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp;https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                  maxzoom: 11,
                });
                map.addLayer({id: id, type: "raster", source: id, minzoom: 9});
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-photo:9+') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp;https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg'],
                  tileSize: 256,
                  attribution: gsiPhotoCreditHTML,
                });
                let before = newStyleURL ? 'background' : undefined;
                map.addLayer ({id: id, type: "raster", source: id, minzoom: 9}, before);
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-photo:8-') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg'],
                  tileSize: 256,
                  attribution: gsiPhotoCreditHTML,
                  maxzoom: 8,
                });
                let before = newStyleURL ? 'background' : undefined;
                map.addLayer ({id, type: "raster", source: id}, before);
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-hillshade:8-') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};all,ededed;https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                  maxzoom: 8,
                });
                let before = newStyleURL ? 'background' : undefined;
                map.addLayer ({id: id, type: "raster", source: id, paint: {
                }}, before);
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-hillshade:8-:overlay') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};all,ededed;https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                  maxzoom: 8,
                });
                let before = newStyleURL ? 'background' : undefined;
                map.addLayer ({id: id, type: "raster", source: id, paint: {
                  'raster-opacity': 0.8,
                }}, before);
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-hillshade:8-:shadow') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};all,ededed;https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                  maxzoom: 8,
                });
                let before = newStyleURL ? '\u5730\u5F62\u8868\u8A18\u9762': undefined;
                map.addLayer ({id: id, type: "raster", source: id, paint: {
                  'raster-opacity': 0.05,
                }}, before);
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-hillshade:9+') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp,ededed;https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: gsiCreditHTML,
                });
                let before = newStyleURL ? 'background' : undefined;
                map.addLayer({id: id, type: "raster", source: id, minzoom: 9}, before);
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-hillshade:9+:overlay') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp,ededed;https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  maxzoom: 16,
                  attribution: gsiCreditHTML,
                });
                let before = newStyleURL ? 'background' : undefined;
                map.addLayer({id: id, type: "raster", source: id, paint: {
                  'raster-opacity': 0.8,
                }, minzoom: 9}, before);
                sources.push (id);
                layers.push (id);
              } else if (id === 'gsi-hillshade:9+:shadow') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['paco-clipped:///{x};{y};{z};jp,ededed;https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  maxzoom: 16,
                  attribution: gsiCreditHTML,
                });
                let before = newStyleURL ? '\u5730\u5F62\u8868\u8A18\u9762': undefined;
                map.addLayer({id: id, type: "raster", source: id, paint: {
                  'raster-opacity': 0.2,
                }, minzoom: 9}, before);
                sources.push (id);
                layers.push (id);
              } else if (id === 'osm') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: osmCreditHTML,
                });
                map.addLayer ({id: id, type: "raster", source: id});
                sources.push (id);
                layers.push (id);
              } else if (id === 'osm:overlay') {
                map.addSource (id, {
                  type: 'raster',
                  tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                  tileSize: 256,
                  attribution: osmCreditHTML,
                });
                let before = newStyleURL ? 'background' : undefined;
                map.addLayer ({id: id, type: "raster", source: id, paint: {
                  'raster-opacity': 0.8,
                }}, before);
                sources.push (id);
                layers.push (id);
              } else {
                throw new Error ("Bad layer ID |"+id+"|");
              }
            });

            let ll = map.getStyle ().layers;
            jmaLayers.forEach (lx => {
              if (lx.sourceId) {
                map.addSource (lx.sourceId, lx.source);
                sources.push (lx.sourceId);
              }
              lx.layers.forEach (l => {
                map.addLayer (l.layer, l.background ? ll[0].id : undefined);
                layers.push (l.layerId);
              });
              if (lx.onAdd) lx.onAdd (this, map);
              if (lx.onRemove) this.pc_CurrentMLLayerRemoves.push (lx.onRemove);
            });

            map.addSource ('pc_DistanceLines', {
              type: 'geojson',
              data: {type: "FeatureCollection", features: []},
              //attribution:
            });
            sources.push ('pc_DistanceLines');
            map.addLayer ({
              id: 'pc_DistanceLines',
              type: 'line',
              source: 'pc_DistanceLines',
              paint: {
                'line-color': ['get', 'color'],
                'line-width': ['get', 'width'],
              },
            });
            layers.push ('pc_DistanceLines');
            
            this.pc_CurrentMLLayerIds = layers;
            this.pc_CurrentMLSourceIds = sources;
          }));
        } // this.pc_MLMap

        Promise.all (waits).then (() => {
          this.classList.toggle ('paco-maptype-none', type === 'none');
          this.dispatchEvent (new Event ('pcMapTypeChange'));
        });
      }, // pcChangeMapType

      pc_ToggleCoordinatesControl: function (state) {
        if (state === undefined) {
          state = this.pc_CoordinatesControls ? false : true;
        }
        if (state) {
          if (this.pc_CoordinatesControls) {
            //
          } else {
            this.pc_CoordinatesControls = [];
            if (this.pcLMap) {
              let c = L.control.coordinatesControl ({
                position: 'topleft',
              });
              this.pc_CoordinatesControls.push (_ => c.remove ());
              c.addTo (this.pcLMap);
            }
            if (this.pc_MLMap) {
              let c = new MLCoordinatesControl ({});
              this.pc_CoordinatesControls.push (_ => this.pc_MLMap.removeControl (c));
              this.pc_MLMap.addControl (c, 'top-left');
            }
            Promise.resolve ().then (() => this.pcCoordinatesSetters.forEach (_ => _ (this, {value: true, redraw: true})));
            this.querySelectorAll ('.paco-map-state-control[value=coordinates]').forEach (c => c.checked = true);
          }
        } else {
          if (this.pc_CoordinatesControls) {
            this.pc_CoordinatesControls.forEach (_ => _ ());
            delete this.pc_CoordinatesControls;
            this.querySelectorAll ('.paco-map-state-control[value=coordinates]').forEach (c => c.checked = false);
          }
        }
      }, // pc_ToggleCoordinatesControl
      pc_ToggleDistanceMode: function (state) {
        if (state === undefined) {
          state = this.pc_DistanceControls ? false : true;
        }
        if (state) {
          if (this.pc_DistanceControls) {
            //
          } else {
            this.pc_DistanceControls = [];
            if (this.pcLMap) {
              let c = L.control.distanceControl ({
                position: 'topleft',
              });
              this.pc_DistanceControls.push (_ => c.remove ());
              c.addTo (this.pcLMap);
            }
            if (this.pc_MLMap) {
              let c = new MLDistanceControl ({});
              this.pc_MLMap.addControl (c, 'top-left');
              this.pc_DistanceControls.push (_ => this.pc_MLMap.removeControl (c));
            }
            this.querySelectorAll ('.paco-map-state-control[value=distance]').forEach (c => c.checked = true);
            this.classList.toggle ('paco-map-distance-mode', true);
          }
        } else {
          if (this.pc_DistanceControls) {
            this.pc_DistanceControls.forEach (_ => _ ());
            delete this.pc_DistanceControls;
            delete this.pc_DistancePoints;
            this.querySelectorAll ('.paco-map-state-control[value=distance]').forEach (c => c.checked = false);
            this.classList.toggle ('paco-map-distance-mode', false);
          }
        }
      }, // pc_ToggleDistanceControl

      pcInitCurrentPosition: function () {
        if (navigator.permissions && navigator.permissions.query) {
          navigator.permissions.query ({name: "geolocation"}).then (ps => {
            if (ps.state === 'granted') this.pcLocateCurrentPosition ({});
          });
        }
      }, // pcInitCurrentPosition
      pcLocateCurrentPosition: function (opts) {
        if (opts.pan) {
          if (this.pcCurrentPosition) {
            if (!this.pc_NewView) this.pc_NewView = {};
            this.pc_NewView._source = 'watch1';
            this.pc_NewView.lat = this.pcCurrentPosition.lat;
            this.pc_NewView.lon = this.pcCurrentPosition.lon;
            this.pc_NewView.zoom = 12;
            this.maRedraw ({view: true});
          } else {
            this.pcLocateCurrentPositionPanRequested = true;
          }
        }
        if (this.pcWatchPosition) return;
        this.pcWatchPosition = navigator.geolocation.watchPosition ((p) => {
          this.pcCurrentPosition = {
            lat: p.coords.latitude,
            lon: p.coords.longitude,
            latLonAccuracy: p.coords.accuracy,
            needRedraw: true,
          };
          this.style.setProperty
              ('--paco-geolocation-latlonaccuracy',
               (this.pcCurrentPosition.latLonAccuracy || 0) + 'm');
          this.maRedraw ({currentPositionMarker: true});
          if (this.pcLocateCurrentPositionPanRequested) {
            if (!this.pc_NewView) this.pc_NewView = {};
            this.pc_NewView._source = 'watch2';
            this.pc_NewView.lat = this.pcCurrentPosition.lat;
            this.pc_NewView.lon = this.pcCurrentPosition.lon;
            this.pc_NewView.zoom = 12;
            this.maRedraw ({view: true});
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

      pcStartStreetViewDragMode: function (src) {
        var handlers = [];
        this.addEventListener ('dragover', handlers[0] = ev => {
          ev.preventDefault ();
        });
        if (this.pcLMap) {
          this.addEventListener ('drop', handlers[1] = ev => {
            let ll = this.pcLMap.mouseEventToLatLng (ev);
            let u = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + ll.lat + ',' + ll.lng;
            window.open (u, '_blank', 'noreferrer');
          });
        } else if (this.pc_MLMap) {
          this.addEventListener ('drop', handlers[1] = ev => {
            let rect = this.getBoundingClientRect();
            let ll = this.pc_MLMap.unproject ([
              ev.clientX - rect.left,
              ev.clientY - rect.top,
            ]);
            let u = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + ll.lat + ',' + ll.lng;
            window.open (u, '_blank', 'noreferrer');
          });
        }

        src.addEventListener ('dragend', handlers[2] = ev => {
          this.removeEventListener ('dragover', handlers[0]);
          this.removeEventListener ('drop', handlers[1]);
          src.removeEventListener ('dragend', handlers[2]);
        });
      }, // pcStartStreetViewDragMode

      pc_MarkerMoveEnd: function (markerName, p) {
        if (markerName === 'pc_ValueMarker') {
          this.pcValue = p;
          this.dispatchEvent (new Event ('input', {bubbles: true, composed: true}));
          this.dispatchEvent (new Event ('change', {bubbles: true}));
          this.maRedraw ({valueMarkerHandlers: true, userActivated: true});
        } else if (markerName[0] === 'pc_DistanceMarker') {
          if (markerName[1] == null) markerName[1] = this.pc_DistanceMarkerLength++;
          this.pc_DistancePoints[markerName[1]] = p;
          this.maRedraw ({distanceLines: true, userActivated: true,
                          distanceHandlers: true});
        }
      }, // pc_MarkerMoveEnd

      addElementOverlays: function (elements, redraw) {
        var map = this.maGoogleMap;
        if (map) {
          var Overlay = function () { };
          Overlay.prototype = new google.maps.OverlayView ();
          Overlay.prototype.onAdd = function () {
            var panes = this.getPanes ();
            panes.overlayLayer.appendChild (elements.background);
            panes.overlayLayer.appendChild (elements.foreground);
            panes.floatPane.appendChild (elements.tooltip);
            panes.floatPane.appendChild (elements.interactive);
          }; // onAdd
          Overlay.prototype.draw = redraw;
          Overlay.prototype.onRemove = function () {
            Object.values (elements).forEach (_ => _.remove ());
          }; // onRemove

          var overlay = new Overlay;
          overlay.setMap (map);
          
          return {
            ready: () => !!overlay.getProjection (),
            getProjection: function () {
              var projection = overlay.getProjection ();
              return {
                divPoint: p => projection.fromLatLngToDivPixel ({lat: p.lat, lng: p.lon}),
                containerPoint: p => {
                  // Force Google Maps API to recalc, otherwise it
                  // sometimes return wrong result:-<
                  projection.fromLatLngToContainerPixel ({lat: p.lat, lng: p.lon});

                  return projection.fromLatLngToContainerPixel ({lat: p.lat, lng: p.lon});
                },
              };
            }, // getProjection
            clickable: (e) => L.DomEvent.disableClickPropagation (e),
          };
        } // maGoogleMap

        var zoomstart = () => Object.values (elements).forEach (_ => _.classList.toggle ('paco-zoomstart', true));
        var zoom = () => Object.values (elements).forEach (_ => _.classList.toggle ('paco-zoomstart', false));
        
        var Layer = L.Layer.extend ({
          onAdd: function (map) {
            // overlay shadow marker tooltip popup
            var p1 = map.getPane ('overlayPane');
            p1.appendChild (elements.background);
            var p2 = map.getPane ('shadowPane');
            p2.appendChild (elements.foreground);
            var p3 = map.getPane ('tooltipPane');
            p3.appendChild (elements.tooltip);
            p3.appendChild (elements.interactive);

            map.on ('zoomstart', zoomstart);
            map.on ('zoom', zoom);
            map.on ('zoomend zoom viewreset moveend', redraw);

            Promise.resolve ().then (redraw);
          }, // onAdd
          onRemove: function(map) {
            Object.values (elements).forEach (_ => _.remove ());
            map.off ('zoomstart', zoomstart);
            map.off ('zoom', zoom);
            map.off ('zoomend zoom viewreset moveend', redraw);
          }, // onRemove
        }); // Layer

        var map = this.pcLMap;
        
        var l = new Layer ({});
        map.addLayer (l);
        
        var pp = {
          divPoint: p => map.latLngToLayerPoint ({lat: p.lat, lng: p.lon}),
          containerPoint: p => map.latLngToContainerPoint ({lat: p.lat, lng: p.lon}),
        };
        return {
          ready: () => true,
          getProjection: () => pp,
          clickable: (e) => L.DomEvent.disableClickPropagation (e),
        };
      }, // addElementOverlays


      setMouseHandlers: function (opts) {
        var handlers = this.pcMouseHandlers || {};
        handlers.mousedown = opts.mousedown || (() => {});
        handlers.mousemove = opts.mousemove || (() => {});
        handlers.mouseup = opts.mouseup || (() => {});

        if (this.pcMouseHandlers) return;
        this.pcMouseHandlers = handlers;

        var TE = window.TouchEvent || function () {};
        var getMouseButton = function () {
          // this.event: Leaflet MouseEvent || Google Maps MouseEvent
          var ev = this.event;
          var me = ev.originalEvent; // Leaflet
          if (!me) {
            var x = [];
            for (var n in ev) {
              x.push (n);
              if (ev[n] instanceof MouseEvent || ev[n] instanceof TE) {
                me = ev[n];
                break;
              }
            }
          }
          if (!me) return 'default';
          
          if (me instanceof TE) {
            // me.button : undefined, me.which : 0
            return 'left';
          }
          
          // MouseEvent
          if (me.button === 0) {
            return 'left';
          } else if (me.button === 2) {
            return 'right';
          } else {
            return 'other';
          }
        }; // getMouseButton

        if (this.pcLMap) {
          var getPoint = function () {
            var p = this.event.latlng;
            return {lat: p.lat, lon: p.lng};
          };
          this.pcLMap.on ('mousedown', event => {
            handlers.mousedown ({event, getMouseButton, getPoint});
          });
          this.pcLMap.on ('mousemove', event => {
            handlers.mousemove ({event, getMouseButton, getPoint});
          });
          this.pcLMap.on ('mouseup', event => {
            var obj = {event, getMouseButton, getPoint};
            handlers.mousemove (obj);
            handlers.mouseup (obj);
          }); // mouseup
        }
        // XXXthis.pc_MLMap
        if (this.maGoogleMap) {
          var getPoint = function () {
            var p = this.event.latLng;
            return {lat: p.lat (), lon: p.lng ()};
          };
          this.maGoogleMap.addListener ('mousedown', event => {
            handlers.mousedown ({event, getMouseButton, getPoint});
          });
          this.maGoogleMap.addListener ('mousemove', event => {
            handlers.mousemove ({event, getMouseButton, getPoint});
          });
          this.maGoogleMap.addListener ('mouseup', event => {
            var obj = {event, getMouseButton, getPoint};
            
            // This is redundant but required for ChromeDriver + Google Maps :-<
            handlers.mousemove (obj);
            
            handlers.mouseup (obj);
          }); // mouseup
        }
      }, // setMouseHandlers
      
      pcModifyFormData: function (fd) {
        var latname = this.getAttribute ('latname') || '';
        var lonname = this.getAttribute ('lonname') || '';
        if (latname || lonname) {
          var v = this.valueAsLatLon;
          if (latname) fd.set (latname, v.lat);
          if (lonname) fd.set (lonname, v.lon);
        }
      }, // pcModifyFormData
    },
  }); // <map-area>

}) ();

/*

Copyright 2017-2025 Wakaba <wakaba@suikawiki.org>.

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
