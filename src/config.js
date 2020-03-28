const dotenv = require('dotenv');
const fs = require('fs');
const os = require('os');

const homeDir = os.homedir();
const envConfig = dotenv.parse(fs.readFileSync(`${homeDir}/.cognito/config`));

const _config = {
    userPoolId: envConfig.user_pool_id,
    clientId: envConfig.client_id,
    clientSecret: envConfig.client_secret,
    region: envConfig.region,
    requiredAttributeList: envConfig.requiredAttributeList,
};

export default _config;
