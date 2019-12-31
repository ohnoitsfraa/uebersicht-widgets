const fs = require('fs');
const chalk = require('chalk');
const sassPath = './src/scss/general/_style.scss';
const config = require('./src/config/config.json');
const log = console.log;

(() => {    
    let output = '';
    if(config && config.style) {
        Object.keys(config.style).forEach(param => output += `$${param}: ${config.style[param]};\n`);
    }
    fs.writeFileSync(sassPath, output);
    log(chalk.black.bgGreen('Wrote style config to SASS'));
})();