const {licenses} = require('./licenses');
const {pickLicense} = require('./choose-license/pick-license.js');
const {green, bold} = require('chalk');

exports.generateList = () => {

    process.stdout.write('\n');

    pickLicense().then(name => {
        process.stdout.write(bold.green(`\n    ${name}:\n`))
        process.stdout.write(`\n${licenses[name].value}\n`);
    });

};