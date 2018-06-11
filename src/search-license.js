const {red} = require('chalk');
const fuzzy = require('fuzzy');
const {prompt} = require('inquirer');
const fullname = require('fullname');

const {licenses} = require('./licenses');
const {writeLicense} = require('./write-license');

exports.searchLicense = ({input}) => {
    let searchTerm = '';
    let i = 0;
    do {
        searchTerm += input[i++];
    } while (i < input.length - 1);

    const results = fuzzy
        .filter(searchTerm, Object.keys(licenses))
        .map(({original}) => original);

    if (!results.length) {
        process.stdout.write(red(`\n❌ No license name matching '${searchTerm}' was found.\nPlease try again with another name.\n`));
        return;
    }

    if (input.length === 1) {
        process.stdout.write('\n');
        prompt([
            {
                type: 'input',
                name: 'fullName',
                message: 'Enter your full name',
                default: fullname,
            }
        ]).then(({fullName}) => {
            writeLicense(fullName, results[0]);
        });
    } else {
        const fullName = input[input.length - 1];
        writeLicense(fullName, results[0]);
    }
};