(function () {
  var link0 = document.createElement ('link');
  link0.rel = "stylesheet";
  link0.href = "https://code.jquery.com/qunit/qunit-2.2.0.css";
  document.head.appendChild (link0);

  var styleLoaded = new Promise ((ok, ng) => {
    var link = document.createElement ('link');
    link.rel = "stylesheet";
    link.href = "test.css";
    link.onload = ok;
    link.onerror = ng;
    document.head.appendChild (link);
  });
  
  var meta = document.createElement ('viewport');
  meta.name = 'viewport';
  meta.content = "width=device-width";
  document.head.appendChild (meta);

  var a = document.createElement ('a');
  a.href = '/';
  a.textContent = 'Top';
  document.body.appendChild (a);

  var qunitLoaded = new Promise (function (ok, error) {
    var script = document.createElement ('script');
    script.src = 'https://code.jquery.com/qunit/qunit-2.2.0.js';
    script.onload = ok;
    script.onerror = error;
    document.body.appendChild (script);
  });

  var scriptLoaded = new Promise (function (ok, error) {
    var v = document.currentScript.getAttribute ('data-export');
    styleLoaded.then (() => {
      var script = document.createElement ('script');
      script.src = '../src/page-components.js';
      script.onload = ok;
      script.onerror = error;
      if (v) script.setAttribute ('data-export', v);
      document.body.appendChild (script);
    });
  });

  if (document.currentScript.hasAttribute ('data-maps')) {
    document.documentElement.setAttribute ('data-google-maps-key', 'AIzaSyCeVv3Uyen18Jk8wZoyrJvxPjqIdPevE7M');
    var script = document.createElement ('script');
    script.src = '../src/maps.js';
    document.head.appendChild (script);
  }

  if (document.currentScript.hasAttribute ('data-qrcode')) {
    var script = document.createElement ('script');
    script.src = '../src/qrcode.js';
    document.head.appendChild (script);
  }

  qunitLoaded.then (function () {
    QUnit.config.current = {ignoreGlobalErrors: true};
    document.querySelectorAll ('test-code').forEach (function (e) {
      QUnit.test (e.getAttribute ('name'), function (assert) {
        var AsyncFunction = Object.getPrototypeOf (async function (){}).constructor;
        var code = new AsyncFunction (e.textContent);
        var context = {
          currentScript: e,
          wait: (n) => new Promise ((ok) => setTimeout (ok, n || 0)),
          assertEqualError: function (actual, expected, name) {
            this.assert.throws (() => { throw actual.pcError || actual }, expected, name);
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
        var originalOnError;
        return scriptLoaded.then (function () {
          context.assert = assert;
          originalOnError = window.onerror;
          if (e.hasAttribute ('ignoreerrors')) window.onerror = undefined;
          return code.apply (context);
        }).then (assert.async (), function (e) {
          assert.equal (true, false, "Should not be rejected");
          assert.equal (e, null, "Exception");
          console.log (e);
        }).then (() => window.onerror = originalOnError);
      });
    });
  });

  var div2 = document.createElement ('div');
  div2.id = "qunit";
  div2.dir = 'ltr';
  document.body.appendChild (div2);

  document.pcTestLoaded = Promise.all ([
    qunitLoaded,
  ]);
}) ();
/*

Per CC0 <https://creativecommons.org/publicdomain/zero/1.0/>, to the
extent possible under law, the author has waived all copyright and
related or neighboring rights to this work.

*/
