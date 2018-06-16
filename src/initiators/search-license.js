const {prompt}          = require('inquirer');
const {red}             = require('chalk');
const fullname          = require('fullname');
const fuzzy             = require('fuzzy');

const {licenses}        = require('../licenses');

let searchTerm = '';
const {writeLicense}    = require('./write-license');

exports.searchLicense = ({input}, flags) => {

    /**
     * All but last strings in input are
     * concatenated to form one search term 
     * on which a fuzzy search is performed 
     * to match a license name
    */

    let i = 0;
    do {
        searchTerm += input[i++];
    } while (i < input.length - 1);

    // Fuzzy search
    const results = fuzzy
        .filter(searchTerm, Object.keys(licenses))
        .map(({original}) => original);

    /**
     * If no results for the search
     * term are found, output err 
     * message and abort.
     */

    if (!results.length) {
        process.stdout.write(red(`\n❌ No license name matching '${searchTerm}' was found.\nPlease try again with another name.\n`));
        return;
    }

    /**
     * If called with a year flag use
     * that value else get current year
     */
    const year = flags.hasOwnProperty('y') ? flags.y : (new Date).getFullYear();

    /**
     * If there is only string in
     * input then that string is the 
     * license name and prompt user
     * to enter their full name.
     */

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
            writeLicense(fullName, results[0], year);
        });
    }
    
    /**
     * If >= 2 input strings
     * the last string is the full name
     * and license name is the first result
     * out of the (if it so happens) many results.
     */

    else {
        const fullName = input[input.length - 1];
        writeLicense(fullName, results[0], year);
    }

};