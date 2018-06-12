"use strict";

const _require = require('./licenses'),
      licenseNames = _require.licenseNames;

exports.generateList = () => {
  process.stdout.write('\n');
  licenseNames.map((name, index) => process.stdout.write(`   ${index + 1}. ${name}\n`));
};