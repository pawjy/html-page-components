(function () {
  var exportable = {};

  var $promised = {};

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
  defs.filltype.input = 'idlattribute';
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

    var props = upgradedElementProps[e.localName];
    Object.keys (props).forEach (function (k) {
      e[k] = props[k];
    });

    new Promise ((re) => re (upgrader[e.localName].call (e))).catch ((err) => console.log ("Can't upgrade an element", e, err));
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

  var defineElement = function (def) {
    upgradedElementProps[def.name] = def.props || {};
    upgrader[def.name] = def.templateSet ? function () {
      initTemplateSet (this);
      this.pcInit ();
    } : upgradedElementProps[def.name].pcInit || function () { };
    if (!def.notTopLevel) {
      var selector = def.name;
      if (def.is) {
        selector += '[is="' + def.is + '"]';
      }
      newUpgradableSelectors.push (selector);
      Promise.resolve ().then (() => {
        var news = newUpgradableSelectors.join (',');
        if (!news) return;
        newUpgradableSelectors.forEach ((_) => upgradableSelectors.push (_));
        newUpgradableSelectors = [];
        currentUpgradables = upgradableSelectors.join (',');
        Array.prototype.forEach.call (document.querySelectorAll (news), upgrade);
      });
    }
  }; // defineElement

  var filledAttributes = ['href', 'src', 'id', 'title'];
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
      } else if (fillType === 'datetime') {
        try {
          var dt = new Date (value * 1000);
          f.setAttribute ('datetime', dt.toISOString ());
        } catch (e) {
          f.removeAttribute ('datetime');
          f.textContent = e;
        }
      } else {
        f.textContent = value;
      }
    }); // [data-field]

    filledAttributes.forEach ((n) => {
      root.querySelectorAll ('[data-'+n+'-field]').forEach ((f) => {
        var name = f.getAttribute ('data-'+n+'-field').split (/\./);
        var value = object;
        for (var i = 0; i < name.length; i++) {
          value = value[name[i]];
          if (value == null) break;
        }
        if (value) {
          f.setAttribute (n, value);
        } else {
          f.removeAttribute (n);
        }
      }); // [data-*-field]

      root.querySelectorAll ('[data-'+n+'-template]').forEach ((f) => {
        f.setAttribute (n, f.getAttribute ('data-'+n+'-template').replace (/\{([\w.]+)\}/g, function (_, n) {
          var name = n.split (/\./);
          var value = object;
          for (var i = 0; i < name.length; i++) {
            value = value[name[i]];
            if (value == null) break;
          }
          return value;
        }));
      }); // [data-*-template]
    });
  }; // $fill

  var templateSetLocalNames = {};
  var templateSetSelector = '';
  var templateSetMembers = {
    pcCreateTemplateList: function () {
      this.pcTemplateList = {};
      Array.prototype.slice.call (this.querySelectorAll ('template')).forEach ((g) => {
        this.pcTemplateList[g.getAttribute ('data-name') || ""] = g;
      });

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
      e.className = template.className;
      e.appendChild (template.content.cloneNode (true));
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
  
  defineElement ({
    name: 'popup-menu',
    props: {
      pcInit: function () {
        this.addEventListener ('click', (ev) => this.pmClick (ev));
        var mo = new MutationObserver ((mutations) => {
          this.pmToggle (this.hasAttribute ('open'));
        });
        mo.observe (this, {attributeFilter: ['open']});
        setTimeout (() => this.pmLayout (), 100);
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
        prev: {ref: json.prev_ref, has: json.has_prev, limit: opts.limit,
               prepend: true},
        next: {ref: json.next_ref, has: json.has_next, limit: opts.limit,
               append: true},
      };
    });
  }; // loader=src

  defs.filter["default"] = function (data) {
    var list = data.data;
    if (!Array.isArray (list)) {
      list = Object.values (list);
    }
    // XXX sort=""
    if (this.hasAttribute ('reverse')) list = list.reverse ();
    return {
      data: list,
      prev: data.prev,
      next: data.next,
    };
  }; // filter=default

  defineElement ({
    name: 'list-container',
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

    load: function (opts) {
      if (!opts.prepend && !opts.append) this.lcClearList ();
      return this.lcLoad (opts).then (() => {
        return this.lcRequestRender ();
      });
    }, // load
    loadPrev: function () {
      return this.load (this.lcPrev);
    }, // loadPrev
    loadNext: function () {
      return this.load (this.lcNext);
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
      return getDef ("loader", this.getAttribute ('loader') || 'src').then ((loader) => {
        return loader.call (this, opts);
      }).then ((result) => {
        return getDef ("filter", this.getAttribute ('filter') || 'default').then ((filter) => {
          return filter.call (this, result);
        });
      }).then ((result) => {
        if (opts.prepend) {
          var newObjects = result.data.reverse ();
          this.lcData = newObjects.concat (this.lcData);
          this.lcDataChanges.prepend
              = newObjects.concat (this.lcDataChanges.prepend);
          this.lcPrev = result.prev || {};
        } else if (opts.append) {
          this.lcData = this.lcData.concat (result.data);
          this.lcDataChanges.append
              = this.lcDataChanges.append.concat (result.data);
          this.lcNext = result.next || {};
        } else {
          this.lcData = result.data || [];
          this.lcDataChanges = {prepend: [], append: [], changed: true};
          this.lcPrev = result.prev || {};
          this.lcNext = result.next || {};
        }
        resolve ();
      }).catch ((e) => {
        reject (e);
        throw e;
      });
    }, // lcLoad

    lcRequestRender: function () {
      clearTimeout (this.lcRenderRequestedTimer);
      this.lcRenderRequested = true;
      this.lcRenderRequestedTimer = setTimeout (() => {
        if (!this.lcRenderRequested) false;
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
        e.onclick = () => { this.loadPrev (); return false };
      });
      this.querySelectorAll ('a.list-next, button.list-next').forEach ((e) => {
        e.hidden = ! this.lcNext.has;
        if (e.localName === 'a') {
          e.href = this.lcNext.linkURL || 'javascript:';
        }
        e.onclick = () => { this.loadNext (); return false };
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
      if (changes.changed) {
        return $promised.forEach ((object) => {
          var e = tm.createFromTemplate (itemLN, object);
          listContainer.appendChild (e);
        }, this.lcData);
      } else {
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
        ]);
      }

      // XXX loaded-actions=""
      // XXX action-status integration
    }, // lcRender

    },
    templateSet: true,
  }); // list-container

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
      mo.observe (this, {attributeFilter: ['width', 'height']});

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
      mo.observe (this, {attributeFilter: ['movable', 'useplaceholder']});

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

      rotateClockwise: {},
      rotateCounterclockwise: {},
    },

    ieSetClickMode: function (mode) {
      if (mode === this.ieClickMode) return;
      if (mode === 'selectImage') {
        this.ieClickMode = mode;
        // XXX We don't have tests of this behavior...
        this.ieClickListener = (ev) => this.selectImageFromFile ();
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
  }); // image-layer

  (document.currentScript.getAttribute ('data-export') || '').split (/\s+/).filter ((_) => { return _.length }).forEach ((name) => {
    self[name] = exportable[name];
  });
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
