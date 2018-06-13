"use strict";

const _require = require('chalk'),
      green = _require.green;

const _require2 = require('../licenses'),
      licenses = _require2.licenses;

const _require3 = require('../choose-license/pick-license.js'),
      pickLicense = _require3.pickLicense;

exports.generateList = () => {
  process.stdout.write('\n');
  pickLicense().then(name => {
    process.stdout.write(`\n    ${green.underline(name)}\n`);
    process.stdout.write(`\n${licenses[name].value}\n`);
  });
};