#!/usr/bin/env node

const chalk = require('chalk')
const {mdLinks} = require('./md-links')
const {statsLinks, brokenLinks, helpMessage} = require('./stats')

const path = process.argv[2]
const options = process.argv.slice(3)