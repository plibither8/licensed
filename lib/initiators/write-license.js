"use strict";

const _require = require('path'),
      resolve = _require.resolve;

const _require2 = require('chalk'),
      red = _require2.red,
      green = _require2.green;

const _require3 = require('fs'),
      writeFile = _require3.writeFile;

const wrap = require('word-wrap');

const _require4 = require('../licenses'),
      licenses = _require4.licenses;

exports.writeLicense = (fullName, licenseName, year) => {
  // Wrap license text to 80 characters
  const license = wrap(licenses[licenseName].value, {
    width: 80,
    indent: '',
    trim: true
  });
  const text = `Copyright (c) ${year}, ${fullName}\n\n${license}`; // Main writing-file function

  writeFile(resolve(process.cwd(), 'LICENSE'), text, err => {
    if (err) {
      process.stdout.write(red.bold('\n❌ An error occured. Please try again.\n'));
      return err;
    }

    process.stdout.write(green.bold(`\n✔️ Successfully created LICENSE file with ${licenseName}\n`));
  });
};