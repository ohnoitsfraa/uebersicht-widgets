const ncp = require('ncp').ncp;
const rimraf = require("rimraf");
const source = 'src';
const destination = 'dist';
const fontSource = './node_modules/open-weather-icons/fonts';
const fontDestination = `${destination}/fonts`;
const chalk = require('chalk');
const log = console.log;

const copyFiles = () => {
    return new Promise((resolve, reject) => {
        ncp(source, destination, (err) => {
            if (err) {
                reject(err);
            }
            ncp(fontSource, fontDestination, err => {
                if (err) {
                    reject(err);
                }
                resolve(`Copied all files to ${destination} folder`);
            })
        });
    })
};


const deleteScssFolder = () => {
    return new Promise(resolve => {
        rimraf(`${destination}/scss`, () => resolve(`Deleted scss folder from ${destination}`));
    })
};

const run = async () => {
    log(chalk.black.bgGreen(await copyFiles()));
    log(chalk.black.bgGreen(await deleteScssFolder()));
};

run().then(() => {
});
