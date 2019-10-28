const ncp = require('ncp').ncp;
const rimraf = require("rimraf");
const source = 'src';
const destination = 'dist';
const chalk = require('chalk');
const log = console.log;

const copyFiles = () => {
    return new Promise((resolve, reject) => {
        ncp(source, destination, (err) => err ? reject(err) : resolve(`Copied files to ${destination} folder`));
    })
};


const deleteScssFolder = () => {
    return new Promise(resolve => {
        rimraf(`${destination}/scss`, () => resolve(`Deleted scss folder from ${destination}`));
    })
};

const run = async () => {
    log(chalk.bgGreen(await copyFiles()));
    log(chalk.bgGreen(await deleteScssFolder()));
};

run().then(() => {
});
