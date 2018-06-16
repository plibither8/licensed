"use strict";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const _require = require('chalk'),
      red = _require.red,
      underline = _require.underline;

const _require2 = require('fs'),
      existsSync = _require2.existsSync,
      readFileSync = _require2.readFileSync;

const _require3 = require('inquirer'),
      prompt = _require3.prompt;

const _require4 = require('path'),
      resolve = _require4.resolve;

const boxen = require('boxen');

const wrap = require('word-wrap');

const choices = ['Do not create a new LICENSE file', 'View existing LICENSE file', 'Overwrite current LICENSE file and create a new one'];
/**
 * Boolean: Checks whether `LICENSE` file exists in directory or not
 */

exports.licenseFileExists = () => {
  return existsSync(resolve(process.cwd(), 'LICENSE'));
};
/**
 * List-prompt to enter how to proceed
 */


exports.licenseExistsPrompt =
/*#__PURE__*/
_asyncToGenerator(function* () {
  process.stdout.write('\n');

  const _ref2 = yield prompt([{
    type: 'rawlist',
    name: 'licenseExistsResponse',
    message: 'A LICENSE file already exists in this directory. Please choose how to proceed:',
    choices: choices,
    highlight: true,
    searchable: true
  }]),
        licenseExistsResponse = _ref2.licenseExistsResponse;

  return licenseExistsResponse;
});
/**
 * cat the currently present LICENSE file
 */

exports.viewExistingLicense = () => {
  const licenseText = readFileSync(resolve(process.cwd(), 'LICENSE'));
  process.stdout.write(`\n    ${underline('Existing LICENSE file:')}\n\n`);
  process.stdout.write(boxen(wrap(licenseText.toString(), {
    width: 90
  }), {
    borderStyle: 'round',
    dimBorder: true
  }) + '\n');
};
/**
 * Abort the process
 */


exports.licenseExistsExit = () => {
  process.stdout.write(red.bold('\n❌ LICENSE file not created.\n'));
};

exports.licenseExistsPromptChoices = choices;