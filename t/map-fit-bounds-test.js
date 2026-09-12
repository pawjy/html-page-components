const assert = require ('node:assert/strict');
const fs = require ('node:fs');
const path = require ('node:path');
const test = require ('node:test');
const vm = require ('node:vm');

const root = path.join (__dirname, '..');
const source = fs.readFileSync (path.join (root, 'src/maps.js'), 'utf8');
const bundle = source.split ('\n').find (line =>
    line.startsWith ('!function(t,i){"object"==typeof exports'));
assert.ok (bundle, 'test the actual bundled Leaflet');
const context = {
  document: {documentElement: {style: {}},
    createElement: () => ({style: {}, getContext: () => ({})}),
    createElementNS: () => ({createSVGRect: () => ({})})},
  navigator: {userAgent: 'geometry-test', platform: 'Linux'},
  setTimeout, clearTimeout, screen: {deviceXDPI: 1, logicalXDPI: 1},
  exports: {},
};
context.window = context;
context.module = {exports: context.exports};
vm.runInNewContext (bundle, context);
const L = context.exports;
const scrollBody = source.match (/pcScroll: function \(opts\) \{([\s\S]*?)\n      \}, \/\/ pcScroll/)[1];
const scroll = new Function ('L', 'return function (opts) {' + scrollBody + '};') (L);

function makeMap (width, height, options = {}) {
  const map = Object.create (L.Map.prototype);
  map.options = {crs: L.CRS.EPSG3857, zoomSnap: 1, minZoom: 0, maxZoom: 22, ...options};
  map._zoom = 15;
  map._loaded = true;
  map.getSize = () => L.point (width, height);
  map._getMapPanePos = () => L.point (0, 0);
  map.setViewCalls = 0;
  // Only the DOM update is simulated; fitting, projection, rounding and
  // getBounds use the real library.  Browser integration checks the DOM path.
  map.setView = function (center, zoom) {
    this.setViewCalls++;
    this._zoom = this._limitZoom (zoom);
    this._pixelOrigin = this._getNewPixelOrigin (center, this._zoom);
    return this;
  };
  return map;
}
function fit (map, bounds) {
  const input = {north: bounds.getNorth (), south: bounds.getSouth (),
    east: bounds.getEast (), west: bounds.getWest ()};
  const before = {...input};
  const calls = map.setViewCalls;
  scroll.call ({pcLMap: map}, {bounds: input});
  assert.deepEqual (input, before, 'requested geographical bounds are unchanged');
  assert.equal (map.setViewCalls, calls + 1, 'one view update, not a retry');
}

test ('fixed rounding failures fit without weakening the containment check', () => {
  for (const index of [61, 64, 68]) {
    const bounds = L.latLngBounds ([35 + index / 100000, 135],
        [35 + index / 100000 + 0.021 + index / 1000000, 135.008]);
    const map = makeMap (800, 600);
    map.fitBounds (bounds);
    assert.equal (map.getBounds ().contains (bounds), false, 'the old direct fit fails');
    const oldZoom = map._zoom;
    fit (map, bounds);
    assert.equal (map.getBounds ().contains (bounds), true);
    assert.equal (map._zoom, oldZoom - 1);
  }
});

test ('100000 deterministic bounds cover latitude, viewport size and pixel boundaries', () => {
  let failuresBefore = 0;
  let changes = 0;
  for (const [width, height] of [[300, 384], [800, 600], [301, 383], [1600, 1200], [4096, 2048]]) {
    const map = makeMap (width, height);
    for (let i = 0; i < 20000; i++) {
      const lat = -79 + (i % 157) + (i % 31) / 10000;
      const lng = -170 + i % 337;
      const span = 0.015 + (i % 1000) / 10000;
      const bounds = L.latLngBounds ([lat, lng], [lat + span, lng + span / 3]);
      map.fitBounds (bounds);
      const oldZoom = map._zoom;
      const contained = map.getBounds ().contains (bounds);
      if (!contained) failuresBefore++;
      fit (map, bounds);
      assert.equal (map.getBounds ().contains (bounds), true);
      if (map._zoom !== oldZoom) changes++;
      if (contained) assert.equal (map._zoom, oldZoom, 'already fitting views retain their zoom');
    }
  }
  assert.ok (failuresBefore > 0);
  assert.equal (changes, failuresBefore, 'only the incorrectly fitted views change');
});

test ('single points, line bounds, includes and zoom limits retain their contracts', () => {
  for (const size of [[300, 384], [301, 383]]) {
    for (const bounds of [L.latLngBounds ([35, 135], [35, 135]),
      L.latLngBounds ([35, 135], [35, 136]), L.latLngBounds ([35, 135], [36, 135])]) {
      const map = makeMap (...size, {maxZoom: 18});
      fit (map, bounds);
      assert.ok (map._zoom <= 18);
      assert.equal (map.getBounds ().contains (bounds), true);
      scroll.call ({pcLMap: map}, {includes: [
        {lat: bounds.getNorth (), lon: bounds.getWest ()},
        {lat: bounds.getSouth (), lon: bounds.getEast ()},
      ]});
      assert.equal (map.getBounds ().contains (bounds), true);
    }
  }
  const map = makeMap (300, 384, {minZoom: 5, maxZoom: 5});
  fit (map, L.latLngBounds ([-80, -170], [80, 170]));
  assert.equal (map._zoom, 5, 'an impossible fit does not bypass an explicit minimum zoom');
});

test ('other map engines receive their original bounds', () => {
  const calls = [];
  const bounds = {north: 36, south: 35, west: 135, east: 136};
  scroll.call ({pc_MLMap: {fitBounds: (...args) => calls.push (args)},
    maGoogleMap: {fitBounds: (...args) => calls.push (args)}}, {bounds});
  assert.deepEqual (calls, [[[[135, 35], [136, 36]]], [bounds]]);
});

test ('maintained source and distributed pcScroll stay identical', () => {
  const maintained = fs.readFileSync (path.join (root, 'src/maps-src.js'), 'utf8');
  assert.equal (maintained.match (/pcScroll: function \(opts\) \{([\s\S]*?)\n      \}, \/\/ pcScroll/)[1], scrollBody);
});
