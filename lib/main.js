#!/usr/bin/env node
const esmImport = require('esm')(module);
const { cli } = esmImport('./cli.js');
cli();