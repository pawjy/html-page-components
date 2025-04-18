(function () {
  console.pcMaps = {};
  (function () {
    /* @preserve
 * Leaflet 1.7.1, a JS library for interactive maps. http://leafletjs.com
 * (c) 2010-2019 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i(t.L={})}(this,function(t){"use strict";function h(t){for(var i,e,n=1,o=arguments.length;n<o;n++)for(i in e=arguments[n])t[i]=e[i];return t}var s=Object.create||function(t){return i.prototype=t,new i};function i(){}function p(t,i){var e=Array.prototype.slice;if(t.bind)return t.bind.apply(t,e.call(arguments,1));var n=e.call(arguments,2);return function(){return t.apply(i,n.length?n.concat(e.call(arguments)):arguments)}}var e=0;function m(t){return t._leaflet_id=t._leaflet_id||++e,t._leaflet_id}function n(t,i,e){var n,o,s=function(){n=!1,o&&(r.apply(e,o),o=!1)},r=function(){n?o=arguments:(t.apply(e,arguments),setTimeout(s,i),n=!0)};return r}function o(t,i,e){var n=i[1],o=i[0],s=n-o;return t===n&&e?t:((t-o)%s+s)%s+o}function a(){return!1}function r(t,i){var e=Math.pow(10,void 0===i?6:i);return Math.round(t*e)/e}function u(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function l(t){return u(t).split(/\s+/)}function c(t,i){for(var e in Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?s(t.options):{}),i)t.options[e]=i[e];return t.options}function _(t,i,e){var n=[];for(var o in t)n.push(encodeURIComponent(e?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(i&&-1!==i.indexOf("?")?"&":"?")+n.join("&")}var d=/\{ *([\w_-]+) *\}/g;function f(t,n){return t.replace(d,function(t,i){var e=n[i];if(void 0===e)throw new Error("No value provided for variable "+t);return"function"==typeof e&&(e=e(n)),e})}var g=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function v(t,i){for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1}var y="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function x(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var w=0;function P(t){var i=+new Date,e=Math.max(0,16-(i-w));return w=i+e,window.setTimeout(t,e)}var b=window.requestAnimationFrame||x("RequestAnimationFrame")||P,T=window.cancelAnimationFrame||x("CancelAnimationFrame")||x("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function M(t,i,e){if(!e||b!==P)return b.call(window,p(t,i));t.call(i)}function z(t){t&&T.call(window,t)}var C={extend:h,create:s,bind:p,lastId:e,stamp:m,throttle:n,wrapNum:o,falseFn:a,formatNum:r,trim:u,splitWords:l,setOptions:c,getParamString:_,template:f,isArray:g,indexOf:v,emptyImageUrl:y,requestFn:b,cancelFn:T,requestAnimFrame:M,cancelAnimFrame:z};function S(){}S.extend=function(t){function i(){this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()}var e=i.__super__=this.prototype,n=s(e);for(var o in(n.constructor=i).prototype=n,this)Object.prototype.hasOwnProperty.call(this,o)&&"prototype"!==o&&"__super__"!==o&&(i[o]=this[o]);return t.statics&&(h(i,t.statics),delete t.statics),t.includes&&(function(t){if("undefined"==typeof L||!L||!L.Mixin)return;t=g(t)?t:[t];for(var i=0;i<t.length;i++)t[i]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",(new Error).stack)}(t.includes),h.apply(null,[n].concat(t.includes)),delete t.includes),n.options&&(t.options=h(s(n.options),t.options)),h(n,t),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){e.callInitHooks&&e.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,i=n._initHooks.length;t<i;t++)n._initHooks[t].call(this)}},i},S.include=function(t){return h(this.prototype,t),this},S.mergeOptions=function(t){return h(this.prototype.options,t),this},S.addInitHook=function(t){var i=Array.prototype.slice.call(arguments,1),e="function"==typeof t?t:function(){this[t].apply(this,i)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(e),this};var Z={on:function(t,i,e){if("object"==typeof t)for(var n in t)this._on(n,t[n],i);else for(var o=0,s=(t=l(t)).length;o<s;o++)this._on(t[o],i,e);return this},off:function(t,i,e){if(t)if("object"==typeof t)for(var n in t)this._off(n,t[n],i);else for(var o=0,s=(t=l(t)).length;o<s;o++)this._off(t[o],i,e);else delete this._events;return this},_on:function(t,i,e){this._events=this._events||{};var n=this._events[t];n||(n=[],this._events[t]=n),e===this&&(e=void 0);for(var o={fn:i,ctx:e},s=n,r=0,a=s.length;r<a;r++)if(s[r].fn===i&&s[r].ctx===e)return;s.push(o)},_off:function(t,i,e){var n,o,s;if(this._events&&(n=this._events[t]))if(i){if(e===this&&(e=void 0),n)for(o=0,s=n.length;o<s;o++){var r=n[o];if(r.ctx===e&&r.fn===i)return r.fn=a,this._firingCount&&(this._events[t]=n=n.slice()),void n.splice(o,1)}}else{for(o=0,s=n.length;o<s;o++)n[o].fn=a;delete this._events[t]}},fire:function(t,i,e){if(!this.listens(t,e))return this;var n=h({},i,{type:t,target:this,sourceTarget:i&&i.sourceTarget||this});if(this._events){var o=this._events[t];if(o){this._firingCount=this._firingCount+1||1;for(var s=0,r=o.length;s<r;s++){var a=o[s];a.fn.call(a.ctx||this,n)}this._firingCount--}}return e&&this._propagateEvent(n),this},listens:function(t,i){var e=this._events&&this._events[t];if(e&&e.length)return!0;if(i)for(var n in this._eventParents)if(this._eventParents[n].listens(t,i))return!0;return!1},once:function(t,i,e){if("object"==typeof t){for(var n in t)this.once(n,t[n],i);return this}var o=p(function(){this.off(t,i,e).off(t,o,e)},this);return this.on(t,i,e).on(t,o,e)},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[m(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[m(t)],this},_propagateEvent:function(t){for(var i in this._eventParents)this._eventParents[i].fire(t.type,h({layer:t.target,propagatedFrom:t.target},t),!0)}};Z.addEventListener=Z.on,Z.removeEventListener=Z.clearAllEventListeners=Z.off,Z.addOneTimeEventListener=Z.once,Z.fireEvent=Z.fire,Z.hasEventListeners=Z.listens;var E=S.extend(Z);function k(t,i,e){this.x=e?Math.round(t):t,this.y=e?Math.round(i):i}var B=Math.trunc||function(t){return 0<t?Math.floor(t):Math.ceil(t)};function A(t,i,e){return t instanceof k?t:g(t)?new k(t[0],t[1]):null==t?t:"object"==typeof t&&"x"in t&&"y"in t?new k(t.x,t.y):new k(t,i,e)}function I(t,i){if(t)for(var e=i?[t,i]:t,n=0,o=e.length;n<o;n++)this.extend(e[n])}function O(t,i){return!t||t instanceof I?t:new I(t,i)}function R(t,i){if(t)for(var e=i?[t,i]:t,n=0,o=e.length;n<o;n++)this.extend(e[n])}function N(t,i){return t instanceof R?t:new R(t,i)}function D(t,i,e){if(isNaN(t)||isNaN(i))throw new Error("Invalid LatLng object: ("+t+", "+i+")");this.lat=+t,this.lng=+i,void 0!==e&&(this.alt=+e)}function j(t,i,e){return t instanceof D?t:g(t)&&"object"!=typeof t[0]?3===t.length?new D(t[0],t[1],t[2]):2===t.length?new D(t[0],t[1]):null:null==t?t:"object"==typeof t&&"lat"in t?new D(t.lat,"lng"in t?t.lng:t.lon,t.alt):void 0===i?null:new D(t,i,e)}k.prototype={clone:function(){return new k(this.x,this.y)},add:function(t){return this.clone()._add(A(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(A(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new k(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new k(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=B(this.x),this.y=B(this.y),this},distanceTo:function(t){var i=(t=A(t)).x-this.x,e=t.y-this.y;return Math.sqrt(i*i+e*e)},equals:function(t){return(t=A(t)).x===this.x&&t.y===this.y},contains:function(t){return t=A(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+r(this.x)+", "+r(this.y)+")"}},I.prototype={extend:function(t){return t=A(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new k((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new k(this.min.x,this.max.y)},getTopRight:function(){return new k(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var i,e;return(t=("number"==typeof t[0]||t instanceof k?A:O)(t))instanceof I?(i=t.min,e=t.max):i=e=t,i.x>=this.min.x&&e.x<=this.max.x&&i.y>=this.min.y&&e.y<=this.max.y},intersects:function(t){t=O(t);var i=this.min,e=this.max,n=t.min,o=t.max,s=o.x>=i.x&&n.x<=e.x,r=o.y>=i.y&&n.y<=e.y;return s&&r},overlaps:function(t){t=O(t);var i=this.min,e=this.max,n=t.min,o=t.max,s=o.x>i.x&&n.x<e.x,r=o.y>i.y&&n.y<e.y;return s&&r},isValid:function(){return!(!this.min||!this.max)}},R.prototype={extend:function(t){var i,e,n=this._southWest,o=this._northEast;if(t instanceof D)e=i=t;else{if(!(t instanceof R))return t?this.extend(j(t)||N(t)):this;if(i=t._southWest,e=t._northEast,!i||!e)return this}return n||o?(n.lat=Math.min(i.lat,n.lat),n.lng=Math.min(i.lng,n.lng),o.lat=Math.max(e.lat,o.lat),o.lng=Math.max(e.lng,o.lng)):(this._southWest=new D(i.lat,i.lng),this._northEast=new D(e.lat,e.lng)),this},pad:function(t){var i=this._southWest,e=this._northEast,n=Math.abs(i.lat-e.lat)*t,o=Math.abs(i.lng-e.lng)*t;return new R(new D(i.lat-n,i.lng-o),new D(e.lat+n,e.lng+o))},getCenter:function(){return new D((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new D(this.getNorth(),this.getWest())},getSouthEast:function(){return new D(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t=("number"==typeof t[0]||t instanceof D||"lat"in t?j:N)(t);var i,e,n=this._southWest,o=this._northEast;return t instanceof R?(i=t.getSouthWest(),e=t.getNorthEast()):i=e=t,i.lat>=n.lat&&e.lat<=o.lat&&i.lng>=n.lng&&e.lng<=o.lng},intersects:function(t){t=N(t);var i=this._southWest,e=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),s=o.lat>=i.lat&&n.lat<=e.lat,r=o.lng>=i.lng&&n.lng<=e.lng;return s&&r},overlaps:function(t){t=N(t);var i=this._southWest,e=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),s=o.lat>i.lat&&n.lat<e.lat,r=o.lng>i.lng&&n.lng<e.lng;return s&&r},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,i){return!!t&&(t=N(t),this._southWest.equals(t.getSouthWest(),i)&&this._northEast.equals(t.getNorthEast(),i))},isValid:function(){return!(!this._southWest||!this._northEast)}};var W,H={latLngToPoint:function(t,i){var e=this.projection.project(t),n=this.scale(i);return this.transformation._transform(e,n)},pointToLatLng:function(t,i){var e=this.scale(i),n=this.transformation.untransform(t,e);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var i=this.projection.bounds,e=this.scale(t);return new I(this.transformation.transform(i.min,e),this.transformation.transform(i.max,e))},infinite:!(D.prototype={equals:function(t,i){return!!t&&(t=j(t),Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng))<=(void 0===i?1e-9:i))},toString:function(t){return"LatLng("+r(this.lat,t)+", "+r(this.lng,t)+")"},distanceTo:function(t){return F.distance(this,j(t))},wrap:function(){return F.wrapLatLng(this)},toBounds:function(t){var i=180*t/40075017,e=i/Math.cos(Math.PI/180*this.lat);return N([this.lat-i,this.lng-e],[this.lat+i,this.lng+e])},clone:function(){return new D(this.lat,this.lng,this.alt)}}),wrapLatLng:function(t){var i=this.wrapLng?o(t.lng,this.wrapLng,!0):t.lng;return new D(this.wrapLat?o(t.lat,this.wrapLat,!0):t.lat,i,t.alt)},wrapLatLngBounds:function(t){var i=t.getCenter(),e=this.wrapLatLng(i),n=i.lat-e.lat,o=i.lng-e.lng;if(0==n&&0==o)return t;var s=t.getSouthWest(),r=t.getNorthEast();return new R(new D(s.lat-n,s.lng-o),new D(r.lat-n,r.lng-o))}},F=h({},H,{wrapLng:[-180,180],R:6371e3,distance:function(t,i){var e=Math.PI/180,n=t.lat*e,o=i.lat*e,s=Math.sin((i.lat-t.lat)*e/2),r=Math.sin((i.lng-t.lng)*e/2),a=s*s+Math.cos(n)*Math.cos(o)*r*r,h=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));return this.R*h}}),U=6378137,V={R:U,MAX_LATITUDE:85.0511287798,project:function(t){var i=Math.PI/180,e=this.MAX_LATITUDE,n=Math.max(Math.min(e,t.lat),-e),o=Math.sin(n*i);return new k(this.R*t.lng*i,this.R*Math.log((1+o)/(1-o))/2)},unproject:function(t){var i=180/Math.PI;return new D((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*i,t.x*i/this.R)},bounds:new I([-(W=U*Math.PI),-W],[W,W])};function q(t,i,e,n){if(g(t))return this._a=t[0],this._b=t[1],this._c=t[2],void(this._d=t[3]);this._a=t,this._b=i,this._c=e,this._d=n}function G(t,i,e,n){return new q(t,i,e,n)}q.prototype={transform:function(t,i){return this._transform(t.clone(),i)},_transform:function(t,i){return i=i||1,t.x=i*(this._a*t.x+this._b),t.y=i*(this._c*t.y+this._d),t},untransform:function(t,i){return i=i||1,new k((t.x/i-this._b)/this._a,(t.y/i-this._d)/this._c)}};var K,Y=h({},F,{code:"EPSG:3857",projection:V,transformation:G(K=.5/(Math.PI*V.R),.5,-K,.5)}),X=h({},Y,{code:"EPSG:900913"});function J(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function $(t,i){for(var e,n,o,s,r="",a=0,h=t.length;a<h;a++){for(e=0,n=(o=t[a]).length;e<n;e++)r+=(e?"L":"M")+(s=o[e]).x+" "+s.y;r+=i?Zt?"z":"x":""}return r||"M0 0"}var Q=document.documentElement.style,tt="ActiveXObject"in window,it=tt&&!document.addEventListener,et="msLaunchUri"in navigator&&!("documentMode"in document),nt=kt("webkit"),ot=kt("android"),st=kt("android 2")||kt("android 3"),rt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),at=ot&&kt("Google")&&rt<537&&!("AudioNode"in window),ht=!!window.opera,ut=!et&&kt("chrome"),lt=kt("gecko")&&!nt&&!ht&&!tt,ct=!ut&&kt("safari"),_t=kt("phantom"),dt="OTransition"in Q,pt=0===navigator.platform.indexOf("Win"),mt=tt&&"transition"in Q,ft="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!st,gt="MozPerspective"in Q,vt=!window.L_DISABLE_3D&&(mt||ft||gt)&&!dt&&!_t,yt="undefined"!=typeof orientation||kt("mobile"),xt=yt&&nt,wt=yt&&ft,Pt=!window.PointerEvent&&window.MSPointerEvent,Lt=!(!window.PointerEvent&&!Pt),bt=!window.L_NO_TOUCH&&(Lt||"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),Tt=yt&&ht,Mt=yt&&lt,zt=1<(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI),Ct=function(){var t=!1;try{var i=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",a,i),window.removeEventListener("testPassiveEventSupport",a,i)}catch(t){}return t}(),St=!!document.createElement("canvas").getContext,Zt=!(!document.createElementNS||!J("svg").createSVGRect),Et=!Zt&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==typeof i.adj}catch(t){return!1}}();function kt(t){return 0<=navigator.userAgent.toLowerCase().indexOf(t)}var Bt={ie:tt,ielt9:it,edge:et,webkit:nt,android:ot,android23:st,androidStock:at,opera:ht,chrome:ut,gecko:lt,safari:ct,phantom:_t,opera12:dt,win:pt,ie3d:mt,webkit3d:ft,gecko3d:gt,any3d:vt,mobile:yt,mobileWebkit:xt,mobileWebkit3d:wt,msPointer:Pt,pointer:Lt,touch:bt,mobileOpera:Tt,mobileGecko:Mt,retina:zt,passiveEvents:Ct,canvas:St,svg:Zt,vml:Et},At=Pt?"MSPointerDown":"pointerdown",It=Pt?"MSPointerMove":"pointermove",Ot=Pt?"MSPointerUp":"pointerup",Rt=Pt?"MSPointerCancel":"pointercancel",Nt={},Dt=!1;function jt(t,i,e,n){function o(t){Ut(t,r)}var s,r,a,h,u,l,c,_;function d(t){t.pointerType===(t.MSPOINTER_TYPE_MOUSE||"mouse")&&0===t.buttons||Ut(t,h)}return"touchstart"===i?(u=t,l=e,c=n,_=p(function(t){t.MSPOINTER_TYPE_TOUCH&&t.pointerType===t.MSPOINTER_TYPE_TOUCH&&Ri(t),Ut(t,l)}),u["_leaflet_touchstart"+c]=_,u.addEventListener(At,_,!1),Dt||(document.addEventListener(At,Wt,!0),document.addEventListener(It,Ht,!0),document.addEventListener(Ot,Ft,!0),document.addEventListener(Rt,Ft,!0),Dt=!0)):"touchmove"===i?(h=e,(a=t)["_leaflet_touchmove"+n]=d,a.addEventListener(It,d,!1)):"touchend"===i&&(r=e,(s=t)["_leaflet_touchend"+n]=o,s.addEventListener(Ot,o,!1),s.addEventListener(Rt,o,!1)),this}function Wt(t){Nt[t.pointerId]=t}function Ht(t){Nt[t.pointerId]&&(Nt[t.pointerId]=t)}function Ft(t){delete Nt[t.pointerId]}function Ut(t,i){for(var e in t.touches=[],Nt)t.touches.push(Nt[e]);t.changedTouches=[t],i(t)}var Vt=Pt?"MSPointerDown":Lt?"pointerdown":"touchstart",qt=Pt?"MSPointerUp":Lt?"pointerup":"touchend",Gt="_leaflet_";var Kt,Yt,Xt,Jt,$t,Qt,ti=fi(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),ii=fi(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ei="webkitTransition"===ii||"OTransition"===ii?ii+"End":"transitionend";function ni(t){return"string"==typeof t?document.getElementById(t):t}function oi(t,i){var e,n=t.style[i]||t.currentStyle&&t.currentStyle[i];return n&&"auto"!==n||!document.defaultView||(n=(e=document.defaultView.getComputedStyle(t,null))?e[i]:null),"auto"===n?null:n}function si(t,i,e){var n=document.createElement(t);return n.className=i||"",e&&e.appendChild(n),n}function ri(t){var i=t.parentNode;i&&i.removeChild(t)}function ai(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function hi(t){var i=t.parentNode;i&&i.lastChild!==t&&i.appendChild(t)}function ui(t){var i=t.parentNode;i&&i.firstChild!==t&&i.insertBefore(t,i.firstChild)}function li(t,i){if(void 0!==t.classList)return t.classList.contains(i);var e=pi(t);return 0<e.length&&new RegExp("(^|\\s)"+i+"(\\s|$)").test(e)}function ci(t,i){var e;if(void 0!==t.classList)for(var n=l(i),o=0,s=n.length;o<s;o++)t.classList.add(n[o]);else li(t,i)||di(t,((e=pi(t))?e+" ":"")+i)}function _i(t,i){void 0!==t.classList?t.classList.remove(i):di(t,u((" "+pi(t)+" ").replace(" "+i+" "," ")))}function di(t,i){void 0===t.className.baseVal?t.className=i:t.className.baseVal=i}function pi(t){return t.correspondingElement&&(t=t.correspondingElement),void 0===t.className.baseVal?t.className:t.className.baseVal}function mi(t,i){"opacity"in t.style?t.style.opacity=i:"filter"in t.style&&function(t,i){var e=!1,n="DXImageTransform.Microsoft.Alpha";try{e=t.filters.item(n)}catch(t){if(1===i)return}i=Math.round(100*i),e?(e.Enabled=100!==i,e.Opacity=i):t.style.filter+=" progid:"+n+"(opacity="+i+")"}(t,i)}function fi(t){for(var i=document.documentElement.style,e=0;e<t.length;e++)if(t[e]in i)return t[e];return!1}function gi(t,i,e){var n=i||new k(0,0);t.style[ti]=(mt?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(e?" scale("+e+")":"")}function vi(t,i){t._leaflet_pos=i,vt?gi(t,i):(t.style.left=i.x+"px",t.style.top=i.y+"px")}function yi(t){return t._leaflet_pos||new k(0,0)}function xi(){zi(window,"dragstart",Ri)}function wi(){Si(window,"dragstart",Ri)}function Pi(t){for(;-1===t.tabIndex;)t=t.parentNode;t.style&&(Li(),Qt=($t=t).style.outline,t.style.outline="none",zi(window,"keydown",Li))}function Li(){$t&&($t.style.outline=Qt,Qt=$t=void 0,Si(window,"keydown",Li))}function bi(t){for(;!((t=t.parentNode).offsetWidth&&t.offsetHeight||t===document.body););return t}function Ti(t){var i=t.getBoundingClientRect();return{x:i.width/t.offsetWidth||1,y:i.height/t.offsetHeight||1,boundingClientRect:i}}Jt="onselectstart"in document?(Xt=function(){zi(window,"selectstart",Ri)},function(){Si(window,"selectstart",Ri)}):(Yt=fi(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]),Xt=function(){var t;Yt&&(t=document.documentElement.style,Kt=t[Yt],t[Yt]="none")},function(){Yt&&(document.documentElement.style[Yt]=Kt,Kt=void 0)});var Mi={TRANSFORM:ti,TRANSITION:ii,TRANSITION_END:ei,get:ni,getStyle:oi,create:si,remove:ri,empty:ai,toFront:hi,toBack:ui,hasClass:li,addClass:ci,removeClass:_i,setClass:di,getClass:pi,setOpacity:mi,testProp:fi,setTransform:gi,setPosition:vi,getPosition:yi,disableTextSelection:Xt,enableTextSelection:Jt,disableImageDrag:xi,enableImageDrag:wi,preventOutline:Pi,restoreOutline:Li,getSizedParentNode:bi,getScale:Ti};function zi(t,i,e,n){if("object"==typeof i)for(var o in i)ki(t,o,i[o],e);else for(var s=0,r=(i=l(i)).length;s<r;s++)ki(t,i[s],e,n);return this}var Ci="_leaflet_events";function Si(t,i,e,n){if("object"==typeof i)for(var o in i)Bi(t,o,i[o],e);else if(i)for(var s=0,r=(i=l(i)).length;s<r;s++)Bi(t,i[s],e,n);else{for(var a in t[Ci])Bi(t,a,t[Ci][a]);delete t[Ci]}return this}function Zi(){return Lt&&(!et&&!ct)}var Ei={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function ki(i,t,e,n){var o=t+m(e)+(n?"_"+m(n):"");if(i[Ci]&&i[Ci][o])return this;var s,r,a,h,u,l,c=function(t){return e.call(n||i,t||window.event)},_=c;function d(t){if(Lt){if(!t.isPrimary)return;if("mouse"===t.pointerType)return}else if(1<t.touches.length)return;var i=Date.now(),e=i-(h||i);u=t.touches?t.touches[0]:t,l=0<e&&e<=250,h=i}function p(t){if(l&&!u.cancelBubble){if(Lt){if("mouse"===t.pointerType)return;var i,e,n={};for(e in u)i=u[e],n[e]=i&&i.bind?i.bind(u):i;u=n}u.type="dblclick",u.button=0,r(u),h=null}}Lt&&0===t.indexOf("touch")?jt(i,t,c,o):bt&&"dblclick"===t&&!Zi()?(r=c,l=!1,(s=i)[Gt+Vt+(a=o)]=d,s[Gt+qt+a]=p,s[Gt+"dblclick"+a]=r,s.addEventListener(Vt,d,!!Ct&&{passive:!1}),s.addEventListener(qt,p,!!Ct&&{passive:!1}),s.addEventListener("dblclick",r,!1)):"addEventListener"in i?"touchstart"===t||"touchmove"===t||"wheel"===t||"mousewheel"===t?i.addEventListener(Ei[t]||t,c,!!Ct&&{passive:!1}):"mouseenter"===t||"mouseleave"===t?(c=function(t){t=t||window.event,Vi(i,t)&&_(t)},i.addEventListener(Ei[t],c,!1)):i.addEventListener(t,_,!1):"attachEvent"in i&&i.attachEvent("on"+t,c),i[Ci]=i[Ci]||{},i[Ci][o]=c}function Bi(t,i,e,n){var o,s,r,a,h,u,l,c,_=i+m(e)+(n?"_"+m(n):""),d=t[Ci]&&t[Ci][_];if(!d)return this;Lt&&0===i.indexOf("touch")?(c=(u=t)["_leaflet_"+(l=i)+_],"touchstart"===l?u.removeEventListener(At,c,!1):"touchmove"===l?u.removeEventListener(It,c,!1):"touchend"===l&&(u.removeEventListener(Ot,c,!1),u.removeEventListener(Rt,c,!1))):bt&&"dblclick"===i&&!Zi()?(r=(o=t)[Gt+Vt+(s=_)],a=o[Gt+qt+s],h=o[Gt+"dblclick"+s],o.removeEventListener(Vt,r,!!Ct&&{passive:!1}),o.removeEventListener(qt,a,!!Ct&&{passive:!1}),o.removeEventListener("dblclick",h,!1)):"removeEventListener"in t?t.removeEventListener(Ei[i]||i,d,!1):"detachEvent"in t&&t.detachEvent("on"+i,d),t[Ci][_]=null}function Ai(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,Ui(t),this}function Ii(t){return ki(t,"wheel",Ai),this}function Oi(t){return zi(t,"mousedown touchstart dblclick",Ai),ki(t,"click",Fi),this}function Ri(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function Ni(t){return Ri(t),Ai(t),this}function Di(t,i){if(!i)return new k(t.clientX,t.clientY);var e=Ti(i),n=e.boundingClientRect;return new k((t.clientX-n.left)/e.x-i.clientLeft,(t.clientY-n.top)/e.y-i.clientTop)}var ji=pt&&ut?2*window.devicePixelRatio:lt?window.devicePixelRatio:1;function Wi(t){return et?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/ji:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0}var Hi={};function Fi(t){Hi[t.type]=!0}function Ui(t){var i=Hi[t.type];return Hi[t.type]=!1,i}function Vi(t,i){var e=i.relatedTarget;if(!e)return!0;try{for(;e&&e!==t;)e=e.parentNode}catch(t){return!1}return e!==t}var qi={on:zi,off:Si,stopPropagation:Ai,disableScrollPropagation:Ii,disableClickPropagation:Oi,preventDefault:Ri,stop:Ni,getMousePosition:Di,getWheelDelta:Wi,fakeStop:Fi,skipped:Ui,isExternalTarget:Vi,addListener:zi,removeListener:Si},Gi=E.extend({run:function(t,i,e,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=e||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=yi(t),this._offset=i.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=M(this._animate,this),this._step()},_step:function(t){var i=new Date-this._startTime,e=1e3*this._duration;i<e?this._runFrame(this._easeOut(i/e),t):(this._runFrame(1),this._complete())},_runFrame:function(t,i){var e=this._startPos.add(this._offset.multiplyBy(t));i&&e._round(),vi(this._el,e),this.fire("step")},_complete:function(){z(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),Ki=E.extend({options:{crs:Y,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,i){i=c(this,i),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=p(this._onResize,this),this._initEvents(),i.maxBounds&&this.setMaxBounds(i.maxBounds),void 0!==i.zoom&&(this._zoom=this._limitZoom(i.zoom)),i.center&&void 0!==i.zoom&&this.setView(j(i.center),i.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=ii&&vt&&!Tt&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),zi(this._proxy,ei,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,i,e){if((i=void 0===i?this._zoom:this._limitZoom(i),t=this._limitCenter(j(t),i,this.options.maxBounds),e=e||{},this._stop(),this._loaded&&!e.reset&&!0!==e)&&(void 0!==e.animate&&(e.zoom=h({animate:e.animate},e.zoom),e.pan=h({animate:e.animate,duration:e.duration},e.pan)),this._zoom!==i?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,i,e.zoom):this._tryAnimatedPan(t,e.pan)))return clearTimeout(this._sizeTimer),this;return this._resetView(t,i),this},setZoom:function(t,i){return this._loaded?this.setView(this.getCenter(),t,{zoom:i}):(this._zoom=t,this)},zoomIn:function(t,i){return t=t||(vt?this.options.zoomDelta:1),this.setZoom(this._zoom+t,i)},zoomOut:function(t,i){return t=t||(vt?this.options.zoomDelta:1),this.setZoom(this._zoom-t,i)},setZoomAround:function(t,i,e){var n=this.getZoomScale(i),o=this.getSize().divideBy(2),s=(t instanceof k?t:this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1-1/n),r=this.containerPointToLatLng(o.add(s));return this.setView(r,i,{zoom:e})},_getBoundsCenterZoom:function(t,i){i=i||{},t=t.getBounds?t.getBounds():N(t);var e=A(i.paddingTopLeft||i.padding||[0,0]),n=A(i.paddingBottomRight||i.padding||[0,0]),o=this.getBoundsZoom(t,!1,e.add(n));if((o="number"==typeof i.maxZoom?Math.min(i.maxZoom,o):o)===1/0)return{center:t.getCenter(),zoom:o};var s=n.subtract(e).divideBy(2),r=this.project(t.getSouthWest(),o),a=this.project(t.getNorthEast(),o);return{center:this.unproject(r.add(a).divideBy(2).add(s),o),zoom:o}},fitBounds:function(t,i){if(!(t=N(t)).isValid())throw new Error("Bounds are not valid.");var e=this._getBoundsCenterZoom(t,i);return this.setView(e.center,e.zoom,i)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,i){return this.setView(t,this._zoom,{pan:i})},panBy:function(t,i){return i=i||{},(t=A(t).round()).x||t.y?(!0===i.animate||this.getSize().contains(t)?(this._panAnim||(this._panAnim=new Gi,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),i.noMoveStart||this.fire("movestart"),!1!==i.animate?(ci(this._mapPane,"leaflet-pan-anim"),e=this._getMapPanePos().subtract(t).round(),this._panAnim.run(this._mapPane,e,i.duration||.25,i.easeLinearity)):(this._rawPanBy(t),this.fire("move").fire("moveend"))):this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this):this.fire("moveend");var e},flyTo:function(s,r,t){if(!1===(t=t||{}).animate||!vt)return this.setView(s,r,t);this._stop();var a=this.project(this.getCenter()),h=this.project(s),i=this.getSize(),u=this._zoom;s=j(s),r=void 0===r?u:r;var l=Math.max(i.x,i.y),n=l*this.getZoomScale(u,r),c=h.distanceTo(a)||1,_=1.42,o=_*_;function e(t){var i=(n*n-l*l+(t?-1:1)*o*o*c*c)/(2*(t?n:l)*o*c),e=Math.sqrt(i*i+1)-i;return e<1e-9?-18:Math.log(e)}function d(t){return(Math.exp(t)-Math.exp(-t))/2}function p(t){return(Math.exp(t)+Math.exp(-t))/2}var m=e(0);function f(t){return l*(p(m)*(d(i=m+_*t)/p(i))-d(m))/o;var i}var g=Date.now(),v=(e(1)-m)/_,y=t.duration?1e3*t.duration:1e3*v*.8;return this._moveStart(!0,t.noMoveStart),function t(){var i,e,n=(Date.now()-g)/y,o=(i=n,(1-Math.pow(1-i,1.5))*v);n<=1?(this._flyToFrame=M(t,this),this._move(this.unproject(a.add(h.subtract(a).multiplyBy(f(o)/c)),u),this.getScaleZoom(l/(e=o,l*(p(m)/p(m+_*e))),u),{flyTo:!0})):this._move(s,r)._moveEnd(!0)}.call(this),this},flyToBounds:function(t,i){var e=this._getBoundsCenterZoom(t,i);return this.flyTo(e.center,e.zoom,i)},setMaxBounds:function(t){return(t=N(t)).isValid()?(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this.off("moveend",this._panInsideMaxBounds))},setMinZoom:function(t){var i=this.options.minZoom;return this.options.minZoom=t,this._loaded&&i!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var i=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&i!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,i){this._enforcingBounds=!0;var e=this.getCenter(),n=this._limitCenter(e,this._zoom,N(t));return e.equals(n)||this.panTo(n,i),this._enforcingBounds=!1,this},panInside:function(t,i){var e,n,o=A((i=i||{}).paddingTopLeft||i.padding||[0,0]),s=A(i.paddingBottomRight||i.padding||[0,0]),r=this.getCenter(),a=this.project(r),h=this.project(t),u=this.getPixelBounds(),l=u.getSize().divideBy(2),c=O([u.min.add(o),u.max.subtract(s)]);return c.contains(h)||(this._enforcingBounds=!0,e=a.subtract(h),n=A(h.x+e.x,h.y+e.y),(h.x<c.min.x||h.x>c.max.x)&&(n.x=a.x-e.x,0<e.x?n.x+=l.x-o.x:n.x-=l.x-s.x),(h.y<c.min.y||h.y>c.max.y)&&(n.y=a.y-e.y,0<e.y?n.y+=l.y-o.y:n.y-=l.y-s.y),this.panTo(this.unproject(n),i),this._enforcingBounds=!1),this},invalidateSize:function(t){if(!this._loaded)return this;t=h({animate:!1,pan:!0},!0===t?{animate:!0}:t);var i=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var e=this.getSize(),n=i.divideBy(2).round(),o=e.divideBy(2).round(),s=n.subtract(o);return s.x||s.y?(t.animate&&t.pan?this.panBy(s):(t.pan&&this._rawPanBy(s),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(p(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:i,newSize:e})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=h({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var i=p(this._handleGeolocationResponse,this),e=p(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(i,e,t):navigator.geolocation.getCurrentPosition(i,e,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var i=t.code,e=t.message||(1===i?"permission denied":2===i?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:i,message:"Geolocation error: "+e+"."})},_handleGeolocationResponse:function(t){var i,e=new D(t.coords.latitude,t.coords.longitude),n=e.toBounds(2*t.coords.accuracy),o=this._locateOptions;o.setView&&(i=this.getBoundsZoom(n),this.setView(e,o.maxZoom?Math.min(i,o.maxZoom):i));var s={latlng:e,bounds:n,timestamp:t.timestamp};for(var r in t.coords)"number"==typeof t.coords[r]&&(s[r]=t.coords[r]);this.fire("locationfound",s)},addHandler:function(t,i){if(!i)return this;var e=this[t]=new i(this);return this._handlers.push(e),this.options[t]&&e.enable(),this},remove:function(){if(this._initEvents(!0),this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=void 0,this._containerId=void 0}var t;for(t in void 0!==this._locationWatchId&&this.stopLocate(),this._stop(),ri(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(z(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload"),this._layers)this._layers[t].remove();for(t in this._panes)ri(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,i){var e=si("div","leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),i||this._mapPane);return t&&(this._panes[t]=e),e},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds();return new R(this.unproject(t.getBottomLeft()),this.unproject(t.getTopRight()))},getMinZoom:function(){return void 0===this.options.minZoom?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return void 0===this.options.maxZoom?void 0===this._layersMaxZoom?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,i,e){t=N(t),e=A(e||[0,0]);var n=this.getZoom()||0,o=this.getMinZoom(),s=this.getMaxZoom(),r=t.getNorthWest(),a=t.getSouthEast(),h=this.getSize().subtract(e),u=O(this.project(a,n),this.project(r,n)).getSize(),l=vt?this.options.zoomSnap:1,c=h.x/u.x,_=h.y/u.y,d=i?Math.max(c,_):Math.min(c,_),n=this.getScaleZoom(d,n);return l&&(n=Math.round(n/(l/100))*(l/100),n=i?Math.ceil(n/l)*l:Math.floor(n/l)*l),Math.max(o,Math.min(s,n))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new k(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,i){var e=this._getTopLeftPoint(t,i);return new I(e,e.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(void 0===t?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,i){var e=this.options.crs;return i=void 0===i?this._zoom:i,e.scale(t)/e.scale(i)},getScaleZoom:function(t,i){var e=this.options.crs;i=void 0===i?this._zoom:i;var n=e.zoom(t*e.scale(i));return isNaN(n)?1/0:n},project:function(t,i){return i=void 0===i?this._zoom:i,this.options.crs.latLngToPoint(j(t),i)},unproject:function(t,i){return i=void 0===i?this._zoom:i,this.options.crs.pointToLatLng(A(t),i)},layerPointToLatLng:function(t){var i=A(t).add(this.getPixelOrigin());return this.unproject(i)},latLngToLayerPoint:function(t){return this.project(j(t))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(j(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(N(t))},distance:function(t,i){return this.options.crs.distance(j(t),j(i))},containerPointToLayerPoint:function(t){return A(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return A(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var i=this.containerPointToLayerPoint(A(t));return this.layerPointToLatLng(i)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(j(t)))},mouseEventToContainerPoint:function(t){return Di(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var i=this._container=ni(t);if(!i)throw new Error("Map container not found.");if(i._leaflet_id)throw new Error("Map container is already initialized.");zi(i,"scroll",this._onScroll,this),this._containerId=m(i)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&vt,ci(t,"leaflet-container"+(bt?" leaflet-touch":"")+(zt?" leaflet-retina":"")+(it?" leaflet-oldie":"")+(ct?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var i=oi(t,"position");"absolute"!==i&&"relative"!==i&&"fixed"!==i&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),vi(this._mapPane,new k(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(ci(t.markerPane,"leaflet-zoom-hide"),ci(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,i){vi(this._mapPane,new k(0,0));var e=!this._loaded;this._loaded=!0,i=this._limitZoom(i),this.fire("viewprereset");var n=this._zoom!==i;this._moveStart(n,!1)._move(t,i)._moveEnd(n),this.fire("viewreset"),e&&this.fire("load")},_moveStart:function(t,i){return t&&this.fire("zoomstart"),i||this.fire("movestart"),this},_move:function(t,i,e){void 0===i&&(i=this._zoom);var n=this._zoom!==i;return this._zoom=i,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),(n||e&&e.pinch)&&this.fire("zoom",e),this.fire("move",e)},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return z(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){vi(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={};var i=t?Si:zi;i((this._targets[m(this._container)]=this)._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&i(window,"resize",this._onResize,this),vt&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){z(this._resizeRequest),this._resizeRequest=M(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,i){for(var e,n=[],o="mouseout"===i||"mouseover"===i,s=t.target||t.srcElement,r=!1;s;){if((e=this._targets[m(s)])&&("click"===i||"preclick"===i)&&!t._simulated&&this._draggableMoved(e)){r=!0;break}if(e&&e.listens(i,!0)){if(o&&!Vi(s,t))break;if(n.push(e),o)break}if(s===this._container)break;s=s.parentNode}return n.length||r||o||!Vi(s,t)||(n=[this]),n},_handleDOMEvent:function(t){var i;this._loaded&&!Ui(t)&&("mousedown"!==(i=t.type)&&"keypress"!==i&&"keyup"!==i&&"keydown"!==i||Pi(t.target||t.srcElement),this._fireDOMEvent(t,i))},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,i,e){var n;if("click"===t.type&&((n=h({},t)).type="preclick",this._fireDOMEvent(n,n.type,e)),!t._stopped&&(e=(e||[]).concat(this._findEventTargets(t,i))).length){var o=e[0];"contextmenu"===i&&o.listens(i,!0)&&Ri(t);var s,r={originalEvent:t};"keypress"!==t.type&&"keydown"!==t.type&&"keyup"!==t.type&&(s=o.getLatLng&&(!o._radius||o._radius<=10),r.containerPoint=s?this.latLngToContainerPoint(o.getLatLng()):this.mouseEventToContainerPoint(t),r.layerPoint=this.containerPointToLayerPoint(r.containerPoint),r.latlng=s?o.getLatLng():this.layerPointToLatLng(r.layerPoint));for(var a=0;a<e.length;a++)if(e[a].fire(i,r,!0),r.originalEvent._stopped||!1===e[a].options.bubblingMouseEvents&&-1!==v(this._mouseEvents,i))return}},_draggableMoved:function(t){return(t=t.dragging&&t.dragging.enabled()?t:this).dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,i=this._handlers.length;t<i;t++)this._handlers[t].disable()},whenReady:function(t,i){return this._loaded?t.call(i||this,{target:this}):this.on("load",t,i),this},_getMapPanePos:function(){return yi(this._mapPane)||new k(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,i){return(t&&void 0!==i?this._getNewPixelOrigin(t,i):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,i){var e=this.getSize()._divideBy(2);return this.project(t,i)._subtract(e)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,i,e){var n=this._getNewPixelOrigin(e,i);return this.project(t,i)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,i,e){var n=this._getNewPixelOrigin(e,i);return O([this.project(t.getSouthWest(),i)._subtract(n),this.project(t.getNorthWest(),i)._subtract(n),this.project(t.getSouthEast(),i)._subtract(n),this.project(t.getNorthEast(),i)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,i,e){if(!e)return t;var n=this.project(t,i),o=this.getSize().divideBy(2),s=new I(n.subtract(o),n.add(o)),r=this._getBoundsOffset(s,e,i);return r.round().equals([0,0])?t:this.unproject(n.add(r),i)},_limitOffset:function(t,i){if(!i)return t;var e=this.getPixelBounds(),n=new I(e.min.add(t),e.max.add(t));return t.add(this._getBoundsOffset(n,i))},_getBoundsOffset:function(t,i,e){var n=O(this.project(i.getNorthEast(),e),this.project(i.getSouthWest(),e)),o=n.min.subtract(t.min),s=n.max.subtract(t.max);return new k(this._rebound(o.x,-s.x),this._rebound(o.y,-s.y))},_rebound:function(t,i){return 0<t+i?Math.round(t-i)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(i))},_limitZoom:function(t){var i=this.getMinZoom(),e=this.getMaxZoom(),n=vt?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(i,Math.min(e,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){_i(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,i){var e=this._getCenterOffset(t)._trunc();return!(!0!==(i&&i.animate)&&!this.getSize().contains(e))&&(this.panBy(e,i),!0)},_createAnimProxy:function(){var t=this._proxy=si("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(t){var i=ti,e=this._proxy.style[i];gi(this._proxy,this.project(t.center,t.zoom),this.getZoomScale(t.zoom,1)),e===this._proxy.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){ri(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),i=this.getZoom();gi(this._proxy,this.project(t,i),this.getZoomScale(i,1))},_catchTransitionEnd:function(t){this._animatingZoom&&0<=t.propertyName.indexOf("transform")&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,i,e){if(this._animatingZoom)return!0;if(e=e||{},!this._zoomAnimated||!1===e.animate||this._nothingToAnimate()||Math.abs(i-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(i),o=this._getCenterOffset(t)._divideBy(1-1/n);return!(!0!==e.animate&&!this.getSize().contains(o))&&(M(function(){this._moveStart(!0,!1)._animateZoom(t,i,!0)},this),!0)},_animateZoom:function(t,i,e,n){this._mapPane&&(e&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=i,ci(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:i,noUpdate:n}),setTimeout(p(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&_i(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom),M(function(){this._moveEnd(!0)},this))}});function Yi(t){return new Xi(t)}var Xi=S.extend({options:{position:"topright"},initialize:function(t){c(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var i=this._map;return i&&i.removeControl(this),this.options.position=t,i&&i.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var i=this._container=this.onAdd(t),e=this.getPosition(),n=t._controlCorners[e];return ci(i,"leaflet-control"),-1!==e.indexOf("bottom")?n.insertBefore(i,n.firstChild):n.appendChild(i),this._map.on("unload",this.remove,this),this},remove:function(){return this._map&&(ri(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null),this},_refocusOnMap:function(t){this._map&&t&&0<t.screenX&&0<t.screenY&&this._map.getContainer().focus()}});Ki.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var n=this._controlCorners={},o="leaflet-",s=this._controlContainer=si("div",o+"control-container",this._container);function t(t,i){var e=o+t+" "+o+i;n[t+i]=si("div",e,s)}t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)ri(this._controlCorners[t]);ri(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Ji=Xi.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,i,e,n){return e<n?-1:n<e?1:0}},initialize:function(t,i,e){for(var n in c(this,e),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,t)this._addLayer(t[n],n);for(n in i)this._addLayer(i[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),(this._map=t).on("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return Xi.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,i){return this._addLayer(t,i),this._map?this._update():this},addOverlay:function(t,i){return this._addLayer(t,i,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var i=this._getLayer(m(t));return i&&this._layers.splice(this._layers.indexOf(i),1),this._map?this._update():this},expand:function(){ci(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(ci(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):_i(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return _i(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",i=this._container=si("div",t),e=this.options.collapsed;i.setAttribute("aria-haspopup",!0),Oi(i),Ii(i);var n=this._section=si("section",t+"-list");e&&(this._map.on("click",this.collapse,this),ot||zi(i,{mouseenter:this.expand,mouseleave:this.collapse},this));var o=this._layersLink=si("a",t+"-toggle",i);o.href="#",o.title="Layers",bt?(zi(o,"click",Ni),zi(o,"click",this.expand,this)):zi(o,"focus",this.expand,this),e||this.expand(),this._baseLayersList=si("div",t+"-base",n),this._separator=si("div",t+"-separator",n),this._overlaysList=si("div",t+"-overlays",n),i.appendChild(n)},_getLayer:function(t){for(var i=0;i<this._layers.length;i++)if(this._layers[i]&&m(this._layers[i].layer)===t)return this._layers[i]},_addLayer:function(t,i,e){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:i,overlay:e}),this.options.sortLayers&&this._layers.sort(p(function(t,i){return this.options.sortFunction(t.layer,i.layer,t.name,i.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;ai(this._baseLayersList),ai(this._overlaysList),this._layerControlInputs=[];for(var t,i,e,n=0,o=0;o<this._layers.length;o++)e=this._layers[o],this._addItem(e),i=i||e.overlay,t=t||!e.overlay,n+=e.overlay?0:1;return this.options.hideSingleBase&&(t=t&&1<n,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=i&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var i=this._getLayer(m(t.target)),e=i.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;e&&this._map.fire(e,i)},_createRadioElement:function(t,i){var e='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(i?' checked="checked"':"")+"/>",n=document.createElement("div");return n.innerHTML=e,n.firstChild},_addItem:function(t){var i,e=document.createElement("label"),n=this._map.hasLayer(t.layer);t.overlay?((i=document.createElement("input")).type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=n):i=this._createRadioElement("leaflet-base-layers_"+m(this),n),this._layerControlInputs.push(i),i.layerId=m(t.layer),zi(i,"click",this._onInputClick,this);var o=document.createElement("span");o.innerHTML=" "+t.name;var s=document.createElement("div");return e.appendChild(s),s.appendChild(i),s.appendChild(o),(t.overlay?this._overlaysList:this._baseLayersList).appendChild(e),this._checkDisabledLayers(),e},_onInputClick:function(){var t,i,e=this._layerControlInputs,n=[],o=[];this._handlingClick=!0;for(var s=e.length-1;0<=s;s--)t=e[s],i=this._getLayer(t.layerId).layer,t.checked?n.push(i):t.checked||o.push(i);for(s=0;s<o.length;s++)this._map.hasLayer(o[s])&&this._map.removeLayer(o[s]);for(s=0;s<n.length;s++)this._map.hasLayer(n[s])||this._map.addLayer(n[s]);this._handlingClick=!1,this._refocusOnMap()},_checkDisabledLayers:function(){for(var t,i,e=this._layerControlInputs,n=this._map.getZoom(),o=e.length-1;0<=o;o--)t=e[o],i=this._getLayer(t.layerId).layer,t.disabled=void 0!==i.options.minZoom&&n<i.options.minZoom||void 0!==i.options.maxZoom&&n>i.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expand:function(){return this.expand()},_collapse:function(){return this.collapse()}}),$i=Xi.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"&#x2212;",zoomOutTitle:"Zoom out"},onAdd:function(t){var i="leaflet-control-zoom",e=si("div",i+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,i+"-in",e,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,i+"-out",e,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),e},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,i,e,n,o){var s=si("a",e,n);return s.innerHTML=t,s.href="#",s.title=i,s.setAttribute("role","button"),s.setAttribute("aria-label",i),Oi(s),zi(s,"click",Ni),zi(s,"click",o,this),zi(s,"click",this._refocusOnMap,this),s},_updateDisabled:function(){var t=this._map,i="leaflet-disabled";_i(this._zoomInButton,i),_i(this._zoomOutButton,i),!this._disabled&&t._zoom!==t.getMinZoom()||ci(this._zoomOutButton,i),!this._disabled&&t._zoom!==t.getMaxZoom()||ci(this._zoomInButton,i)}});Ki.mergeOptions({zoomControl:!0}),Ki.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new $i,this.addControl(this.zoomControl))});var Qi=Xi.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var i="leaflet-control-scale",e=si("div",i),n=this.options;return this._addScales(n,i+"-line",e),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),e},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,i,e){t.metric&&(this._mScale=si("div",i,e)),t.imperial&&(this._iScale=si("div",i,e))},_update:function(){var t=this._map,i=t.getSize().y/2,e=t.distance(t.containerPointToLatLng([0,i]),t.containerPointToLatLng([this.options.maxWidth,i]));this._updateScales(e)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var i=this._getRoundNum(t),e=i<1e3?i+" m":i/1e3+" km";this._updateScale(this._mScale,e,i/t)},_updateImperial:function(t){var i,e,n,o=3.2808399*t;5280<o?(i=o/5280,e=this._getRoundNum(i),this._updateScale(this._iScale,e+" mi",e/i)):(n=this._getRoundNum(o),this._updateScale(this._iScale,n+" ft",n/o))},_updateScale:function(t,i,e){t.style.width=Math.round(this.options.maxWidth*e)+"px",t.innerHTML=i},_getRoundNum:function(t){var i=Math.pow(10,(Math.floor(t)+"").length-1),e=t/i;return i*(e=10<=e?10:5<=e?5:3<=e?3:2<=e?2:1)}}),te=Xi.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){c(this,t),this._attributions={}},onAdd:function(t){for(var i in(t.attributionControl=this)._container=si("div","leaflet-control-attribution"),Oi(this._container),t._layers)t._layers[i].getAttribution&&this.addAttribution(t._layers[i].getAttribution());return this._update(),this._container},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t&&(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update()),this},removeAttribution:function(t){return t&&this._attributions[t]&&(this._attributions[t]--,this._update()),this},_update:function(){if(this._map){var t=[];for(var i in this._attributions)this._attributions[i]&&t.push(i);var e=[];this.options.prefix&&e.push(this.options.prefix),t.length&&e.push(t.join(", ")),this._container.innerHTML=e.join(" | ")}}});Ki.mergeOptions({attributionControl:!0}),Ki.addInitHook(function(){this.options.attributionControl&&(new te).addTo(this)});Xi.Layers=Ji,Xi.Zoom=$i,Xi.Scale=Qi,Xi.Attribution=te,Yi.layers=function(t,i,e){return new Ji(t,i,e)},Yi.zoom=function(t){return new $i(t)},Yi.scale=function(t){return new Qi(t)},Yi.attribution=function(t){return new te(t)};var ie=S.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled||(this._enabled=!0,this.addHooks()),this},disable:function(){return this._enabled&&(this._enabled=!1,this.removeHooks()),this},enabled:function(){return!!this._enabled}});ie.addTo=function(t,i){return t.addHandler(i,this),this};var ee,ne={Events:Z},oe=bt?"touchstart mousedown":"mousedown",se={mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},re={mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"},ae=E.extend({options:{clickTolerance:3},initialize:function(t,i,e,n){c(this,n),this._element=t,this._dragStartTarget=i||t,this._preventOutline=e},enable:function(){this._enabled||(zi(this._dragStartTarget,oe,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(ae._dragging===this&&this.finishDrag(),Si(this._dragStartTarget,oe,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){var i,e;!t._simulated&&this._enabled&&(this._moved=!1,li(this._element,"leaflet-zoom-anim")||ae._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||((ae._dragging=this)._preventOutline&&Pi(this._element),xi(),Xt(),this._moving||(this.fire("down"),i=t.touches?t.touches[0]:t,e=bi(this._element),this._startPoint=new k(i.clientX,i.clientY),this._parentScale=Ti(e),zi(document,re[t.type],this._onMove,this),zi(document,se[t.type],this._onUp,this))))},_onMove:function(t){var i,e;!t._simulated&&this._enabled&&(t.touches&&1<t.touches.length?this._moved=!0:((e=new k((i=t.touches&&1===t.touches.length?t.touches[0]:t).clientX,i.clientY)._subtract(this._startPoint)).x||e.y)&&(Math.abs(e.x)+Math.abs(e.y)<this.options.clickTolerance||(e.x/=this._parentScale.x,e.y/=this._parentScale.y,Ri(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=yi(this._element).subtract(e),ci(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),ci(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(e),this._moving=!0,z(this._animRequest),this._lastEvent=t,this._animRequest=M(this._updatePosition,this,!0))))},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),vi(this._element,this._newPos),this.fire("drag",t)},_onUp:function(t){!t._simulated&&this._enabled&&this.finishDrag()},finishDrag:function(){for(var t in _i(document.body,"leaflet-dragging"),this._lastTarget&&(_i(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),re)Si(document,re[t],this._onMove,this),Si(document,se[t],this._onUp,this);wi(),Jt(),this._moved&&this._moving&&(z(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1,ae._dragging=!1}});function he(t,i){if(!i||!t.length)return t.slice();var e=i*i;return t=function(t,i){var e=t.length,n=new(typeof Uint8Array!=void 0+""?Uint8Array:Array)(e);n[0]=n[e-1]=1,function t(i,e,n,o,s){var r,a,h,u=0;for(a=o+1;a<=s-1;a++)h=de(i[a],i[o],i[s],!0),u<h&&(r=a,u=h);n<u&&(e[r]=1,t(i,e,n,o,r),t(i,e,n,r,s))}(t,n,i,0,e-1);var o,s=[];for(o=0;o<e;o++)n[o]&&s.push(t[o]);return s}(t=function(t,i){for(var e=[t[0]],n=1,o=0,s=t.length;n<s;n++)(function(t,i){var e=i.x-t.x,n=i.y-t.y;return e*e+n*n})(t[n],t[o])>i&&(e.push(t[n]),o=n);o<s-1&&e.push(t[s-1]);return e}(t,e),e)}function ue(t,i,e){return Math.sqrt(de(t,i,e,!0))}function le(t,i,e,n,o){var s,r,a,h=n?ee:_e(t,e),u=_e(i,e);for(ee=u;;){if(!(h|u))return[t,i];if(h&u)return!1;a=_e(r=ce(t,i,s=h||u,e,o),e),s===h?(t=r,h=a):(i=r,u=a)}}function ce(t,i,e,n,o){var s,r,a=i.x-t.x,h=i.y-t.y,u=n.min,l=n.max;return 8&e?(s=t.x+a*(l.y-t.y)/h,r=l.y):4&e?(s=t.x+a*(u.y-t.y)/h,r=u.y):2&e?(s=l.x,r=t.y+h*(l.x-t.x)/a):1&e&&(s=u.x,r=t.y+h*(u.x-t.x)/a),new k(s,r,o)}function _e(t,i){var e=0;return t.x<i.min.x?e|=1:t.x>i.max.x&&(e|=2),t.y<i.min.y?e|=4:t.y>i.max.y&&(e|=8),e}function de(t,i,e,n){var o,s=i.x,r=i.y,a=e.x-s,h=e.y-r,u=a*a+h*h;return 0<u&&(1<(o=((t.x-s)*a+(t.y-r)*h)/u)?(s=e.x,r=e.y):0<o&&(s+=a*o,r+=h*o)),a=t.x-s,h=t.y-r,n?a*a+h*h:new k(s,r)}function pe(t){return!g(t[0])||"object"!=typeof t[0][0]&&void 0!==t[0][0]}function me(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),pe(t)}var fe={simplify:he,pointToSegmentDistance:ue,closestPointOnSegment:function(t,i,e){return de(t,i,e)},clipSegment:le,_getEdgeIntersection:ce,_getBitCode:_e,_sqClosestPointOnSegment:de,isFlat:pe,_flat:me};function ge(t,i,e){for(var n,o,s,r,a,h,u,l=[1,4,2,8],c=0,_=t.length;c<_;c++)t[c]._code=_e(t[c],i);for(s=0;s<4;s++){for(h=l[s],n=[],c=0,o=(_=t.length)-1;c<_;o=c++)r=t[c],a=t[o],r._code&h?a._code&h||((u=ce(a,r,h,i,e))._code=_e(u,i),n.push(u)):(a._code&h&&((u=ce(a,r,h,i,e))._code=_e(u,i),n.push(u)),n.push(r));t=n}return t}var ve,ye={clipPolygon:ge},xe={project:function(t){return new k(t.lng,t.lat)},unproject:function(t){return new D(t.y,t.x)},bounds:new I([-180,-90],[180,90])},we={R:6378137,R_MINOR:6356752.314245179,bounds:new I([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var i=Math.PI/180,e=this.R,n=t.lat*i,o=this.R_MINOR/e,s=Math.sqrt(1-o*o),r=s*Math.sin(n),a=Math.tan(Math.PI/4-n/2)/Math.pow((1-r)/(1+r),s/2),n=-e*Math.log(Math.max(a,1e-10));return new k(t.lng*i*e,n)},unproject:function(t){for(var i,e=180/Math.PI,n=this.R,o=this.R_MINOR/n,s=Math.sqrt(1-o*o),r=Math.exp(-t.y/n),a=Math.PI/2-2*Math.atan(r),h=0,u=.1;h<15&&1e-7<Math.abs(u);h++)i=s*Math.sin(a),i=Math.pow((1-i)/(1+i),s/2),a+=u=Math.PI/2-2*Math.atan(r*i)-a;return new D(a*e,t.x*e/n)}},Pe={LonLat:xe,Mercator:we,SphericalMercator:V},Le=h({},F,{code:"EPSG:3395",projection:we,transformation:G(ve=.5/(Math.PI*we.R),.5,-ve,.5)}),be=h({},F,{code:"EPSG:4326",projection:xe,transformation:G(1/180,1,-1/180,.5)}),Te=h({},H,{projection:xe,transformation:G(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,i){var e=i.lng-t.lng,n=i.lat-t.lat;return Math.sqrt(e*e+n*n)},infinite:!0});H.Earth=F,H.EPSG3395=Le,H.EPSG3857=Y,H.EPSG900913=X,H.EPSG4326=be,H.Simple=Te;var Me=E.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[m(t)]=this},removeInteractiveTarget:function(t){return delete this._map._targets[m(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var i,e=t.target;e.hasLayer(this)&&(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents&&(i=this.getEvents(),e.on(i,this),this.once("remove",function(){e.off(i,this)},this)),this.onAdd(e),this.getAttribution&&e.attributionControl&&e.attributionControl.addAttribution(this.getAttribution()),this.fire("add"),e.fire("layeradd",{layer:this}))}});Ki.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var i=m(t);return this._layers[i]||((this._layers[i]=t)._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t)),this},removeLayer:function(t){var i=m(t);return this._layers[i]&&(this._loaded&&t.onRemove(this),t.getAttribution&&this.attributionControl&&this.attributionControl.removeAttribution(t.getAttribution()),delete this._layers[i],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null),this},hasLayer:function(t){return!!t&&m(t)in this._layers},eachLayer:function(t,i){for(var e in this._layers)t.call(i,this._layers[e]);return this},_addLayers:function(t){for(var i=0,e=(t=t?g(t)?t:[t]:[]).length;i<e;i++)this.addLayer(t[i])},_addZoomLimit:function(t){!isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[m(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var i=m(t);this._zoomBoundLayers[i]&&(delete this._zoomBoundLayers[i],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,i=-1/0,e=this._getZoomSpan();for(var n in this._zoomBoundLayers)var o=this._zoomBoundLayers[n].options,t=void 0===o.minZoom?t:Math.min(t,o.minZoom),i=void 0===o.maxZoom?i:Math.max(i,o.maxZoom);this._layersMaxZoom=i===-1/0?void 0:i,this._layersMinZoom=t===1/0?void 0:t,e!==this._getZoomSpan()&&this.fire("zoomlevelschange"),void 0===this.options.maxZoom&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),void 0===this.options.minZoom&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var ze=Me.extend({initialize:function(t,i){var e,n;if(c(this,i),this._layers={},t)for(e=0,n=t.length;e<n;e++)this.addLayer(t[e])},addLayer:function(t){var i=this.getLayerId(t);return this._layers[i]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var i=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[i]&&this._map.removeLayer(this._layers[i]),delete this._layers[i],this},hasLayer:function(t){return!!t&&("number"==typeof t?t:this.getLayerId(t))in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var i,e,n=Array.prototype.slice.call(arguments,1);for(i in this._layers)(e=this._layers[i])[t]&&e[t].apply(e,n);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,i){for(var e in this._layers)t.call(i,this._layers[e]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:m}),Ce=ze.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),ze.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),ze.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new R;for(var i in this._layers){var e=this._layers[i];t.extend(e.getBounds?e.getBounds():e.getLatLng())}return t}}),Se=S.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0]},initialize:function(t){c(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,i){var e=this._getIconUrl(t);if(!e){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(e,i&&"IMG"===i.tagName?i:null);return this._setIconStyles(n,t),n},_setIconStyles:function(t,i){var e=this.options,n=e[i+"Size"];"number"==typeof n&&(n=[n,n]);var o=A(n),s=A("shadow"===i&&e.shadowAnchor||e.iconAnchor||o&&o.divideBy(2,!0));t.className="leaflet-marker-"+i+" "+(e.className||""),s&&(t.style.marginLeft=-s.x+"px",t.style.marginTop=-s.y+"px"),o&&(t.style.width=o.x+"px",t.style.height=o.y+"px")},_createImg:function(t,i){return(i=i||document.createElement("img")).src=t,i},_getIconUrl:function(t){return zt&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});var Ze=Se.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return Ze.imagePath||(Ze.imagePath=this._detectIconPath()),(this.options.imagePath||Ze.imagePath)+Se.prototype._getIconUrl.call(this,t)},_detectIconPath:function(){var t=si("div","leaflet-default-icon-path",document.body),i=oi(t,"background-image")||oi(t,"backgroundImage");return document.body.removeChild(t),i=null===i||0!==i.indexOf("url")?"":i.replace(/^url\(["']?/,"").replace(/marker-icon\.png["']?\)$/,"")}}),Ee=ie.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new ae(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),ci(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&_i(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var i,e=this._marker,n=e._map,o=this._marker.options.autoPanSpeed,s=this._marker.options.autoPanPadding,r=yi(e._icon),a=n.getPixelBounds(),h=n.getPixelOrigin(),u=O(a.min._subtract(h).add(s),a.max._subtract(h).subtract(s));u.contains(r)||(i=A((Math.max(u.max.x,r.x)-u.max.x)/(a.max.x-u.max.x)-(Math.min(u.min.x,r.x)-u.min.x)/(a.min.x-u.min.x),(Math.max(u.max.y,r.y)-u.max.y)/(a.max.y-u.max.y)-(Math.min(u.min.y,r.y)-u.min.y)/(a.min.y-u.min.y)).multiplyBy(o),n.panBy(i,{animate:!1}),this._draggable._newPos._add(i),this._draggable._startPos._add(i),vi(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=M(this._adjustPan.bind(this,t)))},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(z(this._panRequest),this._panRequest=M(this._adjustPan.bind(this,t)))},_onDrag:function(t){var i=this._marker,e=i._shadow,n=yi(i._icon),o=i._map.layerPointToLatLng(n);e&&vi(e,n),i._latlng=o,t.latlng=o,t.oldLatLng=this._oldLatLng,i.fire("move",t).fire("drag",t)},_onDragEnd:function(t){z(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),ke=Me.extend({options:{icon:new Ze,interactive:!0,keyboard:!0,title:"",alt:"",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,i){c(this,i),this._latlng=j(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var i=this._latlng;return this._latlng=j(t),this.update(),this.fire("move",{oldLatLng:i,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){var t;return this._icon&&this._map&&(t=this._map.latLngToLayerPoint(this._latlng).round(),this._setPos(t)),this},_initIcon:function(){var t=this.options,i="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),e=t.icon.createIcon(this._icon),n=!1;e!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(e.title=t.title),"IMG"===e.tagName&&(e.alt=t.alt||"")),ci(e,i),t.keyboard&&(e.tabIndex="0"),this._icon=e,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex});var o=t.icon.createShadow(this._shadow),s=!1;o!==this._shadow&&(this._removeShadow(),s=!0),o&&(ci(o,i),o.alt=""),this._shadow=o,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),o&&s&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),ri(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&ri(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&vi(this._icon,t),this._shadow&&vi(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(i)},_initInteraction:function(){var t;this.options.interactive&&(ci(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Ee&&(t=this.options.draggable,this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Ee(this),t&&this.dragging.enable()))},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&mi(this._icon,t),this._shadow&&mi(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});var Be=Me.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return c(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+this._renderer.options.tolerance}}),Ae=Be.extend({options:{fill:!0,radius:10},initialize:function(t,i){c(this,i),this._latlng=j(t),this._radius=this.options.radius},setLatLng:function(t){var i=this._latlng;return this._latlng=j(t),this.redraw(),this.fire("move",{oldLatLng:i,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var i=t&&t.radius||this._radius;return Be.prototype.setStyle.call(this,t),this.setRadius(i),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,i=this._radiusY||t,e=this._clickTolerance(),n=[t+e,i+e];this._pxBounds=new I(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});var Ie=Ae.extend({initialize:function(t,i,e){if("number"==typeof i&&(i=h({},e,{radius:i})),c(this,i),this._latlng=j(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new R(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:Be.prototype.setStyle,_project:function(){var t,i,e,n,o,s,r,a,h=this._latlng.lng,u=this._latlng.lat,l=this._map,c=l.options.crs;c.distance===F.distance?(t=Math.PI/180,i=this._mRadius/F.R/t,e=l.project([u+i,h]),n=l.project([u-i,h]),o=e.add(n).divideBy(2),s=l.unproject(o).lat,r=Math.acos((Math.cos(i*t)-Math.sin(u*t)*Math.sin(s*t))/(Math.cos(u*t)*Math.cos(s*t)))/t,!isNaN(r)&&0!==r||(r=i/Math.cos(Math.PI/180*u)),this._point=o.subtract(l.getPixelOrigin()),this._radius=isNaN(r)?0:o.x-l.project([s,h-r]).x,this._radiusY=o.y-e.y):(a=c.unproject(c.project(this._latlng).subtract([this._mRadius,0])),this._point=l.latLngToLayerPoint(this._latlng),this._radius=this._point.x-l.latLngToLayerPoint(a).x),this._updateBounds()}});var Oe=Be.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,i){c(this,i),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var i,e,n=1/0,o=null,s=de,r=0,a=this._parts.length;r<a;r++)for(var h=this._parts[r],u=1,l=h.length;u<l;u++){var c=s(t,i=h[u-1],e=h[u],!0);c<n&&(n=c,o=s(t,i,e))}return o&&(o.distance=Math.sqrt(n)),o},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,i,e,n,o,s,r,a=this._rings[0],h=a.length;if(!h)return null;for(i=t=0;t<h-1;t++)i+=a[t].distanceTo(a[t+1])/2;if(0===i)return this._map.layerPointToLatLng(a[0]);for(n=t=0;t<h-1;t++)if(o=a[t],s=a[t+1],i<(n+=e=o.distanceTo(s)))return r=(n-i)/e,this._map.layerPointToLatLng([s.x-r*(s.x-o.x),s.y-r*(s.y-o.y)])},getBounds:function(){return this._bounds},addLatLng:function(t,i){return i=i||this._defaultShape(),t=j(t),i.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new R,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return pe(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var i=[],e=pe(t),n=0,o=t.length;n<o;n++)e?(i[n]=j(t[n]),this._bounds.extend(i[n])):i[n]=this._convertLatLngs(t[n]);return i},_project:function(){var t=new I;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),i=new k(t,t);this._pxBounds=new I([this._rawPxBounds.min.subtract(i),this._rawPxBounds.max.add(i)])},_projectLatlngs:function(t,i,e){var n,o,s=t[0]instanceof D,r=t.length;if(s){for(o=[],n=0;n<r;n++)o[n]=this._map.latLngToLayerPoint(t[n]),e.extend(o[n]);i.push(o)}else for(n=0;n<r;n++)this._projectLatlngs(t[n],i,e)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else for(var i,e,n,o,s=this._parts,r=0,a=0,h=this._rings.length;r<h;r++)for(i=0,e=(o=this._rings[r]).length;i<e-1;i++)(n=le(o[i],o[i+1],t,i,!0))&&(s[a]=s[a]||[],s[a].push(n[0]),n[1]===o[i+1]&&i!==e-2||(s[a].push(n[1]),a++))},_simplifyPoints:function(){for(var t=this._parts,i=this.options.smoothFactor,e=0,n=t.length;e<n;e++)t[e]=he(t[e],i)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,i){var e,n,o,s,r,a,h=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(e=0,s=this._parts.length;e<s;e++)for(n=0,o=(r=(a=this._parts[e]).length)-1;n<r;o=n++)if((i||0!==n)&&ue(t,a[o],a[n])<=h)return!0;return!1}});Oe._flat=me;var Re=Oe.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,i,e,n,o,s,r,a,h,u=this._rings[0],l=u.length;if(!l)return null;for(t=s=r=a=0,i=l-1;t<l;i=t++)e=u[t],n=u[i],o=e.y*n.x-n.y*e.x,r+=(e.x+n.x)*o,a+=(e.y+n.y)*o,s+=3*o;return h=0===s?u[0]:[r/s,a/s],this._map.layerPointToLatLng(h)},_convertLatLngs:function(t){var i=Oe.prototype._convertLatLngs.call(this,t),e=i.length;return 2<=e&&i[0]instanceof D&&i[0].equals(i[e-1])&&i.pop(),i},_setLatLngs:function(t){Oe.prototype._setLatLngs.call(this,t),pe(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return pe(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,i=this.options.weight,e=new k(i,i),t=new I(t.min.subtract(e),t.max.add(e));if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings;else for(var n,o=0,s=this._rings.length;o<s;o++)(n=ge(this._rings[o],t,!0)).length&&this._parts.push(n)},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var i,e,n,o,s,r,a,h,u=!1;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(o=0,a=this._parts.length;o<a;o++)for(s=0,r=(h=(i=this._parts[o]).length)-1;s<h;r=s++)e=i[s],n=i[r],e.y>t.y!=n.y>t.y&&t.x<(n.x-e.x)*(t.y-e.y)/(n.y-e.y)+e.x&&(u=!u);return u||Oe.prototype._containsPoint.call(this,t,!0)}});var Ne=Ce.extend({initialize:function(t,i){c(this,i),this._layers={},t&&this.addData(t)},addData:function(t){var i,e,n,o=g(t)?t:t.features;if(o){for(i=0,e=o.length;i<e;i++)((n=o[i]).geometries||n.geometry||n.features||n.coordinates)&&this.addData(n);return this}var s=this.options;if(s.filter&&!s.filter(t))return this;var r=De(t,s);return r?(r.feature=qe(t),r.defaultOptions=r.options,this.resetStyle(r),s.onEachFeature&&s.onEachFeature(t,r),this.addLayer(r)):this},resetStyle:function(t){return void 0===t?this.eachLayer(this.resetStyle,this):(t.options=h({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(t){this._setLayerStyle(t,i)},this)},_setLayerStyle:function(t,i){t.setStyle&&("function"==typeof i&&(i=i(t.feature)),t.setStyle(i))}});function De(t,i){var e,n,o,s,r="Feature"===t.type?t.geometry:t,a=r?r.coordinates:null,h=[],u=i&&i.pointToLayer,l=i&&i.coordsToLatLng||We;if(!a&&!r)return null;switch(r.type){case"Point":return je(u,t,e=l(a),i);case"MultiPoint":for(o=0,s=a.length;o<s;o++)e=l(a[o]),h.push(je(u,t,e,i));return new Ce(h);case"LineString":case"MultiLineString":return n=He(a,"LineString"===r.type?0:1,l),new Oe(n,i);case"Polygon":case"MultiPolygon":return n=He(a,"Polygon"===r.type?1:2,l),new Re(n,i);case"GeometryCollection":for(o=0,s=r.geometries.length;o<s;o++){var c=De({geometry:r.geometries[o],type:"Feature",properties:t.properties},i);c&&h.push(c)}return new Ce(h);default:throw new Error("Invalid GeoJSON object.")}}function je(t,i,e,n){return t?t(i,e):new ke(e,n&&n.markersInheritOptions&&n)}function We(t){return new D(t[1],t[0],t[2])}function He(t,i,e){for(var n,o=[],s=0,r=t.length;s<r;s++)n=i?He(t[s],i-1,e):(e||We)(t[s]),o.push(n);return o}function Fe(t,i){return i="number"==typeof i?i:6,void 0!==t.alt?[r(t.lng,i),r(t.lat,i),r(t.alt,i)]:[r(t.lng,i),r(t.lat,i)]}function Ue(t,i,e,n){for(var o=[],s=0,r=t.length;s<r;s++)o.push(i?Ue(t[s],i-1,e,n):Fe(t[s],n));return!i&&e&&o.push(o[0]),o}function Ve(t,i){return t.feature?h({},t.feature,{geometry:i}):qe(i)}function qe(t){return"Feature"===t.type||"FeatureCollection"===t.type?t:{type:"Feature",properties:{},geometry:t}}var Ge={toGeoJSON:function(t){return Ve(this,{type:"Point",coordinates:Fe(this.getLatLng(),t)})}};function Ke(t,i){return new Ne(t,i)}ke.include(Ge),Ie.include(Ge),Ae.include(Ge),Oe.include({toGeoJSON:function(t){var i=!pe(this._latlngs);return Ve(this,{type:(i?"Multi":"")+"LineString",coordinates:Ue(this._latlngs,i?1:0,!1,t)})}}),Re.include({toGeoJSON:function(t){var i=!pe(this._latlngs),e=i&&!pe(this._latlngs[0]),n=Ue(this._latlngs,e?2:i?1:0,!0,t);return i||(n=[n]),Ve(this,{type:(e?"Multi":"")+"Polygon",coordinates:n})}}),ze.include({toMultiPoint:function(i){var e=[];return this.eachLayer(function(t){e.push(t.toGeoJSON(i).geometry.coordinates)}),Ve(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(n){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===t)return this.toMultiPoint(n);var o="GeometryCollection"===t,s=[];return this.eachLayer(function(t){var i,e;t.toGeoJSON&&(i=t.toGeoJSON(n),o?s.push(i.geometry):"FeatureCollection"===(e=qe(i)).type?s.push.apply(s,e.features):s.push(e))}),o?Ve(this,{geometries:s,type:"GeometryCollection"}):{type:"FeatureCollection",features:s}}});var Ye=Ke,Xe=Me.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,i,e){this._url=t,this._bounds=N(i),c(this,e)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(ci(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){ri(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&hi(this._image),this},bringToBack:function(){return this._map&&ui(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=N(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t="IMG"===this._url.tagName,i=this._image=t?this._url:si("img");ci(i,"leaflet-image-layer"),this._zoomAnimated&&ci(i,"leaflet-zoom-animated"),this.options.className&&ci(i,this.options.className),i.onselectstart=a,i.onmousemove=a,i.onload=p(this.fire,this,"load"),i.onerror=p(this._overlayOnError,this,"error"),!this.options.crossOrigin&&""!==this.options.crossOrigin||(i.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t?this._url=i.src:(i.src=this._url,i.alt=this.options.alt)},_animateZoom:function(t){var i=this._map.getZoomScale(t.zoom),e=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;gi(this._image,e,i)},_reset:function(){var t=this._image,i=new I(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),e=i.getSize();vi(t,i.min),t.style.width=e.x+"px",t.style.height=e.y+"px"},_updateOpacity:function(){mi(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)}}),Je=Xe.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1},_initImage:function(){var t="VIDEO"===this._url.tagName,i=this._image=t?this._url:si("video");if(ci(i,"leaflet-image-layer"),this._zoomAnimated&&ci(i,"leaflet-zoom-animated"),this.options.className&&ci(i,this.options.className),i.onselectstart=a,i.onmousemove=a,i.onloadeddata=p(this.fire,this,"load"),t){for(var e=i.getElementsByTagName("source"),n=[],o=0;o<e.length;o++)n.push(e[o].src);this._url=0<e.length?n:[i.src]}else{g(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(i.style,"objectFit")&&(i.style.objectFit="fill"),i.autoplay=!!this.options.autoplay,i.loop=!!this.options.loop,i.muted=!!this.options.muted;for(var s=0;s<this._url.length;s++){var r=si("source");r.src=this._url[s],i.appendChild(r)}}}});var $e=Xe.extend({_initImage:function(){var t=this._image=this._url;ci(t,"leaflet-image-layer"),this._zoomAnimated&&ci(t,"leaflet-zoom-animated"),this.options.className&&ci(t,this.options.className),t.onselectstart=a,t.onmousemove=a}});var Qe=Me.extend({options:{offset:[0,7],className:"",pane:"popupPane"},initialize:function(t,i){c(this,t),this._source=i},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&mi(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&mi(this._container,1),this.bringToFront()},onRemove:function(t){t._fadeAnimated?(mi(this._container,0),this._removeTimeout=setTimeout(p(ri,void 0,this._container),200)):ri(this._container)},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=j(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&hi(this._container),this},bringToBack:function(){return this._map&&ui(this._container),this},_prepareOpen:function(t,i,e){if(i instanceof Me||(e=i,i=t),i instanceof Ce)for(var n in t._layers){i=t._layers[n];break}if(!e)if(i.getCenter)e=i.getCenter();else{if(!i.getLatLng)throw new Error("Unable to get source layer LatLng.");e=i.getLatLng()}return this._source=i,this.update(),e},_updateContent:function(){if(this._content){var t=this._contentNode,i="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof i)t.innerHTML=i;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(i)}this.fire("contentupdate")}},_updatePosition:function(){var t,i,e,n,o;this._map&&(t=this._map.latLngToLayerPoint(this._latlng),i=A(this.options.offset),e=this._getAnchor(),this._zoomAnimated?vi(this._container,t.add(e)):i=i.add(t).add(e),n=this._containerBottom=-i.y,o=this._containerLeft=-Math.round(this._containerWidth/2)+i.x,this._container.style.bottom=n+"px",this._container.style.left=o+"px")},_getAnchor:function(){return[0,0]}}),tn=Qe.extend({options:{maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t.openPopup(this),this},onAdd:function(t){Qe.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Be||this._source.on("preclick",Ai))},onRemove:function(t){Qe.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Be||this._source.off("preclick",Ai))},getEvents:function(){var t=Qe.prototype.getEvents.call(this);return(void 0!==this.options.closeOnClick?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t,i="leaflet-popup",e=this._container=si("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),n=this._wrapper=si("div",i+"-content-wrapper",e);this._contentNode=si("div",i+"-content",n),Oi(e),Ii(this._contentNode),zi(e,"contextmenu",Ai),this._tipContainer=si("div",i+"-tip-container",e),this._tip=si("div",i+"-tip",this._tipContainer),this.options.closeButton&&((t=this._closeButton=si("a",i+"-close-button",e)).href="#close",t.innerHTML="&#215;",zi(t,"click",this._onCloseButtonClick,this))},_updateLayout:function(){var t=this._contentNode,i=t.style;i.width="",i.whiteSpace="nowrap";var e=t.offsetWidth,e=Math.min(e,this.options.maxWidth);e=Math.max(e,this.options.minWidth),i.width=e+1+"px",i.whiteSpace="",i.height="";var n=t.offsetHeight,o=this.options.maxHeight,s="leaflet-popup-scrolled";o&&o<n?(i.height=o+"px",ci(t,s)):_i(t,s),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),e=this._getAnchor();vi(this._container,i.add(e))},_adjustPan:function(){var t,i,e,n,o,s,r,a,h,u,l,c;this.options.autoPan&&(this._map._panAnim&&this._map._panAnim.stop(),t=this._map,i=parseInt(oi(this._container,"marginBottom"),10)||0,e=this._container.offsetHeight+i,n=this._containerWidth,(o=new k(this._containerLeft,-e-this._containerBottom))._add(yi(this._container)),s=t.layerPointToContainerPoint(o),r=A(this.options.autoPanPadding),a=A(this.options.autoPanPaddingTopLeft||r),h=A(this.options.autoPanPaddingBottomRight||r),u=t.getSize(),c=l=0,s.x+n+h.x>u.x&&(l=s.x+n-u.x+h.x),s.x-l-a.x<0&&(l=s.x-a.x),s.y+e+h.y>u.y&&(c=s.y+e-u.y+h.y),s.y-c-a.y<0&&(c=s.y-a.y),(l||c)&&t.fire("autopanstart").panBy([l,c]))},_onCloseButtonClick:function(t){this._close(),Ni(t)},_getAnchor:function(){return A(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}});Ki.mergeOptions({closePopupOnClick:!0}),Ki.include({openPopup:function(t,i,e){return t instanceof tn||(t=new tn(e).setContent(t)),i&&t.setLatLng(i),this.hasLayer(t)?this:(this._popup&&this._popup.options.autoClose&&this.closePopup(),this._popup=t,this.addLayer(t))},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&this.removeLayer(t),this}}),Me.include({bindPopup:function(t,i){return t instanceof tn?(c(t,i),(this._popup=t)._source=this):(this._popup&&!i||(this._popup=new tn(i,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t,i){return this._popup&&this._map&&(i=this._popup._prepareOpen(this,t,i),this._map.openPopup(this._popup,i)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(t){return this._popup&&(this._popup._map?this.closePopup():this.openPopup(t)),this},isPopupOpen:function(){return!!this._popup&&this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){var i=t.layer||t.target;this._popup&&this._map&&(Ni(t),i instanceof Be?this.openPopup(t.layer||t.target,t.latlng):this._map.hasLayer(this._popup)&&this._popup._source===i?this.closePopup():this.openPopup(i,t.latlng))},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){13===t.originalEvent.keyCode&&this._openPopup(t)}});var en=Qe.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,interactive:!1,opacity:.9},onAdd:function(t){Qe.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&this._source.fire("tooltipopen",{tooltip:this},!0)},onRemove:function(t){Qe.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&this._source.fire("tooltipclose",{tooltip:this},!0)},getEvents:function(){var t=Qe.prototype.getEvents.call(this);return bt&&!this.options.permanent&&(t.preclick=this._close),t},_close:function(){this._map&&this._map.closeTooltip(this)},_initLayout:function(){var t="leaflet-tooltip "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=si("div",t)},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var i,e=this._map,n=this._container,o=e.latLngToContainerPoint(e.getCenter()),s=e.layerPointToContainerPoint(t),r=this.options.direction,a=n.offsetWidth,h=n.offsetHeight,u=A(this.options.offset),l=this._getAnchor(),c="top"===r?(i=a/2,h):"bottom"===r?(i=a/2,0):(i="center"===r?a/2:"right"===r?0:"left"===r?a:s.x<o.x?(r="right",0):(r="left",a+2*(u.x+l.x)),h/2);t=t.subtract(A(i,c,!0)).add(u).add(l),_i(n,"leaflet-tooltip-right"),_i(n,"leaflet-tooltip-left"),_i(n,"leaflet-tooltip-top"),_i(n,"leaflet-tooltip-bottom"),ci(n,"leaflet-tooltip-"+r),vi(n,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&mi(this._container,t)},_animateZoom:function(t){var i=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(i)},_getAnchor:function(){return A(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}});Ki.include({openTooltip:function(t,i,e){return t instanceof en||(t=new en(e).setContent(t)),i&&t.setLatLng(i),this.hasLayer(t)?this:this.addLayer(t)},closeTooltip:function(t){return t&&this.removeLayer(t),this}}),Me.include({bindTooltip:function(t,i){return t instanceof en?(c(t,i),(this._tooltip=t)._source=this):(this._tooltip&&!i||(this._tooltip=new en(i,this)),this._tooltip.setContent(t)),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){var i,e;!t&&this._tooltipHandlersAdded||(i=t?"off":"on",e={remove:this.closeTooltip,move:this._moveTooltip},this._tooltip.options.permanent?e.add=this._openTooltip:(e.mouseover=this._openTooltip,e.mouseout=this.closeTooltip,this._tooltip.options.sticky&&(e.mousemove=this._moveTooltip),bt&&(e.click=this._openTooltip)),this[i](e),this._tooltipHandlersAdded=!t)},openTooltip:function(t,i){return this._tooltip&&this._map&&(i=this._tooltip._prepareOpen(this,t,i),this._map.openTooltip(this._tooltip,i),this._tooltip.options.interactive&&this._tooltip._container&&(ci(this._tooltip._container,"leaflet-clickable"),this.addInteractiveTarget(this._tooltip._container))),this},closeTooltip:function(){return this._tooltip&&(this._tooltip._close(),this._tooltip.options.interactive&&this._tooltip._container&&(_i(this._tooltip._container,"leaflet-clickable"),this.removeInteractiveTarget(this._tooltip._container))),this},toggleTooltip:function(t){return this._tooltip&&(this._tooltip._map?this.closeTooltip():this.openTooltip(t)),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_openTooltip:function(t){var i=t.layer||t.target;this._tooltip&&this._map&&this.openTooltip(i,this._tooltip.options.sticky?t.latlng:void 0)},_moveTooltip:function(t){var i,e,n=t.latlng;this._tooltip.options.sticky&&t.originalEvent&&(i=this._map.mouseEventToContainerPoint(t.originalEvent),e=this._map.containerPointToLayerPoint(i),n=this._map.layerPointToLatLng(e)),this._tooltip.setLatLng(n)}});var nn=Se.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var i,e=t&&"DIV"===t.tagName?t:document.createElement("div"),n=this.options;return n.html instanceof Element?(ai(e),e.appendChild(n.html)):e.innerHTML=!1!==n.html?n.html:"",n.bgPos&&(i=A(n.bgPos),e.style.backgroundPosition=-i.x+"px "+-i.y+"px"),this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});Se.Default=Ze;var on=Me.extend({options:{tileSize:256,opacity:1,updateWhenIdle:yt,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){c(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView(),this._update()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),ri(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(hi(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(ui(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){return this._map&&(this._removeAllTiles(),this._update()),this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=n(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof k?t:new k(t,t)},_updateZIndex:function(){this._container&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var i,e=this.getPane().children,n=-t(-1/0,1/0),o=0,s=e.length;o<s;o++)i=e[o].style.zIndex,e[o]!==this._container&&i&&(n=t(n,+i));isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!it){mi(this._container,this.options.opacity);var t=+new Date,i=!1,e=!1;for(var n in this._tiles){var o,s=this._tiles[n];s.current&&s.loaded&&(o=Math.min(1,(t-s.loaded)/200),mi(s.el,o),o<1?i=!0:(s.active?e=!0:this._onOpaqueTile(s),s.active=!0))}e&&!this._noPrune&&this._pruneTiles(),i&&(z(this._fadeFrame),this._fadeFrame=M(this._updateOpacity,this))}},_onOpaqueTile:a,_initContainer:function(){this._container||(this._container=si("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,i=this.options.maxZoom;if(void 0!==t){for(var e in this._levels)e=Number(e),this._levels[e].el.children.length||e===t?(this._levels[e].el.style.zIndex=i-Math.abs(t-e),this._onUpdateLevel(e)):(ri(this._levels[e].el),this._removeTilesAtZoom(e),this._onRemoveLevel(e),delete this._levels[e]);var n=this._levels[t],o=this._map;return n||((n=this._levels[t]={}).el=si("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=i,n.origin=o.project(o.unproject(o.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,o.getCenter(),o.getZoom()),a(n.el.offsetWidth),this._onCreateLevel(n)),this._level=n}},_onUpdateLevel:a,_onRemoveLevel:a,_onCreateLevel:a,_pruneTiles:function(){if(this._map){var t,i,e,n=this._map.getZoom();if(n>this.options.maxZoom||n<this.options.minZoom)this._removeAllTiles();else{for(t in this._tiles)(e=this._tiles[t]).retain=e.current;for(t in this._tiles){(e=this._tiles[t]).current&&!e.active&&(i=e.coords,this._retainParent(i.x,i.y,i.z,i.z-5)||this._retainChildren(i.x,i.y,i.z,i.z+2))}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}}},_removeTilesAtZoom:function(t){for(var i in this._tiles)this._tiles[i].coords.z===t&&this._removeTile(i)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)ri(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,i,e,n){var o=Math.floor(t/2),s=Math.floor(i/2),r=e-1,a=new k(+o,+s);a.z=+r;var h=this._tileCoordsToKey(a),u=this._tiles[h];return u&&u.active?u.retain=!0:(u&&u.loaded&&(u.retain=!0),n<r&&this._retainParent(o,s,r,n))},_retainChildren:function(t,i,e,n){for(var o=2*t;o<2*t+2;o++)for(var s=2*i;s<2*i+2;s++){var r=new k(o,s);r.z=e+1;var a=this._tileCoordsToKey(r),h=this._tiles[a];h&&h.active?h.retain=!0:(h&&h.loaded&&(h.retain=!0),e+1<n&&this._retainChildren(o,s,e+1,n))}},_resetView:function(t){var i=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),i,i)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var i=this.options;return void 0!==i.minNativeZoom&&t<i.minNativeZoom?i.minNativeZoom:void 0!==i.maxNativeZoom&&i.maxNativeZoom<t?i.maxNativeZoom:t},_setView:function(t,i,e,n){var o=Math.round(i),o=void 0!==this.options.maxZoom&&o>this.options.maxZoom||void 0!==this.options.minZoom&&o<this.options.minZoom?void 0:this._clampZoom(o),s=this.options.updateWhenZooming&&o!==this._tileZoom;n&&!s||(this._tileZoom=o,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),void 0!==o&&this._update(t),e||this._pruneTiles(),this._noPrune=!!e),this._setZoomTransforms(t,i)},_setZoomTransforms:function(t,i){for(var e in this._levels)this._setZoomTransform(this._levels[e],t,i)},_setZoomTransform:function(t,i,e){var n=this._map.getZoomScale(e,t.zoom),o=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(i,e)).round();vt?gi(t.el,o,n):vi(t.el,o)},_resetGrid:function(){var t=this._map,i=t.options.crs,e=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=i.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,i.wrapLng[0]],n).x/e.x),Math.ceil(t.project([0,i.wrapLng[1]],n).x/e.y)],this._wrapY=i.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([i.wrapLat[0],0],n).y/e.x),Math.ceil(t.project([i.wrapLat[1],0],n).y/e.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(t){var i=this._map,e=i._animatingZoom?Math.max(i._animateToZoom,i.getZoom()):i.getZoom(),n=i.getZoomScale(e,this._tileZoom),o=i.project(t,this._tileZoom).floor(),s=i.getSize().divideBy(2*n);return new I(o.subtract(s),o.add(s))},_update:function(t){var i=this._map;if(i){var e=this._clampZoom(i.getZoom());if(void 0===t&&(t=i.getCenter()),void 0!==this._tileZoom){var n=this._getTiledPixelBounds(t),o=this._pxBoundsToTileRange(n),s=o.getCenter(),r=[],a=this.options.keepBuffer,h=new I(o.getBottomLeft().subtract([a,-a]),o.getTopRight().add([a,-a]));if(!(isFinite(o.min.x)&&isFinite(o.min.y)&&isFinite(o.max.x)&&isFinite(o.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var u in this._tiles){var l=this._tiles[u].coords;l.z===this._tileZoom&&h.contains(new k(l.x,l.y))||(this._tiles[u].current=!1)}if(1<Math.abs(e-this._tileZoom))this._setView(t,e);else{for(var c=o.min.y;c<=o.max.y;c++)for(var _=o.min.x;_<=o.max.x;_++){var d,p=new k(_,c);p.z=this._tileZoom,this._isValidTile(p)&&((d=this._tiles[this._tileCoordsToKey(p)])?d.current=!0:r.push(p))}if(r.sort(function(t,i){return t.distanceTo(s)-i.distanceTo(s)}),0!==r.length){this._loading||(this._loading=!0,this.fire("loading"));for(var m=document.createDocumentFragment(),_=0;_<r.length;_++)this._addTile(r[_],m);this._level.el.appendChild(m)}}}}},_isValidTile:function(t){var i=this._map.options.crs;if(!i.infinite){var e=this._globalTileRange;if(!i.wrapLng&&(t.x<e.min.x||t.x>e.max.x)||!i.wrapLat&&(t.y<e.min.y||t.y>e.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return N(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var i=this._map,e=this.getTileSize(),n=t.scaleBy(e),o=n.add(e);return[i.unproject(n,t.z),i.unproject(o,t.z)]},_tileCoordsToBounds:function(t){var i=this._tileCoordsToNwSe(t),e=new R(i[0],i[1]);return this.options.noWrap||(e=this._map.wrapLatLngBounds(e)),e},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var i=t.split(":"),e=new k(+i[0],+i[1]);return e.z=+i[2],e},_removeTile:function(t){var i=this._tiles[t];i&&(ri(i.el),delete this._tiles[t],this.fire("tileunload",{tile:i.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){ci(t,"leaflet-tile");var i=this.getTileSize();t.style.width=i.x+"px",t.style.height=i.y+"px",t.onselectstart=a,t.onmousemove=a,it&&this.options.opacity<1&&mi(t,this.options.opacity),ot&&!st&&(t.style.WebkitBackfaceVisibility="hidden")},_addTile:function(t,i){var e=this._getTilePos(t),n=this._tileCoordsToKey(t),o=this.createTile(this._wrapCoords(t),p(this._tileReady,this,t));this._initTile(o),this.createTile.length<2&&M(p(this._tileReady,this,t,null,o)),vi(o,e),this._tiles[n]={el:o,coords:t,current:!0},i.appendChild(o),this.fire("tileloadstart",{tile:o,coords:t})},_tileReady:function(t,i,e){i&&this.fire("tileerror",{error:i,tile:e,coords:t});var n=this._tileCoordsToKey(t);(e=this._tiles[n])&&(e.loaded=+new Date,this._map._fadeAnimated?(mi(e.el,0),z(this._fadeFrame),this._fadeFrame=M(this._updateOpacity,this)):(e.active=!0,this._pruneTiles()),i||(ci(e.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:e.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),it||!this._map._fadeAnimated?M(this._pruneTiles,this):setTimeout(p(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var i=new k(this._wrapX?o(t.x,this._wrapX):t.x,this._wrapY?o(t.y,this._wrapY):t.y);return i.z=t.z,i},_pxBoundsToTileRange:function(t){var i=this.getTileSize();return new I(t.min.unscaleBy(i).floor(),t.max.unscaleBy(i).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});var sn=on.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1},initialize:function(t,i){this._url=t,(i=c(this,i)).detectRetina&&zt&&0<i.maxZoom&&(i.tileSize=Math.floor(i.tileSize/2),i.zoomReverse?(i.zoomOffset--,i.minZoom++):(i.zoomOffset++,i.maxZoom--),i.minZoom=Math.max(0,i.minZoom)),"string"==typeof i.subdomains&&(i.subdomains=i.subdomains.split("")),ot||this.on("tileunload",this._onTileRemove)},setUrl:function(t,i){return this._url===t&&void 0===i&&(i=!0),this._url=t,i||this.redraw(),this},createTile:function(t,i){var e=document.createElement("img");return zi(e,"load",p(this._tileOnLoad,this,i,e)),zi(e,"error",p(this._tileOnError,this,i,e)),!this.options.crossOrigin&&""!==this.options.crossOrigin||(e.crossOrigin=!0===this.options.crossOrigin?"":this.options.crossOrigin),e.alt="",e.setAttribute("role","presentation"),e.src=this.getTileUrl(t),e},getTileUrl:function(t){var i,e={r:zt?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};return this._map&&!this._map.options.crs.infinite&&(i=this._globalTileRange.max.y-t.y,this.options.tms&&(e.y=i),e["-y"]=i),f(this._url,h(e,this.options))},_tileOnLoad:function(t,i){it?setTimeout(p(t,this,null,i),0):t(null,i)},_tileOnError:function(t,i,e){var n=this.options.errorTileUrl;n&&i.getAttribute("src")!==n&&(i.src=n),t(e,i)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,i=this.options.maxZoom;return this.options.zoomReverse&&(t=i-t),t+this.options.zoomOffset},_getSubdomain:function(t){var i=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[i]},_abortLoading:function(){var t,i;for(t in this._tiles)this._tiles[t].coords.z!==this._tileZoom&&((i=this._tiles[t].el).onload=a,i.onerror=a,i.complete||(i.src=y,ri(i),delete this._tiles[t]))},_removeTile:function(t){var i=this._tiles[t];if(i)return at||i.el.setAttribute("src",y),on.prototype._removeTile.call(this,t)},_tileReady:function(t,i,e){if(this._map&&(!e||e.getAttribute("src")!==y))return on.prototype._tileReady.call(this,t,i,e)}});function rn(t,i){return new sn(t,i)}var an=sn.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,i){this._url=t;var e=h({},this.defaultWmsParams);for(var n in i)n in this.options||(e[n]=i[n]);var o=(i=c(this,i)).detectRetina&&zt?2:1,s=this.getTileSize();e.width=s.x*o,e.height=s.y*o,this.wmsParams=e},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var i=1.3<=this._wmsVersion?"crs":"srs";this.wmsParams[i]=this._crs.code,sn.prototype.onAdd.call(this,t)},getTileUrl:function(t){var i=this._tileCoordsToNwSe(t),e=this._crs,n=O(e.project(i[0]),e.project(i[1])),o=n.min,s=n.max,r=(1.3<=this._wmsVersion&&this._crs===be?[o.y,o.x,s.y,s.x]:[o.x,o.y,s.x,s.y]).join(","),a=sn.prototype.getTileUrl.call(this,t);return a+_(this.wmsParams,a,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+r},setParams:function(t,i){return h(this.wmsParams,t),i||this.redraw(),this}});sn.WMS=an,rn.wms=function(t,i){return new an(t,i)};var hn=Me.extend({options:{padding:.1,tolerance:0},initialize:function(t){c(this,t),m(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),this._zoomAnimated&&ci(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,i){var e=this._map.getZoomScale(i,this._zoom),n=yi(this._container),o=this._map.getSize().multiplyBy(.5+this.options.padding),s=this._map.project(this._center,i),r=this._map.project(t,i).subtract(s),a=o.multiplyBy(-e).add(n).add(o).subtract(r);vt?gi(this._container,a,e):vi(this._container,a)},_reset:function(){for(var t in this._update(),this._updateTransform(this._center,this._zoom),this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,i=this._map.getSize(),e=this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round();this._bounds=new I(e,e.add(i.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),un=hn.extend({getEvents:function(){var t=hn.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){hn.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");zi(t,"mousemove",this._onMouseMove,this),zi(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),zi(t,"mouseout",this._handleMouseOut,this),this._ctx=t.getContext("2d")},_destroyContainer:function(){z(this._redrawRequest),delete this._ctx,ri(this._container),Si(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){for(var t in this._redrawBounds=null,this._layers)this._layers[t]._update();this._redraw()}},_update:function(){var t,i,e,n;this._map._animatingZoom&&this._bounds||(hn.prototype._update.call(this),t=this._bounds,i=this._container,e=t.getSize(),n=zt?2:1,vi(i,t.min),i.width=n*e.x,i.height=n*e.y,i.style.width=e.x+"px",i.style.height=e.y+"px",zt&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update"))},_reset:function(){hn.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t);var i=(this._layers[m(t)]=t)._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=i),this._drawLast=i,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var i=t._order,e=i.next,n=i.prev;e?e.prev=n:this._drawLast=n,n?n.next=e:this._drawFirst=e,delete t._order,delete this._layers[m(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if("string"==typeof t.options.dashArray){for(var i,e=t.options.dashArray.split(/[, ]+/),n=[],o=0;o<e.length;o++){if(i=Number(e[o]),isNaN(i))return;n.push(i)}t.options._dashArray=n}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||M(this._redraw,this))},_extendRedrawBounds:function(t){var i;t._pxBounds&&(i=(t.options.weight||0)+1,this._redrawBounds=this._redrawBounds||new I,this._redrawBounds.extend(t._pxBounds.min.subtract([i,i])),this._redrawBounds.extend(t._pxBounds.max.add([i,i])))},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t,i=this._redrawBounds;i?(t=i.getSize(),this._ctx.clearRect(i.min.x,i.min.y,t.x,t.y)):(this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore())},_draw:function(){var t,i,e=this._redrawBounds;this._ctx.save(),e&&(i=e.getSize(),this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()),this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,i){if(this._drawing){var e,n,o,s,r=t._parts,a=r.length,h=this._ctx;if(a){for(h.beginPath(),e=0;e<a;e++){for(n=0,o=r[e].length;n<o;n++)s=r[e][n],h[n?"lineTo":"moveTo"](s.x,s.y);i&&h.closePath()}this._fillStroke(h,t)}}},_updateCircle:function(t){var i,e,n,o;this._drawing&&!t._empty()&&(i=t._point,e=this._ctx,n=Math.max(Math.round(t._radius),1),1!=(o=(Math.max(Math.round(t._radiusY),1)||n)/n)&&(e.save(),e.scale(1,o)),e.beginPath(),e.arc(i.x,i.y/o,n,0,2*Math.PI,!1),1!=o&&e.restore(),this._fillStroke(e,t))},_fillStroke:function(t,i){var e=i.options;e.fill&&(t.globalAlpha=e.fillOpacity,t.fillStyle=e.fillColor||e.color,t.fill(e.fillRule||"evenodd")),e.stroke&&0!==e.weight&&(t.setLineDash&&t.setLineDash(i.options&&i.options._dashArray||[]),t.globalAlpha=e.opacity,t.lineWidth=e.weight,t.strokeStyle=e.color,t.lineCap=e.lineCap,t.lineJoin=e.lineJoin,t.stroke())},_onClick:function(t){for(var i,e,n=this._map.mouseEventToLayerPoint(t),o=this._drawFirst;o;o=o.next)(i=o.layer).options.interactive&&i._containsPoint(n)&&(("click"===t.type||"preclick"!==t.type)&&this._map._draggableMoved(i)||(e=i));e&&(Fi(t),this._fireEvent([e],t))},_onMouseMove:function(t){var i;!this._map||this._map.dragging.moving()||this._map._animatingZoom||(i=this._map.mouseEventToLayerPoint(t),this._handleMouseHover(t,i))},_handleMouseOut:function(t){var i=this._hoveredLayer;i&&(_i(this._container,"leaflet-interactive"),this._fireEvent([i],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,i){if(!this._mouseHoverThrottled){for(var e,n,o=this._drawFirst;o;o=o.next)(e=o.layer).options.interactive&&e._containsPoint(i)&&(n=e);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(ci(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._hoveredLayer&&this._fireEvent([this._hoveredLayer],t),this._mouseHoverThrottled=!0,setTimeout(p(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,i,e){this._map._fireDOMEvent(i,e||i.type,t)},_bringToFront:function(t){var i,e,n=t._order;n&&(i=n.next,e=n.prev,i&&((i.prev=e)?e.next=i:i&&(this._drawFirst=i),n.prev=this._drawLast,(this._drawLast.next=n).next=null,this._drawLast=n,this._requestRedraw(t)))},_bringToBack:function(t){var i,e,n=t._order;n&&(i=n.next,(e=n.prev)&&((e.next=i)?i.prev=e:e&&(this._drawLast=e),n.prev=null,n.next=this._drawFirst,this._drawFirst.prev=n,this._drawFirst=n,this._requestRedraw(t)))}});function ln(t){return St?new un(t):null}var cn=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),_n={_initContainer:function(){this._container=si("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(hn.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var i=t._container=cn("shape");ci(i,"leaflet-vml-shape "+(this.options.className||"")),i.coordsize="1 1",t._path=cn("path"),i.appendChild(t._path),this._updateStyle(t),this._layers[m(t)]=t},_addPath:function(t){var i=t._container;this._container.appendChild(i),t.options.interactive&&t.addInteractiveTarget(i)},_removePath:function(t){var i=t._container;ri(i),t.removeInteractiveTarget(i),delete this._layers[m(t)]},_updateStyle:function(t){var i=t._stroke,e=t._fill,n=t.options,o=t._container;o.stroked=!!n.stroke,o.filled=!!n.fill,n.stroke?(i=i||(t._stroke=cn("stroke")),o.appendChild(i),i.weight=n.weight+"px",i.color=n.color,i.opacity=n.opacity,n.dashArray?i.dashStyle=g(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):i.dashStyle="",i.endcap=n.lineCap.replace("butt","flat"),i.joinstyle=n.lineJoin):i&&(o.removeChild(i),t._stroke=null),n.fill?(e=e||(t._fill=cn("fill")),o.appendChild(e),e.color=n.fillColor||n.color,e.opacity=n.fillOpacity):e&&(o.removeChild(e),t._fill=null)},_updateCircle:function(t){var i=t._point.round(),e=Math.round(t._radius),n=Math.round(t._radiusY||e);this._setPath(t,t._empty()?"M0 0":"AL "+i.x+","+i.y+" "+e+","+n+" 0,23592600")},_setPath:function(t,i){t._path.v=i},_bringToFront:function(t){hi(t._container)},_bringToBack:function(t){ui(t._container)}},dn=Et?cn:J,pn=hn.extend({getEvents:function(){var t=hn.prototype.getEvents.call(this);return t.zoomstart=this._onZoomStart,t},_initContainer:function(){this._container=dn("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=dn("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){ri(this._container),Si(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_onZoomStart:function(){this._update()},_update:function(){var t,i,e;this._map._animatingZoom&&this._bounds||(hn.prototype._update.call(this),i=(t=this._bounds).getSize(),e=this._container,this._svgSize&&this._svgSize.equals(i)||(this._svgSize=i,e.setAttribute("width",i.x),e.setAttribute("height",i.y)),vi(e,t.min),e.setAttribute("viewBox",[t.min.x,t.min.y,i.x,i.y].join(" ")),this.fire("update"))},_initPath:function(t){var i=t._path=dn("path");t.options.className&&ci(i,t.options.className),t.options.interactive&&ci(i,"leaflet-interactive"),this._updateStyle(t),this._layers[m(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){ri(t._path),t.removeInteractiveTarget(t._path),delete this._layers[m(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var i=t._path,e=t.options;i&&(e.stroke?(i.setAttribute("stroke",e.color),i.setAttribute("stroke-opacity",e.opacity),i.setAttribute("stroke-width",e.weight),i.setAttribute("stroke-linecap",e.lineCap),i.setAttribute("stroke-linejoin",e.lineJoin),e.dashArray?i.setAttribute("stroke-dasharray",e.dashArray):i.removeAttribute("stroke-dasharray"),e.dashOffset?i.setAttribute("stroke-dashoffset",e.dashOffset):i.removeAttribute("stroke-dashoffset")):i.setAttribute("stroke","none"),e.fill?(i.setAttribute("fill",e.fillColor||e.color),i.setAttribute("fill-opacity",e.fillOpacity),i.setAttribute("fill-rule",e.fillRule||"evenodd")):i.setAttribute("fill","none"))},_updatePoly:function(t,i){this._setPath(t,$(t._parts,i))},_updateCircle:function(t){var i=t._point,e=Math.max(Math.round(t._radius),1),n="a"+e+","+(Math.max(Math.round(t._radiusY),1)||e)+" 0 1,0 ",o=t._empty()?"M0 0":"M"+(i.x-e)+","+i.y+n+2*e+",0 "+n+2*-e+",0 ";this._setPath(t,o)},_setPath:function(t,i){t._path.setAttribute("d",i)},_bringToFront:function(t){hi(t._path)},_bringToBack:function(t){ui(t._path)}});function mn(t){return Zt||Et?new pn(t):null}Et&&pn.include(_n),Ki.include({getRenderer:function(t){var i=(i=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer)||(this._renderer=this._createRenderer());return this.hasLayer(i)||this.addLayer(i),i},_getPaneRenderer:function(t){if("overlayPane"===t||void 0===t)return!1;var i=this._paneRenderers[t];return void 0===i&&(i=this._createRenderer({pane:t}),this._paneRenderers[t]=i),i},_createRenderer:function(t){return this.options.preferCanvas&&ln(t)||mn(t)}});var fn=Re.extend({initialize:function(t,i){Re.prototype.initialize.call(this,this._boundsToLatLngs(t),i)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return[(t=N(t)).getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});pn.create=dn,pn.pointsToPath=$,Ne.geometryToLayer=De,Ne.coordsToLatLng=We,Ne.coordsToLatLngs=He,Ne.latLngToCoords=Fe,Ne.latLngsToCoords=Ue,Ne.getFeature=Ve,Ne.asFeature=qe,Ki.mergeOptions({boxZoom:!0});var gn=ie.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){zi(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Si(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){ri(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){0!==this._resetStateTimeout&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||1!==t.which&&1!==t.button)return!1;this._clearDeferredResetState(),this._resetState(),Xt(),xi(),this._startPoint=this._map.mouseEventToContainerPoint(t),zi(document,{contextmenu:Ni,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=si("div","leaflet-zoom-box",this._container),ci(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var i=new I(this._point,this._startPoint),e=i.getSize();vi(this._box,i.min),this._box.style.width=e.x+"px",this._box.style.height=e.y+"px"},_finish:function(){this._moved&&(ri(this._box),_i(this._container,"leaflet-crosshair")),Jt(),wi(),Si(document,{contextmenu:Ni,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){var i;1!==t.which&&1!==t.button||(this._finish(),this._moved&&(this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(p(this._resetState,this),0),i=new R(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point)),this._map.fitBounds(i).fire("boxzoomend",{boxZoomBounds:i})))},_onKeyDown:function(t){27===t.keyCode&&this._finish()}});Ki.addInitHook("addHandler","boxZoom",gn),Ki.mergeOptions({doubleClickZoom:!0});var vn=ie.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var i=this._map,e=i.getZoom(),n=i.options.zoomDelta,o=t.originalEvent.shiftKey?e-n:e+n;"center"===i.options.doubleClickZoom?i.setZoom(o):i.setZoomAround(t.containerPoint,o)}});Ki.addInitHook("addHandler","doubleClickZoom",vn),Ki.mergeOptions({dragging:!0,inertia:!st,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var yn=ie.extend({addHooks:function(){var t;this._draggable||(t=this._map,this._draggable=new ae(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))),ci(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){_i(this._map._container,"leaflet-grab"),_i(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t,i=this._map;i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity?(t=N(this._map.options.maxBounds),this._offsetLimit=O(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))):this._offsetLimit=null,i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){var i,e;this._map.options.inertia&&(i=this._lastTime=+new Date,e=this._lastPos=this._draggable._absPos||this._draggable._newPos,this._positions.push(e),this._times.push(i),this._prunePositions(i)),this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;1<this._positions.length&&50<t-this._times[0];)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),i=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=i.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,i){return t-(t-i)*this._viscosity},_onPreDragLimit:function(){var t,i;this._viscosity&&this._offsetLimit&&(t=this._draggable._newPos.subtract(this._draggable._startPos),i=this._offsetLimit,t.x<i.min.x&&(t.x=this._viscousLimit(t.x,i.min.x)),t.y<i.min.y&&(t.y=this._viscousLimit(t.y,i.min.y)),t.x>i.max.x&&(t.x=this._viscousLimit(t.x,i.max.x)),t.y>i.max.y&&(t.y=this._viscousLimit(t.y,i.max.y)),this._draggable._newPos=this._draggable._startPos.add(t))},_onPreDragWrap:function(){var t=this._worldWidth,i=Math.round(t/2),e=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-i+e)%t+i-e,s=(n+i+e)%t-i-e,r=Math.abs(o+e)<Math.abs(s+e)?o:s;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=r},_onDragEnd:function(t){var i,e,n,o,s,r,a,h,u,l=this._map,c=l.options,_=!c.inertia||this._times.length<2;l.fire("dragend",t),_?l.fire("moveend"):(this._prunePositions(+new Date),i=this._lastPos.subtract(this._positions[0]),e=(this._lastTime-this._times[0])/1e3,n=c.easeLinearity,s=(o=i.multiplyBy(n/e)).distanceTo([0,0]),r=Math.min(c.inertiaMaxSpeed,s),a=o.multiplyBy(r/s),h=r/(c.inertiaDeceleration*n),(u=a.multiplyBy(-h/2).round()).x||u.y?(u=l._limitOffset(u,l.options.maxBounds),M(function(){l.panBy(u,{duration:h,easeLinearity:n,noMoveStart:!0,animate:!0})})):l.fire("moveend"))}});Ki.addInitHook("addHandler","dragging",yn),Ki.mergeOptions({keyboard:!0,keyboardPanDelta:80});var xn=ie.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),zi(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Si(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){var t,i,e,n;this._focused||(t=document.body,i=document.documentElement,e=t.scrollTop||i.scrollTop,n=t.scrollLeft||i.scrollLeft,this._map._container.focus(),window.scrollTo(n,e))},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){for(var i=this._panKeys={},e=this.keyCodes,n=0,o=e.left.length;n<o;n++)i[e.left[n]]=[-1*t,0];for(n=0,o=e.right.length;n<o;n++)i[e.right[n]]=[t,0];for(n=0,o=e.down.length;n<o;n++)i[e.down[n]]=[0,t];for(n=0,o=e.up.length;n<o;n++)i[e.up[n]]=[0,-1*t]},_setZoomDelta:function(t){for(var i=this._zoomKeys={},e=this.keyCodes,n=0,o=e.zoomIn.length;n<o;n++)i[e.zoomIn[n]]=t;for(n=0,o=e.zoomOut.length;n<o;n++)i[e.zoomOut[n]]=-t},_addHooks:function(){zi(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Si(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var i,e=t.keyCode,n=this._map;if(e in this._panKeys)n._panAnim&&n._panAnim._inProgress||(i=this._panKeys[e],t.shiftKey&&(i=A(i).multiplyBy(3)),n.panBy(i),n.options.maxBounds&&n.panInsideBounds(n.options.maxBounds));else if(e in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[e]);else{if(27!==e||!n._popup||!n._popup.options.closeOnEscapeKey)return;n.closePopup()}Ni(t)}}});Ki.addInitHook("addHandler","keyboard",xn),Ki.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var wn=ie.extend({addHooks:function(){zi(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Si(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var i=Wi(t),e=this._map.options.wheelDebounceTime;this._delta+=i,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(e-(new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(p(this._performZoom,this),n),Ni(t)},_performZoom:function(){var t=this._map,i=t.getZoom(),e=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(4*this._map.options.wheelPxPerZoomLevel),o=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,s=e?Math.ceil(o/e)*e:o,r=t._limitZoom(i+(0<this._delta?s:-s))-i;this._delta=0,this._startTime=null,r&&("center"===t.options.scrollWheelZoom?t.setZoom(i+r):t.setZoomAround(this._lastMousePos,i+r))}});Ki.addInitHook("addHandler","scrollWheelZoom",wn),Ki.mergeOptions({tap:!0,tapTolerance:15});var Pn=ie.extend({addHooks:function(){zi(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Si(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(t.touches){if(Ri(t),this._fireClick=!0,1<t.touches.length)return this._fireClick=!1,void clearTimeout(this._holdTimeout);var i=t.touches[0],e=i.target;this._startPos=this._newPos=new k(i.clientX,i.clientY),e.tagName&&"a"===e.tagName.toLowerCase()&&ci(e,"leaflet-active"),this._holdTimeout=setTimeout(p(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",i))},this),1e3),this._simulateEvent("mousedown",i),zi(document,{touchmove:this._onMove,touchend:this._onUp},this)}},_onUp:function(t){var i,e;clearTimeout(this._holdTimeout),Si(document,{touchmove:this._onMove,touchend:this._onUp},this),this._fireClick&&t&&t.changedTouches&&((e=(i=t.changedTouches[0]).target)&&e.tagName&&"a"===e.tagName.toLowerCase()&&_i(e,"leaflet-active"),this._simulateEvent("mouseup",i),this._isTapValid()&&this._simulateEvent("click",i))},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(t){var i=t.touches[0];this._newPos=new k(i.clientX,i.clientY),this._simulateEvent("mousemove",i)},_simulateEvent:function(t,i){var e=document.createEvent("MouseEvents");e._simulated=!0,i.target._simulatedClick=!0,e.initMouseEvent(t,!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),i.target.dispatchEvent(e)}});!bt||Lt&&!ct||Ki.addInitHook("addHandler","tap",Pn),Ki.mergeOptions({touchZoom:bt&&!st,bounceAtZoomLimits:!0});var Ln=ie.extend({addHooks:function(){ci(this._map._container,"leaflet-touch-zoom"),zi(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){_i(this._map._container,"leaflet-touch-zoom"),Si(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var i,e,n=this._map;!t.touches||2!==t.touches.length||n._animatingZoom||this._zooming||(i=n.mouseEventToContainerPoint(t.touches[0]),e=n.mouseEventToContainerPoint(t.touches[1]),this._centerPoint=n.getSize()._divideBy(2),this._startLatLng=n.containerPointToLatLng(this._centerPoint),"center"!==n.options.touchZoom&&(this._pinchStartLatLng=n.containerPointToLatLng(i.add(e)._divideBy(2))),this._startDist=i.distanceTo(e),this._startZoom=n.getZoom(),this._moved=!1,this._zooming=!0,n._stop(),zi(document,"touchmove",this._onTouchMove,this),zi(document,"touchend",this._onTouchEnd,this),Ri(t))},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var i=this._map,e=i.mouseEventToContainerPoint(t.touches[0]),n=i.mouseEventToContainerPoint(t.touches[1]),o=e.distanceTo(n)/this._startDist;if(this._zoom=i.getScaleZoom(o,this._startZoom),!i.options.bounceAtZoomLimits&&(this._zoom<i.getMinZoom()&&o<1||this._zoom>i.getMaxZoom()&&1<o)&&(this._zoom=i._limitZoom(this._zoom)),"center"===i.options.touchZoom){if(this._center=this._startLatLng,1==o)return}else{var s=e._add(n)._divideBy(2)._subtract(this._centerPoint);if(1==o&&0===s.x&&0===s.y)return;this._center=i.unproject(i.project(this._pinchStartLatLng,this._zoom).subtract(s),this._zoom)}this._moved||(i._moveStart(!0,!1),this._moved=!0),z(this._animRequest);var r=p(i._move,i,this._center,this._zoom,{pinch:!0,round:!1});this._animRequest=M(r,this,!0),Ri(t)}},_onTouchEnd:function(){this._moved&&this._zooming?(this._zooming=!1,z(this._animRequest),Si(document,"touchmove",this._onTouchMove,this),Si(document,"touchend",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))):this._zooming=!1}});Ki.addInitHook("addHandler","touchZoom",Ln),Ki.BoxZoom=gn,Ki.DoubleClickZoom=vn,Ki.Drag=yn,Ki.Keyboard=xn,Ki.ScrollWheelZoom=wn,Ki.Tap=Pn,Ki.TouchZoom=Ln,t.version="1.7.1",t.Control=Xi,t.control=Yi,t.Browser=Bt,t.Evented=E,t.Mixin=ne,t.Util=C,t.Class=S,t.Handler=ie,t.extend=h,t.bind=p,t.stamp=m,t.setOptions=c,t.DomEvent=qi,t.DomUtil=Mi,t.PosAnimation=Gi,t.Draggable=ae,t.LineUtil=fe,t.PolyUtil=ye,t.Point=k,t.point=A,t.Bounds=I,t.bounds=O,t.Transformation=q,t.transformation=G,t.Projection=Pe,t.LatLng=D,t.latLng=j,t.LatLngBounds=R,t.latLngBounds=N,t.CRS=H,t.GeoJSON=Ne,t.geoJSON=Ke,t.geoJson=Ye,t.Layer=Me,t.LayerGroup=ze,t.layerGroup=function(t,i){return new ze(t,i)},t.FeatureGroup=Ce,t.featureGroup=function(t,i){return new Ce(t,i)},t.ImageOverlay=Xe,t.imageOverlay=function(t,i,e){return new Xe(t,i,e)},t.VideoOverlay=Je,t.videoOverlay=function(t,i,e){return new Je(t,i,e)},t.SVGOverlay=$e,t.svgOverlay=function(t,i,e){return new $e(t,i,e)},t.DivOverlay=Qe,t.Popup=tn,t.popup=function(t,i){return new tn(t,i)},t.Tooltip=en,t.tooltip=function(t,i){return new en(t,i)},t.Icon=Se,t.icon=function(t){return new Se(t)},t.DivIcon=nn,t.divIcon=function(t){return new nn(t)},t.Marker=ke,t.marker=function(t,i){return new ke(t,i)},t.TileLayer=sn,t.tileLayer=rn,t.GridLayer=on,t.gridLayer=function(t){return new on(t)},t.SVG=pn,t.svg=mn,t.Renderer=hn,t.Canvas=un,t.canvas=ln,t.Path=Be,t.CircleMarker=Ae,t.circleMarker=function(t,i){return new Ae(t,i)},t.Circle=Ie,t.circle=function(t,i,e){return new Ie(t,i,e)},t.Polyline=Oe,t.polyline=function(t,i){return new Oe(t,i)},t.Polygon=Re,t.polygon=function(t,i){return new Re(t,i)},t.Rectangle=fn,t.rectangle=function(t,i){return new fn(t,i)},t.Map=Ki,t.map=function(t,i){return new Ki(t,i)};var bn=window.L;t.noConflict=function(){return window.L=bn,this},window.L=t});
//leaflet.js.map
  }).apply ({});
  var L = console.pcMaps.L = window.L;
  L.noConflict ();
  (function () {
    (function() {

'use strict';

var isRingBbox = function (ring, bbox) {
    if (ring.length !== 4) {
        return false;
    }

    var p, sumX = 0, sumY = 0;

    for (p = 0; p < 4; p++) {
        if ((ring[p].x !== bbox.min.x && ring[p].x !== bbox.max.x) ||
            (ring[p].y !== bbox.min.y && ring[p].y !== bbox.max.y)) {
            return false;
        }

        sumX += ring[p].x;
        sumY += ring[p].y;
        
        //bins[Number(ring[p].x === bbox.min.x) + 2 * Number(ring[p].y === bbox.min.y)] = 1;
    }

    //check that we have all 4 vertex of bbox in our geometry
    return sumX === 2*(bbox.min.x + bbox.max.x) && sumY === 2*(bbox.min.y + bbox.max.y);
};

var ExtendMethods = {
    _toMercGeometry: function(b, isGeoJSON) {
        var res = [];
        var c, r, p,
            mercComponent,
            mercRing,
            coords;

        if (!isGeoJSON) {
            if (!(b[0] instanceof Array)) {
                b = [[b]];
            } else if (!(b[0][0] instanceof Array)) {
                b = [b];
            }
        }

        for (c = 0; c < b.length; c++) {
            mercComponent = [];
            for (r = 0; r < b[c].length; r++) {
                mercRing = [];
                for (p = 0; p < b[c][r].length; p++) {
                    coords = isGeoJSON ? L.latLng(b[c][r][p][1], b[c][r][p][0]) : b[c][r][p];
                    mercRing.push(this._map.project(coords, 0));
                }
                mercComponent.push(mercRing);
            }
            res.push(mercComponent);
        }
        
        return res;
    },
    
    //lazy calculation of layer's boundary in map's projection. Bounding box is also calculated
    _getOriginalMercBoundary: function () {
        if (this._mercBoundary) {
            return this._mercBoundary;
        }

        var compomentBbox, c;
            
        if (L.Util.isArray(this.options.boundary)) { //Depricated: just array of coordinates
            this._mercBoundary = this._toMercGeometry(this.options.boundary);
        } else { //GeoJSON
            this._mercBoundary = [];
            var processGeoJSONObject = function(obj) {
                if (obj.type === 'GeometryCollection') {
                    obj.geometries.forEach(processGeoJSONObject);
                } else if (obj.type === 'Feature') {
                    processGeoJSONObject(obj.geometry);
                } else if (obj.type === 'FeatureCollection') {
                    obj.features.forEach(processGeoJSONObject);
                } else if (obj.type === 'Polygon') {
                    this._mercBoundary = this._mercBoundary.concat(this._toMercGeometry([obj.coordinates], true));
                } else if (obj.type === 'MultiPolygon') {
                    this._mercBoundary = this._mercBoundary.concat(this._toMercGeometry(obj.coordinates, true));
                }
            }.bind(this);
            processGeoJSONObject(this.options.boundary);
        }
        
        this._mercBbox = new L.Bounds();
        for (c = 0; c < this._mercBoundary.length; c++) {
            compomentBbox = new L.Bounds(this._mercBoundary[c][0]);
            this._mercBbox.extend(compomentBbox.min);
            this._mercBbox.extend(compomentBbox.max);
        }

        return this._mercBoundary;
    },

    _getClippedGeometry: function(geom, bounds) {
        var clippedGeom = [],
            clippedComponent,
            clippedExternalRing,
            clippedHoleRing,
            iC, iR;
            
        for (iC = 0; iC < geom.length; iC++) {
            clippedComponent = [];
            clippedExternalRing = L.PolyUtil.clipPolygon(geom[iC][0], bounds);
            if (clippedExternalRing.length === 0) {
                continue;
            }

            clippedComponent.push(clippedExternalRing);

            for (iR = 1; iR < geom[iC].length; iR++) {
                clippedHoleRing = L.PolyUtil.clipPolygon(geom[iC][iR], bounds);
                if (clippedHoleRing.length > 0) {
                    clippedComponent.push(clippedHoleRing);
                }
            }
            clippedGeom.push(clippedComponent);
        }
        
        if (clippedGeom.length === 0) { //we are outside of all multipolygon components
            return {isOut: true};
        }

        for (iC = 0; iC < clippedGeom.length; iC++) {
            if (isRingBbox(clippedGeom[iC][0], bounds)) {
                //inside exterior rings and no holes
                if (clippedGeom[iC].length === 1) {
                    return {isIn: true};
                }
            } else { //intersects exterior ring
                return {geometry: clippedGeom};
            }

            for (iR = 1; iR < clippedGeom[iC].length; iR++) {
                //inside exterior ring, but have intersection with a hole
                if (!isRingBbox(clippedGeom[iC][iR], bounds)) {
                    return {geometry: clippedGeom};
                }
            }
        }

        //we are inside all holes in geometry
        return {isOut: true};
    },

    // Calculates intersection of original boundary geometry and tile boundary.
    // Uses quadtree as cache to speed-up intersection.
    // Return 
    //   {isOut: true} if no intersection,  
    //   {isIn: true} if tile is fully inside layer's boundary
    //   {geometry: <LatLng[][][]>} otherwise
    _getTileGeometry: function (x, y, z, skipIntersectionCheck) {
        if ( !this.options.boundary) {
            return {isIn: true};
        }
    
        var cacheID = x + ":" + y + ":" + z,
            zCoeff = Math.pow(2, z),
            parentState,
            cache = this._boundaryCache;

        if (cache[cacheID]) {
            return cache[cacheID];
        }

        var mercBoundary = this._getOriginalMercBoundary(),
            ts = this.options.tileSize,
            tileBbox = new L.Bounds(new L.Point(x * ts / zCoeff, y * ts / zCoeff), new L.Point((x + 1) * ts / zCoeff, (y + 1) * ts / zCoeff));

        //fast check intersection
        if (!skipIntersectionCheck && !tileBbox.intersects(this._mercBbox)) {
            return {isOut: true};
        }

        if (z === 0) {
            cache[cacheID] = {geometry: mercBoundary};
            return cache[cacheID];
        }

        parentState = this._getTileGeometry(Math.floor(x / 2), Math.floor(y / 2), z - 1, true);

        if (parentState.isOut || parentState.isIn) {
            return parentState;
        }
        
        cache[cacheID] = this._getClippedGeometry(parentState.geometry, tileBbox);
        return cache[cacheID];
    },

    _drawTileInternal: function (canvas, tilePoint, url, callback) {
        var zoom = this._getZoomForUrl(),
            state = this._getTileGeometry(tilePoint.x, tilePoint.y, zoom);

        if (state.isOut) {
            callback();
            return;
        }

        var ts = this.options.tileSize,
            tileX = ts * tilePoint.x,
            tileY = ts * tilePoint.y,
            zCoeff = Math.pow(2, zoom),
            ctx = canvas.getContext('2d'),
            imageObj = new Image(),
            _this = this;
            
        var setPattern = function () {
            var c, r, p,
                pattern,
                geom;

            if (!state.isIn) {
                geom = state.geometry;
                ctx.beginPath();

                for (c = 0; c < geom.length; c++) {
                    for (r = 0; r < geom[c].length; r++) {
                        if (geom[c][r].length === 0) {
                            continue;
                        }

                        ctx.moveTo(geom[c][r][0].x * zCoeff - tileX, geom[c][r][0].y * zCoeff - tileY);
                        for (p = 1; p < geom[c][r].length; p++) {
                            ctx.lineTo(geom[c][r][p].x * zCoeff - tileX, geom[c][r][p].y * zCoeff - tileY);
                        }
                    }
                }
                ctx.clip();
            }

            pattern = ctx.createPattern(imageObj, "repeat");
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = pattern;
            ctx.fill();
            callback();
        };
        
        if (this.options.crossOrigin) {
            imageObj.crossOrigin = '';
        }
        
        imageObj.onload = function () {
            //TODO: implement correct image loading cancelation
            canvas.complete = true; //HACK: emulate HTMLImageElement property to make happy L.TileLayer
            setTimeout(setPattern, 0); //IE9 bug - black tiles appear randomly if call setPattern() without timeout
        }
        
        imageObj.src = url;
    },
    
    onAdd: function(map) {
        (L.TileLayer.Canvas || L.TileLayer).prototype.onAdd.call(this, map);
        
        if (this.options.trackAttribution) {
            map.on('moveend', this._updateAttribution, this);
            this._updateAttribution();
        }
    },
    
    onRemove: function(map) {
        (L.TileLayer.Canvas || L.TileLayer).prototype.onRemove.call(this, map);
        
        if (this.options.trackAttribution) {
            map.off('moveend', this._updateAttribution, this);
            if (!this._attributionRemoved) {
                var attribution = L.TileLayer.BoundaryCanvas.prototype.getAttribution.call(this);
                map.attributionControl.removeAttribution(attribution);
            }
        }
    },
    
    _updateAttribution: function() {
        var geom = this._getOriginalMercBoundary(),
            mapBounds = this._map.getBounds(),
            mercBounds = L.bounds(this._map.project(mapBounds.getSouthWest(), 0), this._map.project(mapBounds.getNorthEast(), 0)),
            state = this._getClippedGeometry(geom, mercBounds);
        
        if (this._attributionRemoved !== !!state.isOut) {
            var attribution = L.TileLayer.BoundaryCanvas.prototype.getAttribution.call(this);
            this._map.attributionControl[state.isOut ? 'removeAttribution' : 'addAttribution'](attribution);
            this._attributionRemoved = !!state.isOut;
        }
    }
};

if (L.version >= '0.8') {
    L.TileLayer.BoundaryCanvas = L.TileLayer.extend({
        options: {
            // all rings of boundary should be without self-intersections or intersections with other rings
            // zero-winding fill algorithm is used in canvas, so holes should have opposite direction to exterior ring
            // boundary can be
            // LatLng[] - simple polygon
            // LatLng[][] - polygon with holes
            // LatLng[][][] - multipolygon
            boundary: null
        },
        includes: ExtendMethods,
        initialize: function(url, options) {
            L.TileLayer.prototype.initialize.call(this, url, options);
            this._boundaryCache = {}; //cache index "x:y:z"
            this._mercBoundary = null;
            this._mercBbox = null;
            
            if (this.options.trackAttribution) {
                this._attributionRemoved = true;
                this.getAttribution = null;
            }
        },
        createTile: function(coords, done){
            var tile = document.createElement('canvas'),
                url = this.getTileUrl(coords);
            tile.width = tile.height = this.options.tileSize;
            this._drawTileInternal(tile, coords, url, L.bind(done, null, null, tile));

            return tile;
        }
    })
} else {
    L.TileLayer.BoundaryCanvas = L.TileLayer.Canvas.extend({
        options: {
            // all rings of boundary should be without self-intersections or intersections with other rings
            // zero-winding fill algorithm is used in canvas, so holes should have opposite direction to exterior ring
            // boundary can be
            // LatLng[] - simple polygon
            // LatLng[][] - polygon with holes
            // LatLng[][][] - multipolygon
            boundary: null
        },
        includes: ExtendMethods,
        initialize: function (url, options) {
            L.Util.setOptions(this, options);
            L.Util.setOptions(this, {async: true}); //image loading is always async
            this._url = url;
            this._boundaryCache = {}; //cache index "x:y:z"
            this._mercBoundary = null;
            this._mercBbox = null;
            
            if (this.options.trackAttribution) {
                this._attributionRemoved = true;
                this.getAttribution = null;
            }
        },
        
        drawTile: function(canvas, tilePoint) {
            var adjustedTilePoint = L.extend({}, tilePoint),
                url;

            this._adjustTilePoint(adjustedTilePoint);
            url = this.getTileUrl(adjustedTilePoint);
            this._drawTileInternal(canvas, tilePoint, url, L.bind(this.tileDrawn, this, canvas));

            //Leaflet v0.7.x bugfix (L.Tile.Canvas doesn't support maxNativeZoom option)
            if (this._getTileSize() !== this.options.tileSize) {
                canvas.style.width = canvas.style.height = this._getTileSize() + 'px';
            }
        }
    });
}

L.TileLayer.boundaryCanvas = function (url, options) {
    return new L.TileLayer.BoundaryCanvas(url, options);
};

L.TileLayer.BoundaryCanvas.createFromLayer = function (layer, options) {
    return new L.TileLayer.BoundaryCanvas(layer._url, L.extend({}, layer.options, options));
};

})();

  }).apply ({});

  var define = function (def) {
    var e = document.createElementNS ('data:,pc', 'element');
    e.pcDef = def;
    document.head.appendChild (e);
  }; // define
  
  var noImageURL = 'https://rawgit.com/wakaba/html-page-components/master/css/noimage.svg';
  // Credit required by GSI.
  var gsiCreditHTML = "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank' lang=ja>\u56FD\u571F\u5730\u7406\u9662</a>";
  var gsiPhotoCreditHTML = "<details is=pc-map-credit-details><summary lang=ja>\u56FD\u571F\u5730\u7406\u9662\u4ED6</summary><p>"+gsiCreditHTML+"<p lang=ja>\u30C7\u30FC\u30BF\u30BD\u30FC\u30B9\uFF1ALandsat8\u753B\u50CF\uFF08GSI,TSIC,GEO Grid/AIST\uFF09, Landsat8\u753B\u50CF\uFF08courtesy of the U.S. Geological Survey\uFF09, \u6D77\u5E95\u5730\u5F62\uFF08GEBCO\uFF09<p lang=en>Images on \u4E16\u754C\u885B\u661F\u30E2\u30B6\u30A4\u30AF\u753B\u50CF obtained from site <a href=https://lpdaac.usgs.gov/data_access target=_blank>https://lpdaac.usgs.gov/data_access</a> maintained by the NASA Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and Science (EROS) Center, Sioux Falls, South Dakota, (Year). Source of image data product.</details>";
  // <https://operations.osmfoundation.org/policies/tiles/>
  let osmCreditHTML = '<a href=https://www.openstreetmap.org/copyright lang=en>OpenStreetMap</a> (<a href=https://www.openstreetmap.org/fixthemap title="Fix problems" lang=en>Fix</a>)';
  
  let JPBoundary = [
    {"lat":35.262290171262606,"lon":129.52549541458012},
    {"lat":33.63563443112933,"lon":128.11152711598143},
    {"lat":27.350347623784252,"lon":122.69130149811586},
    {"lat":22.818018713458926,"lon":122.42140894091759},
    {"lat":21.46928247377045,"lon":125.74416177967775},
    {"lat":22.451602587213536,"lon":127.43306430310153},
    {"lat":19.910331362180518,"lon":132.72485690436136},
    {"lat":17.550912179219264,"lon":133.21061202970304},
    {"lat":16.53723722190111,"lon":138.13503721601717},
    {"lat":20.22565975490805,"lon":140.48645650704304},
    {"lat":24.577877843701554,"lon":146.08591144544644},
    {"lat":18.180686409947512,"lon":155.28310995076697},
    {"lat":23.502592722918372,"lon":160.08685089215786},
    {"lat":49.547861062839964,"lon":159.3554522102241},
    {"lat":56.39427546745975,"lon":144.1097173256088},
    {"lat":54.936641506776475,"lon":141.51017029606572},
    {"lat":52.18604106241055,"lon":141.58175707690273},
    {"lat":49.968503479436386,"lon":141.37523485646417},
    {"lat":45.97493268294697,"lon":140.02162914620013},
    {"lat":40.57302091108701,"lon":135.0996451677164},
    {"lat":39.391052033518854,"lon":131.81659632507836},
    {"lat":35.721172006694296,"lon":130.9465206056198},
    {"lat":35.262290171262606,"lon":129.52549541458012},
  ];
  let JPGSIMapBoundary = [
    {"lat":35.262290171262606,"lon":129.52549541458012},
    {"lat":33.63563443112933,"lon":128.11152711598143},
    {"lat":27.350347623784252,"lon":122.69130149811586},
    {"lat":22.818018713458926,"lon":122.42140894091759},
    {"lat":21.46928247377045,"lon":125.74416177967775},
    {"lat":22.451602587213536,"lon":127.43306430310153},
    {"lat":19.910331362180518,"lon":132.72485690436136},
    {"lat":17.550912179219264,"lon":133.21061202970304},
    {"lat":16.53723722190111,"lon":138.13503721601717},
    {"lat":20.22565975490805,"lon":140.48645650704304},
    {"lat":24.577877843701554,"lon":146.08591144544644},
    {"lat":18.180686409947512,"lon":155.28310995076697},
    {"lat":46.7195903678211,"lon":148.71198705249572},
    {"lat":45.31730227791727,"lon":145.14328950844268},
    {"lat":45.97493268294697,"lon":140.02162914620013},
    {"lat":40.57302091108701,"lon":135.0996451677164},
    {"lat":39.391052033518854,"lon":131.81659632507836},
    {"lat":35.721172006694296,"lon":130.9465206056198},
    {"lat":35.262290171262606,"lon":129.52549541458012},
  ];

  var ColorOpacities = console.pcMaps.ColorOpacities = {
    '0,0,0': 1,
    '30,30,30': 1,
    '50,50,50': 1,
    '80,80,80': 1,
    '100,100,100': 1,
    '200,200,200': 0.05,
    '213,213,213': 0.02,
    '233,233,233': 0,
    '255,255,255': 0,
    '0,90,60': 1,
    '94,189,108': 0.4,
    '190,210,255': 0.1,
    '105,150,255': 0.2,
    '20,90,255': 0.2,
    '96,25,133': 1,
    '253,134,75': 0.2,
    '199,136,137': 0.4,
    '219,199,149': 0.001,
    '203,165,72': 0.001,
    '216,194,137': 0.001,
    '251,221,206': 0.001,
    '255,255,230': 0,
    '255,255,0': 0.4,
    '255,230,190': 0.4,
  }; // ColorOpacities
  var PaletteColors = Object.keys (ColorOpacities).map (_ => _.split (/,/));
  
  console.pcMaps.printPaletteColors = () => {
    var l = document.createElement ('ul');
    PaletteColors.forEach (pRGB => {
      var li = document.createElement ('li');
      var c = document.createElement ('span');
      c.textContent = c.style.background = 'rgb(' + pRGB + ')';
      li.appendChild (c);
      li.appendChild (document.createTextNode (' : '));
      var op = document.createElement ('span');
      op.style.background = 'rgb(' + pRGB + ')';
      op.textContent = op.style.opacity = ColorOpacities[pRGB];
      li.appendChild (op);
      l.appendChild (li);
    });
    document.body.appendChild (l);
    l.scrollIntoView ();
  }; // console.pcMaps.printPaletteColors

  function ddRGB ([r1, g1, b1], [r2, g2, b2]) {
    var r = r1-r2;
    var g = g1-g2;
    var b = b1-b2;
    return r*r*3 + g*g*5 + b*b;
  } // ddRGB
  
  function computeColorOpacities (colors) {
    Object.keys (colors).map (key => {
      var rgb = colors[key];

      var minRGB = null;
      var minDD = Infinity;
      PaletteColors.forEach (pRGB => {
        var dd = ddRGB (pRGB, rgb);
        if (dd < minDD) {
          minDD = dd;
          minRGB = pRGB;
        }
      });
      
      ColorOpacities[rgb] = ColorOpacities[minRGB];
    }); // colors
  } // computeColorOpacities

  L.GridLayer.TileImages = L.GridLayer.extend ({
    createTile: function (coords, done) {
      var img = document.createElement ('img');
      var tileSize = this.getTileSize ();
      img.width = tileSize.x;
      img.height = tileSize.y;

      var u;
      var srcs = this.options.srcs;
      for (var i = 0; i < srcs.length; i++) {
        var src = srcs[i];
        if (src.minZoom <= coords.z && coords.z <= src.maxZoom) {
          u = src.url;
          break;
        }
      }
      
      new Promise ((ok, ng) => {
        img.src = u.replace (/\{x\}/, coords.x)
                   .replace (/\{y\}/, coords.y)
                   .replace (/\{z\}/, coords.z);
        img.onload = ok;
        img.onerror = ng
      }).then (() => {
        done (null, img);
      }, err => {
        img.src = this.options.errorTileUrl;
      });

      return img;
    }, // createTile
  }); // L.GridLayer.TileImages
  L.gridLayer.tileImages = function (opts) {
    return new L.GridLayer.TileImages (opts);
  };

  L.GridLayer.GSIOverlay = L.GridLayer.extend ({
    createTile: function (coords, done) {
      var canvas = document.createElement ('canvas');
      var tileSize = this.getTileSize ();
      canvas.width = tileSize.x;
      canvas.height = tileSize.y;
      var ctx = canvas.getContext ('2d');
      
      var img = document.createElement ('img');
      new Promise ((ok, ng) => {
        img.setAttribute ('crossorigin', '');
        var u = 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png';
        img.src = u.replace (/\{x\}/, coords.x)
                   .replace (/\{y\}/, coords.y)
                   .replace (/\{z\}/, coords.z);
        img.onload = ok;
        img.onerror = ng
      }).then (() => {
        ctx.drawImage (img, 0, 0, img.naturalWidth, img.naturalHeight);

        var id = ctx.getImageData (0, 0, canvas.width, canvas.height);
        var colors = {}; // {(r,g,b): (# of pixels), ...}
        for (var i = 0; i < id.data.byteLength; i+=4) {
          var rgb = [id.data[i], id.data[i+1], id.data[i+2]];
          if (ColorOpacities[rgb] === undefined) colors[rgb] = rgb;
        }
        computeColorOpacities (colors);
        for (var i = 0; i < id.data.byteLength; i+=4) {
          var rgb = [id.data[i], id.data[i+1], id.data[i+2]];
          id.data[i+3] = 0xFF * ColorOpacities[rgb];
        }
        ctx.putImageData (id, 0, 0);
        
        done (null, canvas);
      }, err => { // err is img.onerror's error
        if (!this.options.errorTileUrl) throw err;
        
        var img = document.createElement ('img');
        return new Promise ((ok, ng) => {
          img.setAttribute ('crossorigin', '');
          img.src = this.options.errorTileUrl;
          img.onload = ok;
          img.onerror = ng
        }).then (() => {
          ctx.drawImage (img, 0, 0, canvas.width, canvas.height);
        });
      });

      return canvas;
    }, // createTile
  }); // L.GridLayer.GSIOverlay
  L.gridLayer.gsiOverlay = function (opts) {
    return new L.GridLayer.GSIOverlay (opts);
  };
  
  L.Control.ElementControl = L.Control.extend ({
    onAdd: function (map) {
      var e = this.options.element;
      e.pcMap = map;
      if (this.options.isLegend) e.classList.toggle ('paco-legend-control', true);
      if (this.options.styling) this.options.styling (e);
      L.DomEvent.disableClickPropagation (e);
      return e;
    }, // onAdd
  });
  L.control.elementControl = function (opts) {
    return new L.Control.ElementControl (opts);
  };
  L.control.fullscreenButton = function (opts) {
    var c = document.createElement ('div');
    c.className = 'paco-button-container';
    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-fullscreen-title'), 'Fullscreen');
      c.title = m;
    };
    
    var b = document.createElement ('button');
    b.className = 'paco-control-button paco-fullscreen-control-button';
    b.type = 'button';
    b.textContent = '\u26F6';
    b.onclick = async () => {
      var e = c.pcMap.getContainer ();
      if (document.fullscreenElement) {
        document.exitFullscreen ();
      } else {
        e.requestFullscreen ();
      }
    };
    c.appendChild (b);
    
    return new L.Control.ElementControl (opts);
  }; // L.control.fullscreenButton
  L.control.currentPositionButton = function (opts) {
    var c = document.createElement ('div');
    c.className = 'paco-button-container';
    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-currentposition-title'), 'Current position');
      c.title = m;
    };
    
    var b = document.createElement ('button');
    b.className = 'paco-control-button paco-currentposition-control-button';
    b.type = 'button';
    b.textContent = '\u26EF';
    b.onclick = async () => {
      var e = c.pcMap.getContainer ();
      e.pcLocateCurrentPosition ({pan: true});
    };
    c.appendChild (b);
    
    return new L.Control.ElementControl (opts);
  }; // L.control.currentPositionButton
  L.control.streetViewButton = function (opts) {
    var c = document.createElement ('div');
    c.className = 'paco-button-container';
    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      // recompute!
      var m = e.pcInternal.parseCSSString (getComputedStyle (e).getPropertyValue ('--paco-streetview-title'), 'Street View');
      c.title = m;
    };

    var b = document.createElement ('button');
    b.className = 'paco-control-button paco-streetview-control-button';
    b.type = 'button';
    b.textContent = '\u{1F6B6}';
    b.setAttribute ('draggable', 'true');
    b.ondragstart = () => {
      var e = c.pcMap.getContainer ();
      e.pcStartStreetViewDragMode (b);
    };
    c.appendChild (b);
    
    return new L.Control.ElementControl (opts);
  }; // L.control.streetViewButton
  L.control.mapTypeMenu = function (opts) {
    var c = document.createElement ('span');
    c.className = 'paco-menu-container';
    
    var m = document.createElement ('popup-menu');
    m.className = 'paco-map-type-menu';
    m.setAttribute ('menucontainer', 'map-area');
    m.innerHTML = '<button type=button class="paco-control-button paco-maptype-control-button">\u{1F5FA}</button><menu-main><menu-item><a data-href-template="https://www.google.com/maps?ll={lat},{lon}&z={zoomLevel}" target=_blank rel=noreferrer>Google Maps</a></menu-item><menu-item><a data-href-template="https://www.openstreetmap.org/?mlat={lat}&mlon={lon}&zoom={zoomLevel}" target=_blank rel=noreferrer>OpenStreetMap</a></menu-item><menu-item><a data-href-template="https://geohack.toolforge.org/geohack.php?params={lat};{lon}" target=_blank rel=noreferrer>Others...</a></menu-item><menu-item><a data-href-template="geo:{lat},{lon}" is=copy-url>Copy</a></menu-item></menu-main>';
    m.addEventListener ('toggle', ev => {
      if (m.hasAttribute ('open')) {
        var e = c.pcMap.getContainer ();
        e.pcInternal.$fill (c, {
          lat: e.maCenter.lat,
          lon: e.maCenter.lon,
          zoomLevel: e.pcZoomLevel,
        });
      }
    });
    m.addEventListener ('dblclick', ev => ev.stopPropagation ());
    c.appendChild (m);

    opts.element = c;
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      var m = c.querySelector ('popup-menu.paco-map-type-menu');
      
      // recompute!
      var s = getComputedStyle (e);
      m.firstChild.title = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-title'), 'Map type');
      var mi = m.querySelectorAll ('a');
      mi[0].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-googlemaps-text'), 'Open in Google Maps');
      mi[1].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-openstreetmap-text'), 'Open in OpenStreetMap');
      mi[2].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-open-geohack-text'), 'Open in others...');
      mi[3].textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-copy-center-text'), 'Copy center coordinates');

      if (e.hasAttribute ('jma')) {
        var mm = m.querySelector ('menu-main');
        var nodes = document.createElement ('div');
        nodes.innerHTML = '<menu-item><label><input type=checkbox value=rain> <span data-x=jmanowc-current-text>Rain</span></label></menu-item><menu-item><popup-menu class=paco-jma-weather-submenu><button type=button class=paco-control-button><span data-x=menu-meteorological>Meteorological</span></button><menu-main><menu-item><label><input type=checkbox value=thns> <span data-x=jmanowc-thns-current-text>Thunder</span></label></menu-item><menu-item><label><input type=checkbox value=trns> <span data-x=jmanowc-trns-current-text>Tornado</span></label></menu-item><menu-item><label><input type=checkbox value=temp> <span data-x=jma-amedas-temp-text>Temperature</span></label></menu-item><menu-item><label><input type=checkbox value=wind> <span data-x=jma-amedas-wind-text>Wind</span></label></menu-item><menu-item><label><input type=checkbox value=precipitation10m> <span data-x=jma-amedas-precipitation10m-text>Precipitation 10m</span></label></menu-item><menu-item><label><input type=checkbox value=precipitation1h> <span data-x=jma-amedas-precipitation1h-text>Precipitation 1h</span></label></menu-item><menu-item><label><input type=checkbox value=precipitation3h> <span data-x=jma-amedas-precipitation3h-text>Precipitation 3h</span></label></menu-item><menu-item><label><input type=checkbox value=precipitation24h> <span data-x=jma-amedas-precipitation24h-text>Precipitation 24h</span></label></menu-item><menu-item><label><input type=checkbox value=snow> <span data-x=jma-amedas-snow-text>Snow</span></label></menu-item><menu-item><label><input type=checkbox value=snow6h> <span data-x=jma-amedas-snow6h-text>Snow 6h</span></label></menu-item><menu-item><label><input type=checkbox value=snow12h> <span data-x=jma-amedas-snow12h-text>Snow 12h</span></label></menu-item><menu-item><label><input type=checkbox value=snow24h> <span data-x=jma-amedas-snow24h-text>Snow 24h</span></label></menu-item><menu-item><label><input type=checkbox value=humidity> <span data-x=jma-amedas-humidity-text>Humidity</span></label></menu-item><menu-item><label><input type=checkbox value=sun1h> <span data-x=jma-amedas-sun1h-text>Sun 1h</span></label></menu-item></menu-main></popup-menu></menu-item><hr>';
        nodes.querySelectorAll ('input').forEach (i => {
          i.onchange = (ev) => e.toggleJMANowc (i.checked, i.value);
        });
        nodes.querySelectorAll ('span[data-x]').forEach (x => {
          x.textContent = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-' + x.getAttribute ('data-x')), x.textContent);
        });
        Array.prototype.slice.call (nodes.childNodes).reverse ().forEach (_ => mm.insertBefore (_, mm.firstChild));
      } // jma=""

      if (e.hasAttribute ('gsi')) {
        var mm = m.querySelector ('menu-main');
        var nodes = document.createElement ('div');
        nodes.innerHTML = '<menu-item><popup-menu data-true=gsi-standard-hillshade data-false=gsi-lang><button type=button class=paco-control-button>Map</button><menu-main class=paco-map-menu-main><menu-item><label><input type=checkbox> <span>Hillshade</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><popup-menu data-true=gsi-photo-standard data-false=gsi-photo data-label=photo><button type=button class=paco-control-button>Photo</button><menu-main class=paco-photo-menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><popup-menu data-true=gsi-hillshade-standard data-false=gsi-hillshade><button type=button class=paco-control-button>Hillshade</button><menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu></menu-item><menu-item><button type=button class=paco-maptype-button data-true=none>None</button></menu-item><hr>';
        let nb = nodes.querySelector ('menu-item:last-of-type button');
        let nps = [nodes.querySelector ('.paco-photo-menu-main')];
        let mps = [nodes.querySelector ('.paco-map-menu-main')];
        
        var pms = Array.prototype.slice.call (nodes.querySelectorAll ('popup-menu'));
        Array.prototype.slice.call (nodes.childNodes).reverse ().forEach (_ => mm.insertBefore (_, mm.firstChild));
        
        if (opts.buttons) {
          var n = document.createElement ('span');
          n.className = 'paco-menu-button-container';
          n.innerHTML = '<popup-menu data-true=gsi-standard-hillshade data-false=gsi-lang><button type=button class=paco-control-button>Map</button><menu-main class=paco-map-menu-main><menu-item><label><input type=checkbox> <span>Hillshade</span></label></menu-item></menu-main></popup-menu><popup-menu data-true=gsi-photo-standard data-false=gsi-photo data-label=photo><button type=button class=paco-control-button>Photo</button><menu-main class=paco-photo-menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu><popup-menu data-true=gsi-hillshade-standard data-false=gsi-hillshade><button type=button class=paco-control-button>Hillshade</button><menu-main><menu-item><label><input type=checkbox> <span>Labels</span></label></menu-item></menu-main></popup-menu>';
          pms = pms.concat (Array.prototype.slice.call (n.querySelectorAll ('popup-menu')));

          c.insertBefore (n, c.firstChild);
          m.firstChild.textContent = '\u22EF';
          nps.push (n.querySelector ('.paco-photo-menu-main'));
          mps.push (n.querySelector ('.paco-map-menu-main'));
        } // controls=typebuttons

        var sMap = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-map-text'), 'Map');
        var sMapLabel = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-maplabel-text'), 'Labels');
        var sHillshade = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-hillshade-text'), 'Hillshade');
        var sNone = e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-none-text'), 'None');
        var buttonLabels = {
          'gsi-lang': sMap,
          'photo': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-photo-text'), 'Photo'),
          'gsi-photo': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-gsi-photo-text'), 'Photo'),
          'gsi-hillshade': sHillshade,
          'gsi-standard-hillshade': sHillshade,
          'gsi-photo-standard': sMapLabel,
          'gsi-hillshade-standard': sMapLabel,
          'himawari:B13/TBB': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-ir-text'), 'Himawari (B13/TBB)'),
          'himawari:B03/ALBD': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-vis-text'), 'Himawari (B03/ALBD)'),
          'himawari:B08/TBB': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-vap-text'), 'Himawari (B08/TBB)'),
          'himawari:REP/ETC': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-color-text'), 'Himawari (REP/ETC)'),
          'himawari:SND/ETC': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-himawari-strengthen-text'), 'Himawari (SND/ETC)'),
          'osm': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-osm-text'), 'OpenStreetMap'),
          'gsi': e.pcInternal.parseCSSString (s.getPropertyValue ('--paco-maptype-gsi-text'), 'GSI Tile'),
        };

        if (e.hasAttribute ('jma')) {
          nps.forEach (p => {
            let m = document.createElement ('menu-item');
            p.appendChild (m);
            m.outerHTML = '<menu-item><button type=button data-false=gsi-photo data-true=gsi-photo-standard>Photo</button></menu-item><menu-item><button type=button data-false=himawari:B13/TBB data-true=himawari+gsi-standard:B13/TBB>Himawari (B13/TBB)</button></menu-item><menu-item><button type=button data-false=himawari:B03/ALBD data-true=himawari+gsi-standard:B03/ALBD>Himawari (B03/ALBD)</button></menu-item><menu-item><button type=button data-false=himawari:B08/TBB data-true=himawari+gsi-standard:B08/TBB>Himawari (B08/TBB)</button></menu-item><menu-item><button type=button data-false=himawari:REP/ETC data-true=himawari+gsi-standard:REP/ETC>Himawari (REP/ETC)</button></menu-item><menu-item><button type=button data-false=himawari:SND/ETC data-true=himawari+gsi-standard:SND/ETC>Himawari (SND/ETC)</button></menu-item>';
          });
        }

        if (e.hasAttribute ('osm')) {
          mps.forEach (p => {
            let m = document.createElement ('menu-item');
            p.appendChild (m);
            m.outerHTML = '<menu-item><button type=button data-true=gsi-standard-hillshade data-false=gsi-lang data-label=gsi></button></menu-item><menu-item><button type=button data-true=osm-gsi-hillshade data-false=osm data-label=osm></button></menu-item>';
          });
        }
        
        pms.forEach (pm => {
          let buttons = pm.querySelectorAll ('button');
          buttons.forEach (button => {
            button.addEventListener ('click', function () {
              let checked = pm.querySelector ('input[type=checkbox]').checked;
              let newType = button.getAttribute ('data-' + checked) || pm.getAttribute ('data-' + checked);
              e.setMapType (newType);
            });
            button.textContent = buttonLabels[button.getAttribute ('data-label') || button.getAttribute ('data-false') || pm.getAttribute ('data-label') || pm.getAttribute ('data-false')];
          });
          pm.querySelector ('input[type=checkbox]').onclick = function () {
            let newType = (this.checked ? this.trueMapType : this.falseMapType) || pm.getAttribute ('data-' + this.checked);
            e.setMapType (newType);
          };
          pm.querySelector ('span').textContent = buttonLabels[pm.getAttribute ('data-true')];
        });

        nb.textContent = sNone;
        nb.onclick = () => {
          e.setMapType ('none');
        };
      } // gsi=""

      e.addEventListener ('pcMapTypeChange', () => {
        let mt = e.pcMapType;
        if (e.pcMapTypeParam1) mt += ":" + e.pcMapTypeParam1;
        c.querySelectorAll ('popup-menu[data-true], .paco-maptype-button[data-true]').forEach (pm => {
          let trueType = pm.getAttribute ('data-true');
          let falseType = pm.getAttribute ('data-false');
          let tt = mt === trueType;
          let ff = mt === falseType;
          let hasTrue = tt;
          pm.classList.toggle ('selected', tt || ff);
          pm.querySelectorAll ('button[data-true]').forEach (b => {
            let tType = b.getAttribute ('data-true');
            let fType = b.getAttribute ('data-false');
            let tt = mt === tType;
            let ff = mt === fType;
            b.classList.toggle ('selected', tt || ff);
            if (tt) hasTrue = true;
            if (tt || ff) {
              trueType = tType;
              falseType = fType;
            }
          });
          pm.querySelectorAll ('input[type=checkbox]').forEach (_ => {
            _.checked = hasTrue;
            _.trueMapType = trueType;
            _.falseMapType = falseType;
          });
        });
        e.pcInternal.$fill (c, {
          lat: e.maCenter.lat,
          lon: e.maCenter.lon,
          zoomLevel: e.pcZoomLevel,
        });
      });
    };

    return new L.Control.ElementControl (opts);
  }; // L.control.mapTypeMenu

  L.control.legendToggleButton = function (opts) {
    var c = document.createElement ('div');
    c.className = 'paco-button-container paco-legend-toggle-button-container';
    opts.element = c;
    
    var b = document.createElement ('button');
    b.className = 'paco-control-toggle-button paco-control-legend-toggle-button';
    b.type = 'button';
    c.appendChild (b);

    var active = true;
    var sync = () => {
      var e = c.pcMap.getContainer ();
      e.classList.toggle ('paco-legend-hidden', !active);

      b.classList.toggle ('active', active);
      if (active) {
        b.textContent = b.getAttribute ('data-hide-text');
      } else {
        b.textContent = b.getAttribute ('data-show-text');
      }
    }; // sync
    
    b.onclick = async () => {
      active = !active;
      sync ();
    };
    opts.styling = c => {
      var e = c.pcMap.getContainer ();
      var p = getComputedStyle (e);
      // recompute!
      var m1 = e.pcInternal.parseCSSString (p.getPropertyValue ('--paco-legend-show-text'), 'Show legend');
      var m2 = e.pcInternal.parseCSSString (p.getPropertyValue ('--paco-legend-hide-text'), 'Hide legend');
      var initial = (p.getPropertyValue ('--paco-map-legend-initial') || 'shown').replace (/^\s+/, '').replace (/\s+$/, '');

      if (initial === 'hidden') active = false;
      
      b.setAttribute ('data-show-text', m1);
      b.setAttribute ('data-hide-text', m2);
      sync ();
    };
    
    return new L.Control.ElementControl (opts);
  }; // L.control.legendToggleButton
  
  L.control.timestampControl = function (opts) {
    var t = document.createElement ('map-controls');
    t.className = 'paco-timestamp-control paco-jma-timestamp-control';
    let type = {
      nowc: '<a href=https://www.jma.go.jp/bosai/nowc/ target=_blank rel=noreferrer>\u30CA\u30A6\u30AD\u30E3\u30B9\u30C8</a>',
      umimesh: '<a href=https://www.jma.go.jp/bosai/umimesh/ target=_blank rel=noreferrer>\u6D77\u4E0A\u5206\u5E03\u4E88\u5831</a>',
      himawari: '<a href=https://www.jma.go.jp/bosai/map.html#contents=himawari target=_blank rel=noreferrer>\u6C17\u8C61\u885B\u661F\u3072\u307E\u308F\u308A</a>',
      amedas: '<a href=https://www.jma.go.jp/bosai/map.html#contents=amedas target=_blank rel=noreferrer>\u30A2\u30E1\u30C0\u30B9</a>',
    }[opts.type];
    t.innerHTML = '<a href=https://www.jma.go.jp/ target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>'+type+'\u7B49 <time data-format=abstime></time> <span class=paco-jma-timestamp-control-base><time data-format=monthdaytime></time>\u57FA\u6E96</span>';
    opts.element = t;
    opts.styling = b => {
      var e = b.pcMap.getContainer ();
      var time = b.querySelector ('time');
      var tzo = e.getAttribute ('tzoffset');
      if (tzo) time.setAttribute ('data-tzoffset', tzo);
    };
    {
      let tel = t.querySelector ('time');
      let bc = t.querySelector ('.paco-jma-timestamp-control-base');
      let bctel = bc.querySelector ('time');
      opts.setTimeElementUpdater (time => {
        tel.textContent = time.prevHTML;
        tel.removeAttribute ('datetime');
        if (time.prevHTML !== time.baseHTML) {
          bc.hidden = false;
          bctel.textContent = time.baseHTML;
          bctel.removeAttribute ('datetime');
          bctel.setAttribute ('data-reftime', time.prevHTML);
        } else {
          bc.hidden = true;
        }
      });
    }
    return new L.Control.ElementControl (opts);
  }; // L.control.timestampControl

  var JMAMaps = {
    hrpns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/hrpns/{z}/{x}/{y}.png',
      nextDelta: 5,
      currentDelta: 5,
      nowDelta: 2,
      maxNativeZoom: 10,
      opacity: 0.8,
      zooms: [],
    },
    thns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/thns/{z}/{x}/{y}.png',
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 5,
      maxNativeZoom: 9,
      opacity: 0.5,
      zooms: [],
    },
    trns: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/nowc/{urlTimestamp0}/none/{urlTimestamp}/surf/trns/{z}/{x}/{y}.png',
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 5,
      maxNativeZoom: 9,
      opacity: 0.5,
      zooms: [],
    },
    rasrf: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/rasrf/{urlTimestamp0}/none/{urlTimestamp}/surf/rasrf/{z}/{x}/{y}.png',
      isRasrf: true,
      nextDelta: 60,
      currentDelta: 60,
      nowDelta: 5,
      maxNativeZoom: 9,
      opacity: 0.5,
      zooms: [],
    },
    rasrfimmed: {
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/rasrf/{urlTimestamp0}/immed/{urlTimestamp}/surf/rasrf/{z}/{x}/{y}.png',
      isRasrf: true,
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 5,
      maxNativeZoom: 9,
      opacity: 0.5,
      zooms: [],
    },
    himawari: {
      // https://www.jma.go.jp/bosai/himawari/data/satimg/20240902070000/jp/20240902070000/B13/TBB/6/57/24.jpg
      pattern: 'https://www.jma.go.jp/bosai/himawari/data/satimg/{urlTimestamp}/jp/{urlTimestamp}/{param1}/{z}/{x}/{y}.jpg',
      params: "B13/TBB", // B13/TBB B03/ALBD B08/TBB REP/ETC SND/ETC
      nextDelta: 2.5,
      currentDelta: 2.5,
      nowDelta: 11, // 17:00 -> 17:03, 17:03:30 -> 17:13, 17:07:30 -> 17:13
      noFuture: true,
      minNativeZoom: 3, // 6,
      maxNativeZoom: 6,
      opacity: 1,
      zooms: [],
      jmaLinkType: 'himawari',
    },
    umimeshwind: {
      // https://www.jma.go.jp/bosai/umimesh/#lat:36.341678/lon:136.842957/zoom:8/colordepth:deep/elements:wind
      // https://www.jma.go.jp/bosai/jmatile/data/umimesh/20240904000000/none/20240904060000/surf/ws/8/223/100.png
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/umimesh/{urlTimestamp0}/none/{urlTimestamp}/surf/ws/{z}/{x}/{y}.png',
      nextDelta: 60*6,
      currentDelta: 60*6,
      now0Delta: 60*3+5,
      nowDelta: 0,
      noCurrent: true,
      minNativeZoom: 4,
      maxNativeZoom: 8,
      opacity: 1,
      zooms: [],
      isUmiWind: true,
      jmaLinkType: 'umimesh',
    },
    umimeshwinddir: {
      //https://www.jma.go.jp/bosai/jmatile/data/umimesh/20240904000000/none/20240904060000/surf/wd/data.geojson?id=wd
      pattern: 'https://www.jma.go.jp/bosai/jmatile/data/umimesh/{urlTimestamp0}/none/{urlTimestamp}/surf/wd/data.geojson?id=wd',
      nextDelta: 60*6,
      currentDelta: 60*6,
      now0Delta: 60*3+5,
      nowDelta: 0,
      noCurrent: true,
      minNativeZoom: 4,
      maxNativeZoom: 8,
      opacity: 1,
      zooms: [],
      isGeoJSON: true,
      jmaLinkType: 'umimesh',
    },
    amedas: {
      // https://www.jma.go.jp/bosai/amedas/data/map/20240905145000.json
      pattern: 'https://www.jma.go.jp/bosai/amedas/data/map/{urlTimestamp}.json',
      params: 'temp', // precipitation10m precipitation1h precipitation3h precipitation24h wind windDirection temp sun1h snow snow6h snow12h snow24h humidity 
      nextDelta: 10,
      currentDelta: 10,
      nowDelta: 20, // :57 -> :40 :59 -> :50
      constDelta: 9*60,
      noFuture: true,
      //minNativeZoom: 4,
      //maxNativeZoom: 8,
      opacity: 1,
      zooms: [],
      isGeoJSON: true,
      jmaLinkType: 'amedas',
    },
  }; // JMAMaps

  JMAMaps.himawari.zooms[6] = JMAMaps.himawari;
  JMAMaps.himawari.zooms[3] = 
  JMAMaps.himawari.zooms[4] = 
  JMAMaps.himawari.zooms[5] = {
    pattern: 'https://www.jma.go.jp/bosai/himawari/data/satimg/{urlTimestamp}/fd/{urlTimestamp}/{param1}/{z}/{x}/{y}.jpg',
    params: "B13/TBB", // B13/TBB B03/ALBD B08/TBB REP/ETC SND/ETC
    nextDelta: 10,
    currentDelta: 10,
    nowDelta: 11,
    noFuture: true,
    minNativeZoom: 3,
    maxNativeZoom: 5,
    opacity: 1,
    zooms: [],
    jmaLinkType: 'himawari',
  };

  {
    let p;
    function getAmedasTable () {
      return p = p || fetch ('https://www.jma.go.jp/bosai/amedas/const/amedastable.json', {
        referrerPolicy: 'no-referrer',
      }).then (res => {
        if (res.status !== 200) throw res;
        return res.json ();
      }).catch (e => {
        p = null;
        throw e;
      });
    }
  }
  
  L.tileLayer.jma = function (opts) {
    // https://www.jma.go.jp/bosai/jmatile/data/map/none/none/none/surf/mask/8/222/99.png
    // https://www.jma.go.jp/bosai/jmatile/data/nowc/20221226045500/none/20221226045500/surf/hrpns/8/223/101.png
    // https://www.jma.go.jp/bosai/jmatile/data/map/none/none/none/surf/mask/9/452/201.png
    // https://www.jma.go.jp/bosai/jmatile/data/nowc/20221226051000/none/20221226051000/surf/thns/8/227/100.png
    // https://www.jma.go.jp/bosai/jmatile/data/nowc/20221226051000/none/20221226051000/surf/trns/6/57/24.png
    // https://www.jma.go.jp/bosai/jmatile/data/rasrf/20221227020000/none/20221227110000/surf/rasrf/10/909/389.png
    // https://www.jma.go.jp/bosai/jmatile/data/rasrf/20221227020000/immed/20221227050000/surf/rasrf/8/226/98.png
    // https://www.jma.go.jp/bosai/jmatile/data/rasrf/20221227021000/immed/20221227051000/surf/rasrf/8/226/98.png
    var type = opts.type || 'rain'; // rain thns trns [hrpns rasrf rasrfimmed]
    var mapDef = type === 'rain' ? JMAMaps.hrpns : JMAMaps[type];
    if (!mapDef) throw new Error ("Bad type |"+type+"|");
    
    let currentZ = null;
    var explicitTime;
    var getTime = () => {
      let md = mapDef;
      md = md.zooms[currentZ] || md;
      var realNow = (new Date).valueOf ();
      let now = realNow - md.nowDelta*60*1000;
      var cur;
      var urlTimestamp0 = null;
      if (explicitTime) {
        if (now < explicitTime) {
          if (type === 'rain') {
            if (now + 6*60*60*1000 <= explicitTime) {
              md = JMAMaps.rasrf;
            } else if (now + 1*60*60*1000 <= explicitTime) {
              md = JMAMaps.rasrfimmed;
            }
          }
          if (!md.noFuture) {
            cur = md.currentDelta * 60*1000;
            now = explicitTime;
          }
        } else {
          now = explicitTime;
        }
      }
      var nextDelta = md.nextDelta;
      var prev = Math.floor (now / (nextDelta*60*1000)) * nextDelta*60*1000;
      var next = prev + nextDelta*60*1000;
      var delta = next - now;
          // next + 100*1000 - realNow
          // = next + 100*1000 - (now + 100*1000)
      if (delta < 60*1000) delta = 60*1000;
      let prevHTML = new Date (prev).toISOString ();
      let prevFormatted = prevHTML
          .replace (/(?:\.[0-9]+|)Z$/, '').replace (/[-:T]/g, '');
      if (md.constDelta) {
        prevFormatted = new Date (prev + md.constDelta*60*1000).toISOString ()
            .replace (/(?:\.[0-9]+|)Z$/, '').replace (/[-:T]/g, '');
      }
      if (md.noCurrent) cur = md.currentDelta * 60*1000;
      let baseHTML;
      if (cur) {
        let ct = Math.floor (realNow / cur) * cur;
        if (md.noCurrent) {
          let now0 = realNow - md.now0Delta*60*1000;
          ct = Math.floor (now0 / cur) * cur;
          while (prev <= ct) ct -= nextDelta*60*1000;
        }
        if (md.isRasrf) {
          var f = 60*60*1000;
          var x = (prev - ct) % f;
          ct -= f - x;
        }
        baseHTML = new Date (ct).toISOString ();
        urlTimestamp0 = baseHTML
            .replace (/(?:\.[0-9]+|)Z$/, '').replace (/[-:T]/g, '');
      }
      return {realNow, prev, prevFormatted, prevHTML, next, delta,
              urlTimestamp0: urlTimestamp0 || prevFormatted,
              baseHTML: baseHTML || prevHTML,
              mapDef: md};
    }; // getTime
    
    var time = getTime ();
    let layer;
    let refetch = () => {};
    if (mapDef.isGeoJSON) {
      let mapper = (_, __) => _;
      let dataType = 'direction';
      let propKey = 'value';
      let inKey = 'value';
      if (mapDef.jmaLinkType === 'amedas') {
        inKey = opts.param1 || mapDef.param1;
        mapper = (json, amedas) => {
          let features = [];
          Object.keys (json).forEach (aKey => {
            let w = json[aKey];
            let v = w[inKey];
            if (v && v[1] == 0) {
              let a = amedas[aKey] || {lat: [], lon: []};
              features.push ({
                type: 'Feature',
                properties: {
                  value: v[0],
                  wind: (w.wind || [])[0],
                },
                geometry: {
                  type: 'Point',
                  coordinates: [
                    a.lon[0] + a.lon[1] / 60,
                    a.lat[0] + a.lat[1] / 60,
                  ],
                },
              });
            }
          });
          return {type: "FeatureCollection", features};
        };
        dataType = inKey || 'value';
      } else {
        propKey = 'windDir';
      }
      let pointToLayer;
      if (dataType === 'direction' || dataType === 'windDirection') {
        pointToLayer = function (feature, latlng) {
          let wd = feature.properties[propKey];
          let value = feature.properties.wind;
          let color = Math.floor (value / 5) * 5;
          let html = {
            // amedas
            0: '&#x2193;', // north
            1: '<div style="transform: rotate(22.5deg);">&#x2193;</div>',
            2: '&#x2199;',
            3: '<div style="transform: rotate(67.5deg);">&#x2193;</div>',
            4: '&#x2190;', // east
            5: '<div style="transform: rotate(112.5deg);">&#x2193;</div>',
            6: '&#x2196;',
            7: '<div style="transform: rotate(157.5deg);">&#x2193;</div>',
            8: '&#x2191;', // south
            9: '<div style="transform: rotate(202.5deg);">&#x2193;</div>',
            10: '&#x2197;',
            11: '<div style="transform: rotate(247.5deg);">&#x2193;</div>',
            12: '&#x2192;', // west
            13: '<div style="transform: rotate(292.5deg);">&#x2193;</div>',
            14: '&#x2198;',
            15: '<div style="transform: rotate(337.5deg);">&#x2193;</div>',
            16: '&#x2193;',
            
            // umimesh
            S: '&#x2191;',
            SW: '&#x2197;',
            W: '&#x2192;',
            NW: '&#x2198;',
            N: '&#x2193;',
            NE: '&#x2199;',
            E: '&#x2190;',
            SE: '&#x2196;',
          }[wd];
          let icon = L.divIcon ({
            html: '<data>' + html + '</data>',
            className: 'paco-map-value-' + dataType + ' paco-map-value-key-' + inKey + ' paco-map-value-wind-' + color,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
          return L.marker (latlng, {icon});
        };
      } else {
        let sub = {
          temp: 1,
          precipitation10m: 0,
          precipitation1h: 0,
          precipitation3h: 0,
          precipitation24h: 0,
          wind: 0,
          humidity: 0,
          sun1h: 1,
          snow: 0,
          snow6h: 0,
          snow12h: 0,
          snow24h: 0,
        }[dataType];
        let toColor = {
          temp: _ => Math.floor (_ / 5) * 5,
          wind: _ => Math.floor (_ / 5) * 5,
          humidity: _ => Math.floor (_ / 10) * 10,
          sun1h: _ => Math.floor (_ * 10 / 2) * 2 / 10,
          precipitation10m: _ => {
            return _ >= 30 ? 30 : _ >= 20 ? 20 : _ >= 15 ? 15 :
              _ >= 10 ? 10 : _ >= 5 ? 5 : _ >= 3 ? 3 : _ >= 1 ? 1 : 0;
          },
          precipitation1h: _ => {
            return _ >= 80 ? 80 : _ >= 50 ? 50 : _ >= 30 ? 30 :
              _ >= 20 ? 20 : _ >= 10 ? 10 : _ >= 5 ? 5 : _ >= 1 ? 1 : 0;
          },
          precipitation3h: _ => {
            return _ >= 150 ? 150 : _ >= 120 ? 120 : _ >= 100 ? 100 :
              _ >= 80 ? 80 : _ >= 60 ? 60 : _ >= 40 ? 40 : _ >= 20 ? 20 : 0;
          },
          precipitation24h: _ => {
            return _ >= 300 ? 300 : _ >= 250 ? 250 : _ >= 200 ? 200 :
              _ >= 150 ? 150 : _ >= 100 ? 100 : _ >= 80 ? 80 : _ >= 50 ? 50 : 0;
          },
          snow: _ => {
            return _ >= 200 ? 200 : _ >= 150 ? 150 : _ >= 100 ? 100 :
              _ >= 50 ? 50 : _ >= 20 ? 20 : _ >= 5 ? 5 : _ >= 1 ? 1 : 0;
          },
          snow6h: _ => {
            return _ >= 50 ? 50 : _ >= 30 ? 30 : _ >= 20 ? 20 :
              _ >= 15 ? 15 : _ >= 10 ? 10 : _ >= 5 ? 5 : _ >= 1 ? 1 : 0;
          },
          snow12h: _ => {
            return _ >= 70 ? 70 : _ >= 50 ? 50 : _ >= 30 ? 30 :
              _ >= 20 ? 20 : _ >= 10 ? 10 : _ >= 5 ? 5 : _ >= 1 ? 1 : 0;
          },
          snow24h: _ => {
            return _ >= 100 ? 100 : _ >= 70 ? 70 : _ >= 50 ? 50 :
              _ >= 30 ? 30 : _ >= 20 ? 20 : _ >= 10 ? 10 : _ >= 1 ? 1 : 0;
          },
          sun1h: _ => {
            return _ >= 1 ? 1 : _ >= 0.8 ? 0.8 : _ >= 0.6 ? 0.6 :
              _ >= 0.4 ? 0.4 : _ >= 0.2 ? 0.2 : 0;
          },
        }[dataType];
        pointToLayer = function (feature, latlng) {
          let value = feature.properties[propKey];
          let div = document.createElement ('div');
          div.innerHTML = '<data></data>';
          div.firstChild.textContent = value.toFixed (sub);
          div.firstChild.className = 'paco-map-value-' + dataType + '-' + toColor (value);
          let icon = L.divIcon ({
            html: div.innerHTML,
            className: 'paco-map-value-value paco-map-value-key-' + inKey,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
          return L.marker (latlng, {icon});
        };
      }
      layer = L.geoJSON ({type: "FeatureCollection", features: []}, {
        pointToLayer,
      });
      let prevU = null;
      refetch = (time, layer) => {
        let u = L.Util.template (mapDef.pattern, {
          urlTimestamp0: time.urlTimestamp0,
          urlTimestamp: time.prevFormatted,
        });
        if (u === prevU) return;
        prevU = u;
        Promise.all ([
          fetch (u, {
            referrerPolicy: 'no-referrer',
          }).then (res => {
            if (res.status !== 200) throw res;
            return res.json ();
          }),
          (mapDef.jmaLinkType === 'amedas' ? getAmedasTable () : null),
        ]).then (([json, amedas]) => {
          layer.clearLayers ();
          layer.addData (mapper (json, amedas));
        }).catch (e => {
          prevU = null;
          throw e;
        });
      };
      refetch (time, layer);
    } else {
      layer = L.tileLayer (mapDef.pattern, {
        attribution: '<a href=https://www.jma.go.jp/jma/kishou/info/coment.html target=_blank rel=noreferrer>\u6C17\u8C61\u5E81</a>',
        errorTileUrl: opts.errorTileUrl,
        maxNativeZoom: mapDef.maxNativeZoom,
        minNativeZoom: mapDef.minNativeZoom || 4,
        maxZoom: opts.maxZoom,
        opacity: mapDef.opacity,
        urlTimestamp0: time.urlTimestamp0,
        urlTimestamp: time.prevFormatted,
        param1: opts.param1 || mapDef.param1,
      });
      refetch = (time, layer) => {
        layer.options.urlTimestamp = time.prevFormatted;
        layer.options.urlTimestamp0 = time.urlTimestamp0;
        layer.options.param1 = opts.param1 || time.mapDef.param1;
        layer.setUrl (time.mapDef.pattern, false);
      };
    }
    
    var needReload = false;
    var needUpdate = false;
    var timeout;
    let updateTimeElements = () => {};
    var prevTimePrev = null;
    var requestReload = (layer, time) => {
      if (!needReload) return;
      time = time || getTime ();
      if (prevTimePrev === time.prev) return;
      prevTimePrev = time.prev;
      if (needUpdate) clearTimeout (timeout);
      timeout = setTimeout (() => {
        if (!needReload) return;
        var time = getTime ();
        refetch (time, layer);
        updateTimeElements (time);
        if (explicitTime) needReload = false;
        requestReload (layer, time);
      }, needUpdate ? 0 : time.delta);
      needUpdate = false;
    }; // requestReload

    let legends = [];
    if (!opts.noTimestamp) {
      let ts = L.control.timestampControl ({
        position: 'bottomleft',
        setTimeElementUpdater: _ => {
          updateTimeElements = _;
          _ (time);
        },
        type: mapDef.jmaLinkType || 'nowc',
        isLegend: true,
      });
      legends.push (ts);
    }

    if (mapDef.isUmiWind) {
      let t = document.createElement ('map-controls');
      t.className = 'paco-jma-legend-control';
      t.innerHTML = '<img src=https://www.jma.go.jp/bosai/umimesh/images/legend_deep_ws.svg referrerpolicy=no-referrer>';
      let ec = new L.Control.ElementControl ({
        element: t,
        position: 'bottomleft',
        isLegend: true,
      });
      legends.push (ec);
    }

    let map;
    let ba = layer.beforeAdd;
    if (ba) {
      layer.beforeAdd = function (_) {
        map = _;
        return ba.apply (this, arguments);
      };
    } else {
      map = opts.map;
    }

    var timeSetter = (newTime) => {
      explicitTime = newTime * 1000; // or NaN
      needReload = needUpdate = true;
      requestReload (layer, null);
    }; // timeSetter

    let zoomChanged = null;
    if (mapDef.zooms.length) {
      zoomChanged = () => {
        let newZ = map.getZoom ();
        if (mapDef.zooms[newZ] !== mapDef.zooms[currentZ]) {
          needReload = needUpdate = true;
        }
        currentZ = newZ;
        requestReload (layer, null);
      }; // zoomChanged
    }
    
    layer.on ('add', ev => {
      needReload = true;
      requestReload (ev.target, null);
      legends.forEach (_ => _.addTo (map));
      map.pcAddTimeSetter (timeSetter);
      if (zoomChanged) map.on ('zoomend', zoomChanged);
    });
    layer.on ('remove', ev => {
      needReload = false;
      clearTimeout (timeout);
      legends.forEach (_ => _.remove ());
      map.pcRemoveTimeSetter (timeSetter);
      if (zoomChanged) map.off ('zoomend', zoomChanged);
    });

    return layer;
  }; // L.tileLayer.jma
  
  var gmPromise;
  var loadGoogleMaps = () => {
    return gmPromise = gmPromise || new Promise ((resolve, reject) => {
      var functionName = ("maGoogleLoaded" + Math.random ()).replace (/\./g, '');
      var script = document.createElement ('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent (document.documentElement.getAttribute ('data-google-maps-key')) + '&callback=' + encodeURIComponent (functionName);
      var ls = document.documentElement.getAttribute ('data-google-maps-libraries');
      if (ls) script.src += '&libraries=' + encodeURIComponent (ls);
      script.async = true;
      //script.onload = resolve;
      script.onerror = () => {
        reject (new Error ("Failed to load Google Maps"));
        delete window[functionName];
      };
      window[functionName] = () => {
        resolve ();
        delete window[functionName];
      };
      document.head.appendChild (script);
    });
  }; // loadGoogleMaps

  define ({
    name: 'map-area',
    pcInternal: true,
    props: {
      pcInit: function () {
        this.maRedrawNeedUpdated = {};
        this.ready = new Promise ((r) => this.maRedrawNeedUpdated.onready = r);

        this.pcValue = {lat: 0, lon: 0};
        var initialValue = this.valueAsLatLon;
        if (initialValue) {
          this.setAttribute ('lat', initialValue.lat);
          this.setAttribute ('lon', initialValue.lon);
        }
        Object.defineProperty (this, 'valueAsLatLon', {
          get: function () {
            return {
              lat: this.pcValue.lat,
              lon: this.pcValue.lon,
            };
          },
          set: function (newValue) {
            newValue = newValue || {};
            this.pcValue = {lat: parseFloat (newValue.lat),
                            lon: parseFloat (newValue.lon)};
            if (!Number.isFinite (this.pcValue.lat)) this.pcValue.lat = 0;
            if (!Number.isFinite (this.pcValue.lon)) this.pcValue.lon = 0;
            this.maRedraw ({valueMarker: true});
          },
        });

        this.pcZoomLevel = this.maAttrFloat ('zoom', 8);

        this.pcExplicitTime = null;
        this.pcTimeSetters = [];
        Object.defineProperty (this, 'explicitTime', {
          get: () => this.pcExplicitTime,
          set: function (newValue) {
            this.pcExplicitTime = parseFloat (newValue) || null;
            Promise.resolve ().then (() => {
              this.pcTimeSetters.forEach (_ => _ (this.pcExplicitTime));
            });
          },
        });

        this.pcNoMapDraggable = !!this.noMapDraggable;
        Object.defineProperty (this, 'noMapDraggable', {
          get: () => this.pcNoMapDraggable,
          set: function (newValue) {
            this.pcNoMapDraggable = !!newValue;
            this.maRedraw ({mapDraggable: true});
          },
        });
        
        this.maEngine = this.getAttribute ('engine');
        if (this.maEngine === 'googlemaps') {
          return this.maInitGoogleMaps ();
        } else if (this.maEngine === 'googlemapsembed') {
          return this.maInitGoogleMapsEmbed ();
        } else {
          this.maEngine = 'leaflet';
          return this.pcInitLeaflet ();
        }
      }, // pcInit
      maInitGoogleMaps: function () {
        Object.defineProperty (this, 'googleMap', {
          get: function () {
            return this.maGoogleMap || null;
          },
        });

        loadGoogleMaps ().then (() => {
          var controls = [];
          Array.prototype.slice.call (this.children).forEach (e => {
            if (e.localName === 'map-controls') {
              controls.push (e);
            }
          });

          var mapOpts = {
            zoom: this.pcZoomLevel,
            gestureHandling: "greedy",
            styles: [
              {featureType: "poi", elementType: "all", stylers: [{visibility: "off"}]},
              {featureType: "landscape", elementType: "all", stylers: [{visibility: "off"}]},
            ],
            draggable: !this.pcNoMapDraggable,
          };
          var center = {lat: this.maAttrFloat ('lat', 0),
                        lng: this.maAttrFloat ('lon', 0)};
          if (center.lat || center.lng) mapOpts.center = center;
          this.maGoogleMap = new google.maps.Map (this, mapOpts);

          if (this.hasAttribute ('gsi')) {
            this.maGoogleMap.setOptions ({
              mapTypeId: google.maps.MapTypeId.TERRAIN,
              mapTypeControlOptions: {mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN,
                google.maps.MapTypeId.SATELLITE,
                google.maps.MapTypeId.HYBRID,
                this.maGoogleMapTypeGSI,
              ]},
            });
            this.maEnableGoogleMapGSI ();
          }

          var applyControls = () => {
            var opts = {};
            var cp = false;
            var value = this.getAttribute ('controls');
            if (value === null) {
              opts.scaleControl = opts.fullscreenControl =
              opts.zoomControl = opts.streetViewControl =
              opts.mapTypeControl = true;
            } else {
              opts.scaleControl = opts.fullscreenControl =
              opts.zoomControl = opts.streetViewControl =
              opts.mapTypeControl = false;
              var values = value.split (/\s+/);
              values.forEach (v => {
                var key = {
                  scale: 'scaleControl',
                  fullscreen: 'fullscreenControl',
                  streetview: 'streetViewControl',
                  zoom: 'zoomControl',
                  type: 'mapTypeControl',
                }[v];
                if (key) opts[key] = true;
                if (v === 'currentposition') cp = true;
              });
            } // value
            this.maGoogleMap.setOptions (opts);

            if (cp && !this.pcCurrentPositionButtonAdded) {
              this.pcCurrentPositionButtonAdded = true;
              var e = document.createElement ('map-controls');
              e.setAttribute ('position', 'right-bottom');
              e.className = 'paco-currentposition-container';
              var b = document.createElement ('button');
              b.className = 'paco-control-button paco-currentposition-control-button';
              b.type = 'button';
              b.textContent = '\u26EF';
              b.onclick = () => {
                this.pcLocateCurrentPosition ({pan: true});
              };
              
              // recompute!
              var mCP = this.pcInternal.parseCSSString (getComputedStyle (this).getPropertyValue ('--paco-currentposition-title'), 'Current position');
              b.title = mCP;
              
              e.appendChild (b);
              if (controls) {
                controls.push (e);
              } else {
                this.appendChild (e);
                this.maRedraw ({controls: true});
              }
              this.pcInitCurrentPosition ();
            } // cp
          }; // applyControls
          new MutationObserver (applyControls)
              .observe (this, {attributeFilter: ['controls']});
          applyControls ();
          
          this.maGoogleMap.addListener ('bounds_changed', () => {
            var v = this.maGoogleMap.getCenter ();
            this.maCenter = v ? {
              lat: v.lat (),
              lon: v.lng (),
            } : {lat: 0, lon: 0};
            if (this.maCenter.lon < -180) {
              this.maCenter.lon += 360;
            }
            this.pcZoomLevel = this.maGoogleMap.getZoom ();
            this.maRedrawEvent ();
          });
          var mo = new MutationObserver ((mutations) => {
            var latlon = false;
            mutations.forEach (mr => {
              if (mr.attributeName === 'lat' ||
                  mr.attributeName === 'lon') {
                latlon = true;
              } else if (mr.attributeName === 'readonly') {
                this.maRedraw ({readonly: true});
              } else if (mr.attributeName === 'zoom') {
                this.pcZoomLevel = this.maAttrFloat ('zoom', 8);
                this.maRedraw ({zoom: true});
              }
            });

            if (latlon) this.maRedraw ({
              center: {
                lat: this.maAttrFloat ('lat', 0),
                lon: this.maAttrFloat ('lon', 0),
              },
              value: true,
            });
          });
          mo.observe (this, {attributeFilter: ['lat', 'lon', 'readonly',
                                               'zoom']});
          this.maCenter = this.pcValue = {
            lat: this.maAttrFloat ('lat', 0),
            lon: this.maAttrFloat ('lon', 0),
          };
          
          var moc = new MutationObserver ((mutations) => {
            this.maRedraw ({controls: true});
          }).observe (this, {childList: true});
          controls.forEach (e => this.appendChild (e));
          controls = null;

          // recompute!
          var s = getComputedStyle (this);
          var v = s.getPropertyValue ('--paco-map-click-action') || 'none';
          var w = s.getPropertyValue ('--paco-map-touch-scroll-viewport') || 'auto';
          
          if (v.match (/^\s*set-value\s*$/)) {
            this.maGoogleMap.addListener ('click', ev => {
              var p = ev.latLng;
              this.pcMarkerMoveEnd ({lat: p.lat (), lon: p.lng ()});
              this.maRedraw ({valueMarker: true, userActivated: true});
            });
          }

          if (w.match (/^\s*none\s*$/)) {
            // Disable viewport scrolling behavior triggerred by touch
            // (when map scrolling is disabled)
            this.addEventListener ('touchstart', (ev) => {
              var t = ev.target;
              if ({
                'map-credit': true,
                'label': true,
                'a': true,
                'button': true,
              }[t.localName] ||
              t.hasAttribute ('aria-label') ||
              t.hasAttribute ('controlwidth') ||
              (t.localName === 'img' && t.parentNode.localName === 'button')) {
                return;
              }
              ev.preventDefault ();
            }, {passive: false});
          }
          
          this.maRedraw ({all: true});
        }).then (() => {
          this.maISObserver = new IntersectionObserver (() => {
            setTimeout (() => {
              this.maRedraw ({size: true, relocate: true});
            }, 0);
          });
          this.maISObserver.observe (this);
        });
      }, // maInitGoogleMaps
      maInitGoogleMapsEmbed: function () {
        var mo = new MutationObserver ((mutations) => {
          var latlon = false;
          mutations.forEach (mr => {
            if (mr.attributeName === 'lat' ||
                mr.attributeName === 'lon') {
              latlon = true;
            } else if (mr.attributeName === 'zoom') {
              this.pcZoomLevel = this.maAttrFloat ('zoom', 8);
              this.maRedraw ({zoom: true});
            }
          });

          if (latlon) this.maRedraw ({
            center: {
              lat: this.maAttrFloat ('lat', 0),
              lon: this.maAttrFloat ('lon', 0),
            },
            value: true,
          });
        });
        mo.observe (this, {attributeFilter: ['lat', 'lon', 'zoom']});
        this.maCenter = this.pcValue = {
          lat: this.maAttrFloat ('lat', 0),
          lon: this.maAttrFloat ('lon', 0),
        };
        return Promise.resolve ().then (() => this.maRedraw ({all: true}));
      }, // maInitGoogleMapsEmbed
      pcInitLeaflet: function () {
        (new MutationObserver ((mutations) => {
          var latlon = false;
          mutations.forEach (mr => {
            if (mr.attributeName === 'lat' ||
                mr.attributeName === 'lon') {
              latlon = true;
            } else if (mr.attributeName === 'readonly') {
              this.maRedraw ({readonly: true});
            } else if (mr.attributeName === 'zoom') {
              this.pcZoomLevel = this.maAttrFloat ('zoom', 8);
              this.maRedraw ({zoom: true});
            } else if (mr.attributeName === 'maptype') {
              this.setMapType (this.getAttribute ('maptype'));
            }
          });

          if (latlon) this.maRedraw ({
            center: {
              lat: this.maAttrFloat ('lat', 0),
              lon: this.maAttrFloat ('lon', 0),
            },
            value: true,
          });
        })).observe (this, {attributeFilter: ['lat', 'lon', 'readonly',
                                              'zoom', 'maptype']});
        this.maCenter = this.pcValue = {
          lat: this.maAttrFloat ('lat', 0),
          lon: this.maAttrFloat ('lon', 0),
        };

        var c = this.getAttribute ('controls');
        var controls = {};
        if (c !== null) {
          c = c.split (/\s+/).filter (_ => _.length);
          if (c.length) {
            c.forEach (_ => controls[_] = true);
          } else {
            controls = {zoom: true, scale: true, fullscreen: true,
                        currentposition: true, type: true,
                        streetview: true};
          }
        }

        // recompute!
        var s = getComputedStyle (this);
        var v = s.getPropertyValue ('--paco-map-click-action') || 'none';
        var w = s.getPropertyValue ('--paco-map-touch-scroll-viewport') || 'auto';
        var za = s.getPropertyValue ('--paco-map-zoom-animation') || 'auto';

        var opts = {
          zoomControl: false,
          wheelPxPerZoomLevel: 60 * 3,
          dragging: !this.pcNoMapDraggable,
        };
        if (za.match (/^\s*none\s*$/)) opts.zoomAnimation = false;
        var map = this.pcLMap = L.map (this, opts);

        if (controls.zoom) {
          // recompute!
          var s = getComputedStyle (this);
          var zoomInTitle = this.pcInternal.parseCSSString (s.getPropertyValue ('--paco-zoomin-title'), 'Zoom in');
          var zoomOutTitle = this.pcInternal.parseCSSString (s.getPropertyValue ('--paco-zoomout-title'), 'Zoom out');
          L.control.zoom ({
            zoomInTitle,
            zoomOutTitle,
            position: 'bottomright',
          }).addTo (map);
        }

        if (controls.togglelegend) {
          L.control.legendToggleButton ({
            position: 'bottomleft',
          }).addTo (map);
        }
        
        if (controls.scale) L.control.scale ({}).addTo (map);

        if (controls.type) {
          L.control.mapTypeMenu ({
            position: 'topleft',
            buttons: controls.typebuttons,
          }).addTo (map);
        }
        if (controls.fullscreen && this.requestFullscreen) L.control.fullscreenButton ({}).addTo (map);

        if (controls.streetview) {
          L.control.streetViewButton ({
            position: 'bottomright',
          }).addTo (map);
        }

        if (controls.currentposition) {
          L.control.currentPositionButton ({
            position: 'bottomright',
          }).addTo (map);
          this.pcInitCurrentPosition ();
        }

        // Map need to be recomputed if it is initialized when not
        // shown.
        this.maISObserver = new IntersectionObserver (() => {
          this.maRedraw ({relocate: true});
        });
        this.maISObserver.observe (this);
        this.maRSObserver = new ResizeObserver (() => {
          this.maRedraw ({relocate: true});
        });
        this.maRSObserver.observe (this);

        map.on ('load viewreset zoomend moveend', ev => {
          var c = map.getCenter ();
          this.maCenter = {lat: c.lat, lon: c.lng};
          this.pcZoomLevel = map.getZoom ();
          this.maRedrawEvent ();
        });
        map.setView (this.maCenter, this.pcZoomLevel);
        
        if (v.match (/^\s*set-value\s*$/)) {
          map.on ('click', ev => {
            var p = ev.latlng;
            this.pcMarkerMoveEnd ({lat: p.lat, lon: p.lng});
            this.maRedraw ({valueMarker: true, userActivated: true});
          });            
        }

        if (w.match (/^\s*none\s*$/)) {
          this.classList.toggle ('paco-touch-scroll-viewport-none', true);
        }

        var initialMapType = this.getAttribute ('maptype');
        if (this.hasAttribute ('gsi') && !initialMapType) {
          initialMapType = 'gsi-lang';
        }
        if (this.hasAttribute ('osm') && !initialMapType) {
          initialMapType = 'osm';
        }
        if (initialMapType) this.setMapType (initialMapType);

        map.pcAddTimeSetter = (code) => {
          this.pcTimeSetters.push (code);
        }; // addTimeSetter
        map.pcRemoveTimeSetter = (code) => {
          this.pcTimeSetters = this.pcTimeSetters.filter (_ => _ !== code);
        }; // removeTimeSetter
        
        new MutationObserver ((mutations) => {
          this.maRedraw ({controls: true});
        }).observe (this, {childList: true});
        this.maRedraw ({controls: true, valueMarker: true,
                        relocate: true});
      }, // pcInitLeaflet
      
      maRedrawEvent: function () {
        clearTimeout (this.maRedrawEventTimer);
        this.maRedrawEventTimer = setTimeout (() => this.ma_RedrawEvent (), 100);
      }, // maRedrawEvent
      ma_RedrawEvent: function () {
        var isShown = this.offsetWidth > 0 && this.offsetHeight > 0;
        if (!isShown) return;
        
        this.dispatchEvent (new Event ('pcRedraw', {bubbles: true}));
      }, // ma_RedrawEvent
      maRedraw: function (opts) {
        for (var n in opts) {
          if (opts[n]) this.maRedrawNeedUpdated[n] = opts[n];
        }

        if (this.maRedrawNeedUpdated.center) {
          var p = {
            lat: this.maRedrawNeedUpdated.center.lat,
            lng: this.maRedrawNeedUpdated.center.lon,
          };
          if (this.pcLMap) {
            this.pcLMap.panTo (p);
          } else if (this.maGoogleMap) {
            this.maGoogleMap.panTo (p);
          } else {
            this.maCenter = this.maRedrawNeedUpdated.center;
            this.maRedrawNeedUpdated.all = true;
          }
          if (this.maRedrawNeedUpdated.value) {
            this.pcValue = this.maRedrawNeedUpdated.center;
            this.maRedrawNeedUpdated.valueMarker = true;
          }
          delete this.maRedrawNeedUpdated.center;
          delete this.maRedrawNeedUpdated.value;
          delete this.maRedrawNeedUpdated.pan;
        } // center

        if (this.maRedrawNeedUpdated.zoom ||
            this.maRedrawNeedUpdated.all) {
          if (this.pcLMap || this.maGoogleMap) {
            (this.pcLMap || this.maGoogleMap).setZoom (this.pcZoomLevel);
          }
        }

        if (this.maRedrawNeedUpdated.mapDraggable) {
          if (this.pcLMap) {
            if (this.pcNoMapDraggable) {
              this.pcLMap.dragging.disable ();
            } else {
              this.pcLMap.dragging.enable ();
            }
          } else if (this.maGoogleMap) {
            this.maGoogleMap.setOptions ({draggable: !this.pcNoMapDraggable});
          }
          delete this.maRedrawNeedUpdated.mapDraggable;
        }
        
        if (this.maRedrawNeedUpdated.relocate) {
          if (this.maEngine === 'leaflet') {
            this.pcLMap.invalidateSize ();
          } else if (this.maEngine === 'googlemaps') {
            if (this.maCenter) this.maGoogleMap.setCenter ({
              lat: this.maCenter.lat,
              lng: this.maCenter.lon,
            });
          }
          delete this.maRedrawNeedUpdated.relocate;
        }

        if (this.maRedrawNeedUpdated.mapType) {
          if (this.maEngine === 'leaflet') {
            this.pcChangeMapType ();
          }
          delete this.maRedrawNeedUpdated.mapType;
        }

        clearTimeout (this.maRedrawTimer);
        if (this.maRedrawNeedUpdated.userActivated) {
          requestAnimationFrame (() => this.ma_Redraw ());
        } else {
          this.maRedrawTimer = setTimeout (() => this.ma_Redraw (), 300);
        }
      }, // maRedraw
      ma_Redraw: function () {
        var isShown = this.offsetWidth > 0 && this.offsetHeight > 0;

        var updates = this.maRedrawNeedUpdated;
        if (isShown) {
          this.maShown = true;
          this.maRedrawNeedUpdated = {};

          if (updates.size || updates.all) {
            if (this.maEngine === 'googlemaps') {
              google.maps.event.trigger (this.maGoogleMap, 'resize');
            } else if (this.maEngine === 'leaflet') {
              this.pcLMap.invalidateSize ();
            }
          }
          if (updates.size || updates.zoom || updates.all) {
            if (this.maEngine === 'googlemapsembed') {
              if (!this.maIframe) {
                this.maIframe = document.createElement ('iframe');
                this.maIframe.className = 'googlemapsembed';
                this.maIframe.setAttribute ('sandbox', 'allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-top-navigation-by-user-activation');
                this.maIframe.setAttribute ('allowfullscreen', '');
                this.maIframe.onload = () => this.maRedrawEvent ();
                this.appendChild (this.maIframe);
              }
              this.maIframe.src = "https://www.google.com/maps/embed/v1/view?key=" + encodeURIComponent (document.documentElement.getAttribute ('data-google-maps-key')) + "&center=" + encodeURIComponent (this.maCenter.lat) + "," + encodeURIComponent (this.maCenter.lon) + "&zoom=" + encodeURIComponent (this.pcZoomLevel);
              // &maptype=satellite
            }
          }

          if (updates.controls || updates.all) {
            if (this.maEngine === 'leaflet') {
              Array.prototype.slice.call (this.children).forEach (e => {
                if (e.localName === 'map-controls') {
                  var position = {
                    'top-left': 'topleft',
                    'top-center': 'topleft',
                    'top-right': 'topright',
                    'bottom-left': 'bottomleft',
                    'bottom-center': 'bottomleft',
                    'left-top': 'topleft',
                    'left-center': 'topleft',
                    'left-bottom': 'bottomleft',
                    'right-top': 'topright',
                    'right-center': 'topright',
                    'right-bottom': 'bottomright',
                  }[e.getAttribute ('position')] || 'bottomright';
                  var c = L.control.elementControl ({
                    element: e,
                    position,
                    isLegend: e.hasAttribute ('legend'),
                  });
                  c.addTo (this.pcLMap);
                }
              });
            } else if (this.maEngine === 'googlemaps') {
              Array.prototype.slice.call (this.children).forEach (e => {
                if (e.localName === 'map-controls') {
                  // <https://developers.google.com/maps/documentation/javascript/controls>
                  var pos = {
                    'top-left': 'TOP_LEFT',
                    'top-center': 'TOP_CENTER',
                    'top-right': 'TOP_RIGHT',
                    'bottom-left': 'BOTTOM_LEFT',
                    'bottom-center': 'BOTTOM_CENTER',
                    'left-top': 'LEFT_TOP',
                    'left-center': 'LEFT_CENTER',
                    'left-bottom': 'LEFT_BOTTOM',
                    'right-top': 'RIGHT_TOP',
                    'right-center': 'RIGHT_CENTER',
                    'right-bottom': 'RIGHT_BOTTOM',
                  }[e.getAttribute ('position')] || 'BOTTOM_RIGHT';
                  this.maGoogleMap.controls[google.maps.ControlPosition[pos]].push (e);
                }
              });
            }
          } // controls

          var computedStyle;
          var updateMarker = (markerName, propName, pos, opts) => {
            if (this[markerName]) {
              if (this[markerName].setLatLng) {
                this[markerName].setLatLng (pos);
              } else {
                this[markerName].setPosition ({
                  lat: pos.lat,
                  lng: pos.lon,
                });
              }
              if (this[markerName].dragging) {
                if (opts.draggable) {
                  this[markerName].dragging.enable ();
                } else {
                  this[markerName].dragging.disable ();
                }
              }
              if (this[markerName].setOptions) {
                this[markerName].setOptions ({draggable: opts.draggable});
              }
              return;
            }
              
            // recompute!
            computedStyle = computedStyle || getComputedStyle (this);
            var v = computedStyle.getPropertyValue (propName) || 'none';

            if (v.match (/^\s*none\s*$/)) {
              this[markerName] = {setLatLng: () => {}};
              return;
            }

            var icon = null;
            var m = v.match (/^\s*("[^"]*"|'[^']*')\s+(\S+)\s+(\S+)\s*$/);
            if (m) {
              var mt = document.createElement ('span');
              var s = this.pcInternal.parseCSSString (m[1], null);
              if (s) {
                mt.textContent = s;
                var mc = document.createElement ('span');
                mc.textContent = m[2];
                var ms = document.createElement ('span');
                ms.textContent = m[3];
                icon = {iconSize: [m[3], m[3]]};
                var mss = ms.innerHTML;
                icon.iconUrl = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+mss+' '+mss+'"><text x="calc('+mss+'/2)" y="calc('+mss+'/2)" width="'+mss+'" height="'+mss+'" font-size="'+mss+'" text-anchor="middle" alignment-baseline="central" fill="'+mc.innerHTML+'">'+mt.innerHTML+'</text></svg>');
              }
            } else {
              m = v.match (/^\s*url\(((?:[^()"'\\]|\\[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])+)\)\s*$/);
              if (m) {
                icon = {
                  // XXX
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  tooltipAnchor: [16, -28],
                };
                icon.iconUrl = m[1].replace (/\\(.)/g, (_, v) => v);
              } else {
                m = v.match (/^\s*circle\s+(\S+)\s+([0-9.]+)px\s*$/);
                if (m) {
                  var c = m[1];
                  var s = document.createElement ('span');
                  s.textContent = c;
                  var r = parseFloat (m[2]);
                  icon = {iconSize: [r*2, r*2]};
                  icon.iconUrl = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+r*2+'px '+r*2+'px"><circle cx="'+r+'" cy="'+r+'" r="'+r+'" fill="'+s.innerHTML+'"/></svg>');
                }
              }
            }

            if (icon) {
              if (this.pcLMap) {
                this[markerName] = L.marker (pos, {
                  draggable: !!opts.draggable,
                  //title: "",
                  icon: L.icon (icon),
                }).addTo (this.pcLMap);
                this[markerName].on ('moveend', ev => {
                  var p = this[markerName].getLatLng ();
                  this.pcMarkerMoveEnd ({
                    lat: p.lat,
                    lon: p.lng,
                  });
                });
                return;
              } else if (this.maGoogleMap) {
                var size = null;
                if (icon.iconSize) size = { // must be in px
                  width: parseFloat (icon.iconSize[0]),
                  height: parseFloat (icon.iconSize[1]),
                };
                this[markerName] = new google.maps.Marker ({
                  position: {
                    lat: pos.lat,
                    lng: pos.lon,
                  },
                  map: this.googleMap,
                  draggable: !!opts.draggable,
                  //title: "",
                  icon: {
                    url: icon.iconUrl,
                    size,
                    anchor: (icon.iconAnchor ? {x: icon.iconAnchor[0], y: icon.iconAnchor[1]} : undefined),
                  },
                });
                this[markerName].addListener ('dragend', ev => {
                  var p = ev.latLng;
                  this.pcMarkerMoveEnd ({
                    lat: p.lat (),
                    lon: p.lng (),
                  });
                });
                return;
              }
            } // markerURL

            m = v.match (/^\s*circle\s+(\S+)\s+([0-9.]+)m\s+(\S+)\s+([0-9.]+)px\s*$/);
            if (m) {
              var fill = m[1];
              var radius = parseFloat (m[2]);
              var stroke = m[3];
              var strokeSize = parseFloat (m[4]);
              if (this.pcLMap) {
                this[markerName] = L.circle (pos, {
                  fill: true,
                  fillColor: fill,
                  radius: radius,
                  color: stroke,
                  weight: strokeSize,
                }).addTo (this.pcLMap);
                return;
              } else if (this.maGoogleMap) {
                this[markerName] = new google.maps.Circle ({
                  center: {
                    lat: pos.lat,
                    lng: pos.lon,
                  },
                  radius,
                  fillColor: fill,
                  strokeColor: stroke,
                  strokeWeight: strokeSize,
                  map: this.googleMap,
                });
                return;
              }
            } // circle
            
            if (!markerURL) console.log ("Bad |"+propName+"| value: |"+v+"|");
          }; // updateMarker

          if (updates.currentPositionMarker || updates.all) {
            if (this.pcCurrentPosition) {
              updateMarker ('pcCurrentPositionMarker', '--paco-marker-currentposition', this.pcCurrentPosition, {});
            }
          } // currentPositionMarker

          if (updates.valueMarker || updates.readonly || updates.all) {
            updateMarker ('pcValueMarker', '--paco-marker-value', this.pcValue, {
              draggable: !this.hasAttribute ('readonly'),
            });
          } // valueMarker
        } // isShown
        
        if (updates.onready) {
          updates.onready ();
          delete updates.onready;
        }
      }, // ma_Redraw

      maAttrFloat: function (name, def) {
        var value = parseFloat (this.getAttribute (name));
        if (Number.isFinite (value)) {
          return value;
        } else {
          return def;
        }
      }, // maAttrFloat

      getMapCenter: function () {
        return this.maCenter; // or null
      }, // getMapCenter
      getMapBounds: function () {
        if (this.pcLMap) {
          var bounds = this.pcLMap.getBounds ();
          return {
            north: bounds.getNorthEast ().lat,
            east: bounds.getNorthEast ().lng,
            south: bounds.getSouthWest ().lat,
            west: bounds.getSouthWest ().lng,
          };
        }
        
        if (this.maGoogleMap) {
          var bounds = this.maGoogleMap.getBounds ();
          return {
            north: bounds.getNorthEast ().lat (),
            east: bounds.getNorthEast ().lng (),
            south: bounds.getSouthWest ().lat (),
            west: bounds.getSouthWest ().lng (),
          };
        }

        throw new DOMException ('The map engine does not support this operation', 'NotSupportedError');
      }, // getMapBounds

      pcScroll: function (opts) {
        /*
          m.pcScroll ({center})
          m.pcScroll ({center, ifNeeded: true})
          m.pcScroll ({center, setValue: true})
          m.pcScroll ({intoView: true})
          m.pcScroll ({intoView: true, ifNeeded: true})
        */

        if (opts.center) {
          var p = {
            lat: parseFloat (opts.center.lat),
            lon: parseFloat (opts.center.lon),
          };
          if (!Number.isFinite (p.lat)) p.lat = 0;
          if (!Number.isFinite (p.lon)) p.lon = 0;
          if (opts.ifNeeded) {
            var bounds = this.getMapBounds ();
            var h = bounds.north - bounds.south;
            var w = bounds.east - bounds.west;
            if (bounds.north - h/4 > p.lat && p.lat > bounds.south + h/4 &&
                bounds.east - w/4 > p.lon && p.lon > bounds.west + w/4) {
              //
            } else {
              this.maRedraw ({center: p, value: opts.setValue});
            }
          } else {
            this.maRedraw ({center: p, value: opts.setValue});
          }
        }

        if (opts.bounds || opts.includes) {
          var bounds = {};
          if (opts.bounds) {
            bounds.north = opts.bounds.north;
            bounds.south = opts.bounds.south;
            bounds.east = opts.bounds.east;
            bounds.west = opts.bounds.west;
          }
          if (opts.includes && opts.includes.length) {
            bounds.north = bounds.south = opts.includes[0].lat;
            bounds.east = bounds.west = opts.includes[0].lon;
            opts.includes.forEach (_ => {
              if (_.lat < bounds.south) bounds.south = _.lat;
              if (bounds.north < _.lat) bounds.north = _.lat;
              // XXX if _.lon ~ 180, ...
              if (_.lon < bounds.west) bounds.west = _.lon;
              if (bounds.east < _.lon) bounds.east = _.lon;
            });
          }
          if (Number.isFinite (bounds.north)) {
            if (this.pcLMap) this.pcLMap.fitBounds ([
              [bounds.north, bounds.west],
              [bounds.south, bounds.east],
            ]);
            if (this.maGoogleMap) this.maGoogleMap.fitBounds (bounds);
          }
        }

        if (opts.intoView) {
          if (opts.ifNeeded) {
            this.scrollIntoViewIfNeeded ();
          } else {
            this.scrollIntoView ();
          }
        }
      }, // pcScroll
      
      maGoogleMapTypeGSI: 'GSI',
      maEnableGoogleMapGSI: function  () {
        var map = this.googleMap;

        // <https://maps.gsi.go.jp/development/ichiran.html>
        // <https://maps.gsi.go.jp/help/use.html>
        map.mapTypes.set (this.maGoogleMapTypeGSI, {
          name: this.getAttribute ('gsi') || '国土地理院',
          alt: this.getAttribute ('gsititle') || '国土地理院の地理院タイル (標準地図) を見る',
          tileSize: new google.maps.Size (256, 256),
          minZoom: 2,
          maxZoom: 18,
          getTile: (coord, zoom, doc) => {
            var tile = document.createElement ('img');
            tile.style.width = '256px';
            tile.style.height = '256px';
            var x = coord.x % Math.pow (2, zoom);
            var y = coord.y;
            tile.src = 'https://cyberjapandata.gsi.go.jp/xyz/std/' + zoom + '/' + x + '/' + y + '.png';
            tile.onerror = () => {
              tile.src = this.getAttribute ('noimgsrc') || noImageURL;
            };
            return tile;
          }, // getTile
        });

        // Credit required by GSI.
        var credit = document.createElement ('map-credit');
        credit.hidden = true;
        credit.innerHTML = gsiCreditHTML;
        map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push (credit);
        google.maps.event.addListener (map, 'maptypeid_changed', () => {
          credit.hidden = ! (map.getMapTypeId () === this.maGoogleMapTypeGSI);
        });
      }, // maEnableGoogleMapGSI

      setMapType: function (type) {
        if (this.pcMapType !== type) {
          [this.pcMapType, this.pcMapTypeParam1] = type.split (/:/);
          this.maRedraw ({mapType: true});
        }
      }, // setMapType
      toggleJMANowc: function (_, type) {
        type = type || 'rain';
        this["pcJMANowc_" + type] = !!_;
        this.maRedraw ({mapType: true});
      }, // toggleJMANowc
      pcChangeMapType: function () {
        let sType = this.pcMapType;
        let sTypeParam1 = this.pcMapTypeParam1;
        let map = this.pcLMap;

        var layers = [];

        var type = sType;
        if (sType === 'gsi-lang') {
          var s = getComputedStyle (this);
          var lang = s.getPropertyValue ('--paco--gsi-lang') || '';
          lang = lang.replace (/^\s+/, '').replace (/\s+$/, '');
          if (lang === 'gsi-english-standard') {
            type = 'gsi-english-standard';
          } else {
            type = 'gsi-standard';
          }
        }

        var maxZoom = 21;
        var errorTileUrl = this.getAttribute ('noimgsrc') || noImageURL;
        if (type === 'gsi-standard') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push (wLayer);
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push (jpLayerClipped);
        } else if (type === 'gsi-english') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 5,
                maxZoom,
              });
          layers.push (wLayer);
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 11,
                minNativeZoom: 5,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push (jpLayerClipped);
        } else if (type === 'gsi-english-standard') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 5,
                maxZoom,
              });
          layers.push (wLayer);

          let jpLayer1 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 12,
                maxZoom,
                minZoom: 12,
              });
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 11,
                minNativeZoom: 5,
                maxZoom: Math.min (11, maxZoom) || 11,
                minZoom: 9,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push (jpLayer1Clipped);
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push (jpLayer2Clipped);
        } else if (type === 'gsi-hillshade') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 0,
                maxZoom,
              });
          layers.push (wLayer);

          let jpLayer1 = L.tileLayer
          ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23ededed'/%3E%3C/svg%3E", {
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push (jpLayer1Clipped);
          
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push (jpLayer2Clipped);
        } else if (type === 'gsi-standard-hillshade') {
          let wLayerH = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 0,
                maxZoom,
              });
          layers.push (wLayerH);

          let wLayerS = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
                opacity: 0.8,
              });
          layers.push (wLayerS);
          
          let jpLayer1 = L.tileLayer
          ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23ededed'/%3E%3C/svg%3E", {
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push (jpLayer1Clipped);
          
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push (jpLayer2Clipped);
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
                opacity: 0.8,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push (jpLayerClipped);
        } else if (type === 'gsi-hillshade-standard') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 0,
                maxZoom,
                opacity: 0.6,
              });
          layers.push (wLayer);

          let jpLayer1 = L.tileLayer
          ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23ededed'/%3E%3C/svg%3E", {
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
                opacity: 0.6,
              });
          let jpLayer1Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer1, {boundary: JPGSIMapBoundary});
          layers.push (jpLayer1Clipped);
          
          let jpLayer2 = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
                opacity: 0.6,
              });
          let jpLayer2Clipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer2, {boundary: JPGSIMapBoundary});
          layers.push (jpLayer2Clipped);

          /*
          var wGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            //errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers.push (wGSI);
          */
          
          var jpGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            //errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
            //minZoom: 9,
          });
          layers.push (jpGSI);
          /*
          let jpGSIClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpGSI, {boundary: JPGSIMapBoundary});
          layers.push (jpGSIClipped);
          */
        } else if (type === 'gsi-photo') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push (wLayer);
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push (jpLayerClipped);
        } else if (type === 'gsi-photo-standard') {
          let wLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                errorTileUrl,
                maxNativeZoom: 8,
                minNativeZoom: 2,
                maxZoom,
              });
          layers.push (wLayer);
          
          let jpLayer = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
                attribution: gsiPhotoCreditHTML,
                maxNativeZoom: 18,
                minNativeZoom: 2,
                maxZoom,
                minZoom: 9,
              });
          let jpLayerClipped = L.TileLayer.BoundaryCanvas.createFromLayer
              (jpLayer, {boundary: JPGSIMapBoundary});
          layers.push (jpLayerClipped);

          let lGSI = L.gridLayer.gsiOverlay ({
            //attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers.push (lGSI);
        } else if (type === 'himawari') {
          let lHimawari = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'himawari',
            param1: sTypeParam1,
            noTimestamp,
          });
          layers.push (lHimawari);
          noTimestamp = true;
        } else if (type === 'himawari+gsi-standard') {
          let lHimawari = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'himawari',
            param1: sTypeParam1,
            noTimestamp,
          });
          layers.push (lHimawari);
          noTimestamp = true;
          let lGSI = L.gridLayer.gsiOverlay ({
            attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers.push (lGSI);
        } else if (type === 'jma-umimesh-wind') {
          let layer = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'umimeshwind',
            noTimestamp,
          });
          layers.push (layer);
          noTimestamp = true;
          let layerD = L.tileLayer.jma ({
            maxZoom,
            type: 'umimeshwinddir',
            noTimestamp,
            map,
          });
          layers.push (layerD);
        } else if (type === 'jma-umimesh-wind+gsi-standard') {
          let layer = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'umimeshwind',
            noTimestamp,
          });
          layers.push (layer);
          noTimestamp = true;
          let layerD = L.tileLayer.jma ({
            maxZoom,
            type: 'umimeshwinddir',
            noTimestamp,
            map,
          });
          layers.push (layerD);
          let lGSI = L.gridLayer.gsiOverlay ({
            attribution: gsiCreditHTML,
            errorTileUrl,
            maxNativeZoom: 18,
            minNativeZoom: 2,
            maxZoom,
          });
          layers.push (lGSI);
        } else if (type === 'osm') {
          // <https://operations.osmfoundation.org/policies/tiles/>
          // <https://osmfoundation.org/wiki/Licence/Attribution_Guidelines>
          let wLayer = L.tileLayer
              ('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: osmCreditHTML,
                errorTileUrl,
                maxNativeZoom: 19,
                maxZoom,
              });
          layers.push (wLayer);
        } else if (type === 'osm-gsi-hillshade') {
          let lShade = L.tileLayer
              ('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
                attribution: gsiCreditHTML,
                errorTileUrl,
                maxNativeZoom: 16,
                minNativeZoom: 2,
                maxZoom,
                opacity: 0.8,
              });
          layers.push (lShade);
          
          let wLayer = L.tileLayer
              ('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: osmCreditHTML,
                errorTileUrl,
                maxNativeZoom: 19,
                maxZoom,
                opacity: 0.8,
              });
          layers.push (wLayer);
        } else if (type === 'none') {
          //
        }

        var noTimestamp = false;
        if (this.pcJMANowc_rain) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'rain',
            noTimestamp,
          });
          layers.push (lNowc);
          noTimestamp = true;
        }
        if (this.pcJMANowc_thns) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'thns',
            noTimestamp,
          });
          layers.push (lNowc);
          noTimestamp = true;
        }
        if (this.pcJMANowc_trns) {
          var lNowc = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'trns',
            noTimestamp,
          });
          layers.push (lNowc);
          noTimestamp = true;
        }
        ['precipitation10m', 'precipitation1h', 'precipitation3h',
         'precipitation24h', 'temp', 'sun1h', 'humidity',
         'snow', 'snow6h', 'snow12h', 'snow24h'].forEach (k => {
          if (this['pcJMANowc_' + k]) {
            let l = L.tileLayer.jma ({
              maxZoom,
              errorTileUrl,
              type: 'amedas',
              param1: k,
              noTimestamp,
              map,
            });
            layers.push (l);
            noTimestamp = true;
          }
        });
        if (this.pcJMANowc_wind) {
          let l = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'windDirection',
            noTimestamp,
            map,
          });
          layers.push (l);
          noTimestamp = true;
          let m = L.tileLayer.jma ({
            maxZoom,
            errorTileUrl,
            type: 'amedas',
            param1: 'wind',
            noTimestamp,
            map,
          });
          layers.push (m);
        }

        layers.forEach (l => l.pcIsMapTypeLayer = true);
        
        map.eachLayer (l => {
          if (l.pcIsMapTypeLayer) map.removeLayer (l);
        });
        layers.forEach (l => map.addLayer (l));
        this.classList.toggle ('paco-maptype-none', type === 'none');
        this.dispatchEvent (new Event ('pcMapTypeChange'));
      }, // pcChangeMapType

      pcInitCurrentPosition: function () {
        if (navigator.permissions && navigator.permissions.query) {
          navigator.permissions.query ({name: "geolocation"}).then (ps => {
            if (ps.state === 'granted') this.pcLocateCurrentPosition ({});
          });
        }
      }, // pcInitCurrentPosition
      pcLocateCurrentPosition: function (opts) {
        if (opts.pan) {
          if (this.pcCurrentPosition) {
            this.maRedraw ({
              center: this.pcCurrentPosition,
            });
          } else {
            this.pcLocateCurrentPositionPanRequested = true;
          }
        }
        if (this.pcWatchPosition) return;
        this.pcWatchPosition = navigator.geolocation.watchPosition ((p) => {
          this.pcCurrentPosition = {
            lat: p.coords.latitude,
            lon: p.coords.longitude,
            //latLonAccuracy: p.coords.accuracy,
          };
          this.maRedraw ({currentPositionMarker: true});
          if (this.pcLocateCurrentPositionPanRequested) {
            this.maRedraw ({
              center: this.pcCurrentPosition,
            });
            delete this.pcLocateCurrentPositionPanRequested;
          }
        }, e => {
          if (e.code === GeolocationPositionError.PERMISSION_DENIED) {
            delete this.pcWatchPosition;

            // recompute!
            var m = this.pcInternal.parseCSSString (getComputedStyle (this).getPropertyValue ('--paco-geolocation-failed-message'), 'Failed to get the current position');
            this.pcInternal.$paco.showToast ({text: m, className: 'paco-geolocation-failed'});
          }
          console.log (e);
        });
      }, // pcLocateCurrentPosition

      pcStartStreetViewDragMode: function (src) {
        var handlers = [];
        this.addEventListener ('dragover', handlers[0] = ev => {
          ev.preventDefault ();
        });
        this.addEventListener ('drop', handlers[1] = ev => {
          var ll = this.pcLMap.mouseEventToLatLng (ev);
          var u = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + ll.lat + ',' + ll.lng;
          window.open (u, '_blank', 'noreferrer');
        });

        src.addEventListener ('dragend', handlers[2] = ev => {
          this.removeEventListener ('dragover', handlers[0]);
          this.removeEventListener ('drop', handlers[1]);
          src.removeEventListener ('dragend', handlers[2]);
        });
      }, // pcStartStreetViewDragMode

      pcMarkerMoveEnd: function (p) {
        this.pcValue = p;
        this.dispatchEvent (new Event ('input', {bubbles: true, composed: true}));
        this.dispatchEvent (new Event ('change', {bubbles: true}));
      }, // pcMarkerMoveEnd

      addElementOverlays: function (elements, redraw) {
        var map = this.maGoogleMap;
        if (map) {
          var Overlay = function () { };
          Overlay.prototype = new google.maps.OverlayView ();
          Overlay.prototype.onAdd = function () {
            var panes = this.getPanes ();
            panes.overlayLayer.appendChild (elements.background);
            panes.overlayLayer.appendChild (elements.foreground);
            panes.floatPane.appendChild (elements.tooltip);
            panes.floatPane.appendChild (elements.interactive);
          }; // onAdd
          Overlay.prototype.draw = redraw;
          Overlay.prototype.onRemove = function () {
            Object.values (elements).forEach (_ => _.remove ());
          }; // onRemove

          var overlay = new Overlay;
          overlay.setMap (map);
          
          return {
            ready: () => !!overlay.getProjection (),
            getProjection: function () {
              var projection = overlay.getProjection ();
              return {
                divPoint: p => projection.fromLatLngToDivPixel ({lat: p.lat, lng: p.lon}),
                containerPoint: p => {
                  // Force Google Maps API to recalc, otherwise it
                  // sometimes return wrong result:-<
                  projection.fromLatLngToContainerPixel ({lat: p.lat, lng: p.lon});

                  return projection.fromLatLngToContainerPixel ({lat: p.lat, lng: p.lon});
                },
              };
            }, // getProjection
            clickable: (e) => L.DomEvent.disableClickPropagation (e),
          };
        } // maGoogleMap

        var zoomstart = () => Object.values (elements).forEach (_ => _.classList.toggle ('paco-zoomstart', true));
        var zoom = () => Object.values (elements).forEach (_ => _.classList.toggle ('paco-zoomstart', false));
        
        var Layer = L.Layer.extend ({
          onAdd: function (map) {
            // overlay shadow marker tooltip popup
            var p1 = map.getPane ('overlayPane');
            p1.appendChild (elements.background);
            var p2 = map.getPane ('shadowPane');
            p2.appendChild (elements.foreground);
            var p3 = map.getPane ('tooltipPane');
            p3.appendChild (elements.tooltip);
            p3.appendChild (elements.interactive);

            map.on ('zoomstart', zoomstart);
            map.on ('zoom', zoom);
            map.on ('zoomend zoom viewreset moveend', redraw);

            Promise.resolve ().then (redraw);
          }, // onAdd
          onRemove: function(map) {
            Object.values (elements).forEach (_ => _.remove ());
            map.off ('zoomstart', zoomstart);
            map.off ('zoom', zoom);
            map.off ('zoomend zoom viewreset moveend', redraw);
          }, // onRemove
        }); // Layer

        var map = this.pcLMap;
        
        var l = new Layer ({});
        map.addLayer (l);
        
        var pp = {
          divPoint: p => map.latLngToLayerPoint ({lat: p.lat, lng: p.lon}),
          containerPoint: p => map.latLngToContainerPoint ({lat: p.lat, lng: p.lon}),
        };
        return {
          ready: () => true,
          getProjection: () => pp,
          clickable: (e) => L.DomEvent.disableClickPropagation (e),
        };
      }, // addElementOverlays


      setMouseHandlers: function (opts) {
        var handlers = this.pcMouseHandlers || {};
        handlers.mousedown = opts.mousedown || (() => {});
        handlers.mousemove = opts.mousemove || (() => {});
        handlers.mouseup = opts.mouseup || (() => {});

        if (this.pcMouseHandlers) return;
        this.pcMouseHandlers = handlers;

        var TE = window.TouchEvent || function () {};
        var getMouseButton = function () {
          // this.event: Leaflet MouseEvent || Google Maps MouseEvent
          var ev = this.event;
          var me = ev.originalEvent; // Leaflet
          if (!me) {
            var x = [];
            for (var n in ev) {
              x.push (n);
              if (ev[n] instanceof MouseEvent || ev[n] instanceof TE) {
                me = ev[n];
                break;
              }
            }
          }
          if (!me) return 'default';
          
          if (me instanceof TE) {
            // me.button : undefined, me.which : 0
            return 'left';
          }
          
          // MouseEvent
          if (me.button === 0) {
            return 'left';
          } else if (me.button === 2) {
            return 'right';
          } else {
            return 'other';
          }
        }; // getMouseButton

        if (this.pcLMap) {
          var getPoint = function () {
            var p = this.event.latlng;
            return {lat: p.lat, lon: p.lng};
          };
          this.pcLMap.on ('mousedown', event => {
            handlers.mousedown ({event, getMouseButton, getPoint});
          });
          this.pcLMap.on ('mousemove', event => {
            handlers.mousemove ({event, getMouseButton, getPoint});
          });
          this.pcLMap.on ('mouseup', event => {
            var obj = {event, getMouseButton, getPoint};
            handlers.mousemove (obj);
            handlers.mouseup (obj);
          }); // mouseup
        } else if (this.maGoogleMap) {
          var getPoint = function () {
            var p = this.event.latLng;
            return {lat: p.lat (), lon: p.lng ()};
          };
          this.maGoogleMap.addListener ('mousedown', event => {
            handlers.mousedown ({event, getMouseButton, getPoint});
          });
          this.maGoogleMap.addListener ('mousemove', event => {
            handlers.mousemove ({event, getMouseButton, getPoint});
          });
          this.maGoogleMap.addListener ('mouseup', event => {
            var obj = {event, getMouseButton, getPoint};
            
            // This is redundant but required for ChromeDriver + Google Maps :-<
            handlers.mousemove (obj);
            
            handlers.mouseup (obj);
          }); // mouseup
        }
      }, // setMouseHandlers
      
      pcModifyFormData: function (fd) {
        var latname = this.getAttribute ('latname') || '';
        var lonname = this.getAttribute ('lonname') || '';
        if (latname || lonname) {
          var v = this.valueAsLatLon;
          if (latname) fd.set (latname, v.lat);
          if (lonname) fd.set (lonname, v.lon);
        }
      }, // pcModifyFormData
    },
  }); // <map-area>

}) ();

/*

Copyright 2017-2022 Wakaba <wakaba@suikawiki.org>.

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
/* Leaflet */
/*
Copyright (c) 2010-2021, Vladimir Agafonkin
Copyright (c) 2010-2011, CloudMade
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*
MIT License

Copyright (c) 2018 Alexander Parshin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
