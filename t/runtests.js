(function () {
  var link = document.createElement ('link');
  link.rel = "stylesheet";
  link.href = "test.css";
  document.head.appendChild (link);

  var meta = document.createElement ('viewport');
  meta.name = 'viewport';
  meta.content = "width=device-width";
  document.head.appendChild (meta);

  var qunitLoaded = new Promise (function (ok, error) {
    var script = document.createElement ('script');
    script.src = 'https://code.jquery.com/qunit/qunit-2.2.0.js';
    script.onload = ok;
    script.onerror = error;
    document.body.appendChild (script);
  });

  var scriptLoaded = new Promise (function (ok, error) {
    var script = document.createElement ('script');
    script.src = '../src/page-components.js';
    script.onload = ok;
    script.onerror = error;
    document.body.appendChild (script);
  });

  qunitLoaded.then (function () {
    document.querySelectorAll ('test-code').forEach (function (e) {
      QUnit.test (e.getAttribute ('name'), function (assert) {
        var code = new Function (e.textContent);
        var context = {
          currentScript: e,
          wait: () => new Promise ((ok) => setTimeout (ok, 0)),
          assertWindowError: function (code, expected, name) {
            var onerror = window.onerror;
            var error = undefined;
            window.onerror = function (a, b, c, d, e) {
              error = e;
              return true;
            };
            code ();
            window.onerror = onerror;
            this.assert.throws (() => { throw error }, expected, name);
          }, // assertWindowError
        };
        return scriptLoaded.then (function () {
          context.assert = assert;
          return code.apply (context);
        }).then (assert.async (), function (e) {
          assert.equal (true, false, "Should not be rejected");
          assert.equal (e, null, "Exception");
        });
      });
    });
  });

  var div2 = document.createElement ('div2');
  div2.id = "qunit";
  document.body.appendChild (div2);
}) ();
/*

Per CC0 <https://creativecommons.org/publicdomain/zero/1.0/>, to the
extent possible under law, the author has waived all copyright and
related or neighboring rights to this work.

*/
