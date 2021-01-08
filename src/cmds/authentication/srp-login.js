import prompt from 'prompt';
import { SRPClient, calculateSignature, getNowString } from 'amazon-user-pool-srp-client'

import config from '../../config';
import { logger, cognitoClient, addSecretHashToParams } from '../../util';

function responseToSrpAuth({ 
    ChallengeName, 
    ChallengeParameters, 
    userPoolId, 
    clientId, 
    clientSecret, 
    password, 
    srpClient 
}) {
    const hkdf = srpClient.getPasswordAuthenticationKey(
        ChallengeParameters.USER_ID_FOR_SRP, 
        password, ChallengeParameters.SRP_B, 
        ChallengeParameters.SALT);
    const dateNow = getNowString()
    const signatureString = calculateSignature(
            hkdf, 
            userPoolId, 
            ChallengeParameters.USER_ID_FOR_SRP, 
            ChallengeParameters.SECRET_BLOCK, 
            dateNow
        );

    const challengeResponses = {
        PASSWORD_CLAIM_SIGNATURE: signatureString,
        PASSWORD_CLAIM_SECRET_BLOCK: ChallengeParameters.SECRET_BLOCK,
        TIMESTAMP: dateNow,
        USERNAME: ChallengeParameters.USERNAME
      }

    const params = {
        ClientId: clientId,
        ChallengeName,
        ChallengeResponses: addSecretHashToParams({ 
            params: challengeResponses, 
            clientId, 
            clientSecret, 
            username: ChallengeParameters.USERNAME 
        })
    }
    
    return cognitoClient.respondToAuthChallenge(params).promise();
}


async function initiateSrpAuth({ username, clientId, clientSecret, srpClient }) {
    const SRP_A = srpClient.calculateA()

    const authParams = {
        USERNAME: username,
        SRP_A
    }

    const params = {
        AuthFlow: 'USER_SRP_AUTH',
        ClientId: clientId,
        AuthParameters: addSecretHashToParams({ params: authParams, clientId, clientSecret, username })
      };

    return cognitoClient.initiateAuth(params).promise();    
}


export default function srpLogin() {
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

            const { userPoolId, clientId, clientSecret } = config;

            const poolId = userPoolId.split('_')[1];

            const srpClient = new SRPClient(poolId)

            try {
                const { ChallengeName, ChallengeParameters } = await initiateSrpAuth({
                    username: result.username, 
                    clientId, 
                    clientSecret,
                    srpClient
                }); 

                const res = await responseToSrpAuth({
                    ChallengeName,
                    ChallengeParameters,
                    userPoolId: poolId,
                    clientId,
                    clientSecret,
                    username: result.username,
                    password: result.password,
                    srpClient
                });

                logger.info(res);
            } catch (e) {
                logger.error(e.message);
            }
        }
    );
}
