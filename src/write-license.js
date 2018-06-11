const {resolve} = require('path');
const {red, green} = require('chalk');
const fs = require('fs');

const {licenses} = require('./licenses');

exports.writeLicense = (fullName, licenseName, year) => {
    // const year = (new Date).getFullYear();
    const license = licenses[licenseName].value;
    const text = `Copyright (c) ${year}, ${fullName}\n\n${license}`;

    fs.writeFile(resolve(process.cwd(), 'LICENSE'), text, (err) => {
        if (err) {
            process.stdout.write(red.bold('\n❌ An error occured. Please try again.\n'));
            return err;
        }
        process.stdout.write(green.bold(`\n✔️ Successfully created LICENSE file with ${licenseName}\n`));
    });

};
