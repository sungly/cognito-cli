import prompt from 'prompt';

import util from '../util/index';
import config from '../config';

const cognitoClient = util.cognitoClient;

function clientSecretCheck({ username, password, clientId, clientSecret }) {
    const authParams = {
        USERNAME: username,
        PASSWORD: password,
    };

    if (clientSecret) {
        authParams.SECRET_HASH = hash({ username, clientId, clientSecret });
    }

    return authParams;
}

async function userPasswordAuth({ username, password }) {
    const { clientId, clientSecret } = config;

    const authParams = clientSecretCheck({
        username,
        password,
        clientId,
        clientSecret,
    });
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: config.clientId,
        AuthParameters: authParams,
    };

    return await cognitoClient.initiateAuth(params).promise();
}

function login() {
    prompt.start();

    prompt.get(
        [
            {
                name: 'username',
                required: true,
            },
            {
                name: 'password',
                hidden: true,
            },
        ],
        async (err, result) => {
            console.log('Logging in...');

            const res = await userPasswordAuth({
                username: result.username,
                password: result.password,
            });

            console.log(res);
        }
    );
}

export default login;
