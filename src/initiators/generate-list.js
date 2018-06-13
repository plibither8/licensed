const {green}           = require('chalk');

const {licenses}        = require('../licenses');
const {pickLicense}     = require('../choose-license/pick-license.js');

exports.generateList = () => {

    process.stdout.write('\n');

    pickLicense().then(name => {
        process.stdout.write(`\n    ${green.underline(name)}\n`);
        process.stdout.write(`\n${licenses[name].value}\n`);
    });

};