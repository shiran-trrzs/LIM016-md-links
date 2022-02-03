#!/usr/bin/env node

const chalk = require('chalk');
const {mdLinks} = require('./md-links');
const {statsLinks, brokenLinks, helpMessage} = require('./stats');

const path = process.argv[2];
const options = process.argv.slice(3);
const validate = options.includes('--validate');
const stats = options.includes('--stats');
const otherPath = path === '--help' || path === '--validate' || path === '--stats';

if (otherPath) {
    console.log(chalk.magenta(helpMessage))
} else if (options.length === 0 && path) {
    mdLinks(path, {validate:false})
    .then((res) => console.log(res))
    .catch((rej) => console.log(chalk.redBright(rej)))
} else if (validate) {
    mdLinks(path, {validate:true})
    .then((res) => console.log(res))
    .catch((rej) => console.log(chalk.redBright(rej)))
} else if (stats) {
    mdLinks(path, {validate:false})
    .then((res) => console.log(chalk.bgBlue.black(statsLinks(res))))
    .catch((rej) => console.log(chalk.redBright(rej)))
} else if ((validate && stats) || (stats && validate)) {
    mdLinks(path, {validate:true})
    .then((res) => {
        const total = console.log(chalk.bgBlue.black(statsLinks(res)))
        const broken = console.log(chalk.bgRed.black(brokenLinks(res)))
        return total && broken
    })
    .catch((rej) => console.log(chalk.red(rej)))
} else {
    console.log(chalk.magenta(helpMessage))
}

// console.log(mdLinks('C:\\Users\\PC\\LIM016-md-links\\carpeta-completa').then((res) => console.log(res)))
