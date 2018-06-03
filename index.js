#!/usr/bin/env node
const meow = require("meow");

const cli = meow(`This is a really simple script to help
you add a license to your open source project. Read more
about the different types of open source licenses on
https://opensource.org/licenses.

Usage
$ licenced <license-name>
$ licenced # brings up a helpful multiselect prompt

Examples
$ licenced mit`);

const writeLicense = (fullName, index) => {

    const {resolve} = require("path");
    const {green} = require("chalk");
    const {licenseList} = require("./licenses.js");
    const fs = require("fs");

    const year = (new Date).getFullYear();
    const license = licenseList[index];
    const text = `Copyright ${year} ${fullName}

${license}`;

    fs.writeFile(resolve(process.cwd(), "LICENSE"), text, (err) => {
        if(err) {
            return err;
        }
        console.log("yay.")
    })

};

/**
 * If called without inputs,
 * get a list of available inputs and prompt the
 * user to choose some stuff.
 */
if (!cli.input.length) {

    const {registerPrompt, prompt} = require("inquirer");
    const fuzzy = require("fuzzy");

    const licenseList = [
        "Apache 2.0",
        "BSD-2-Clause",
        "BSD-3-Clause",
        "GNU General Public License",
        "MIT",
        "Mozilla Public License 2.0",
    ];

    console.log();

    prompt([
        {
            type: "input",
            name: "fullName",
            message: "Full Name:",
        }, {
            type: "list",
            name: "licenseName",
            message: "Please select the license to be applied on this project",
            choices: licenseList.map(name => ({name})),
            pageSize: 10,
            highlight: true,
            searchable: true,
            source: (answersSoFar, input = "") =>
                Promise.resolve(
                    fuzzy.filter(input, licenseList).map(({original}) => original)
                ),
        }
    ]).then(({fullName, licenseName}) => {
        licenseIndex = licenseList.indexOf(licenseName);
        writeLicense(fullName, licenseIndex);
    });

} else {
    console.log("no inputs rn");
}