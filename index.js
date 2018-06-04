#!/usr/bin/env node
const meow = require("meow");
const cli = meow(`Read more about the different types of 
open source licenses on https://opensource.org/licenses

Usage
$ licensed # brings up a helpful prompt
$ licensed <license-name> <your-full-name>

Examples
$ licensed mit "Mihir Chaturvedi"

Copyright 2018 Mihir Chaturvedi`);

const {registerPrompt, prompt} = require("inquirer");
const {red, green, bold} = require("chalk");
const fuzzy = require("fuzzy");
const {licenseNames} = require("./licenses.js");

const writeLicense = (fullName, index) => {
    
    const {resolve} = require("path");
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
            source: search
        }
    ]).then(({fullName, licenseName}) => {
        licenseIndex = licenseNames.indexOf(licenseName);
        writeLicense(fullName, licenseIndex);
    });

}

/**
 * If called with an input
 * fuzzy search amongst license names
 * and return the first result
 */

else {

    const input = cli.input;

    let searchTerm = "";
    let i = 0;
    do {
        searchTerm += input[i++];
    } while (i < input.length - 1);

    const results = fuzzy
        .filter(searchTerm, licenseNames)
        .map(({original}) => original);

    if (!results.length) {
        console.log(red(`\n❌ No license name matching '${searchTerm}' was found.\nPlease try again with another name.`));
        return;
    }

    const licenseIndex = licenseNames.indexOf(results[0]);

    if (input.length === 1) {
        console.log();
        prompt([
            {
                type: "input",
                name: "fullName",
                message: "Enter your full name",
            }
        ]).then(({fullName}) => {
            writeLicense(fullName, licenseIndex);
        });
    } else {
        fullName = input[input.length - 1]
        writeLicense(fullName, licenseIndex);
    }

}