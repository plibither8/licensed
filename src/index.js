#!/usr/bin/env node
const meow = require('meow');

const {chooseLicense} = require('./choose-license');
const {searchLicense} = require('./search-license');

const cli = meow(`Read more about the different types of 
open source licenses on https://opensource.org/licenses
---------------------------------------------------------
Usage:

$ licensed # brings up an option to start a questionnaire
             or choose from a list of available licenses

$ licensed <license-name> <your-full-name>
---------------------------------------------------------
Examples:

$ licensed mit "Mihir Chaturvedi"
---------------------------------------------------------
Copyright 2018 Mihir Chaturvedi`);


/**
 * If called without inputs,
 * get a list of available inputs and prompt the
 * user to choose some stuff.
 */

if (!cli.input.length) {
    chooseLicense();
}

/**
 * If called with an input
 * fuzzy search amongst license names
 * and return the first result
 */

else {
    searchLicense({input: cli.input});
}