const {red, underline}              = require('chalk');
const {existsSync, readFileSync}    = require('fs');
const {prompt}                      = require('inquirer');
const {resolve}                     = require('path');
const boxen                         = require('boxen');
const wrap                          = require('word-wrap');

const choices = [
    'Do not create a new LICENSE file',
    'View existing LICENSE file',
    'Overwrite current LICENSE file and create a new one'
];

/**
 * Boolean: Checks whether `LICENSE` file exists in directory or not
 */
exports.licenseFileExists = () => {
    return existsSync(resolve(process.cwd(), 'LICENSE'));
};

/**
 * List-prompt to enter how to proceed
 */
exports.licenseExistsPrompt = async () => {
    process.stdout.write('\n');

    const {licenseExistsResponse} = await prompt([
        {
            type: 'rawlist',
            name: 'licenseExistsResponse',
            message: 'A LICENSE file already exists in this directory. Please choose how to proceed:',
            choices: choices,
            highlight: true,
            searchable: true,
        }
    ]);

    return licenseExistsResponse;
};

/**
 * cat the currently present LICENSE file
 */
exports.viewExistingLicense = () => {

    const licenseText = readFileSync(resolve(process.cwd(), 'LICENSE'));
    process.stdout.write(`\n    ${underline('Existing LICENSE file:')}\n\n`);
    process.stdout.write(
        boxen(
            wrap(
                licenseText.toString(), {
                    width: 90
                }),
            {
                borderStyle: 'round',
                dimBorder: true,
            })
        + '\n');

};

/**
 * Abort the process
 */
exports.licenseExistsExit = () => {
    process.stdout.write(red.bold('\n❌ LICENSE file not created.\n'));
};

exports.licenseExistsPromptChoices = choices;