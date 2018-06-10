const fuzzy = require('fuzzy');
const {registerPrompt, prompt} = require('inquirer');
const autocompletePrompt = require('inquirer-autocomplete-prompt');

const {licenses} = require('../licenses');

const licenseNames = Object.keys(licenses);

exports.pickLicense = async () => {
    registerPrompt('autocomplete', autocompletePrompt);

    const {licenseName} = await prompt([
        {
            type: 'autocomplete',
            name: 'licenseName',
            message: 'License to be applied to this project',
            choices: licenseNames.map((name) => ({name})),
            pageSize: 10,
            highlight: true,
            searchable: true,
            async source(answers, input) {
                const fuzzyResult = fuzzy.filter(input || '', licenseNames);
                return fuzzyResult.map(({original}) => original);
            }
        }
    ]);

    return licenseName;
};