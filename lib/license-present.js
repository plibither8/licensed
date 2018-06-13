"use strict";

const _require = require('path'),
      resolve = _require.resolve;

const _require2 = require('fs'),
      existsSync = _require2.existsSync;

exports.licensePresent = existsSync(resolve(process.cwd(), 'LICENSE'));