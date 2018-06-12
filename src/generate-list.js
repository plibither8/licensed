const {licenses} = require('./licenses');
const {pickLicense} = require('./choose-license/pick-license.js');
const {green} = require('chalk');

exports.generateList = () => {

    process.stdout.write('\n');

    pickLicense().then(name => {
        process.stdout.write(green.bold(`\n    ${name}:\n`));
        process.stdout.write(`\n${licenses[name].value}\n`);
    });

};