const ncp = require('ncp').ncp;
const rimraf = require("rimraf");
const source = 'src';
const destination = './dist';
const fontSource = './node_modules/open-weather-icons/fonts';
const fontDestination = `${destination}/fonts`;
const chalk = require('chalk');
const log = console.log;
const fs = require('fs');

const copyAll = () => {
    return Promise.all([
        copy(source, destination),
        copy(fontSource, fontDestination)
    ]);
};

const copy = (source, destination) => {
    return new Promise((resolve, reject) => {
        if(!fs.existsSync(destination)) {
            fs.mkdir(destination, () => {});
        }
        ncp(source, destination, err => {
            if(err) {
                console.log(err)
                reject(err);
            }
            resolve();
        });
    });
}


const deleteScssFolder = () => {
    return new Promise(resolve => {
        rimraf(`${destination}/scss`, () => resolve(`Deleted scss folder from ${destination}`));
    })
};

(async () => {
    await copyAll();
    await deleteScssFolder();
    log(chalk.black.bgGreen(`Copied all files to ${destination} folder`));
})();
