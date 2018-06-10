const {readFileSync} = require('fs');
const {resolve} = require('path');

const licensesFolder = resolve(__dirname, '..', 'assets', 'licenses')

exports.licenses = {
    'Apache 2.0': readFileSync(resolve(licensesFolder, 'Apache 2.0'), 'utf-8'),
    'BSD-2-Clause': readFileSync(resolve(licensesFolder, 'BSD-2-Clause'), 'utf-8'),
    'BSD-3-Clause': readFileSync(resolve(licensesFolder, 'BSD-3-Clause'), 'utf-8'),
    'GNU General Public License': readFileSync(resolve(licensesFolder, 'GNU General Public License'), 'utf-8'),
    'ISC License': readFileSync(resolve(licensesFolder, 'ISC License'), 'utf-8'),
    'MIT': readFileSync(resolve(licensesFolder, 'MIT'), 'utf-8'),
    'Mozilla Public License 2.0': readFileSync(resolve(licensesFolder, 'Mozilla Public License 2.0'), 'utf-8')
};