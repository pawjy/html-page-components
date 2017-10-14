(function () {
  var selectors = [];
  var elementProps = {};

  selectors.push ('button[is=command-button]');
  elementProps.button = {
    pcInit: function () {
      this.addEventListener ('click', () => this.cbClick ());
    }, // cbInit
    cbClick: function () {
      var selector = this.getAttribute ('data-selector');
      var selected = document.querySelector (selector);
      if (!selected) throw new Error ("Selector |"+selector+"| does not match any element in the document");

      var command = this.getAttribute ('data-command');
      var cmd = selected.cbCommands ? selected.cbCommands[command] : undefined;
      if (!cmd) throw new Error ("Command |"+command+"| not defined");

      selected[command] ();
    }, // cbClick
  }; // button[is=command-button]
  
  var op = function (e) {
    if (e.pcUpgraded) return;
    e.pcUpgraded = true;

    var props = elementProps[e.localName];
    Object.keys (props).forEach (function (k) {
      e[k] = props[k];
    });

    e.pcInit ();
  };
  var selector = selectors.join (',');
  var mo = new MutationObserver (function (mutations) {
    mutations.forEach (function (m) {
      Array.prototype.forEach.call (m.addedNodes, function (e) {
        if (e.nodeType === e.ELEMENT_NODE) {
          if (e.matches && e.matches (selector)) op (e);
          Array.prototype.forEach.call (e.querySelectorAll (selector), op);
        }
      });
    });
  });
  mo.observe (document, {childList: true, subtree: true});
  Array.prototype.forEach.call (document.querySelectorAll (selector), op);
}) ();

/*

Copyright 2017 Wakaba <wakaba@suikawiki.org>.

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
