"use strict";

const _require = require('inquirer'),
      prompt = _require.prompt;

const _require2 = require('chalk'),
      red = _require2.red;

const fullname = require('fullname');

const fuzzy = require('fuzzy');

const _require3 = require('../licenses'),
      licenses = _require3.licenses;

const _require4 = require('./write-license'),
      writeLicense = _require4.writeLicense;

exports.searchLicense = ({
  input
}, flags) => {
  let searchTerm = '';
  let i = 0;

  do {
    searchTerm += input[i++];
  } while (i < input.length - 1);

  const results = fuzzy.filter(searchTerm, Object.keys(licenses)).map(({
    original
  }) => original);

  if (!results.length) {
    process.stdout.write(red(`\n❌ No license name matching '${searchTerm}' was found.\nPlease try again with another name.\n`));
    return;
  }

  const year = flags.hasOwnProperty('y') ? flags.y : new Date().getFullYear();

  if (input.length === 1) {
    process.stdout.write('\n');
    prompt([{
      type: 'input',
      name: 'fullName',
      message: 'Enter your full name',
      default: fullname
    }]).then(({
      fullName
    }) => {
      writeLicense(fullName, results[0], year);
    });
  } else {
    const fullName = input[input.length - 1];
    writeLicense(fullName, results[0], year);
  }
};