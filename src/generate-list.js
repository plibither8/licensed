const {licenseNames} = require('./licenses');

exports.generateList = () => {

    process.stdout.write('\n');
    licenseNames.map((name, index) => process.stdout.write(`   ${index + 1}. ${name}\n`));

};