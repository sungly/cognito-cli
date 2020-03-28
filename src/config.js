const dotenv = require('dotenv');
const fs = require('fs');
const os = require('os');

const homeDir = os.homedir();
const envConfig = dotenv.parse(fs.readFileSync(`${homeDir}/.cognito/config`));

module.exports = envConfig;
