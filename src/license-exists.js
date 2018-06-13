const {resolve} = require('path');
const {existsSync} = require('fs');
const {prompt} = require('inquirer');
const {red} = require('chalk');
const {readFileSync} = require('fs');
const {underline} = require('chalk');

const choices = [
    'Do not create a new LICENSE file',
    'View existing LICENSE file',
    'Overwrite current LICENSE file and create a new one'
];

exports.licenseFileExists = () => {
    return existsSync(resolve(process.cwd(), 'LICENSE'));
};

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

exports.viewExistingLicense = () => {

    const licenseText = readFileSync(resolve(process.cwd(), 'LICENSE'));
    process.stdout.write(`\n    ${underline('Existing LICENSE file:')}\n\n${licenseText}\n`);

};

exports.licenseExistsExit = () => {
    process.stdout.write(red.bold('\n❌ LICENSE file not created.\n'));
};

exports.licenseExistsPromptChoices = choices;