(function () {
  var link0 = document.createElement ('link');
  link0.rel = "stylesheet";
  link0.href = "https://code.jquery.com/qunit/qunit-2.2.0.css";
  document.head.appendChild (link0);

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
    var v = document.currentScript.getAttribute ('data-export');
    if (v) script.setAttribute ('data-export', v);
    document.body.appendChild (script);
  });

  qunitLoaded.then (function () {
    document.querySelectorAll ('test-code').forEach (function (e) {
      QUnit.test (e.getAttribute ('name'), function (assert) {
        var code = new Function (e.textContent);
        var context = {
          currentScript: e,
          wait: (n) => new Promise ((ok) => setTimeout (ok, n || 0)),
          assertEqualError: function (actual, expected, name) {
            this.assert.throws (() => { throw actual }, expected, name);
          }, // assertEqualError
          assertWindowError: function (code, expected, name) {
            var onerror = window.onerror;
            var error = undefined;
            window.onerror = function (a, b, c, d, e) {
              error = e || arguments;
              return true;
            };
            code ();
            window.onerror = onerror;
            this.assertEqualError (error, expected, name);
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

  var div2 = document.createElement ('div');
  div2.id = "qunit";
  div2.dir = 'ltr';
  document.body.appendChild (div2);
}) ();
/*

Per CC0 <https://creativecommons.org/publicdomain/zero/1.0/>, to the
extent possible under law, the author has waived all copyright and
related or neighboring rights to this work.

*/
