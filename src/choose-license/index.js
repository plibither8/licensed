const {red} = require('chalk');
const {prompt} = require('inquirer');
const fullname = require('fullname');

const {writeLicense} = require('../write-license');

const {answerQuestions} = require('./answer-questions');
const {pickLicense} = require('./pick-license');


/**
 * Allowed values for the 'choose' variable.
 */
const chooseValues = {
    questions: 'questions',
    pick: 'pick'
};

exports.chooseLicense = async (flags) => {
    process.stdout.write('\n');
    const {fullName, choose} = await prompt([
        {
            type: 'input',
            name: 'fullName',
            message: 'Full name',
            default: fullname,
        }, {
            type: 'list',
            name: 'choose',
            message: 'How would you like to choose your license?',
            choices: [
                {
                    name: 'Answer questions about the license',
                    value: chooseValues.questions
                },
                {
                    name: 'Pick one from a list',
                    value: chooseValues.pick
                },
            ]
        }
    ]);

    const licenseName = await (() => {
        switch (choose) {
        case chooseValues.questions:
            return answerQuestions();
        case chooseValues.pick:
            return pickLicense();
        }
    })();

    if(licenseName) {

        const year = flags.hasOwnProperty('y') ? flags.y : (new Date).getFullYear();
        writeLicense(fullName, licenseName, year);

    } else {
        process.stdout.write(red('\n❌ No license name matching your criteria was found.\nPlease try again.\n'));
    }
};