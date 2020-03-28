import aws from 'aws-sdk';
import config from '../config';

const _cognitoClient = new aws.CognitoIdentityServiceProvider({
    region: config.region,
});

export default _cognitoClient;
