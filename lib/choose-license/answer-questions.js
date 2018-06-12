"use strict";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const fuzzy = require('fuzzy');

const _require = require('inquirer'),
      registerPrompt = _require.registerPrompt,
      prompt = _require.prompt;

const autocompletePrompt = require('inquirer-autocomplete-prompt');

const _require2 = require('../licenses'),
      licenses = _require2.licenses;

const _require3 = require('./helpers'),
      calculateScore = _require3.calculateScore,
      getBooleanQuestion = _require3.getBooleanQuestion,
      purgeScoreZero = _require3.purgeScoreZero,
      sortDescendingByScore = _require3.sortDescendingByScore;
/**
 * Allowed values for the 'firstAnswer' variable.
 */


const firstAnswerValues = {
  simpleAndPermissive: 'simpleAndPermissive',
  patents: 'patents',
  shareImprovements: 'shareImprovements',
  more: 'more'
};
exports.answerQuestions =
/*#__PURE__*/
_asyncToGenerator(function* () {
  /**
   * Questions are inspired by https://choosealicense.com
   */
  const _ref2 = yield prompt([{
    type: 'list',
    name: 'firstAnswer',
    message: 'Choose what works best for you',
    choices: [{
      name: 'I want it simple and permissive',
      value: firstAnswerValues.simpleAndPermissive
    }, {
      name: 'I am concerned about patents',
      value: firstAnswerValues.patents
    }, {
      name: 'I care about sharing improvements',
      value: firstAnswerValues.shareImprovements
    }, {
      name: 'I want more choices',
      value: firstAnswerValues.more
    }]
  }]),
        firstAnswer = _ref2.firstAnswer;

  switch (firstAnswer) {
    case firstAnswerValues.simpleAndPermissive:
      return 'MIT';

    case firstAnswerValues.patents:
      return 'Apache 2.0';

    case firstAnswerValues.shareImprovements:
      return 'GNU General Public License';

    case firstAnswerValues.more:
    default:
      // In this case simply go on
      break;
  }

  const secondAnswer = yield prompt([getBooleanQuestion({
    name: 'patent',
    message: 'Do you want to provide an express grant of patent rights?'
  }), getBooleanQuestion({
    name: 'disclose',
    message: 'Do you want to enforce source disclosure when distributed?'
  }), getBooleanQuestion({
    name: 'licenseAndCopyright',
    message: 'Do you want to enforce attachment of license and copyright notice when distributed?'
  }), getBooleanQuestion({
    name: 'sameLicense',
    message: 'Do you want to enforce distribution of modification under the same license?'
  }), getBooleanQuestion({
    name: 'stateChanges',
    message: 'Do you want to enforce documentation for each change in the source?'
  }), getBooleanQuestion({
    name: 'trademark',
    message: 'Do you want to explicitly not grant any trademark right?'
  })]);
  /**
   * Array<[license, score]> where the higher the score, the closer the license is
   * to what the user asked.
   *
   * It's sorted in descending order, according to the score.
   * It's filtered to remove license with score zero.
   */

  const result = Object.entries(licenses).reduce((accumulator, [license, {
    attributes
  }]) => {
    const score = calculateScore({
      attributes,
      answer: secondAnswer
    });
    accumulator.push([license, score]);
    return accumulator;
  }, []).sort(sortDescendingByScore).filter(purgeScoreZero);

  if (result.length) {
    /**
     * If the highest score is the absolute best (aka the second best is
     * less than it) then we choose that one, otherwise we ask the user
     * to choose among the best matches
     */
    const highest = {
      name: result[0][0],
      value: result[0][1]
    };
    const second = {
      name: result[1][0],
      value: result[1][1]
    };
    const isHighestAbsoluteBest = highest.value > second.value;

    if (isHighestAbsoluteBest) {
      return highest.name;
    } else {
      const topLicenses = result.filter(item => item[1] === highest.value).map(item => item[0]);
      registerPrompt('autocomplete', autocompletePrompt);

      const _ref3 = yield prompt([{
        type: 'autocomplete',
        name: 'licenseName',
        message: 'We found more than one license matching your criteria, please choose one',
        choices: topLicenses.map(name => ({
          name
        })),
        pageSize: 10,
        highlight: true,
        searchable: true,

        source(answers, input) {
          return _asyncToGenerator(function* () {
            const fuzzyResult = fuzzy.filter(input || '', topLicenses);
            return fuzzyResult.map(({
              original
            }) => original);
          })();
        }

      }]),
            licenseName = _ref3.licenseName;

      return licenseName;
    }
  }
});