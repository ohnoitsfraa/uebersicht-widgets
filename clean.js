const fs = require('fs');
const path = require('path');
var rimraf = require("rimraf");
const destination = 'dist';
const chalk = require('chalk');
const log = console.log;

const emptyDestination = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(destination, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                const currentPath = path.join(destination, file);
                if (fs.lstatSync(currentPath).isDirectory()) {
                    rimraf(currentPath, () => {
                    });
                } else {
                    fs.unlink(currentPath, err => {
                        if (err) reject(err)
                    });
                }
            }
            resolve(`Emptied out ${destination} folder`);
        });
    });
};

const run = async () => {
    log(chalk.bgGreen(await emptyDestination()))
};

run().then(() => {
});
