"use strict";

const _require = require('chalk'),
      green = _require.green;

const boxen = require('boxen');

const wrap = require('word-wrap');

const _require2 = require('../licenses'),
      licenses = _require2.licenses;

const _require3 = require('../choose-license/pick-license.js'),
      pickLicense = _require3.pickLicense;

exports.generateList = () => {
  process.stdout.write('\n');
  pickLicense().then(name => {
    process.stdout.write(`\n    ${green.underline(name)}\n\n`);
    process.stdout.write(boxen(wrap(licenses[name].value, {
      width: 90
    }), {
      borderStyle: 'round',
      dimBorder: true
    }) + '\n');
  });
};