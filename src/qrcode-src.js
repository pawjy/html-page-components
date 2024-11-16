(() => {
  var defs = {};
  (function () {
    /*@@@qr.js@@@*/
  }).apply (defs);

  var define = function (def) {
    var e = document.createElementNS ('data:,pc', 'element');
    e.pcDef = def;
    document.head.appendChild (e);
  }; // define

  // Similar to <https://github.com/educastellano/qr-code> but we only
  // supports data="" and modulesize="".
  define ({
    name: 'qr-code',
    props: {
      pcInit: function () {
        var mo = new MutationObserver ((mutations) => this.pcRender ());
        mo.observe (this, {attributes: true, attributeFilter: ['data']});

        this.pcRender ();
      }, // pcInit
      pcRender: function () {
        let svg = defs.QRCode.generateSVG (this.getAttribute ('data'), {
          modulesize: parseInt (this.getAttribute ('modulesize') || 5),
          margin: 4,
        });
        svg.setAttribute ('width', svg.viewBox.baseVal.width);
        svg.setAttribute ('height', svg.viewBox.baseVal.height);
        this.textContent = '';
        this.appendChild (svg);
      }, // pcRender
    },
  }); // <qr-code>
  
}) ();

/*

Copyright 2019-2024 Wakaba <wakaba@suikawiki.org>.

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
