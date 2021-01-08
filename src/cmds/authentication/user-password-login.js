import prompt from 'prompt';

import { hash, cognitoClient, logger} from '../../util';
import config from '../../config';

function clientSecretCheck({ username, password, clientId, clientSecret }) {
    const authParams = {
        USERNAME: username,
        PASSWORD: password,
    };

    if (clientSecret) {
        authParams.SECRET_HASH = hash({
            username,
            clientId,
            clientSecret,
        });
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
            logger.info(`message: Logging in...`);

            try {
                const res = await userPasswordAuth({
                    username: result.username,
                    password: result.password,
                });

                logger.info(res);
            } catch (e) {
                logger.error(e.message);
            }
        }
    );
}

export default login;
