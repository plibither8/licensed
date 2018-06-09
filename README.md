# licensed

[![Number of downloads](https://img.shields.io/npm/dw/licensed.svg?style=flat)](https://www.npmjs.com/package/licensed)
[![Licence](https://img.shields.io/npm/l/licensed.svg?maxAge=2592000&style=flat)](LICENSE)
[![Number of dependencies](https://img.shields.io/david/plibither8/licensed.svg?maxAge=2592000&style=flat)](https://www.npmjs.com/package/licensed?activeTab=dependencies)

[![Made_with_love_in India](https://img.shields.io/badge/Made_with_love_in-India-DC3545.svg)](https://madewithlove.org.in/)


> ⚖ licensed is a simple, interactive command line interface to help you quickly add a `LICENSE` file to your project.

![licensed demo gif](assets/demo.gif)

## Usage

Make sure you have [NodeJS](https://nodejs.org/en/) (npm 5.2+) installed on your computer. Then, setup is as simple as:

* `$ npx licensed` 

If you've got an older version of node (npm version < 5.2) that doesn't yet have [`npx`](https://www.npmjs.com/package/npx), here's a more traditional setup:

* `$ npm i -g licensed`

Use the CLI like so, by entering the license name and then your name (in single/double quotes):

* `$ licensed mit "Mihir Chaturvedi"`

Running just `licensed` gives you a prompt to enter your name and a nice list of licenses to choose from. 

Use the `--help` flag to help you out when in grave danger.

## Available licenses to choose from (currently):

* Apache 2.0
* BSD-2-Clause
* BSD-3-Clause
* GNU General Public License
* ISC
* MIT
* Mozilla Public License 2.0

## Contributions

* If you are aware of more licenses, help expand the list by suggesting or creating a pull request with the license text and name added to the `src/licenses.js`.
* Any other positive suggestions for this project are welcome :)