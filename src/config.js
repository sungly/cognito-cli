const dotenv = require('dotenv');
const fs = require('fs');
const os = require('os');

const homeDir = os.homedir();
const configPath = `${homeDir}/.cognito/config`;
const envConfig = fs.existsSync(configPath)
    ? dotenv.parse(fs.readFileSync(configPath))
    : {};

const _config = {
    userPoolId: envConfig.user_pool_id,
    clientId: envConfig.client_id,
    clientSecret: envConfig.client_secret,
    region: envConfig.region,
    requiredAttributeList: JSON.parse(envConfig.requiredAttributeList || `{}`),
};

export default _config;
