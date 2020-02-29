const minimist = require('minimist');

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const cmd = args._[0];

  switch (cmd) {
    case 'version':
      const packageJson = require('../package.json');
      console.log(packageJson.version);
      break;
    case 'help':
      console.log('help');
      break;
    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
};
