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

  selectors.push ('image-editor');
  elementProps["image-editor"] = {
    pcInit: function () {
      this.ieCanvas = document.createElement ('canvas');
      this.appendChild (this.ieCanvas);
      this.ieCanvas2d = this.ieCanvas.getContext ('2d');

      this.classList.remove ('has-image');

      this.ieSetClickMode ('none');
      this.ieSetClickMode ('selectImage');
      this.ieSetDnDMode ('selectImage');

      this.width = this.ieCanvas.width;
      this.height = this.ieCanvas.height;
      this.dispatchEvent (new Event ('resize'));
      this.dispatchEvent (new Event ('change'));
    }, // pcInit

    cbCommands: {
      selectImageFromFile: {},
    },

    ieSetClickMode: function (mode) {
      if (mode === this.getAttribute ('clickmode')) return;
      if (mode === 'selectImage') {
        this.setAttribute ('clickmode', mode);
        // XXX We don't have tests of this behavior...
        this.ieClickListener = (ev) => this.selectImageFromFile ();
        this.addEventListener ('click', this.ieClickListener);
      } else if (mode === 'none') { 
        this.setAttribute ('clickmode', mode);
        if (this.ieClickListener) {
          this.removeEventListener ('click', this.ieClickListener);
          delete this.ieClickListener;
        }
      } else {
        throw new Error ("Bad mode |"+mode+"|");
      }
    }, // ieSetClickMode
    ieSetDnDMode: function (mode) {
      if (this.ieDnDMode === mode) return;
      if (mode === 'selectImage') {
        this.ieDnDMode = mode;
        var setDropEffect = function (dt) {
          var hasFile = false;
          var items = dt.items;
          for (var i = 0; i < items.length; i++) {
            if (items[i].kind === "file") {
              hasFile = true;
              break;
            }
          }
          if (hasFile) {
            dt.dropEffect = "copy";
            return false;
          } else {
            dt.dropEffect = "none";
            return true;
          }
        }; // setDropEffect
        var targetted = 0;
        this.ieDnDdragenterHandler = (ev) => {
          targetted++;
          if (!setDropEffect (ev.dataTransfer)) {
            this.classList.add ('drop-target');
            ev.preventDefault ();
          }
        };
        this.ieDnDdragoverHandler = (ev) => {
          if (!setDropEffect (ev.dataTransfer)) ev.preventDefault ();
        };
        this.ieDnDdragleaveHandler = (ev) => {
          targetted--;
          if (targetted <= 0) {
            this.classList.remove ('drop-target');
          }
        };
        this.ieDnDdropHandler = (ev) => {
          this.classList.remove ('drop-target');
          targetted = 0;
        
          var file = ev.dataTransfer.files[0];
          if (file) this.ieSetImageFile (file);
          ev.preventDefault ();
        };
        // XXX We don't have tests of DnD...
        this.addEventListener ('dragenter', this.ieDnDdragenterHandler);
        this.addEventListener ('dragover', this.ieDnDdragoverHandler);
        this.addEventListener ('dragleave', this.ieDnDdragleaveHandler);
        this.addEventListener ('drop', this.ieDnDdropHandler);
      } else if (mode === 'none') {
        this.ieDnDMode = mode;
        if (this.ieDnDdragenterHandler) {
          this.removeEventListener ('dragenter', this.ieDnDdragenterHandler);
          this.removeEventListener ('dragover', this.ieDnDdragoverHandler);
          this.removeEventListener ('dragleave', this.ieDnDdragleaveHandler);
          this.removeEventListener ('drop', this.ieDnDdropHandler);
          delete this.ieDnDdragenterHandler;
          delete this.ieDnDdragoverHandler;
          delete this.ieDnDdragleaveHandler;
          delete this.ieDnDdropHandler;
        }
      } else {
        throw new Error ("Bad mode |"+mode+"|");
      }
    }, // ieSetDnDMode

    selectImageByURL: function (url) {
      return new Promise ((ok, ng) => {
        var img = document.createElement ('img');
        img.src = url;
        img.onload = function () {
          ok (img);
        };
        img.onerror = ng;
      }).then ((img) => {
        // XXX max dimension
        var resized = (this.width !== img.naturalWidth || this.height !== img.naturalHeight);
        this.width = this.ieCanvas.width = img.naturalWidth;
        this.height = this.ieCanvas.height = img.naturalHeight;
        this.ieCanvas2d.drawImage (img, 0, 0, this.width, this.height);
        this.classList.add ('has-image');
        this.ieSetClickMode ('none');
        this.ieSetDnDMode ('none');
        if (resized) this.dispatchEvent (new Event ('resize'));
        this.dispatchEvent (new Event ('change'));
      });
    }, // selectImageByURL
    ieSetImageFile: function (file) {
      var url = URL.createObjectURL (file);
      return this.selectImageByURL (url).then (() => {
        URL.revokeObjectURL (url);
      }, (e) => {
        URL.revokeObjectURL (url);
        throw e;
      });
    }, // ieSetImageFile
    // XXX We don't have tests of this method >_<
    selectImageFromFile: function () {
      if (this.ieFileCancel) this.ieFileCancel ();
      return new Promise ((ok, ng) => {
        var input = document.createElement ('input');
        input.type = 'file';
        input.accept = 'image/*';
        this.ieFileCancel = () => {
          ng (new DOMException ("The user does not choose a file", "AbortError"));
          delete this.ieFileCancel;
        };
        input.onchange = () => {
          if (input.files[0]) {
            ok (this.ieSetImageFile (input.files[0]));
          } else {
            // This is unlikely called.  There is no way to hook on "cancel".
            this.ieFileCancel ();
          }
        };
        input.click ();
      });
    }, // selectImageFromFile

    ieCanvasToBlob: function (type, quality) {
      return new Promise ((ok) => {
        if (this.ieCanvas.toBlob) {
          return this.ieCanvas.toBlob (ok, type, quality);
        } else {
          var decoded = atob (this.ieCanvas.toDataURL (type, quality).split (',')[1]);
          var byteLength = decoded.length;
          var view = new Uint8Array (byteLength);
          for (var i = 0; i < byteLength; i++) {
            view[i] = decoded.charCodeAt (i);
          }
          ok (new Blob ([view], {type: type || 'image/png'}));
        }
      });
    }, // ieCanvasToBlob
    getPNGBlob: function () {
      return this.ieCanvasToBlob ('image/png');
    }, // getPNGBlob
    getJPEGBlob: function () {
      return this.ieCanvasToBlob ('image/jpeg');
    }, // getJPEGBlob
  }; // image-editor
  
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
