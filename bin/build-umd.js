const fs = require('fs')
const { resolve } = require('path')

const cwd = process.cwd()

function run () {
  const pre = `// https://github.com/zxdong262/universe
  ;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define([], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory();
    } else {
      root.UniverseBg = factory();
    }
  }(typeof self !== 'undefined' ? self : this, function () {`

  const after = 'return UniverseBg}));'
  const p = resolve(cwd, 'dist/universe-bg.js')
  let str = '' + fs.readFileSync(p, 'utf-8')
  str = str
    .replace('"use strict";', '')
    .replace('Object.defineProperty(exports, "__esModule", { value: true });', pre)
    .replace('exports.default = UniverseBg;', '')
    .replace('module.exports = UniverseBg;', after)
  fs.writeFileSync(p, str)
}

run()