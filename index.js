#!/usr/bin/env node
const meow = require("meow");

const cli = meow(`This is a really simple script to help
you add a license to your open source project. Read more
about the different types of open source licenses on
https://opensource.org/licenses

Usage
$ licensed # brings up a helpful prompt
$ licensed <license-name>

Examples
$ licensed mit

Copyright 2018 Mihir Chaturvedi`);

const {licenseNames} = require("./licenses.js");
const writeLicense = (fullName, index) => {
    
    const {resolve} = require("path");
    const {red, green, bold} = require("chalk");
    const {licenseList} = require("./licenses.js");
    const fs = require("fs");

    const year = (new Date).getFullYear();
    const license = licenseList[index];
    const text = `Copyright ${year} ${fullName}\n\n${license}`;

    fs.writeFile(resolve(process.cwd(), "LICENSE"), text, (err) => {
        if (err) {
            console.log(red.bold(`\n❌ An error occured. Please try again.`));
            return err;
        }
        console.log(green.bold(`\n✔️ Successfully created LICENSE file with ${licenseNames[index]}`));
    });

};

function search(answers, input) {
    const fuzzy = require("fuzzy");
    input = input || '';
    return new Promise((resolve) => {
        const fuzzyResult = fuzzy.filter(input, licenseNames);
        resolve(fuzzyResult.map(function (el) {
            return el.original;
        }));
    });
}

/**
 * If called without inputs,
 * get a list of available inputs and prompt the
 * user to choose some stuff.
 */

if (!cli.input.length) {

    const {registerPrompt, prompt} = require("inquirer");
    registerPrompt("autocomplete", require('inquirer-autocomplete-prompt'));

    console.log();

    prompt([
        {
            type: "input",
            name: "fullName",
            message: "Full name",
        }, {
            type: "autocomplete",
            name: "licenseName",    
            message: "License to be applied to this project",
            choices: licenseNames.map(name => ({name})),
            pageSize: 10,
            highlight: true,
            searchable: true,
            source: search,
            validate: (val) => val ? true : 'Type something!'
        }
    ]).then(({fullName, licenseName}) => {
        licenseIndex = licenseNames.indexOf(licenseName);
        writeLicense(fullName, licenseIndex);
    });

} else {
    console.log(cli.input);
}