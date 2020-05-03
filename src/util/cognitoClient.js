import aws from 'aws-sdk';
import config from '../config';

export const cognitoClient = new aws.CognitoIdentityServiceProvider({
    region: config.region,
});
