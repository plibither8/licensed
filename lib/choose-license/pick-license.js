"use strict";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const fuzzy = require('fuzzy');

const _require = require('inquirer'),
      registerPrompt = _require.registerPrompt,
      prompt = _require.prompt;

const autocompletePrompt = require('inquirer-autocomplete-prompt');

const _require2 = require('../licenses'),
      licenseNames = _require2.licenseNames;

exports.pickLicense =
/*#__PURE__*/
_asyncToGenerator(function* () {
  registerPrompt('autocomplete', autocompletePrompt);

  const _ref2 = yield prompt([{
    type: 'autocomplete',
    name: 'licenseName',
    message: 'View a license',
    choices: licenseNames.map(name => ({
      name
    })),
    pageSize: 10,
    highlight: true,
    searchable: true,

    source(answers, input) {
      return _asyncToGenerator(function* () {
        const fuzzyResult = fuzzy.filter(input || '', licenseNames);
        return fuzzyResult.map(({
          original
        }) => original);
      })();
    }

  }]),
        licenseName = _ref2.licenseName;

  return licenseName;
});