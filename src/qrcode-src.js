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
  // supports data="".
  define ({
    name: 'qr-code',
    props: {
      pcInit: function () {
        var mo = new MutationObserver ((mutations) => this.pcRender ());
        mo.observe (this, {attributes: true, attributeFilter: ['data']});

        this.pcRender ();
      }, // pcInit
      pcRender: function () {
        let img = document.createElement('img')
        img.src = defs.QRCode.generatePNG (this.getAttribute ('data'), {
          modulesize: 5,
          margin: 4,
        });
        this.textContent = '';
        this.appendChild (img);
      }, // pcRender
    },
  }); // <qr-code>
  
}) ();

/*

Copyright 2019 Wakaba <wakaba@suikawiki.org>.

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
