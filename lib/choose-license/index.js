"use strict";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const _require = require('chalk'),
      red = _require.red;

const _require2 = require('inquirer'),
      prompt = _require2.prompt;

const fullname = require('fullname');

const _require3 = require('../initiators/write-license'),
      writeLicense = _require3.writeLicense;

const _require4 = require('./answer-questions'),
      answerQuestions = _require4.answerQuestions;

const _require5 = require('./pick-license'),
      pickLicense = _require5.pickLicense;
/**
 * Allowed values for the 'choose' variable.
 */


const chooseValues = {
  questions: 'questions',
  pick: 'pick'
};

exports.chooseLicense =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (flags) {
    process.stdout.write('\n');

    const _ref2 = yield prompt([{
      type: 'input',
      name: 'fullName',
      message: 'Full name',
      default: fullname
    }, {
      type: 'list',
      name: 'choose',
      message: 'How would you like to choose your license?',
      choices: [{
        name: 'Answer questions about the license',
        value: chooseValues.questions
      }, {
        name: 'Pick one from a list',
        value: chooseValues.pick
      }]
    }]),
          fullName = _ref2.fullName,
          choose = _ref2.choose;

    const licenseName = yield (() => {
      switch (choose) {
        case chooseValues.questions:
          return answerQuestions();

        case chooseValues.pick:
          return pickLicense();
      }
    })();

    if (licenseName) {
      const year = flags.hasOwnProperty('y') ? flags.y : new Date().getFullYear();
      writeLicense(fullName, licenseName, year);
    } else {
      process.stdout.write(red('\n❌ No license name matching your criteria was found.\nPlease try again.\n'));
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();