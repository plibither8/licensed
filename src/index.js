#!/usr/bin/env node
const meow = require('meow');

const {chooseLicense} = require('./choose-license');
const {searchLicense} = require('./search-license');

const cli = meow(`Usage:
    $ licensed                  # Brings up an option to start a questionnaire or choose from a list of available licenses
    $ licensed <license-name>   # Brings prompt to enter your name
    $ licensed <license-name> <your-full-name> [--year | -y] <year> 
    $ licensed --help
    $ licensed --version

Options:
    --year, -y <year>   The year the license is in effect
    --help              Show this screen
    --version           Show version

Examples:
    $ licensed mit "Mihir Chaturvedi"
    $ licensed apache
    $ licensed --year 2016

Read more about the different types of open
source licenses on https://opensource.org/licenses

Copyright (c) 2018, Mihir Chaturvedi`,
{
    flags: {
        year: {
            type: 'string',
            alias: 'y',
        },
    },
});


/**
 * If called without inputs,
 * get a list of available inputs and prompt the
 * user to choose some stuff.
 */

if (!cli.input.length) {
    chooseLicense(cli.flags);
}

/**
 * If called with an input
 * fuzzy search amongst license names
 * and return the first result
 */

else {
    searchLicense({input: cli.input}, cli.flags);
}