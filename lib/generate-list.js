"use strict";

const _require = require('./licenses'),
      licenses = _require.licenses;

const _require2 = require('./choose-license/pick-license.js'),
      pickLicense = _require2.pickLicense;

const _require3 = require('chalk'),
      green = _require3.green,
      bold = _require3.bold;

exports.generateList = () => {
  process.stdout.write('\n');
  pickLicense().then(name => {
    process.stdout.write(bold.green(`\n    ${name}:\n`));
    process.stdout.write(`\n${licenses[name].value}\n`);
  });
};