import minimist from 'minimist';

import init from './init';

const cli = () => {
    const args = minimist(process.argv.slice(2));
    const cmd = args._[0];

    switch (cmd) {
        case 'init':
            init();
            break;
        case 'version':
            const packageJson = require('../../package.json');
            console.log(packageJson.version);
            break;
        case 'help':
            console.log('help todo');
            break;
        default:
            console.error(`"${cmd}" is not a valid command!`);
            break;
    }
};

export default cli;
