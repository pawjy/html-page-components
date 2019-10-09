(function () {
  var exportable = {};

  var $promised = exportable.$promised = {};

  $promised.forEach = function (code, items) {
    var list = Array.prototype.slice.call (items);
    var run = function () {
      if (!list.length) return Promise.resolve ();
      return Promise.resolve (list.shift ()).then (code).then (run);
    };
    return run ();
  }; // forEach

  $promised.map = function (code, items) {
    var list = Array.prototype.slice.call (items);
    var newList = [];
    var run = function () {
      if (!list.length) return Promise.resolve (newList);
      return Promise.resolve (list.shift ()).then (code).then ((_) => {
        newList.push (_);
      }).then (run);
    };
    return run ();
  }; // map

  var definables = {
    loader: {type: 'handler'},
    filter: {type: 'handler'},
    templateselector: {type: 'handler'},
    saver: {type: 'handler'},
    formsaved: {type: 'handler'},
    formvalidator: {type: 'handler'},
    filltype: {type: 'map'},
    templateSet: {type: 'element'},
    element: {type: 'customElement'},
  };
  var defs = {};
  var defLoadedPromises = {};
  var defLoadedCallbacks = {};
  for (var n in definables) {
    defs[n] = {};
    defLoadedPromises[n] = {};
    defLoadedCallbacks[n] = {};
  }
  var addDef = function (e) {
    var type = e.localName;
    if (!(e.namespaceURI === 'data:,pc' && definables[type])) return;
    if (definables[type].type === 'element') return;

    var name;
    if (definables[type].type === 'customElement') {
      name = e.pcDef ? e.pcDef.name : null;
      if (e.pcDef && e.pcDef.is) {
        name += ' is=' + e.pcDef.is;
      }
    } else {
      name = e.getAttribute ('name');
    }

    if (defs[type][name]) {
      throw new Error ("Duplicate |"+type+"|: |"+name+"|");
    } else {
      var value = null;
      if (definables[type].type === 'handler') {
        value = e.pcHandler || (() => {});
      } else if (definables[type].type === 'customElement') {
        defineElement (e.pcDef);
        value = true;
      } else {
        value = e.getAttribute ('content');
      }
      defs[type][name] = value;
    }
    if (defLoadedCallbacks[type][name]) {
      defLoadedCallbacks[type][name] (value);
      delete defLoadedCallbacks[type][name];
      delete defLoadedPromises[type][name];
    }
    e.remove ();
  }; // addDef
  var addElementDef = (type, name, e) => {
    if (defs[type][name]) {
      throw new Error ("Duplicate |"+type+"|: |"+name+"|");
    }
    defs[type][name] = e;
    if (defLoadedCallbacks[type][name]) {
      defLoadedCallbacks[type][name] (e);
      delete defLoadedCallbacks[type][name];
      delete defLoadedPromises[type][name];
    }
  }; // addElementDef
  new MutationObserver (function (mutations) {
    mutations.forEach
        ((m) => Array.prototype.forEach.call (m.addedNodes, addDef));
  }).observe (document.head, {childList: true});
  Promise.resolve ().then (() => {
    Array.prototype.slice.call (document.head.children).forEach (addDef);
  });
  var getDef = function (type, name) {
    var def = defs[type][name];
    if (def) {
      return Promise.resolve (def);
    } else {
      if (!defLoadedPromises[type][name]) {
        defLoadedPromises[type][name] = new Promise ((a, b) => {
          defLoadedCallbacks[type][name] = a;
        });
      }
      return defLoadedPromises[type][name];
    }
  }; // getDef

  var waitDefsByString = function (string) {
    return Promise.all (string.split (/\s+/).map ((_) => {
      if (_ === "") return;
      var v = _.split (/:/, 2);
      if (defs[v[0]]) {
        return getDef (v[0], v[1]);
      } else {
        throw new Error ("Unknown definition type |"+v[0]+"|");
      }
    }));
  }; // waitDefsByString

  defs.filltype.time = 'datetime';
  // <data>
  defs.filltype.input = 'input';
  defs.filltype.select = 'idlattribute';
  defs.filltype.textarea = 'idlattribute';
  defs.filltype.output = 'idlattribute';
  // <progress>
  // <meter>

  var upgradableSelectors = [];
  var currentUpgradables = ':not(*)';
  var newUpgradableSelectors = [];
  var upgradedElementProps = {};
  var upgrader = {};
  
  var upgrade = function (e) {
    if (e.pcUpgraded) return;
    e.pcUpgraded = true;

    var props = (upgradedElementProps[e.localName] || {})[e.getAttribute ('is')] || {};
    Object.keys (props).forEach (function (k) {
      e[k] = props[k];
    });

    new Promise ((re) => re ((upgrader[e.localName] || {})[e.getAttribute ('is')].call (e))).catch ((err) => console.log ("Can't upgrade an element", e, err));
  }; // upgrade

  new MutationObserver (function (mutations) {
    mutations.forEach (function (m) {
      Array.prototype.forEach.call (m.addedNodes, function (e) {
        if (e.nodeType === e.ELEMENT_NODE) {
          if (e.matches && e.matches (currentUpgradables)) upgrade (e);
          Array.prototype.forEach.call
              (e.querySelectorAll (currentUpgradables), upgrade);
        }
      });
    });
  }).observe (document, {childList: true, subtree: true});

  var commonMethods = {};
  var defineElement = function (def) {
    upgradedElementProps[def.name] = upgradedElementProps[def.name] || {};
    upgradedElementProps[def.name][def.is || null] = def.props = def.props || {};
    if (def.pcActionStatus) {
      def.props.pcActionStatus = commonMethods.pcActionStatus;
    }
    
    upgrader[def.name] = upgrader[def.name] || {};
    var init = def.templateSet ? function () {
      initTemplateSet (this);
      this.pcInit ();
    } : upgradedElementProps[def.name][def.is || null].pcInit || function () { };
    upgrader[def.name][def.is || null] = function () {
      var e = this;
      if (e.nextSibling ||
          document.readyState === 'interactive' ||
          document.readyState === 'complete') {
        return init.call (e);
      }
      return new Promise (function (ok) {
        setInterval (function () {
          if (e.nextSibling ||
              document.readyState === 'interactive' ||
              document.readyState === 'complete') {
            ok ();
          }
        }, 100);
      }).then (function () {
        return init.call (e);
      });
    };
    if (!def.notTopLevel) {
      var selector = def.name;
      if (def.is) selector += '[is="' + def.is + '"]';
      newUpgradableSelectors.push (selector);
      Promise.resolve ().then (() => {
        var news = newUpgradableSelectors.join (',');
        if (!news) return;
        newUpgradableSelectors.forEach ((_) => upgradableSelectors.push (_));
        newUpgradableSelectors = [];
        currentUpgradables = upgradableSelectors.join (',');
        Array.prototype.forEach.call (document.querySelectorAll (news), upgrade);
      });
    } // notTopLevel
  }; // defineElement

  var filledAttributes = ['href', 'src', 'id', 'title', 'value', 'action',
                          'class'];
  var $fill = exportable.$fill = function (root, object) {
    root.querySelectorAll ('[data-field]').forEach ((f) => {
      var name = f.getAttribute ('data-field').split (/\./);
      var value = object;
      for (var i = 0; i < name.length; i++) {
        value = value[name[i]];
        if (value == null) break;
      }

      var ln = f.localName;
      var fillType = defs.filltype[ln];
      if (fillType === 'contentattribute') {
        f.setAttribute ('value', value);
      } else if (fillType === 'idlattribute') {
        f.value = value;
      } else if (fillType === 'input') {
        var type = f.type;
        if (type === 'date' ||
            type === 'month' ||
            type === 'week' ||
            type === 'datetime-local') {
          value = parseFloat (value);
          if (!Number.isFinite (value)) {
            f.value = '';
          } else {
            f.valueAsNumber = value * 1000;
          }
        } else {
          f.value = value;
        }
      } else if (fillType === 'datetime') {
        try {
          var dt = new Date (value * 1000);
          f.setAttribute ('datetime', dt.toISOString ());
        } catch (e) {
          f.removeAttribute ('datetime');
          f.textContent = e;
        }
        if (f.hasAttribute ('data-tzoffset-field')) {
          var name = f.getAttribute ('data-tzoffset-field').split (/\./);
          var v = object;
          for (var i = 0; i < name.length; i++) {
            v = v[name[i]];
            if (v == null) break;
          }
          if (v != null) {
            f.setAttribute ('data-tzoffset', v);
          } else {
            f.removeAttribute ('data-tzoffset');
          }
        }
      } else {
        if ((value == null || (value + "") === "") && f.hasAttribute ('data-empty')) {
          f.textContent = f.getAttribute ('data-empty');
        } else {
          f.textContent = value;
        }
      }

      f.removeAttribute ('data-filling');
    }); // [data-field]

    root.querySelectorAll ('[data-enable-by-fill]').forEach ((f) => {
      f.removeAttribute ('disabled');
    });

    filledAttributes.forEach ((n) => {
      root.querySelectorAll ('[data-'+n+'-field]').forEach ((f) => {
        var name = f.getAttribute ('data-'+n+'-field').split (/\./);
        var value = object;
        for (var i = 0; i < name.length; i++) {
          value = value[name[i]];
          if (value == null) break;
        }
        if (value != null) {
          f.setAttribute (n, value);
        } else {
          f.removeAttribute (n);
        }
      }); // [data-*-field]

      root.querySelectorAll ('[data-'+n+'-template]').forEach ((f) => {
        f.setAttribute (n, $fill.string (f.getAttribute ('data-'+n+'-template'), object));
      }); // [data-*-template]
    }); // filledAttributes
    root.querySelectorAll ('[data-filled]').forEach (f => {
      var attrs = f.getAttribute ('data-filled').split (/\s+/);
      attrs.forEach (n => {
        if (f.hasAttribute ('data-'+n+'-field')) {
          var name = f.getAttribute ('data-'+n+'-field').split (/\./);
          var value = object;
          for (var i = 0; i < name.length; i++) {
            value = value[name[i]];
            if (value == null) break;
          }
          if (value != null) {
            f.setAttribute (n, value);
          } else {
            f.removeAttribute (n);
          }
        }
        if (f.hasAttribute ('data-'+n+'-template')) {
          f.setAttribute (n, $fill.string (f.getAttribute ('data-'+n+'-template'), object));
        }
      });
    });
  }; // $fill

  $fill.string = function (s, object) {
    return s.replace (/\{(?:(url):|)([\w.]+)\}/g, function (_, t, n) {
      var name = n.split (/\./);
      var value = object;
      for (var i = 0; i < name.length; i++) {
        value = value[name[i]];
        if (value == null) break;
      }
      if (t === 'url') {
        try {
          return encodeURIComponent (value);
        } catch (e) {
          return encodeURIComponent ("\uFFFD");
        }
      } else {
        return value;
      }
    });
  }; // $fill.string

  var templateSetLocalNames = {};
  var templateSetSelector = '';
  var templateSetMembers = {
    pcCreateTemplateList: function () {
      var oldList = this.pcTemplateList || {};
      var newList = this.pcTemplateList = {};
      Array.prototype.slice.call (this.querySelectorAll ('template')).forEach ((g) => {
        this.pcTemplateList[g.getAttribute ('data-name') || ""] = g;
      });
      var oldKeys = Object.keys (oldList);
      var newKeys = Object.keys (newList);
      var changed = false;
      if (oldKeys.length !== newKeys.length) {
        changed = true;
      } else {
        for (var v in newKeys) {
          if (oldKeys[v] !== newKeys[v]) {
            changed = true;
            break;
          }
        }
      }
      if (!changed) return;
      
      this.pcSelectorUpdatedDispatched = false;
      this.pcSelectorName = this.getAttribute ('templateselector') || 'default';
      return getDef ('templateselector', this.pcSelectorName).then ((_) => {
        this.pcSelector = _;
        return Promise.all (Object.values (this.pcTemplateList).map ((e) => waitDefsByString (e.getAttribute ('data-requires') || '')));
      }).then (() => {
        var event = new Event ('pctemplatesetupdated', {});
        event.pcTemplateSet = this;
        var nodes;
        if (this.localName === 'template-set') {
          var name = this.getAttribute ('name');
          nodes = Array.prototype.slice.call (this.getRootNode ().querySelectorAll (templateSetSelector)).filter ((e) => e.getAttribute ('template') === name);
        } else {
          nodes = [this];
        }
        this.pcSelectorUpdatedDispatched = true;
        nodes.forEach ((e) => e.dispatchEvent (event));
      });
    }, // pcCreateTemplateList
    createFromTemplate: function (localName, object) {
      if (!this.pcSelector) throw new DOMException ('The template set is not ready', 'InvalidStateError');
      var template = this.pcSelector.call (this, this.pcTemplateList, object); // or throw
      if (!template) {
        console.log ('Template is not selected (templateselector=' + this.pcSelectorName + ')', this);
        template = document.createElement ('template');
      }
      var e = document.createElement (localName);
      e.appendChild (template.content.cloneNode (true));
      ['class', 'title', 'id'].forEach (_ => {
        if (template.hasAttribute (_)) {
          e.setAttribute (_, template.getAttribute (_));
        }
        if (template.hasAttribute ('data-'+_+'-template')) {
          e.setAttribute (_, $fill.string (template.getAttribute ('data-'+_+'-template'), object));
        }
        if (template.hasAttribute ('data-'+_+'-field')) {
          e.setAttribute (_, $fill.string ('{'+template.getAttribute ('data-'+_+'-field')+'}', object));
        }
      });
      $fill (e, object);
      return e;
    }, // createFromTemplate
  }; // templateSetMembers

  var initTemplateSet = function (e) {
    templateSetLocalNames[e.localName] = true;
    templateSetSelector = Object.keys (templateSetLocalNames).map ((n) => n.replace (/([^A-Za-z0-9])/g, (_) => "\\" + _.charCodeAt (0).toString (16) + " ") + '[template]').join (',');
    
    for (var n in templateSetMembers) {
      e[n] = templateSetMembers[n];
    }

    var templateSetName = e.getAttribute ('template');
    if (templateSetName) {
      var ts = defs.templateSet[templateSetName];
      if (ts && ts.pcSelectorUpdatedDispatched) {
        Promise.resolve ().then (() => {
          if (!ts.pcSelectorUpdatedDispatched) return;
          var event = new Event ('pctemplatesetupdated', {});
          event.pcTemplateSet = ts;
          e.dispatchEvent (event);
        });
      }
    } else {
      e.pcCreateTemplateList ();
      new MutationObserver ((mutations) => {
        e.pcCreateTemplateList ();
      }).observe (e, {childList: true});
    }
  }; // initTemplateSet

  exportable.$getTemplateSet = function (name) {
    return getDef ('templateSet', name).then (ts => {
      ts.pcCreateTemplateList ();
      return ts;
    });
  }; // $getTemplateSet

  var ActionStatus = function (elements) {
    this.stages = {};
    this.elements = elements;
  }; // ActionStatus

  ActionStatus.prototype.start = function (opts) {
    if (opts.stages) {
      opts.stages.forEach ((s) => {
        this.stages[s] = 0;
      });
    }
    this.elements.forEach ((e) => {
      e.querySelectorAll ('action-status-messages').forEach ((f) => f.hidden = true);
      e.querySelectorAll ('progress').forEach ((f) => {
        f.hidden = false;
        var l = Object.keys (this.stages).length;
        if (l) {
          f.max = l;
          f.value = 0;
        } else {
          f.removeAttribute ('max');
          f.removeAttribute ('value');
        }
      });
      e.hidden = false;
      e.removeAttribute ('status');
    }); // e
  }; // start

  ActionStatus.prototype.stageStart = function (stage) {
    this.elements.forEach ((e) => {
      var label = e.getAttribute ('stage-' + stage);
      e.querySelectorAll ('action-status-message').forEach ((f) => {
        if (label) {
          f.textContent = label;
          f.hidden = false;
        } else {
          f.hidden = true;
        }
      });
    });
  }; // stageStart

  ActionStatus.prototype.stageProgress = function (stage, value, max) {
    if (Number.isFinite (value) && Number.isFinite (max)) {
      this.stages[stage] = value / (max || 1);
    } else {
      this.stages[stage] = 0;
    }
    this.elements.forEach ((e) => {
      e.querySelectorAll ('progress').forEach ((f) => {
        var stages = Object.keys (this.stages);
        f.max = stages.length;
        var v = 0;
        stages.forEach ((s) => v += this.stages[s]);
        f.value = v;
      });
    });
  }; // stageProgress

  ActionStatus.prototype.stageEnd = function (stage) {
    this.stages[stage] = 1;
    this.elements.forEach ((e) => {
      e.querySelectorAll ('progress').forEach ((f) => {
        var stages = Object.keys (this.stages);
        f.max = stages.length;
        var v = 0;
        stages.forEach ((s) => v += this.stages[s]);
        f.value = v;
      });
    });
  }; // stageEnd

  ActionStatus.prototype.end = function (opts) {
    this.elements.forEach ((e) => {
      var shown = false;
      e.querySelectorAll ('action-status-message').forEach ((f) => {
        var msg;
        var status;
        if (opts.ok) {
          msg = e.getAttribute ('ok');
        } else { // not ok
          if (opts.error) {
            if (opts.error instanceof Response) {
              msg = opts.error.status + ' ' + opts.error.statusText;
              console.log (opts.error); // for debugging
            } else {
              msg = opts.error;
              console.log (opts.error.stack); // for debugging
            }
          } else {
            msg = e.getAttribute ('ng') || 'Failed';
          }
        }
        if (msg) {
          f.textContent = msg;
          f.hidden = false;
          shown = true;
        } else {
          f.hidden = true;
        }
        // XXX set timer to clear ok message
      });
      e.querySelectorAll ('progress').forEach ((f) => f.hidden = true);
      e.hidden = !shown;
      e.setAttribute ('status', opts.ok ? 'ok' : 'ng');
    });
    if (!opts.ok) setTimeout (() => { throw opts.error }, 0); // invoke onerror
  }; // end

  commonMethods.pcActionStatus = function () {
    var elements = this.querySelectorAll ('action-status');
    elements.forEach (function (e) {
      if (e.hasChildNodes ()) return;
      e.hidden = true;
      e.innerHTML = '<action-status-message></action-status-message> <progress></progress>';
    });
    return new ActionStatus (elements);
  }; // pcActionStatus

  defineElement ({
    name: 'template-set',
    props: {
      pcInit: function () {
        var name = this.getAttribute ('name');
        if (!name) {
          throw new Error
          ('|template-set| element does not have |name| attribute');
        }
        addElementDef ('templateSet', name, this);
        initTemplateSet (this);
      }, // pcInit
    },
  }); // <template-set>

  defs.templateselector["default"] = function (templates) {
    return templates[""];
  }; // empty

  defs.filltype["enum-value"] = 'contentattribute';
  defineElement ({
    name: 'enum-value',
    props: {
      pcInit: function () {
        var mo = new MutationObserver ((mutations) => this.evRender ());
        mo.observe (this, {attributes: true, attributeFilter: ['value']});
        this.evRender ();
      }, // pcInit
      evRender: function () {
        var value = this.getAttribute ('value');
        if (value === null) {
          this.hidden = true;
        } else {
          this.hidden = false;
          var label = this.getAttribute ('label-' + value);
          if (label === null) {
            this.textContent = value;
          } else {
            this.textContent = label;
          }
        }
      }, // evRender
    }, // props
  }); // <enum-value>

  defineElement ({
    name: 'button',
    is: 'command-button',
    props: {
      pcInit: function () {
        this.addEventListener ('click', () => this.cbClick ());
      }, // pcInit
      cbClick: function () {
        var selector = this.getAttribute ('data-selector');
        var selected = document.querySelector (selector);
        if (!selected) {
          throw new Error ("Selector |"+selector+"| does not match any element in the document");
        }
        
        var command = this.getAttribute ('data-command');
        var cmd = selected.cbCommands ? selected.cbCommands[command] : undefined;
        if (!cmd) throw new Error ("Command |"+command+"| not defined");

        selected[command] ();
      }, // cbClick
    },
  }); // button[is=command-button]

  defineElement ({
    name: 'button',
    is: 'mode-button',
    props: {
      pcInit: function () {
        this.addEventListener ('click', () => this.mbClick ());

        this.getRootNode ().addEventListener ('pcModeChange', (ev) => {
          if (ev.mode !== this.name) return;
          
          var selector = this.getAttribute ('data-selector');
          var selected = document.querySelector (selector);
          if (!selected) return;
          if (selected !== ev.target) return;

          var name = this.name;
          if (!name) return;

          this.classList.toggle ('selected', selected[name] == this.value);
        });
        // XXX disconnect

        var selector = this.getAttribute ('data-selector');
        var selected = document.querySelector (selector);
        var name = this.name;
        if (selected && name) {
          this.classList.toggle ('selected', selected[name] == this.value);
        }
      }, // pcInit
      mbClick: function () {
        var selector = this.getAttribute ('data-selector');
        var selected = document.querySelector (selector);
        if (!selected) {
          throw new Error ("Selector |"+selector+"| does not match any element in the document");
        }

        var name = this.name;
        if (!name) {
          throw new Error ("The |mode-button| element has no name");
        }
        
        selected[name] = this.value;
      }, // mbClick
    },
  }); // button[is=mode-button]

  function copyText (s) {
    var e = document.createElement ('temp-text');
    e.style.whiteSpace = "pre";
    e.textContent = s;
    document.body.appendChild (e);
    var range = document.createRange ();
    range.selectNode (e);
    getSelection ().empty ();
    getSelection ().addRange (range);
    document.execCommand ('copy')
    e.parentNode.removeChild (e);
  } // copyText

  defineElement ({
    name: 'a',
    is: 'copy-url',
    props: {
      pcInit: function () {
        this.onclick = () => { copyText (this.href); return false };
      }, // pcInit
    },
  }); // <a is=copy-url>

  defineElement ({
    name: 'button',
    is: 'copy-text-content',
    props: {
      pcInit: function () {
        this.onclick = () => this.pcClick ();
      }, // pcInit
      pcClick: function () {
        var selector = this.getAttribute ('data-selector');
        var selected = document.querySelector (selector);
        if (!selected) {
          throw new Error ("Selector |"+selector+"| does not match any element in the document");
        }

        copyText (selected.textContent);
      }, // pcClick
    },
  }); // <button is=copy-text-content>
  
  defineElement ({
    name: 'popup-menu',
    props: {
      pcInit: function () {
        this.addEventListener ('click', (ev) => this.pmClick (ev));
        var mo = new MutationObserver ((mutations) => {
          this.pmToggle (this.hasAttribute ('open'));
        });
        mo.observe (this, {attributes: true, attributeFilter: ['open']});
        setTimeout (() => {
          if (this.hasAttribute ('open') && !this.pmGlobalClickHandler) {
            this.pmToggle (true);
          }
        }, 100);
      }, // pcInit
      pmClick: function (ev) {
        var current = ev.target;
        var targetType = 'outside';
        while (current) {
          if (current === this) {
            targetType = 'this';
            break;
          } else if (current.localName === 'button') {
            if (current.parentNode === this) {
              targetType = 'button';
              break;
            } else {
              targetType = 'command';
              break;
            }
          } else if (current.localName === 'a') {
            targetType = 'command';
            break;
          } else if (current.localName === 'menu-main' &&
                     current.parentNode === this) {
            targetType = 'menu';
            break;
          }
          current = current.parentNode;
        } // current

        if (targetType === 'button') {
          this.toggle ();
        } else if (targetType === 'menu') {
          //
        } else {
          this.toggle (false);
        }
        ev.pmEventHandledBy = this;
      }, // pmClick

      toggle: function (show) {
        if (show === undefined) {
          show = !this.hasAttribute ('open');
        }
        if (show) {
          this.setAttribute ('open', '');
        } else {
          this.removeAttribute ('open');
        }
      }, // toggle
      pmToggle: function (show) {
        if (show) {
          if (!this.pmGlobalClickHandler) {
            this.pmGlobalClickHandler = (ev) => {
              if (ev.pmEventHandledBy === this) return;
              this.toggle (false);
            };
            window.addEventListener ('click', this.pmGlobalClickHandler);
            this.pmLayout ();
          }
        } else {
          if (this.pmGlobalClickHandler) {
            window.removeEventListener ('click', this.pmGlobalClickHandler);
            delete this.pmGlobalClickHandler;

            var ev = new Event ('toggle', {bubbles: true});
            this.dispatchEvent (ev);
          }
        }
      }, // pmToggle

      pmLayout: function () {
        if (!this.hasAttribute ('open')) return;
      
        var button = this.querySelector ('button');
        var menu = this.querySelector ('menu-main');
        if (!button || !menu) return;

        menu.style.top = 'auto';
        menu.style.left = 'auto';
        var menuWidth = menu.offsetWidth;
        var menuTop = menu.offsetTop;
        var menuHeight = menu.offsetHeight;
        if (getComputedStyle (menu).direction === 'rtl') {
          var parent = menu.offsetParent || document.documentElement;
          if (button.offsetLeft + menuWidth > parent.offsetWidth) {
            menu.style.left = button.offsetLeft + button.offsetWidth - menuWidth + 'px';
          } else {
            menu.style.left = button.offsetLeft + 'px';
          }
        } else {
          var right = button.offsetLeft + button.offsetWidth;
          if (right > menuWidth) {
            menu.style.left = (right - menuWidth) + 'px';
          } else {
            menu.style.left = 'auto';
          }
        }

        var ev = new Event ('toggle', {bubbles: true});
        this.dispatchEvent (ev);
      }, // pmLayout
    },
  }); // popup-menu

  defineElement ({
    name: 'tab-set',
    props: {
      pcInit: function () {
        new MutationObserver (() => this.tsInit ()).observe (this, {childList: true});
        Promise.resolve ().then (() => this.tsInit ());
      }, // pcInit
      tsInit: function () {
        var tabMenu = null;
        var tabSections = [];
        Array.prototype.forEach.call (this.children, function (f) {
          if (f.localName === 'section') {
            tabSections.push (f);
          } else if (f.localName === 'tab-menu') {
            tabMenu = f;
          }
        });
      
        if (!tabMenu) return;

        tabMenu.textContent = '';
        tabSections.forEach ((f) => {
          var header = f.querySelector ('h1');
          var a = document.createElement ('a');
          a.href = 'javascript:';
          a.onclick = () => this.tsShowTab (a.tsSection);
          a.textContent = header ? header.textContent : '§';
          a.tsSection = f;
          tabMenu.appendChild (a);
        });

        if (tabSections.length) this.tsShowTab (tabSections[0]);
      }, // tsInit
      tsShowTab: function (f) {
        var tabMenu = null;
        var tabSections = [];
        Array.prototype.forEach.call (this.children, function (f) {
          if (f.localName === 'section') {
            tabSections.push (f);
          } else if (f.localName === 'tab-menu') {
            tabMenu = f;
          }
        });

        tabMenu.querySelectorAll ('a').forEach ((g) => {
          g.classList.toggle ('active', g.tsSection === f);
        });
        tabSections.forEach ((g) => {
          g.classList.toggle ('active', f === g);
        });
        var ev = new Event ('show', {bubbles: true});
        Promise.resolve ().then (() => f.dispatchEvent (ev));
      }, // tsShowTab
    },
  }); // tab-set
  
  defs.loader.src = function (opts) {
    if (!this.hasAttribute ('src')) return {};
    var url = this.getAttribute ('src');
    if (opts.ref) {
      url += /\?/.test (url) ? '&' : '?';
      url += 'ref=' + encodeURIComponent (opts.ref);
    }
    if (opts.limit) {
      url += /\?/.test (url) ? '&' : '?';
      url += 'limit=' + encodeURIComponent (opts.limit);
    }
    return fetch (url, {
      credentials: "same-origin",
    }).then ((res) => res.json ()).then ((json) => {
      if (!this.hasAttribute ('key')) throw new Error ("|key| is not specified");
      json = json || {};
      return {
        data: json[this.getAttribute ('key')],
        prev: {ref: json.prev_ref, has: json.has_prev, limit: opts.limit},
        next: {ref: json.next_ref, has: json.has_next, limit: opts.limit},
      };
    });
  }; // loader=src

  defs.filter["default"] = function (data) {
    var list = data.data;
    if (!Array.isArray (list)) {
      list = Object.values (list);
    }
    // XXX sort=""
    return {
      data: list,
      prev: data.prev,
      next: data.next,
    };
  }; // filter=default

  defineElement ({
    name: 'list-container',
    pcActionStatus: true,
    props: {
      pcInit: function () {
        var selector = 'a.list-prev, a.list-next, button.list-prev, button.list-next, ' + this.lcGetListContainerSelector ();
      new MutationObserver ((mutations) => {
        mutations.forEach ((m) => {
          Array.prototype.forEach.call (m.addedNodes, (e) => {
            if (e.nodeType === e.ELEMENT_NODE) {
              if (e.matches (selector) || e.querySelector (selector)) {
                var listContainer = this.lcGetListContainer ();
                if (listContainer) listContainer.textContent = '';
                this.lcDataChanges.changed = true;
                this.lcRequestRender ();
              }
            }
          });
        });
      }).observe (this, {childList: true, subtree: true});

      this.addEventListener ('pctemplatesetupdated', (ev) => {
        this.lcTemplateSet = ev.pcTemplateSet;

        var listContainer = this.lcGetListContainer ();
        if (listContainer) listContainer.textContent = '';
        this.lcDataChanges.changed = true;
        this.lcRequestRender ();
      });
      this.load ({});
    }, // pcInit

      lcGetNextInterval: function (currentInterval) {
        if (!currentInterval) return 10 * 1000;
        var interval = currentInterval * 2;
        if (interval > 10*60*1000) interval * 10*60*1000;
        return interval;
      }, // lcGetNextInterval
      load: function (opts) {
        if (!opts.page || opts.replace) this.lcClearList ();
        return this.lcLoad (opts).then ((done) => {
          if (done) {
            this.lcDataChanges.scroll = opts.scroll;
            return this.lcRequestRender ();
          }
        }).then (() => {
          if (!this.hasAttribute ('autoreload')) return;
          var interval = this.lcGetNextInterval (opts.arInterval);
          clearTimeout (this.lcAutoReloadTimer);
          this.lcAutoReloadTimer = setTimeout (() => {
            this.load ({arInterval: interval});
          }, interval);
        }, (e) => {
          if (!this.hasAttribute ('autoreload')) return;
          var interval = this.lcGetNextInterval (opts.arInterval);
          clearTimeout (this.lcAutoReloadTimer);
          this.lcAutoReloadTimer = setTimeout (() => {
            this.load ({arInterval: interval});
          }, interval);
          throw e;
        });
      }, // load
      loadPrev: function (opts2) {
        var opts = {};
        Object.keys (this.lcPrev).forEach (_ => opts[_] = this.lcPrev[_]);
        Object.keys (opts2 || {}).forEach (_ => opts[_] = opts2[_]);
        return this.load (opts);
      }, // loadPrev
      loadNext: function (opts2) {
        var opts = {};
        Object.keys (this.lcNext).forEach (_ => opts[_] = this.lcNext[_]);
        Object.keys (opts2 || {}).forEach (_ => opts[_] = opts2[_]);
        return this.load (opts);
      }, // loadNext
    lcClearList: function () {
      this.lcData = [];
      this.lcDataChanges = {append: [], prepend: [], changed: false};
      this.lcPrev = {};
      this.lcNext = {};
      
      var listContainer = this.lcGetListContainer ();
      if (listContainer) listContainer.textContent = '';
    }, // lcClearList
    lcGetListContainerSelector: function () {
      var type = this.getAttribute ('type');
      if (type === 'table') {
        return 'tbody';
      } else {
        return 'list-main';
      }
    }, // lcGetListContainerSelector
    lcGetListContainer: function () {
      return this.querySelector (this.lcGetListContainerSelector ());
    }, // lcGetListContainer
    
      lcLoad: function (opts) {
        var resolve;
        var reject;
        this.loaded = new Promise ((a, b) => {
          resolve = a;
          reject = b;
        });
        this.loaded.catch ((e) => {}); // set [[handled]] true (the error is also reported by ActionStatus)
        var as = this.pcActionStatus ();
        as.start ({stages: ['loader', 'filter', 'render']});
        as.stageStart ('loader');
        this.querySelectorAll ('list-is-empty').forEach ((e) => {
          e.hidden = true;
        });
        return getDef ("loader", this.getAttribute ('loader') || 'src').then ((loader) => {
          return loader.call (this, opts);
        }).then ((result) => {
          as.stageEnd ('loader');
          as.stageStart ('filter');
          return getDef ("filter", this.getAttribute ('filter') || 'default').then ((filter) => {
            return filter.call (this, result);
          });
        }).then ((result) => {
          var newList = result.data || [];
          var prev = (opts.page === 'prev' ? result.next : result.prev) || {};
          var next = (opts.page === 'prev' ? result.prev : result.next) || {};
          prev = {
            has: prev.has,
            ref: prev.ref,
            limit: prev.limit,
            page: 'prev',
          };
          next = {
            has: next.has,
            ref: next.ref,
            limit: next.limit,
            page: 'next',
          };
          if (this.hasAttribute ('reverse')) {
            newList = newList.reverse ();
            if (opts.page === 'prev' && !opts.replace) {
              newList = newList.reverse ();
              this.lcData = newList.concat (this.lcData);
              this.lcDataChanges.append
                  = this.lcDataChanges.append.concat (newList);
              this.lcPrev = prev;
            } else if (opts.page === 'next' && !opts.replace) {
              this.lcData = this.lcData.concat (newList);
              this.lcDataChanges.prepend
                  = newList.concat (this.lcDataChanges.prepend);
              this.lcNext = next;
            } else {
              this.lcData = newList;
              this.lcDataChanges = {prepend: [], append: [], changed: true};
              this.lcPrev = prev;
              this.lcNext = next;
            }
          } else { // not reverse
            if (opts.page === 'prev' && !opts.replace) {
              newList = newList.reverse ();
              this.lcData = newList.concat (this.lcData);
              this.lcDataChanges.prepend
                  = newList.concat (this.lcDataChanges.prepend);
              this.lcPrev = prev;
            } else if (opts.page === 'next' && !opts.replace) {
              this.lcData = this.lcData.concat (newList);
              this.lcDataChanges.append
                  = this.lcDataChanges.append.concat (newList);
              this.lcNext = next;
            } else {
              this.lcData = newList;
              this.lcDataChanges = {prepend: [], append: [], changed: true};
              this.lcPrev = prev;
              this.lcNext = next;
            }
          }
          as.end ({ok: true});
          resolve ();
          return true;
        }).catch ((e) => {
          reject (e);
          as.end ({error: e});
          return false;
        });
      }, // lcLoad

      lcRequestRender: function () {
        clearTimeout (this.lcRenderRequestedTimer);
        this.lcRenderRequested = true;
        this.lcRenderRequestedTimer = setTimeout (() => {
          if (!this.lcRenderRequested) return;
          this.lcRender ();
          this.lcRenderRequested = false;
        }, 0);
      }, // lcRequestRender
      lcRender: function () {
        if (!this.lcTemplateSet) return;

        var listContainer = this.lcGetListContainer ();
        if (!listContainer) return;

        this.querySelectorAll ('a.list-prev, button.list-prev').forEach ((e) => {
          e.hidden = ! this.lcPrev.has;
          if (e.localName === 'a') {
            e.href = this.lcPrev.linkURL || 'javascript:';
          }
          e.onclick = () => { this.loadPrev ({
            scroll: e.getAttribute ('data-list-scroll'),
            replace: e.hasAttribute ('data-list-replace'),
          }); return false };
        });
        this.querySelectorAll ('a.list-next, button.list-next').forEach ((e) => {
          e.hidden = ! this.lcNext.has;
          if (e.localName === 'a') {
            e.href = this.lcNext.linkURL || 'javascript:';
          }
          e.onclick = () => { this.loadNext ({
            scroll: e.getAttribute ('data-list-scroll'),
            replace: e.hasAttribute ('data-list-replace'),
          }); return false };
        });
        this.querySelectorAll ('list-is-empty').forEach ((e) => {
          e.hidden = this.lcData.length > 0;
        });

      var tm = this.lcTemplateSet;
      var changes = this.lcDataChanges;
      this.lcDataChanges = {changed: false, prepend: [], append: []};
      var itemLN = {
        tbody: 'tr',
      }[listContainer.localName] || 'list-item';
      return Promise.resolve ().then (() => {
        if (changes.changed) {
          return $promised.forEach ((object) => {
            var e = tm.createFromTemplate (itemLN, object);
            listContainer.appendChild (e);
          }, this.lcData);
        } else {
          var scrollRef;
          var scrollRefTop;
          if (changes.scroll === 'preserve') {
            scrollRef = listContainer.firstElementChild;
          }
          if (scrollRef) scrollRefTop = scrollRef.offsetTop;
          var f = document.createDocumentFragment ();
          return Promise.all ([
            $promised.forEach ((object) => {
              var e = tm.createFromTemplate (itemLN, object);
              f.appendChild (e);
            }, changes.prepend).then (() => {
              listContainer.insertBefore (f, listContainer.firstChild);
            }),
            $promised.forEach ((object) => {
              var e = tm.createFromTemplate (itemLN, object);
              listContainer.appendChild (e);
            }, changes.append),
          ]).then (() => {
            if (scrollRef) {
              var delta = scrollRef.offsetTop - scrollRefTop;
              // XXX nearest scrollable area
              if (delta) document.documentElement.scrollTop += delta;
            }
          });
        }
        }).then (() => {
          this.dispatchEvent (new Event ('pcRendered', {bubbles: true}));
        });
      }, // lcRender
    },
    templateSet: true,
  }); // list-container

  defineElement ({
    name: 'form',
    is: 'save-data',
    pcActionStatus: true,
    props: {
      pcInit: function () {
        this.sdCheck ();
        this.addEventListener ('click', (ev) => {
          var e = ev.target;
          while (e) {
            if (e.localName === 'button') break;
            // |input| buttons are intentionally not supported
            if (e === this) {
              e = null;
              break;
            }
            e = e.parentNode;
          }
          this.sdClickedButton = e;
        });
        this.addEventListener ('change', (ev) => {
          this.setAttribute ('data-pc-modified', '');
        });
        this.onsubmit = function () {
          this.sdCheck ();

          if (this.hasAttribute ('data-confirm')) {
            if (!confirm (this.getAttribute ('data-confirm'))) return false;
          }
          
          var fd = new FormData (this);
          if (this.sdClickedButton) {
            if (this.sdClickedButton.name &&
                this.sdClickedButton.type === 'submit') {
              fd.append (this.sdClickedButton.name, this.sdClickedButton.value);
            }
            this.sdClickedButton = null;
          }

          var disabledControls = this.querySelectorAll
              ('input:enabled, select:enabled, textarea:enabled, button:enabled');
          var customControls = this.querySelectorAll ('[formcontrol]:not([disabled])');
          disabledControls.forEach ((_) => _.setAttribute ('disabled', ''));
          customControls.forEach ((_) => _.setAttribute ('disabled', ''));

          var validators = (this.getAttribute ('data-validator') || '')
              .split (/\s+/)
              .filter (function (_) { return _.length });
          var nextActions = (this.getAttribute ('data-next') || '')
              .split (/\s+/)
              .filter (function (_) { return _.length })
              .map (function (_) {
                return _.split (/:/);
              });

          var as = this.pcActionStatus ();
          
          $promised.forEach ((_) => {
            if (_.pcModifyFormData) {
              return _.pcModifyFormData (fd);
            } else {
              console.log (_, "No |pcModifyFormData| method");
              throw "A form control is not initialized";
            }
          }, customControls).then (() => {
            return $promised.forEach ((_) => {
              return getDef ("formvalidator", _).then ((handler) => {
                return handler.call (this, {
                  formData: fd,
                });
              });
            }, validators);
          }).then (() => {
            as.start ({stages: ['saver']});
            as.stageStart ('saver');
            return getDef ("saver", this.getAttribute ('data-saver') || 'form').then ((saver) => {
              return saver.call (this, fd);
            });
          }).then ((res) => {
            this.removeAttribute ('data-pc-modified');
            var p;
            var getJSON = function () {
              return p = p || res.json ();
            };
            return $promised.forEach ((_) => {
              return getDef ("formsaved", _[0]).then ((handler) => {
                return handler.call (this, {
                  args: _,
                  response: res,
                  json: getJSON,
                });
              });
            }, nextActions);
          }).then (() => {
            disabledControls.forEach ((_) => _.removeAttribute ('disabled'));
            customControls.forEach ((_) => _.removeAttribute ('disabled'));
            as.end ({ok: true});
          }).catch ((e) => {
            disabledControls.forEach ((_) => _.removeAttribute ('disabled'));
            customControls.forEach ((_) => _.removeAttribute ('disabled'));
            as.end ({error: e});
          });
          return false;
        }; // onsubmit
      }, // sdInit
      sdCheck: function () {
        if (!this.hasAttribute ('action')) {
          console.log (this, 'Warning: form[is=save-data] does not have |action| attribute');
        }
        if (this.method !== 'post') {
          console.log (this, 'Warning: form[is=save-data] does not have |method| attribute whose value is |POST|');
        }
        if (this.hasAttribute ('enctype') &&
            this.enctype !== 'multipart/form-data') {
          console.log (this, 'Warning: form[is=save-data] have |enctype| attribute which is ignored');
        }
        if (this.hasAttribute ('target')) {
          console.log (this, 'Warning: form[is=save-data] have a |target| attribute');
        }
        if (this.hasAttribute ('onsubmit')) {
          console.log (this, 'Warning: form[is=save-data] have an |onsubmit| attribute');
        }
      }, // sdCheck
    }, // props
  }); // <form is=save-data>

  defs.saver.form = function (fd) {
    return fetch (this.action, {
      credentials: 'same-origin',
      method: 'POST',
      referrerPolicy: 'same-origin',
      body: fd,
    }).then ((res) => {
      if (res.status !== 200) throw res;
      return res;
    });
  }; // form

  defs.formsaved.reset = function (args) {
    this.reset ();
  }; // reset

  defs.formsaved.go = function (args) {
    return args.json ().then ((json) => {
      location.href = $fill.string (args.args[1], json);
      return new Promise (() => {});
    });
  }; // go

  defineElement ({
    name: 'before-unload-check',
    props: {
      pcInit: function () {
        window.addEventListener ('beforeunload', (ev) => {
          if (document.querySelector ('form[data-pc-modified]')) {
            ev.returnValue = '!';
          }
        });
        // XXX on disconnect
      }, // pcInit
    },
  }); // <before-unload-check>

  defineElement ({
    name: 'input-tzoffset',
    props: {
      pcInit: function () {
        this.setAttribute ('formcontrol', '');
        
        new MutationObserver ((mutations) => {
          this.pcRender ();
        }).observe (this, {childList: true});
        this.pcRequestRender ();

        var value = this.value !== undefined ? this.value : parseFloat (this.getAttribute ('value'));
        if (!Number.isFinite (value)) {
          if (this.hasAttribute ('platformvalue')) {
            value = -(new Date).getTimezoneOffset () * 60;
          } else {
            value = 0;
          }
        }
        Object.defineProperty (this, 'value', {
          get: () => value,
          set: (newValue) => {
            newValue = parseFloat (newValue);
            if (Number.isFinite (newValue) && value !== newValue) {
              value = newValue;
              this.pcRequestRender ();
            }
          },
        });
      }, // pcInit
      pcRequestRender: function () {
        this.pcRenderTimer = setTimeout (() => this.pcRender (), 0);
      }, // pcRequestRender
      pcRender: function () {
        var value = this.value;
        this.querySelectorAll ('select').forEach (c => {
          c.value = value >= 0 ? '+1' : '-1';
          c.required = true;
          c.onchange = () => {
            var v = this.value;
            if (c.value === '+1') {
              if (v < 0) this.value = -v;
            } else {
              if (v > 0) this.value = -v;
            }
          };
        });
        this.querySelectorAll ('input[type=time]').forEach (c => {
          c.valueAsNumber = (value >= 0 ? value : -value)*1000;
          c.required = true;
          c.onchange = () => {
            this.value = (this.value >= 0 ? c.valueAsNumber : -c.valueAsNumber) / 1000;
          };
        });
        this.querySelectorAll ('time').forEach (t => {
          t.setAttribute ('data-tzoffset', value);
        });

        this.querySelectorAll ('enum-value[data-tzoffset-type=sign]').forEach (t => {
          t.setAttribute ('value', value >= 0 ? 'plus' : 'minus');
        });
        this.querySelectorAll ('unit-number[data-tzoffset-type=time]').forEach (t => {
          t.setAttribute ('value', value >= 0 ? value : -value);
        });
        
        var pfValue = -(new Date).getTimezoneOffset () * 60;
        var pfDelta = value - pfValue;
        this.querySelectorAll ('enum-value[data-tzoffset-type=platformdelta-sign]').forEach (t => {
          t.setAttribute ('value', pfDelta >= 0 ? 'plus' : 'minus');
        });
        this.querySelectorAll ('unit-number[data-tzoffset-type=platformdelta-time]').forEach (t => {
          t.setAttribute ('value', pfDelta >= 0 ? pfDelta : -pfDelta);
        });
      }, // pcRender
      pcModifyFormData: function (fd) {
        var name = this.getAttribute ('name');
        if (!name) return;
        fd.append (name, this.value);
      }, // pcModifyFormData
    },
  }); // <input-tzoffset>
  defs.filltype["input-tzoffset"] = 'idlattribute';

  defineElement ({
    name: 'input-datetime',
    props: {
      pcInit: function () {
        this.setAttribute ('formcontrol', '');
        
        new MutationObserver ((mutations) => {
          this.pcRender ();
        }).observe (this, {childList: true});
        this.pcRequestRender ();

        var mo = new MutationObserver (() => {
          var newValue = parseFloat (this.getAttribute ('tzoffset'));
          if (Number.isFinite (newValue) && newValue !== this.pcValueTZ) {
            var v = this.value;
            this.pcValueTZ = newValue;
            setValue (v);
          }
        });
        mo.observe (this, {attributes: true, attributeFilter: ['tzoffset']});

        this.pcValueTZ = parseFloat (this.getAttribute ('tzoffset'));
        if (!Number.isFinite (this.pcValueTZ)) {
          this.pcValueTZ = -(new Date).getTimezoneOffset () * 60;
        }
        var setValue = (newValue) => {
          var d = new Date ((newValue + this.pcValueTZ) * 1000);
          this.pcValueDate = Math.floor (d.valueOf () / (24 * 60 * 60 * 1000)) * 24 * 60 * 60;
          this.pcValueTime = d.valueOf () / 1000 - this.pcValueDate;
          this.pcRequestRender ();
        }; // setValue
        
        var value = this.value !== undefined ? this.value : parseFloat (this.getAttribute ('value'));
        if (!Number.isFinite (value)) {
          setValue ((new Date).valueOf () / 1000); // now
          this.pcValueTime = 0;
        } else {
          setValue (value);
        }
        
        Object.defineProperty (this, 'value', {
          get: () => this.pcValueDate + this.pcValueTime - this.pcValueTZ,
          set: (newValue) => {
            newValue = parseFloat (newValue);
            if (Number.isFinite (newValue)) {
              setValue (newValue);
            }
          },
        });
      }, // pcInit
      pcRequestRender: function () {
        this.pcRenderTimer = setTimeout (() => this.pcRender (), 0);
      }, // pcRequestRender
      pcRender: function () {
        this.querySelectorAll ('input[type=date]').forEach (c => {
          c.valueAsNumber = this.pcValueDate * 1000;
          c.required = true;
          c.onchange = () => {
            this.pcValueDate = Math.floor (c.valueAsNumber / 1000);
            this.pcRequestRender ();
          };
        });
        this.querySelectorAll ('input[type=time]').forEach (c => {
          c.valueAsNumber = this.pcValueTime * 1000;
          c.required = true;
          c.onchange = () => {
            this.pcValueTime = c.valueAsNumber / 1000;
            this.pcRequestRender ();
          };
        });
        var valueDate = new Date (this.value * 1000);
        this.querySelectorAll ('time').forEach (t => {
          t.setAttribute ('datetime', valueDate.toISOString ());
        });
        
        this.querySelectorAll ('button[data-dt-type]').forEach (t => {
          t.onclick = () => this.pcHandleButton (t);
        });
      }, // pcRender
      pcHandleButton: function (button) {
        var type = button.getAttribute ('data-dt-type');
        if (type === 'set') {
          this.value = button.value;
        } else if (type === 'set-now') {
          this.value = (new Date).valueOf () / 1000;
        } else if (type === 'set-today') {
          var now = new Date;
          var lDay = new Date (now.toISOString ().replace (/T.*/, 'T00:00'));
          var uDay = new Date (now.toISOString ().replace (/T.*/, 'T00:00Z'));
          var delta = -now.getTimezoneOffset () * 60 - this.pcValueTZ;
          var time = (now.valueOf () - lDay.valueOf ()) / 1000;
          if (time >= delta) {
            this.value = uDay.valueOf () / 1000 - this.pcValueTZ;
          } else {
            this.value = uDay.valueOf () / 1000 - this.pcValueTZ - 24*60*60;
          }
        } else {
          throw new Error ('Unknown type: button[data-dt-type="'+type+'"]');
        }
        setTimeout (() => {
          this.dispatchEvent (new Event ('change', {bubbles: true}));
        }, 0);
      }, // pcHandleButton
      pcModifyFormData: function (fd) {
        var name = this.getAttribute ('name');
        if (!name) return;
        fd.append (name, this.value);
      }, // pcModifyFormData
    },
  }); // <input-datetime>
  defs.filltype["input-datetime"] = 'idlattribute';
  
  defineElement ({
    name: 'image-editor',
    props: {
    pcInit: function () {
      this.ieResize ({resizeEvent: true});
      var mo = new MutationObserver ((mutations) => {
        var resized = false;
        mutations.forEach ((mutation) => {
          if (mutation.attributeName === 'width' ||
              mutation.attributeName === 'height') {
            if (!resized) {
              resized = true;
              this.ieResize ({resizeEvent: true, changeEvent: true});
            }
          }
        });
      });
      mo.observe (this, {attributes: true, attributeFilter: ['width', 'height']});

      new MutationObserver (function (mutations) {
        mutations.forEach (function (m) {
          Array.prototype.forEach.call (m.addedNodes, function (e) {
            if (e.nodeType === e.ELEMENT_NODE &&
                e.localName === 'image-layer') {
              upgrade (e);
            }
          });
        });
      }).observe (this, {childList: true});
      Array.prototype.slice.call (this.children).forEach ((e) => {
        if (e.localName === 'image-layer') {
          Promise.resolve (e).then (upgrade);
        }
      });

      if (this.hasAttribute ('data-onresize')) {
        this.setAttribute ('onresize', this.getAttribute ('data-onresize'));
      }
    }, // pcInit

    ieResize: function (opts) {
      var width = 0;
      var height = 0;
      var fixedWidth = parseFloat (this.getAttribute ('width'));
      var fixedHeight = parseFloat (this.getAttribute ('height'));
      if (!(fixedWidth > 0) || !(fixedHeight > 0)) {
        Array.prototype.slice.call (this.children).forEach ((e) => {
          var w = e.left + e.width;
          var h = e.top + e.height;
          if (w > width) width = w;
          if (h > height) height = h;
        });
        width = width || 300;
        height = height || 150;
      }
      if (fixedWidth > 0) width = fixedWidth;
      if (fixedHeight > 0) height = fixedHeight;
      var resize = opts.resizeEvent && (this.width !== width || this.height !== height);
      this.width = width;
      this.height = height;
      this.style.width = width + 'px';
      this.style.height = height + 'px';
      if (resize) {
        Promise.resolve ().then (() => {
          this.dispatchEvent (new Event ('resize', {bubbles: true}));
        });
      }
      if (opts.changeEvent) {
        Promise.resolve ().then (() => {
          this.dispatchEvent (new Event ('change', {bubbles: true}));
        });
      }
    }, // ieResize

    ieCanvasToBlob: function (type, quality) {
      return new Promise ((ok) => {
        var canvas = document.createElement ('canvas');
        canvas.width = Math.ceil (this.width);
        canvas.height = Math.ceil (this.height);
        var context = canvas.getContext ('2d');
        Array.prototype.slice.call (this.children).forEach ((e) => {
          if (e.localName === 'image-layer' && e.pcUpgraded) {
            context.drawImage (e.ieCanvas, e.left, e.top, e.width, e.height);
          }
        });
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
    },
  }); // image-editor

  defineElement ({
    name: 'image-layer',
    notTopLevel: true,
    props: {
    pcInit: function () {
      this.ieCanvas = document.createElement ('canvas');
      this.appendChild (this.ieCanvas);
      if (this.parentNode) {
        this.ieCanvas.width = this.parentNode.width;
        this.ieCanvas.height = this.parentNode.height;
      }
      this.ieTogglePlaceholder (true);

      // XXX not tested
      var mo = new MutationObserver (function (mutations) {
        mutations.forEach ((mutation) => {
          if (mutation.attributeName === 'movable' ||
              mutation.attributeName === 'useplaceholder') {
            this.ieTogglePlaceholder (null);
          }
        });
      });
      mo.observe (this, {attributes: true, attributeFilter: ['movable', 'useplaceholder']});

      this.top = 0;
      this.left = 0;
      this.ieScaleFactor = 1.0;
      this.width = this.ieCanvas.width /* * this.ieScalerFactor */;
      this.height = this.ieCanvas.height /* * this.ieScaleFactor */;
      if (this.parentNode && this.parentNode.ieResize) this.parentNode.ieResize ({});
      this.dispatchEvent (new Event ('resize', {bubbles: true}));
      this.dispatchEvent (new Event ('change', {bubbles: true}));
    }, // pcInit

    cbCommands: {
      startCaptureMode: {},
      endCaptureMode: {},
      selectImageFromCaptureModeAndEndCaptureMode: {},
      
      selectImageFromFile: {},
      selectImageFromGooglePhotos: {},

      rotateClockwise: {},
      rotateCounterclockwise: {},
    },

    ieSetClickMode: function (mode) {
      if (mode === this.ieClickMode) return;
      if (mode === 'selectImage') {
        this.ieClickMode = mode;
        // XXX We don't have tests of this behavior...
        this.ieClickListener = (ev) => this.selectImageFromFile ().catch ((e) => {
          var ev = new Event ('error', {bubbles: true});
          ev.exception = e;
          var notHandled = this.dispatchEvent (ev);
          if (notHandled) throw e;
        });
        this.addEventListener ('click', this.ieClickListener);
      } else if (mode === 'none') { 
        this.ieClickMode = mode;
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
          if (file) {
            this.ieSetImageFile (file).catch ((e) => {
              var ev = new Event ('error', {bubbles: true});
              ev.exception = e;
              return Promise.resolve.then (() => {
                var notHandled = this.dispatchEvent (ev);
                if (notHandled) throw e;
              });
            });
          }
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
    ieSetMoveMode: function (mode) {
      if (this.ieMoveMode === mode) return;
      if (mode === 'editOffset') {
        this.ieMoveMode = mode;
        var dragging = null;
        this.ieMouseDownHandler = (ev) => {
          dragging = [this.left, this.top,
                      this.offsetLeft + ev.offsetX,
                      this.offsetTop + ev.offsetY];
        };
        this.ieMouseMoveHandler = (ev) => {
          if (dragging) {
            this.ieMove (
              dragging[0] + this.offsetLeft + ev.offsetX - dragging[2],
              dragging[1] + this.offsetTop + ev.offsetY - dragging[3],
            );
          }
        };
        this.ieMouseUpHandler = (ev) => dragging = null;
        this.ieKeyDownHandler = (ev) => {
          if (dragging) return;
          if (ev.keyCode === 38) {
            this.ieMove (this.left, this.top-1);
            ev.preventDefault ();
          } else if (ev.keyCode === 39) {
            this.ieMove (this.left+1, this.top);
            ev.preventDefault ();
          } else if (ev.keyCode === 40) {
            this.ieMove (this.left, this.top+1);
            ev.preventDefault ();
          } else if (ev.keyCode === 37) {
            this.ieMove (this.left-1, this.top);
            ev.preventDefault ();
          }
        };
        // XXX we don't have tests of dnd and keyboard operations
        var m = this.ieMoveContainer = this;
        m.addEventListener ('mousedown', this.ieMouseDownHandler);
        m.addEventListener ('mousemove', this.ieMouseMoveHandler);
        window.addEventListener ('mouseup', this.ieMouseUpHandler);
        m.addEventListener ('keydown', this.ieKeyDownHandler);
        m.tabIndex = 0;
      } else if (mode === 'none') {
        var m = this.ieMoveContainer;
        if (m) {
          m.removeEventListener ('mousedown', this.ieMouseDownHandler);
          m.removeEventListener ('mousemove', this.ieMouseMoveHandler);
          window.removeEventListener ('mouseup', this.ieMouseUpHandler);
          m.removeEventListener ('keydown', this.ieKeyDownHandler);
          delete this.ieMouseDownHandler;
          delete this.ieMouseMoveHandler;
          delete this.ieMouseUpHandler;
          delete this.ieKeyDownHandler;
          delete this.ieMoveContainer;
        }
      } else {
        throw new Error ("Bad mode |"+mode+"|");
      }
    }, // ieSetMoveMode

    // XXX not tested
    startCaptureMode: function () {
      if (this.ieEndCaptureMode) return;
      this.ieEndCaptureMode = () => {};

      var videoWidth = this.width;
      var videoHeight = this.height;
      var TimeoutError = function () {
        this.name = "TimeoutError";
        this.message = "Camera timeout";
      };
      var run = () => {
        return navigator.mediaDevices.getUserMedia ({video: {
          width: videoWidth, height: videoHeight,
          //XXX facingMode: opts.facingMode, // |user| or |environment|
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

    ieTogglePlaceholder: function (newValue) {
      if (newValue === null) newValue = this.classList.contains ("placeholder");
      if (newValue) { // is placeholder
        this.classList.add ('placeholder');
        if (this.hasAttribute ('useplaceholderui')) {
          this.ieSetClickMode ('selectImage');
          this.ieSetDnDMode ('selectImage');
          this.ieSetMoveMode ('none');
        } else {
          this.ieSetClickMode ('none');
          this.ieSetDnDMode ('none');
          this.ieSetMoveMode (this.hasAttribute ('movable') ? 'editOffset' : 'none');
        }
      } else { // is image
        this.classList.remove ('placeholder');
        this.ieSetClickMode ('none');
        this.ieSetDnDMode ('none');
        this.ieSetMoveMode (this.hasAttribute ('movable') ? 'editOffset' : 'none');
      }
    }, // ieTogglePlaceholder      

    ieSelectImageByElement: function (element, width, height) {
      var ev = new Event ('pcImageSelect', {bubbles: true});
      ev.element = element;
      this.dispatchEvent (ev);

      this.ieCanvas.width = width;
      this.ieCanvas.height = height;
      var context = this.ieCanvas.getContext ('2d');
      context.drawImage (element, 0, 0, width, height);
      this.ieUpdateDimension ();
      this.ieTogglePlaceholder (false);
      return Promise.resolve ();
    }, // ieSelectImageByElement
    selectImageByURL: function (url) {
      return new Promise ((ok, ng) => {
        var img = document.createElement ('img');
        img.src = url;
        img.setAttribute ('crossorigin', '');
        img.onload = function () {
          ok (img);
        };
        img.onerror = (ev) => {
          var e = new Error ('Failed to load the image <'+img.src+'>');
          e.name = 'ImageLoadError';
          ng (e);
        };
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
            ok (input.files[0]);
          } else {
            // This is unlikely called.  There is no way to hook on "cancel".
            this.ieFileCancel ();
          }
        };
        input.click ();
      }).then ((file) => {
        return this.ieSetImageFile (file);
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

    // ieGooglePickerAPI
    ieLoadGooglePickerAPI: function () {
      return this.ieGooglePickerAPI = this.ieGooglePickerAPI || new Promise ((ok, ng) => {
        var name = 'pacoCB' + Math.random ().toString ().replace (/\./, '');
        var script = document.createElement ('script');
        script.src = 'https://apis.google.com/js/api.js?onload=' + name;
        script.onerror = ng;
        document.head.appendChild (script);
        window[name] = function () {
          delete window[name];
          ok ();
        };
      }).then (() => {
        return Promise.all ([
          new Promise (ok => {
            gapi.load ('auth2', ok);
          }),
          new Promise (ok => {
            gapi.load ('picker', ok);
          }),
        ]);
      });
    }, // ieLoadGooglePickerAPI
    //ieGoogleOAuthToken
    iePrepareGoogleOAuth: function () {
      if (this.ieGoogleOAuthToken) return Promise.resolve ();
      return this.ieLoadGooglePickerAPI ().then (() => {
        return new Promise ((ok, ng) => {
          var scope = 'https://www.googleapis.com/auth/photos';
          var clientId = document.documentElement.getAttribute ('data-google-picker-client-id');
          if (!clientId) throw new DOMException ('<html data-google-picker-client-id> is not specified', 'InvalidStateError');
          gapi.auth2.init ({client_id: clientId}).then ((ga) => {
            ga.signIn ({scope: scope}).then ((result) => {
              var auth = result.getAuthResponse ();
              if (auth && !auth.error) {
                this.ieGoogleOAuthToken = auth.access_token;
                ok ();
              } else {
                ng (auth);
              }
            });
          });
        });
      });
    }, // iePrepareGoogleOAuth
    // XXX not tested :-<
    selectImageFromGooglePhotos: function () {
      var key = document.documentElement.getAttribute ('data-google-picker-key');
      var proxyTemplate = document.documentElement.getAttribute ('data-paco-image-proxy');
      return Promise.resolve ().then (() => {
        if (!key) throw new DOMException ('<html data-google-picker-key> is not specified', 'InvalidStateError');
        if (!proxyTemplate) throw new DOMException ('<html data-paco-image-proxy> is not specified', 'InvalidStateError');
        return this.ieLoadGooglePickerAPI ();
      }).then (() => {
        return this.iePrepareGoogleOAuth ();
      }).then (() => {
        return new Promise ((ok, ng) => {
          var picker = new google.picker.PickerBuilder()
              .addView (google.picker.ViewId.PHOTOS)
              .addView ((new google.picker.PhotosView).setType ("camerasync"))
              .addView (google.picker.ViewId.PHOTO_UPLOAD)
              .setOAuthToken (this.ieGoogleOAuthToken)
              .setDeveloperKey (key)
              .setLocale (navigator.language)
              .setCallback ((data) => {
                //console.log (data);
                if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                  ok (data);
                } else if (data[google.picker.Response.ACTION] == google.picker.Action.CANCEL) {
                  ng (new DOMException ('User canceled', 'AbortError'));
                }
                // LOADED, ...
              })
              .build ();
          picker.setVisible (true);
        });
      }).then (data => {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        var url = doc[google.picker.Document.URL];
        var imageURL = doc.thumbnails[doc.thumbnails.length-1].url;
        if (!imageURL) throw new Error ('Google Picker API response is broken');
        imageURL = imageURL.replace (/\/s[0-9]+[-a-z]*\/([^\/]+)$/, '/s1200/$1');
        if (!/\/s1200\/[^\/]+$/.test (imageURL)) {
          imageURL = imageURL.replace (/(?=[^\/]+$)/, 's1200/');
        }
        return this.selectImageByURL ($fill.string (proxyTemplate, {url: imageURL}));
      });
    }, // selectImageFromGooglePhotos

    ieRotateByDegree: function (degree) {
      var canvas = document.createElement ('canvas');
      canvas.width = this.ieCanvas.height;
      canvas.height = this.ieCanvas.width;
      var context = canvas.getContext ('2d');
      context.translate (canvas.width / 2, canvas.height / 2);
      context.rotate (degree * 2 * Math.PI / 360);
      context.drawImage (this.ieCanvas, -canvas.height / 2, -canvas.width / 2);
      context.resetTransform ();
      this.replaceChild (canvas, this.ieCanvas);
      this.ieCanvas = canvas;
      this.ieUpdateDimension ();
    }, // ieRotateByDegree
    rotateClockwise: function () {
      return this.ieRotateByDegree (90);
    }, // rotateClockwise
    rotateCounterclockwise: function () {
      return this.ieRotateByDegree (-90);
    }, // rotateCounterclockwise

    ieMove: function (x, y) {
      this.left = x;
      this.top = y;
      this.style.left = this.left + "px";
      this.style.top = this.top + "px";
      if (!this.ieMoveTimer) {
        this.ieMoveTimer = setTimeout (() => {
          if (this.parentNode && this.parentNode.ieResize) this.parentNode.ieResize ({resizeEvent: true, changeEvent: true});
          this.ieMoveTimer = null;
        }, 100);
      }
    }, // ieMove
    ieUpdateDimension: function () {
      var oldWidth = this.width;
      var oldHeight = this.height;
      if (this.getAttribute ('anchorpoint') === 'center') {
        var x = this.left + this.width / 2;
        var y = this.top + this.height / 2;
        this.width = this.ieCanvas.width * this.ieScaleFactor;
        this.height = this.ieCanvas.height * this.ieScaleFactor; 
        this.left = x - this.width / 2;
        this.top = y - this.height / 2;
        this.style.left = this.left + "px";
        this.style.top = this.top + "px";
      } else {
        this.width = this.ieCanvas.width * this.ieScaleFactor;
        this.height = this.ieCanvas.height * this.ieScaleFactor;
      }
      this.ieCanvas.style.width = this.width + "px";
      this.ieCanvas.style.height = this.height + "px";
      if (oldWidth !== this.width || oldHeight !== this.height) {
        if (this.parentNode && this.parentNode.ieResize) this.parentNode.ieResize ({});

        this.dispatchEvent (new Event ('resize', {bubbles: true}));
      }
      this.dispatchEvent (new Event ('change', {bubbles: true}));
    }, // ieUpdateDimension

    setScale: function (newScale) {
      if (this.ieScaleFactor === newScale) return;
      this.ieScaleFactor = newScale;
      this.ieUpdateDimension ();
    }, // setScale
    },
  }); // <image-layer>

  class InvalidValueError extends Error {
    constructor (value) {
      super ('The specified value |'+value+'| is invalid');
      this.name = 'InvalidValueError';
      this.pcValue = value;
    };
  }; // InvalidValueError

  defineElement ({
    name: 'table-mapper',
    props: {
      pcInit: function () {
        this.pcHeader = [];
        this.pcRawData = [];
        this.pcExpected = {};
        this.pcOverrideMapping = [];
        this.pcComputedData = [];
        this.pcComputedMapping = [];
        this.onchange = (ev) => {
          if (ev.target.localName === 'select' &&
              ev.target.getAttribute ('is') === 'table-mapper-header') {
            var index = ev.target.getAttribute ('data-index');
            var mappedKey = ev.target.value;
            if (index != null) {
              this.pcOverrideMapping[index] = this.pcOverrideMapping[index] || {};
              this.pcOverrideMapping[index].mappedKey = mappedKey;
              this.pcRender ();
            }
          }
        }; // onchange
        this.pcEvaluated = Promise.resolve ();
      }, // pcInit
      setRawData: function (data, opts) {
        this.pcRawData = Array.prototype.slice.call (data || []);
        if (opts.header) {
          this.pcHeader = this.pcRawData.shift ();
        } else {
          this.pcHeader = [];
        }
        this.pcRender ();
      }, // setRawData
      setExpectedStructure: function (data) {
        this.pcExpected = data || {};
        this.pcRender ();
      }, // setExpectedStructure
      pcRecompute: function () {
        delete this.pcComputedInError;
        var mapping = this.pcComputedMapping = [];
        var hasMapping = [];
        var mapped = {};
        for (var i = 0; i < this.pcHeader.length; i++) {
          mapping[i] = {
            index: i,
            headerValue: this.pcHeader[i], // or undefined
            errorCount: 0,
            errors: [],
          };
          if (this.pcOverrideMapping[i] &&
              this.pcOverrideMapping[i].mappedKey != null) {
            if (mapping[i].mappedKey === '') {
              hasMapping[i] = true;
            } else {
              var key = this.pcOverrideMapping[i].mappedKey;
              if (!mapped[key]) {
                mapping[i].mappedKey = key;
                hasMapping[i] = true;
                mapped[key] = true;
              }
            }
          }
        }
        for (var i = 0; i < this.pcHeader.length; i++) {
          if (hasMapping[i]) {
            //
          } else if (mapping[i].headerValue) {
            if (this.pcExpected[mapping[i].headerValue]) {
              var key = mapping[i].headerValue;
              if (!mapped[key]) {
                mapping[i].mappedKey = key;
                hasMapping[i] = true;
                mapped[key] = true;
              }
            } else {
              var keys = Object.keys (this.pcExpected);
              for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                if ((this.pcExpected[key].headerValues || []).includes (mapping[i].headerValue)) {
                  if (!mapped[key]) {
                    mapping[i].mappedKey = key;
                    hasMapping[i] = true;
                    mapped[key] = true;
                  }
                  break;
                }
              }
            }
          }
        }

        this.pcComputedData = this.pcRawData.map (raw => {
          var data = {};
          for (var i = 0; i < mapping.length; i++) {
            if (mapping[i] && mapping[i].mappedKey) {
              var value = raw[i]; // or undefined
              var fieldDef = this.pcExpected[mapping[i].mappedKey];
              if (fieldDef.valueMapping) {
                var replaced = fieldDef.valueMapping[value];
                if (replaced == null || !fieldDef.valueMapping.hasOwnProperty (value)) {
                  if (!fieldDef.allowOtherValues) {
                    var error = new InvalidValueError (value);
                    mapping[i].errorCount++;
                    mapping[i].errors.push (error);
                    data.pcErrors = data.pcErrors || {};
                    data.pcErrors[mapping[i].mappedKey] = error;
                    this.pcComputedInError = true;
                    continue;
                  }
                } else {
                  value = replaced;
                }
              }
              data[mapping[i].mappedKey] = value;
            }
          }
          return {
            data: data,
            raw: raw,
          };
        });
      }, // pcRecompute
      pcRender: function () {
        clearTimeout (this.pcRenderTimer);
        this.pcRenderTimer = setTimeout (() => {
          this._pcRender ();
        }, 100);
        if (!this.pcResolveEvaluated)
        this.pcEvaluated = new Promise (a => {
          this.pcResolveEvaluated = a;
        });
      }, // pcRender
      _pcRender: function () {
        this.pcRecompute ();
        this.querySelectorAll ('list-container[loader=tableMapperLoader]').forEach (_ => {
          _.load ({});
        });
        if (this.pcResolveEvaluated) this.pcResolveEvaluated ();
      }, // _pcRender
      evaluate: function () {
        return this.pcEvaluated;
      }, // evaluate
      getComputedData: function () {
        return this.pcComputedData;
      }, // getComputedData
      getComputedInError: function () {
        return this.pcComputedInError || false;
      }, // getComputedInError
    },
  }); // <table-mapper>

  defs.loader.tableMapperLoader = function () {
    var tm = this;
    while (tm && tm.localName !== 'table-mapper') {
      tm = tm.parentNode;
    }

    var data = [];
    if (tm) {
      var type = this.getAttribute ('loader-type');
      if (type === 'data') {
        data = tm.pcComputedData;
      } else if (type === 'mapping') {
        data = tm.pcComputedMapping;
      } else {
        console.log (this, 'Unknown |loader-type| value: |'+type+'|');
      }
    } else {
      console.log (this, 'No ancestor <table-mapper>');
    }

    return {
      data: data,
    };
  }; // loader=tableMapperLoader

  defineElement ({
    name: 'select',
    is: 'table-mapper-header',
    props: {
      pcInit: function () {
        this.pcRender ();
      }, // pcInit
      pcRender: function () {
        var tm = this;
        while (tm && tm.localName !== 'table-mapper') {
          tm = tm.parentNode;
        } 
        if (!tm) return;

        this.querySelectorAll ('option:not([value=""])').forEach (_ => _.remove ());
        Object.keys (tm.pcExpected).forEach (key => {
          var opt = document.createElement ('option');
          opt.value = key;
          opt.label = tm.pcExpected[key].label || key;
          this.appendChild (opt);
        });
        this.value = this.getAttribute ('data-mappedkey') || '';
      }, // pcRender
    },
  }); // <select is=table-mapper-header>

  (document.currentScript.getAttribute ('data-export') || '').split (/\s+/).filter ((_) => { return _.length }).forEach ((name) => {
    self[name] = exportable[name];
  });
}) ();

/*

Copyright 2017-2019 Wakaba <wakaba@suikawiki.org>.

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
