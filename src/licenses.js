const {readFileSync} = require('fs');
const {resolve} = require('path');

const licensesFolder = resolve(__dirname, '..', 'assets', 'licenses');

const licenses = {
    'Apache 2.0': {
        value: readFileSync(resolve(licensesFolder, 'Apache 2.0'), 'utf-8'),
        attributes: {
            patent: true,
            disclose: false,
            licenseAndCopyright: true,
            sameLicense: false,
            stateChanges: true,
            trademark: true
        }
    },
    'BSD-2-Clause': {
        value: readFileSync(resolve(licensesFolder, 'BSD-2-Clause'), 'utf-8'),
        attributes: {
            patent: false,
            disclose: false,
            licenseAndCopyright: true,
            sameLicense: false,
            stateChanges: false,
            trademark: false
        }
    },
    'BSD-3-Clause': {
        value: readFileSync(resolve(licensesFolder, 'BSD-3-Clause'), 'utf-8'),
        attributes: {
            patent: false,
            disclose: false,
            licenseAndCopyright: true,
            sameLicense: false,
            stateChanges: false,
            trademark: false
        }
    },
    'GNU General Public License': {
        value: readFileSync(resolve(licensesFolder, 'GNU General Public License'), 'utf-8'),
        attributes: {
            patent: false,
            disclose: true,
            licenseAndCopyright: true,
            sameLicense: true,
            stateChanges: true,
            trademark: false
        }
    },
    'ISC License': {
        value: readFileSync(resolve(licensesFolder, 'ISC License'), 'utf-8'),
        attributes: {
            patent: false,
            disclose: false,
            licenseAndCopyright: true,
            sameLicense: false,
            stateChanges: false,
            trademark: false
        }
    },
    'MIT': {
        value: readFileSync(resolve(licensesFolder, 'MIT'), 'utf-8'),
        attributes: {
            patent: false,
            disclose: false,
            licenseAndCopyright: true,
            sameLicense: false,
            stateChanges: false,
            trademark: false
        }
    },
    'Mozilla Public License 2.0': {
        value: readFileSync(resolve(licensesFolder, 'Mozilla Public License 2.0'), 'utf-8'),
        attributes: {
            patent: true,
            disclose: true,
            licenseAndCopyright: true,
            sameLicense: true,
            stateChanges: false,
            trademark: true
        }
    }
};

exports.licenses = licenses;
exports.licenseNames = Object.keys(licenses);