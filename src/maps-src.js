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
      if (this.options.isLegend) e.classList.toggle ('paco-legend-control', true);
      if (this.options.styling) this.options.styling (e);
      L.DomEvent.disableClickPropagation (e);
      return e;
    }, // onAdd
  });
  L.control.elementControl = function (opts) {
    return new L.Control.ElementControl (opts);
  };
  L.control.fullscreenButton = function (opts) {
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
    
    return new L.Control.ElementControl (opts);
  }; // L.control.fullscreenButton
  L.control.currentPositionButton = function (opts) {
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
  }; // L.control.currentPositionButton
  L.control.streetViewButton = function (opts) {
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
    
    return new L.Control.ElementControl (opts);
  }; // L.control.streetViewButton
  L.control.mapTypeMenu = function (opts) {
    var c = document.createElement ('span');
    c.className = 'paco-menu-container';
    
    var m = document.createElement ('popup-menu');
    m.className = 'paco-map-type-menu';
    m.setAttribute ('menucontainer', 'map-area');
    m.innerHTML = '<button type=button class="paco-control-button paco-maptype-control-button">\u{1F5FA}</button><menu-main><menu-item><a data-href-template="https://www.google.com/maps?ll={lat},{lon}&z={zoomLevel}" target=_blank rel=noreferrer>Google Maps</a></menu-item><menu-item><a data-href-template="https://www.openstreetmap.org/?mlat={lat}&mlon={lon}&zoom={zoomLevel}" target=_blank rel=noreferrer>OpenStreetMap</a></menu-item><menu-item><a data-href-template="https://geohack.toolforge.org/geohack.php?params={lat};{lon}" target=_blank rel=noreferrer>Others...</a></menu-item><menu-item><a data-href-template="geo:{lat},{lon}" is=copy-url>Copy</a></menu-item></menu-main>';
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
      mi[3].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-copy-center-text'), 'Copy center coordinates');

      if (e.hasAttribute ('jma')) {
        var mm = m.querySelector ('menu-main');
        var nodes = document.createElement ('div');
        nodes.innerHTML = '<menu-item><label><input type=checkbox> <span>Rain</span></label></menu-item><menu-item><popup-menu><button type=button class=paco-control-button>Meteorological</button><menu-main><menu-item><label><input type=checkbox> <span>Thunder</span></label></menu-item><menu-item><label><input type=checkbox> <span>Tornado</span></label></menu-item><menu-item><label><input type=checkbox> <span>Temperature</span></label></menu-item><menu-item><label><input type=checkbox> <span>Precipitation 10m</span></label></menu-item><menu-item><label><input type=checkbox> <span>Precipitation 1h</span></label></menu-item><menu-item><label><input type=checkbox> <span>Precipitation 3h</span></label></menu-item><menu-item><label><input type=checkbox> <span>Precipitation 24h</span></label></menu-item></menu-main></popup-menu></menu-item><hr>';
        var ins = nodes.querySelectorAll ('input');
        ins[0].onchange = (ev) => e.toggleJMANowc (ev.target.checked, 'rain');
        ins[1].onchange = (ev) => e.toggleJMANowc (ev.target.checked, 'thns');
        ins[2].onchange = (ev) => e.toggleJMANowc (ev.target.checked, 'trns');
        ins[3].onchange = (ev) => e.toggleJMANowc (ev.target.checked, 'temp');
        ins[4].onchange = (ev) => e.toggleJMANowc (ev.target.checked, 'precipitation10m');
        ins[5].onchange = (ev) => e.toggleJMANowc (ev.target.checked, 'precipitation1h');
        ins[6].onchange = (ev) => e.toggleJMANowc (ev.target.checked, 'precipitation3h');
        ins[7].onchange = (ev) => e.toggleJMANowc (ev.target.checked, 'precipitation24h');
        var sRain = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jmanowc-current-text'), 'Rain');
        var sThns = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jmanowc-thns-current-text'), 'Thunder');
        var sTrns = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jmanowc-trns-current-text'), 'Tornado');
        var lbs = nodes.querySelectorAll ('label span');
        lbs[0].textContent = sRain;
        lbs[1].textContent = sThns;
        lbs[2].textContent = sTrns;
        lbs[3].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jma-amedas-temp-text'), 'Temperature');
        lbs[4].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jma-amedas-precipitation10m-text'), 'Precipitation 10m');
        lbs[5].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jma-amedas-precipitation1h-text'), 'Precipitation 1h');
        lbs[6].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jma-amedas-precipitation3h-text'), 'Precipitation 3h');
        lbs[7].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-jma-amedas-precipitation24h-text'), 'Precipitation 24h');
        nodes.querySelector ('button').textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-menu-meteorological'), 'Meteorological');
        Array.prototype.slice.call (nodes.childNodes).reverse ().forEach (_ => mm.insertBefore (_, mm.firstChild));
      } // jma=""

      if (e.hasAttribute ('gsi')) {
        var mm = m.querySelector ('menu-main');
        var nodes = document.createElement ('div');
        nodes.innerHTML = '<menu-item><popup-menu data-true=gsi-standard-hillshade data-false=gsi-lang><button type=button class=paco-control-button>Map</button><menu-main><menu-item><label><input type=checkbox> <span>Hillshade</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><popup-menu data-true=gsi-photo-standard data-false=gsi-photo data-label=photo><button type=button class=paco-control-button>Photo</button><menu-main class=paco-photo-menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><popup-menu data-true=gsi-hillshade-standard data-false=gsi-hillshade><button type=button class=paco-control-button>Hillshade</button><menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><button type=button class=paco-maptype-button data-true=none>None</button></menu-item><hr>';
        let nb = nodes.querySelector ('menu-item:last-of-type button');
        let nps = [nodes.querySelector ('.paco-photo-menu-main')];
        
        var pms = Array.prototype.slice.call (nodes.querySelectorAll ('popup-menu'));
        Array.prototype.slice.call (nodes.childNodes).reverse ().forEach (_ => mm.insertBefore (_, mm.firstChild));
        
        if (opts.buttons) {
          var n = document.createElement ('span');
          n.className = 'paco-menu-button-container';
          n.innerHTML = '<popup-menu data-true=gsi-standard-hillshade data-false=gsi-lang><button type=button class=paco-control-button>Map</button><menu-main><menu-item><label><input type=checkbox> <span>Hillshade</span></label></menu-item></menu-main></popup-menu><popup-menu data-true=gsi-photo-standard data-false=gsi-photo data-label=photo><button type=button class=paco-control-button>Photo</button><menu-main class=paco-photo-menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu><popup-menu data-true=gsi-hillshade-standard data-false=gsi-hillshade><button type=button class=paco-control-button>Hillshade</button><menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu>';
          pms = pms.concat (Array.prototype.slice.call (n.querySelectorAll ('popup-menu')));

          c.insertBefore (n, c.firstChild);
          m.firstChild.textContent = '\u22EF';
          nps.push (n.querySelector ('.paco-photo-menu-main'));
        } // controls=typebuttons

        var sMap = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-map-text'), 'Map');
        var sMapLabel = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-maplabel-text'), 'Labels');
        var sHillshade = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-hillshade-text'), 'Hillshade');
        var sNone = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-none-text'), 'None');
        var buttonLabels = {
          'gsi-lang': sMap,
          'photo': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-photo-text'), 'Photo'),
          'gsi-photo': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-gsi-photo-text'), 'Photo'),
          'gsi-hillshade': sHillshade,
          'gsi-standard-hillshade': sHillshade,
          'gsi-photo-standard': sMapLabel,
          'gsi-hillshade-standard': sMapLabel,
          'himawari:B13/TBB': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-ir-text'), 'Himawari (B13/TBB)'),
          'himawari:B03/ALBD': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-vis-text'), 'Himawari (B03/ALBD)'),
          'himawari:B08/TBB': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-vap-text'), 'Himawari (B08/TBB)'),
          'himawari:REP/ETC': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-color-text'), 'Himawari (REP/ETC)'),
          'himawari:SND/ETC': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-strengthen-text'), 'Himawari (SND/ETC)'),
        };

        if (e.hasAttribute ('jma')) {
          nps.forEach (p => {
            let m = document.createElement ('menu-item');
            p.appendChild (m);
            m.outerHTML = '<menu-item><button type=button data-false=gsi-photo data-true=gsi-photo-standard>Photo</button></menu-item><menu-item><button type=button data-false=himawari:B13/TBB data-true=himawari+gsi-standard:B13/TBB>Himawari (B13/TBB)</button></menu-item><menu-item><button type=button data-false=himawari:B03/ALBD data-true=himawari+gsi-standard:B03/ALBD>Himawari (B03/ALBD)</button></menu-item><menu-item><button type=button data-false=himawari:B08/TBB data-true=himawari+gsi-standard:B08/TBB>Himawari (B08/TBB)</button></menu-item><menu-item><button type=button data-false=himawari:REP/ETC data-true=himawari+gsi-standard:REP/ETC>Himawari (REP/ETC)</button></menu-item><menu-item><button type=button data-false=himawari:SND/ETC data-true=himawari+gsi-standard:SND/ETC>Himawari (SND/ETC)</button></menu-item>';
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
            button.textContent = buttonLabels[button.getAttribute ('data-false') || pm.getAttribute ('data-label') || pm.getAttribute ('data-false')];
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

    return new L.Control.ElementControl (opts);
  }; // L.control.mapTypeMenu

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
  
  L.control.timestampControl = function (opts) {
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
    return new L.Control.ElementControl (opts);
  }; // L.control.timestampControl

  var JMAMaps = {
    hrpns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/hrpns/{z}/{x}/{y}.png',
      nextDelta: 5,
      currentDelta: 5,
      nowDelta: 2,
      maxNativeZoom: 10,
      opacity: 0.8,
      zooms: [],
    },
    thns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/thns/{z}/{x}/{y}.png',
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 5,
      maxNativeZoom: 9,
      opacity: 0.5,
      zooms: [],
    },
    trns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/trns/{z}/{x}/{y}.png',
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 5,
      maxNativeZoom: 9,
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
    if (mapDef.isGeoJSON) {
      let mapper = (_, __) => _;
      let dataType = 'direction';
      let propKey = 'value';
      if (mapDef.jmaLinkType === 'amedas') {
        let key = opts.param1 || mapDef.param1;
        mapper = (json, amedas) => {
          let features = [];
          Object.keys (json).forEach (aKey => {
            let w = json[aKey];
            let v = w[key];
            if (v && v[1] == 0) {
              let a = amedas[aKey] || {lat: [], lon: []};
              features.push ({
                type: 'Feature',
                properties: {
                  value: v[0],
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
        dataType = key || 'value';
      } else {
        propKey = 'windDir';
      }
      let pointToLayer;
      if (dataType === 'direction') {
        pointToLayer = function (feature, latlng) {
          let wd = feature.properties[propKey];
          let html = {
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
            html,
            className: 'paco-map-value-' + dataType,
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
        }[dataType];
        let toColor = {
          temp: _ => Math.floor (_ / 5) * 5,
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
        }[dataType];
        pointToLayer = function (feature, latlng) {
          let value = feature.properties[propKey];
          let div = document.createElement ('div');
          div.innerHTML = '<data></data>';
          div.firstChild.textContent = value.toFixed (sub);
          div.firstChild.className = 'paco-map-value-' + dataType + '-' + toColor (value);
          let icon = L.divIcon ({
            html: div.innerHTML,
            className: 'paco-map-value-value',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
          return L.marker (latlng, {icon});
        };
      }
      layer = L.geoJSON ({type: "FeatureCollection", features: []}, {
        pointToLayer,
      });
      let prevU = null;
      refetch = (time, layer) => {
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
          layer.clearLayers ();
          layer.addData (mapper (json, amedas));
        }).catch (e => {
          prevU = null;
          throw e;
        });
      };
      refetch (time, layer);
    } else {
      layer = L.tileLayer (mapDef.pattern, {
        attribution: '<a href=https://www.jma.go.jp/jma/kishou/info/coment.html target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>',
        errorTileUrl: opts.errorTileUrl,
        maxNativeZoom: mapDef.maxNativeZoom,
        minNativeZoom: mapDef.minNativeZoom || 4,
        maxZoom: opts.maxZoom,
        opacity: mapDef.opacity,
        urlTimestamp0: time.urlTimestamp0,
        urlTimestamp: time.prevFormatted,
        param1: opts.param1 || mapDef.param1,
      });
      refetch = (time, layer) => {
        layer.options.urlTimestamp = time.prevFormatted;
        layer.options.urlTimestamp0 = time.urlTimestamp0;
        layer.options.param1 = opts.param1 || time.mapDef.param1;
        layer.setUrl (time.mapDef.pattern, false);
      };
    }
    
    var needReload = false;
    var needUpdate = false;
    var timeout;
    let updateTimeElements = () => {};
    var prevTimePrev = null;
    var requestReload = (layer, time) => {
      if (!needReload) return;
      time = time || getTime ();
      if (prevTimePrev === time.prev) return;
      prevTimePrev = time.prev;
      if (needUpdate) clearTimeout (timeout);
      timeout = setTimeout (() => {
        if (!needReload) return;
        var time = getTime ();
        refetch (time, layer);
        updateTimeElements (time);
        if (explicitTime) needReload = false;
        requestReload (layer, time);
      }, needUpdate ? 0 : time.delta);
      needUpdate = false;
    }; // requestReload

    let legends = [];
    if (!opts.noTimestamp) {
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

    if (mapDef.isUmiWind) {
      let t = document.createElement ('map-controls');
      t.className = 'paco-jma-legend-control';
      t.innerHTML = '<img src=https://www.jma.go.jp/bosai/umimesh/images/legend_deep_ws.svg referrerpolicy=no-referrer>';
      let ec = new L.Control.ElementControl ({
        element: t,
        position: 'bottomleft',
        isLegend: true,
      });
      legends.push (ec);
    }

    let map;
    let ba = layer.beforeAdd;
    if (ba) {
      layer.beforeAdd = function (_) {
        map = _;
        return ba.apply (this, arguments);
      };
    } else {
      map = opts.map;
    }

    var timeSetter = (newTime) => {
      explicitTime = newTime * 1000; // or NaN
      needReload = needUpdate = true;
      requestReload (layer, null);
    }; // timeSetter

    let zoomChanged = null;
    if (mapDef.zooms.length) {
      zoomChanged = () => {
        let newZ = map.getZoom ();
        if (mapDef.zooms[newZ] !== mapDef.zooms[currentZ]) {
          needReload = needUpdate = true;
        }
        currentZ = newZ;
        requestReload (layer, null);
      }; // zoomChanged
    }
    
    layer.on ('add', ev => {
      needReload = true;
      requestReload (ev.target, null);
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
        this.ready = new Promise ((r) => this.maRedrawNeedUpdated.onready = r);

        this.pcValue = {lat: 0, lon: 0};
        var initialValue = this.valueAsLatLon;
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
            this.maRedraw ({valueMarker: true});
          },
        });

        this.pcZoomLevel = this.maAttrFloat ('zoom', 8);

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
            zoom: this.pcZoomLevel,
            gestureHandling: "greedy",
            styles: [
              {featureType: "poi", elementType: "all", stylers: [{visibility: "off"}]},
              {featureType: "landscape", elementType: "all", stylers: [{visibility: "off"}]},
            ],
            draggable: !this.pcNoMapDraggable,
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
          var mo = new MutationObserver ((mutations) => {
            var latlon = false;
            mutations.forEach (mr => {
              if (mr.attributeName === 'lat' ||
                  mr.attributeName === 'lon') {
                latlon = true;
              } else if (mr.attributeName === 'readonly') {
                this.maRedraw ({readonly: true});
              } else if (mr.attributeName === 'zoom') {
                this.pcZoomLevel = this.maAttrFloat ('zoom', 8);
                this.maRedraw ({zoom: true});
              }
            });

            if (latlon) this.maRedraw ({
              center: {
                lat: this.maAttrFloat ('lat', 0),
                lon: this.maAttrFloat ('lon', 0),
              },
              value: true,
            });
          });
          mo.observe (this, {attributeFilter: ['lat', 'lon', 'readonly',
                                               'zoom']});
          this.maCenter = this.pcValue = {
            lat: this.maAttrFloat ('lat', 0),
            lon: this.maAttrFloat ('lon', 0),
          };
          
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
              this.pcMarkerMoveEnd ({lat: p.lat (), lon: p.lng ()});
              this.maRedraw ({valueMarker: true, userActivated: true});
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
          var latlon = false;
          mutations.forEach (mr => {
            if (mr.attributeName === 'lat' ||
                mr.attributeName === 'lon') {
              latlon = true;
            } else if (mr.attributeName === 'zoom') {
              this.pcZoomLevel = this.maAttrFloat ('zoom', 8);
              this.maRedraw ({zoom: true});
            }
          });

          if (latlon) this.maRedraw ({
            center: {
              lat: this.maAttrFloat ('lat', 0),
              lon: this.maAttrFloat ('lon', 0),
            },
            value: true,
          });
        });
        mo.observe (this, {attributeFilter: ['lat', 'lon', 'zoom']});
        this.maCenter = this.pcValue = {
          lat: this.maAttrFloat ('lat', 0),
          lon: this.maAttrFloat ('lon', 0),
        };
        return Promise.resolve ().then (() => this.maRedraw ({all: true}));
      }, // maInitGoogleMapsEmbed
      pcInitLeaflet: function () {
        (new MutationObserver ((mutations) => {
          var latlon = false;
          mutations.forEach (mr => {
            if (mr.attributeName === 'lat' ||
                mr.attributeName === 'lon') {
              latlon = true;
            } else if (mr.attributeName === 'readonly') {
              this.maRedraw ({readonly: true});
            } else if (mr.attributeName === 'zoom') {
              this.pcZoomLevel = this.maAttrFloat ('zoom', 8);
              this.maRedraw ({zoom: true});
            } else if (mr.attributeName === 'maptype') {
              this.setMapType (this.getAttribute ('maptype'));
            }
          });

          if (latlon) this.maRedraw ({
            center: {
              lat: this.maAttrFloat ('lat', 0),
              lon: this.maAttrFloat ('lon', 0),
            },
            value: true,
          });
        })).observe (this, {attributeFilter: ['lat', 'lon', 'readonly',
                                              'zoom', 'maptype']});
        this.maCenter = this.pcValue = {
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
                        currentposition: true, type: true,
                        streetview: true};
          }
        }

        // recompute!
        var s = getComputedStyle (this);
        var v = s.getPropertyValue ('--paco-map-click-action') || 'none';
        var w = s.getPropertyValue ('--paco-map-touch-scroll-viewport') || 'auto';
        var za = s.getPropertyValue ('--paco-map-zoom-animation') || 'auto';

        var opts = {
          zoomControl: false,
          wheelPxPerZoomLevel: 60 * 3,
          dragging: !this.pcNoMapDraggable,
        };
        if (za.match (/^\s*none\s*$/)) opts.zoomAnimation = false;
        var map = this.pcLMap = L.map (this, opts);

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
        map.setView (this.maCenter, this.pcZoomLevel);
        
        if (v.match (/^\s*set-value\s*$/)) {
          map.on ('click', ev => {
            var p = ev.latlng;
            this.pcMarkerMoveEnd ({lat: p.lat, lon: p.lng});
            this.maRedraw ({valueMarker: true, userActivated: true});
          });            
        }

        if (w.match (/^\s*none\s*$/)) {
          this.classList.toggle ('paco-touch-scroll-viewport-none', true);
        }

        var initialMapType = this.getAttribute ('maptype');
        if (this.hasAttribute ('gsi') && !initialMapType) {
          initialMapType = 'gsi-lang';
        }
        if (initialMapType) this.setMapType (initialMapType);

        map.pcAddTimeSetter = (code) => {
          this.pcTimeSetters.push (code);
        }; // addTimeSetter
        map.pcRemoveTimeSetter = (code) => {
          this.pcTimeSetters = this.pcTimeSetters.filter (_ => _ !== code);
        }; // removeTimeSetter
        
        new MutationObserver ((mutations) => {
          this.maRedraw ({controls: true});
        }).observe (this, {childList: true});
        this.maRedraw ({controls: true, valueMarker: true,
                        relocate: true});
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
          if (opts[n]) this.maRedrawNeedUpdated[n] = opts[n];
        }

        if (this.maRedrawNeedUpdated.center) {
          var p = {
            lat: this.maRedrawNeedUpdated.center.lat,
            lng: this.maRedrawNeedUpdated.center.lon,
          };
          if (this.pcLMap) {
            this.pcLMap.panTo (p);
          } else if (this.maGoogleMap) {
            this.maGoogleMap.panTo (p);
          } else {
            this.maCenter = this.maRedrawNeedUpdated.center;
            this.maRedrawNeedUpdated.all = true;
          }
          if (this.maRedrawNeedUpdated.value) {
            this.pcValue = this.maRedrawNeedUpdated.center;
            this.maRedrawNeedUpdated.valueMarker = true;
          }
          delete this.maRedrawNeedUpdated.center;
          delete this.maRedrawNeedUpdated.value;
          delete this.maRedrawNeedUpdated.pan;
        } // center

        if (this.maRedrawNeedUpdated.zoom ||
            this.maRedrawNeedUpdated.all) {
          if (this.pcLMap || this.maGoogleMap) {
            (this.pcLMap || this.maGoogleMap).setZoom (this.pcZoomLevel);
          }
        }

        if (this.maRedrawNeedUpdated.mapDraggable) {
          if (this.pcLMap) {
            if (this.pcNoMapDraggable) {
              this.pcLMap.dragging.disable ();
            } else {
              this.pcLMap.dragging.enable ();
            }
          } else if (this.maGoogleMap) {
            this.maGoogleMap.setOptions ({draggable: !this.pcNoMapDraggable});
          }
          delete this.maRedrawNeedUpdated.mapDraggable;
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

          if (updates.size || updates.all) {
            if (this.maEngine === 'googlemaps') {
              google.maps.event.trigger (this.maGoogleMap, 'resize');
            } else if (this.maEngine === 'leaflet') {
              this.pcLMap.invalidateSize ();
            }
          }
          if (updates.size || updates.zoom || updates.all) {
            if (this.maEngine === 'googlemapsembed') {
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
                    isLegend: e.hasAttribute ('legend'),
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

          var computedStyle;
          var updateMarker = (markerName, propName, pos, opts) => {
            if (this[markerName]) {
              if (this[markerName].setLatLng) {
                this[markerName].setLatLng (pos);
              } else {
                this[markerName].setPosition ({
                  lat: pos.lat,
                  lng: pos.lon,
                });
              }
              if (this[markerName].dragging) {
                if (opts.draggable) {
                  this[markerName].dragging.enable ();
                } else {
                  this[markerName].dragging.disable ();
                }
              }
              if (this[markerName].setOptions) {
                this[markerName].setOptions ({draggable: opts.draggable});
              }
              return;
            }
              
            // recompute!
            computedStyle = computedStyle || getComputedStyle (this);
            var v = computedStyle.getPropertyValue (propName) || 'none';

            if (v.match (/^\s*none\s*$/)) {
              this[markerName] = {setLatLng: () => {}};
              return;
            }

            var icon = null;
            var m = v.match (/^\s*("[^"]*"|'[^']*')\s+(\S+)\s+(\S+)\s*$/);
            if (m) {
              var mt = document.createElement ('span');
              var s = this.pcInternal.parseCSSString (m[1], null);
              if (s) {
                mt.textContent = s;
                var mc = document.createElement ('span');
                mc.textContent = m[2];
                var ms = document.createElement ('span');
                ms.textContent = m[3];
                icon = {iconSize: [m[3], m[3]]};
                var mss = ms.innerHTML;
                icon.iconUrl = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+mss+' '+mss+'"><text x="calc('+mss+'/2)" y="calc('+mss+'/2)" width="'+mss+'" height="'+mss+'" font-size="'+mss+'" text-anchor="middle" alignment-baseline="central" fill="'+mc.innerHTML+'">'+mt.innerHTML+'</text></svg>');
              }
            } else {
              m = v.match (/^\s*url\(((?:[^()"'\\]|\\[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])+)\)\s*$/);
              if (m) {
                icon = {
                  // XXX
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  tooltipAnchor: [16, -28],
                };
                icon.iconUrl = m[1].replace (/\\(.)/g, (_, v) => v);
              } else {
                m = v.match (/^\s*circle\s+(\S+)\s+([0-9.]+)px\s*$/);
                if (m) {
                  var c = m[1];
                  var s = document.createElement ('span');
                  s.textContent = c;
                  var r = parseFloat (m[2]);
                  icon = {iconSize: [r*2, r*2]};
                  icon.iconUrl = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+r*2+'px '+r*2+'px"><circle cx="'+r+'" cy="'+r+'" r="'+r+'" fill="'+s.innerHTML+'"/></svg>');
                }
              }
            }

            if (icon) {
              if (this.pcLMap) {
                this[markerName] = L.marker (pos, {
                  draggable: !!opts.draggable,
                  //title: "",
                  icon: L.icon (icon),
                }).addTo (this.pcLMap);
                this[markerName].on ('moveend', ev => {
                  var p = this[markerName].getLatLng ();
                  this.pcMarkerMoveEnd ({
                    lat: p.lat,
                    lon: p.lng,
                  });
                });
                return;
              } else if (this.maGoogleMap) {
                var size = null;
                if (icon.iconSize) size = { // must be in px
                  width: parseFloat (icon.iconSize[0]),
                  height: parseFloat (icon.iconSize[1]),
                };
                this[markerName] = new google.maps.Marker ({
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
                this[markerName].addListener ('dragend', ev => {
                  var p = ev.latLng;
                  this.pcMarkerMoveEnd ({
                    lat: p.lat (),
                    lon: p.lng (),
                  });
                });
                return;
              }
            } // markerURL

            m = v.match (/^\s*circle\s+(\S+)\s+([0-9.]+)m\s+(\S+)\s+([0-9.]+)px\s*$/);
            if (m) {
              var fill = m[1];
              var radius = parseFloat (m[2]);
              var stroke = m[3];
              var strokeSize = parseFloat (m[4]);
              if (this.pcLMap) {
                this[markerName] = L.circle (pos, {
                  fill: true,
                  fillColor: fill,
                  radius: radius,
                  color: stroke,
                  weight: strokeSize,
                }).addTo (this.pcLMap);
                return;
              } else if (this.maGoogleMap) {
                this[markerName] = new google.maps.Circle ({
                  center: {
                    lat: pos.lat,
                    lng: pos.lon,
                  },
                  radius,
                  fillColor: fill,
                  strokeColor: stroke,
                  strokeWeight: strokeSize,
                  map: this.googleMap,
                });
                return;
              }
            } // circle
            
            if (!markerURL) console.log ("Bad |"+propName+"| value: |"+v+"|");
          }; // updateMarker

          if (updates.currentPositionMarker || updates.all) {
            if (this.pcCurrentPosition) {
              updateMarker ('pcCurrentPositionMarker', '--paco-marker-currentposition', this.pcCurrentPosition, {});
            }
          } // currentPositionMarker

          if (updates.valueMarker || updates.readonly || updates.all) {
            updateMarker ('pcValueMarker', '--paco-marker-value', this.pcValue, {
              draggable: !this.hasAttribute ('readonly'),
            });
          } // valueMarker
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
              this.maRedraw ({center: p, value: opts.setValue});
            }
          } else {
            this.maRedraw ({center: p, value: opts.setValue});
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
        let map = this.pcLMap;

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

        var maxZoom = 21;
        var errorTileUrl = this.getAttribute ('noimgsrc') || noImageURL;
        if (type === 'gsi-standard') {
          var lStd = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push (lStd);
        } else if (type === 'gsi-english') {
          var lEng = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 11,
                minNativeZoom: 5,
                maxZoom,
              });
          layers.push (lEng);
        } else if (type === 'gsi-hillshade') {
          var lShade = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push (lShade);
        } else if (type === 'gsi-photo') {
          var lPhoto = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push (lPhoto);
        } else if (type === 'gsi-standard-hillshade') {
          var lShade = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                opacity: 0.8,
              });
          layers.push (lShade);
          var lStd = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                opacity: 0.8,
              });
          layers.push (lStd);
        } else if (type === 'gsi-hillshade-standard') {
          var lGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          var lShade = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                opacity: 0.6,
              });
          layers.push (lShade);
          layers.push (lGSI);
        } else if (type === 'gsi-photo-standard') {
          var lPhoto = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
             });
          layers.push (lPhoto);
          let lGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
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
            maxZoom,
          });
          layers.push (lGSI);
        } else if (type === 'himawari') {
          let lHimawari = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'himawari',
            param1: sTypeParam1,
            noTimestamp,
          });
          layers.push (lHimawari);
          noTimestamp = true;
        } else if (type === 'himawari+gsi-standard') {
          let lHimawari = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'himawari',
            param1: sTypeParam1,
            noTimestamp,
          });
          layers.push (lHimawari);
          noTimestamp = true;
          let lGSI = L.gridLayer.gsiOverlay ({
            attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers.push (lGSI);
        } else if (type === 'jma-umimesh-wind') {
          let layer = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'umimeshwind',
            noTimestamp,
          });
          layers.push (layer);
          noTimestamp = true;
          let layerD = L.tileLayer.jma ({
            maxZoom,
            type: 'umimeshwinddir',
            noTimestamp,
            map,
          });
          layers.push (layerD);
        } else if (type === 'jma-umimesh-wind+gsi-standard') {
          let layer = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'umimeshwind',
            noTimestamp,
          });
          layers.push (layer);
          noTimestamp = true;
          let layerD = L.tileLayer.jma ({
            maxZoom,
            type: 'umimeshwinddir',
            noTimestamp,
            map,
          });
          layers.push (layerD);
          let lGSI = L.gridLayer.gsiOverlay ({
            attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers.push (lGSI);
        } else if (type === 'none') {
          //
        }

        var noTimestamp = false;
        if (this.pcJMANowc_rain) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'rain',
            noTimestamp,
          });
          layers.push (lNowc);
          noTimestamp = true;
        }
        if (this.pcJMANowc_thns) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'thns',
            noTimestamp,
          });
          layers.push (lNowc);
          noTimestamp = true;
        }
        if (this.pcJMANowc_trns) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'trns',
            noTimestamp,
          });
          layers.push (lNowc);
          noTimestamp = true;
        }
        if (this.pcJMANowc_temp) {
          let l = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'temp',
            noTimestamp,
            map,
          });
          layers.push (l);
          noTimestamp = true;
        }
        if (this.pcJMANowc_precipitation10m) {
          let l = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'precipitation10m',
            noTimestamp,
            map,
          });
          layers.push (l);
          noTimestamp = true;
        }
        if (this.pcJMANowc_precipitation1h) {
          let l = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'precipitation1h',
            noTimestamp,
            map,
          });
          layers.push (l);
          noTimestamp = true;
        }
        if (this.pcJMANowc_precipitation3h) {
          let l = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'precipitation3h',
            noTimestamp,
            map,
          });
          layers.push (l);
          noTimestamp = true;
        }
        if (this.pcJMANowc_precipitation24h) {
          let l = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'precipitation24h',
            noTimestamp,
            map,
          });
          layers.push (l);
          noTimestamp = true;
        }

        layers.forEach (l => l.pcIsMapTypeLayer = true);
        
        map.eachLayer (l => {
          if (l.pcIsMapTypeLayer) map.removeLayer (l);
        });
        layers.forEach (l => map.addLayer (l));
        this.classList.toggle ('paco-maptype-none', type === 'none');
        this.dispatchEvent (new Event ('pcMapTypeChange'));
      }, // pcChangeMapType

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
            this.maRedraw ({
              center: this.pcCurrentPosition,
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
          this.maRedraw ({currentPositionMarker: true});
          if (this.pcLocateCurrentPositionPanRequested) {
            this.maRedraw ({
              center: this.pcCurrentPosition,
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

      pcStartStreetViewDragMode: function (src) {
        var handlers = [];
        this.addEventListener ('dragover', handlers[0] = ev => {
          ev.preventDefault ();
        });
        this.addEventListener ('drop', handlers[1] = ev => {
          var ll = this.pcLMap.mouseEventToLatLng (ev);
          var u = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + ll.lat + ',' + ll.lng;
          window.open (u, '_blank', 'noreferrer');
        });

        src.addEventListener ('dragend', handlers[2] = ev => {
          this.removeEventListener ('dragover', handlers[0]);
          this.removeEventListener ('drop', handlers[1]);
          src.removeEventListener ('dragend', handlers[2]);
        });
      }, // pcStartStreetViewDragMode

      pcMarkerMoveEnd: function (p) {
        this.pcValue = p;
        this.dispatchEvent (new Event ('input', {bubbles: true, composed: true}));
        this.dispatchEvent (new Event ('change', {bubbles: true}));
      }, // pcMarkerMoveEnd

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
        } else if (this.maGoogleMap) {
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

Copyright 2017-2022 Wakaba <wakaba@suikawiki.org>.

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
