"use strict";

const _require = require('path'),
      resolve = _require.resolve;

const _require2 = require('chalk'),
      red = _require2.red,
      green = _require2.green;

const fs = require('fs');

const _require3 = require('./licenses'),
      licenses = _require3.licenses;

exports.writeLicense = (fullName, licenseName, year) => {
  const license = licenses[licenseName].value;
  const text = `Copyright (c) ${year}, ${fullName}\n\n${license}`;
  fs.writeFile(resolve(process.cwd(), 'LICENSE'), text, err => {
    if (err) {
      process.stdout.write(red.bold('\n❌ An error occured. Please try again.\n'));
      return err;
    }

    process.stdout.write(green.bold(`\n✔️ Successfully created LICENSE file with ${licenseName}\n`));
  });
};