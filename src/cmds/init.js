import prompt from 'prompt';
import fs from 'fs';
import os from 'os';

import logger from '../util/logger';

function initCognitoConfig() {
    prompt.start();

    prompt.get(
        [
            'userPoolId',
            'clientId',
            'clientSecret',
            'region',
            {
                name: 'requiredAttributeList',
                description: `requiredAttributeList: ie. email, given_name`,
                required: true,
            },
        ],
        (err, result) => {
            logger.info('Saving params in `~/.cognito/config` ...');

            logger.info('   user pool id:       ', result.userPoolId);
            logger.info('   client id:          ', result.clientId);
            logger.info('   client secret:      ', result.clientSecret);
            logger.info('   region:             ', result.region);
            logger.info(
                `   required attr list: `,
                result.requiredAttributeList
            );

            const data = `user_pool_id=${result.userPoolId}
            client_id=${result.clientId}
            client_secret=${result.clientSecret}
            region=${result.region}
            requiredAttributeList=${JSON.stringify(
                result.requiredAttributeList.split(',')
            )}
            `.replace(/ +?/g, '');

            const homeDir = os.homedir();
            const cognitoConfigFolderPath = `${homeDir}/.cognito`;
            const cognitoConfigFilePath = `${homeDir}/.cognito/config`;

            if (!fs.existsSync(cognitoConfigFolderPath)) {
                fs.mkdirSync(cognitoConfigFolderPath);
            }

            fs.writeFile(cognitoConfigFilePath, data, (err) => {
                if (err) {
                    logger.error('Failed to save params...');
                    logger.error(err);
                }
            });

            logger.info('Params set!');
        }
    );
}

export default initCognitoConfig;
