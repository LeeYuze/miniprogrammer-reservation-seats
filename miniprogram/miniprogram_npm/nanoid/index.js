module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1663211652388, function(require, module, exports) {
var __TEMP__ = require('crypto-js');var randomFillSync = __TEMP__['randomFillSync'];
var __TEMP__ = require('./url-alphabet/index.js');var urlAlphabet = __TEMP__['urlAlphabet'];
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, 'urlAlphabet', { enumerable: true, configurable: true, get: function() { return urlAlphabet; } });
const POOL_SIZE_MULTIPLIER = 128
let pool, poolOffset
let fillPool = bytes => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER)
    randomFillSync(pool)
    poolOffset = 0
  } else if (poolOffset + bytes > pool.length) {
    randomFillSync(pool)
    poolOffset = 0
  }
  poolOffset += bytes
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var random = exports.random = bytes => {
  fillPool((bytes -= 0))
  return pool.subarray(poolOffset - bytes, poolOffset)
};
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var customRandom = exports.customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1
  let step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let i = step
      while (i--) {
        id += alphabet[bytes[i] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
};
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var customAlphabet = exports.customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var nanoid = exports.nanoid = (size = 21) => {
  fillPool((size -= 0))
  let id = ''
  for (let i = poolOffset - size; i < poolOffset; i++) {
    id += urlAlphabet[pool[i] & 63]
  }
  return id
};

}, function(modId) {var map = {"./url-alphabet/index.js":1663211652389}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1663211652389, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var urlAlphabet = exports.urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1663211652388);
})()
//miniprogram-npm-outsideDeps=["crypto-js"]
//# sourceMappingURL=index.js.map