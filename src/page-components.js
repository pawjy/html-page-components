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
      // Element's base image
      this.ieBaseCanvas = document.createElement ('canvas');
      this.ieBaseCanvas.classList.add ('base');
      this.appendChild (this.ieBaseCanvas);

      // Element's overlay image
      this.ieOverlayCanvas = document.createElement ('canvas');
      this.ieOverlayCanvas.classList.add ('overlay');
      this.appendChild (this.ieOverlayCanvas);

      this.classList.remove ('has-image');
      this.ieSetClickMode ('none');
      this.ieSetClickMode ('selectImage');
      this.ieSetDnDMode ('selectImage');

      this.width = this.ieBaseCanvas.width;
      this.height = this.ieBaseCanvas.height;
      this.dispatchEvent (new Event ('resize'));
      this.dispatchEvent (new Event ('change'));
    }, // pcInit

    cbCommands: {
      startCaptureMode: {},
      endCaptureMode: {},
      selectImageFromCaptureModeAndEndCaptureMode: {},
      
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

    // XXX not tested
    startCaptureMode: function (opts) {
      if (this.ieEndCaptureMode) return;
      this.ieEndCaptureMode = () => {};

      opts = opts || {};
      var videoWidth = opts.width || this.width;
      var videoHeight = opts.height || this.height;
      var TimeoutError = function () {
        this.name = "TimeoutError";
        this.message = "Camera timeout";
      };
      var run = () => {
        return navigator.mediaDevices.getUserMedia ({video: {
          width: videoWidth, height: videoHeight,
          facingMode: opts.facingMode, // |user| or |environment|
        }, audio: false}).then ((stream) => {
          var video;
          var cancelTimer;
          this.ieEndCaptureMode = function () {
            stream.getVideoTracks ()[0].stop ();
            delete this.ieCaptureNow;
            if (video) video.remove ();
            clearTimeout (cancelTimer);
            delete this.ieEndCaptureMode;
          };

          return new Promise ((ok, ng) => {
            video = document.createElement ('video');
            video.classList.add ('capture');
            video.onloadedmetadata = (ev) => {
              if (!this.ieEndCaptureMode) return;

              video.play ();
              this.ieCaptureNow = function () {
                return this.ieSelectImageByElement (video, videoWidth, videoHeight);
              };
              ok ();
              clearTimeout (cancelTimer);
            };
            video.srcObject = stream;
            this.appendChild (video);
            cancelTimer = setTimeout (() => {
              ng (new TimeoutError);
              if (this.ieEndCaptureMode) this.ieEndCaptureMode ();
            }, 500);
          });
        });
      }; // run
      var tryCount = 0;
      var tryRun = () => {
        return run ().catch ((e) => {
          // Some browser with some camera device sometimes (but not
          // always) fails to fire loadedmetadata...
          if (e instanceof TimeoutError && tryCount++ < 10) {
            return tryRun ();
          } else {
            throw e;
          }
        });
      };
      tryRun ();
    }, // startCaptureMode
    endCaptureMode: function () {
      if (this.ieEndCaptureMode) this.ieEndCaptureMode ();
    }, // endCaptureMode

    ieSelectImageByElement: function (element, width, height) {
      // XXX max dimension
      var resized = (this.width !== width || this.height !== height);
      this.width = this.ieBaseCanvas.width = this.ieOverlayCanvas.width = width;
      this.height = this.ieBaseCanvas.height = this.ieOverlayCanvas.height = height;
      var context = this.ieOverlayCanvas.getContext ('2d');
      context.drawImage (element, 0, 0, width, height);
      
      this.classList.add ('has-image');
      this.ieSetClickMode ('none');
      this.ieSetDnDMode ('none');
      
      if (resized) this.dispatchEvent (new Event ('resize'));
      this.dispatchEvent (new Event ('change'));
      return Promise.resolve ();
    }, // ieSelectImageByElement
    selectImageByURL: function (url) {
      return new Promise ((ok, ng) => {
        var img = document.createElement ('img');
        img.src = url;
        img.onload = function () {
          ok (img);
        };
        img.onerror = ng;
      }).then ((img) => {
        return this.ieSelectImageByElement (img, img.naturalWidth, img.naturalHeight);
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
    // XXX not tested
    selectImageFromCaptureModeAndEndCaptureMode: function () {
      if (!this.ieCaptureNow) {
        return Promise.reject (new Error ("Capturing is not available"));
      }
      return this.ieCaptureNow ().then (() => {
        this.endCaptureMode ();
      });
    }, // selectImageFromCaptureModeAndEndCaptureMode

    ieCanvasToBlob: function (type, quality) {
      return new Promise ((ok) => {
        var canvas = document.createElement ('canvas');
        canvas.width = this.ieBaseCanvas.width;
        canvas.height = this.ieBaseCanvas.height;
        var context = canvas.getContext ('2d');
        context.drawImage (this.ieBaseCanvas, 0, 0, canvas.width, canvas.height);
        context.drawImage (this.ieOverlayCanvas, 0, 0, canvas.width, canvas.height);
        if (canvas.toBlob) {
          return canvas.toBlob (ok, type, quality);
        } else {
          var decoded = atob (canvas.toDataURL (type, quality).split (',')[1]);
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
