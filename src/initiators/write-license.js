const {resolve}     = require('path');
const {red, green}  = require('chalk');
const {writeFile}   = require('fs');
const wrap          = require('word-wrap');

const {licenses}    = require('../licenses');

exports.writeLicense = (fullName, licenseName, year) => {

    const license = wrap(
        licenses[licenseName].value, {
            width: 80,
            indent: '',
            trim: true
        });
    const text = `Copyright (c) ${year}, ${fullName}\n\n${license}`;

    writeFile(resolve(process.cwd(), 'LICENSE'), text, (err) => {
        if (err) {
            process.stdout.write(red.bold('\n❌ An error occured. Please try again.\n'));
            return err;
        }
        process.stdout.write(green.bold(`\n✔️ Successfully created LICENSE file with ${licenseName}\n`));
    });

};
