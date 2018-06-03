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

const writeLicense = (username, name) => {
    
    const {resolve} = require("path");
    const {createWriteStream} = require("fs");
    const licenses = require("./licenses.json");
    const {green} = require("chalk");
    
};

/**
 * If called without inputs,
 * get a list of available inputs and prompt the
 * user to choose some stuff.
 */
if (!cli.input.length) {

    const {registerPrompt, prompt} = require("inquirer");
    const fuzzy = require("fuzzy");

    const licenses = [
        "Apache 2.0",
        "BSD 3",
        "BSD 2",
        "GNU General Public License",
        "GNU Library",
        "MIT",
        "Mozilla Public License 2.0",
        "Common Development and Distribution License",
        "Eclipse Public License"
    ];

    console.log();

    prompt([
        {
            type: "input",
            name: "name",
            message: "Full Name:",
        }, {
            type: "list",
            name: "input",
            message: "Please select the license to be applied on this project",
            choices: licenses.map(name => ({name})),
            pageSize: 10,
            highlight: true,
            searchable: true,
            source: (answersSoFar, input = "") =>
                Promise.resolve(
                    fuzzy.filter(input, licenses).map(({original}) => original)
                ),
        }
    ]).then(({name, input}) => {
        writeLicense(name, input);
    });

} else {
    console.log("no inputs rn");
}