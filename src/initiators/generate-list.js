const {green} = require('chalk');
const boxen = require('boxen');
const wrap = require('word-wrap');

const {licenses}        = require('../licenses');
const {pickLicense}     = require('../choose-license/pick-license.js');

exports.generateList = () => {
    process.stdout.write('\n');
    pickLicense().then(name => {

        process.stdout.write(`\n    ${green.underline(name)}\n\n`);
        process.stdout.write(
            boxen(
                wrap(
                    licenses[name].value, {
                        width: 90
                    }),
                {
                    borderStyle: 'round',
                    dimBorder: true,
                })
            + '\n');

    });
};