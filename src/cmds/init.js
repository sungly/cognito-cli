import prompt from 'prompt';
import fs from 'fs';
import os from 'os';

function initCognitoConfig() {
    prompt.start();

    prompt.get(
        ['userPoolId', 'clientId', 'clientSecret', 'region'],
        (err, result) => {
            console.log('Saving params in `~/.cognito/config` ...');

            console.log('   user pool id:   ', result.userPoolId);
            console.log('   client id:      ', result.clientId);
            console.log('   client secret:  ', result.clientSecret);
            console.log('   region:         ', result.region);

            const data = `user_pool_id=${result.userPoolId}
            client_id=${result.clientId}
            client_secret=${result.clientSecret}
            region=${result.region}
            `.replace(/ +?/g, '');

            const homeDir = os.homedir();
            const cognitoConfigFolderPath = `${homeDir}/.cognito`;
            const cognitoConfigFilePath = `${homeDir}/.cognito/config`;

            if (!fs.existsSync(cognitoConfigFolderPath)) {
                fs.mkdirSync(cognitoConfigFolderPath);
            }

            fs.writeFile(cognitoConfigFilePath, data, err => {
                if (err) {
                    console.log('Failed to save params...');
                    console.log(err);
                    return;
                }
            });

            console.log('Params set!');
        }
    );
}

export default initCognitoConfig;
