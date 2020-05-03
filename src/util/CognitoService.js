import {cognitoClient} from './cognitoClient';
import config from '../config';
import {hash} from './hash';
import logger from '../util/logger';

class UserService {
    constructor({userPoolId, clientId, clientSecret}) {
        this.userPoolId = userPoolId;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    _addSecretHash({username, options}) {
        if (this.clientSecret) {
            options.SecretHash = hash({
                username,
                clientId: this.clientId,
                clientSecret: this.clientSecret,
            });
        }

        return options;
    }

    /**
     * Create a user profile
     *
     * @param {*} param0
     */
    async createUser({username, password, attributes}) {
        const params = this._addSecretHash({
            username,
            options: {
                ClientId: this.clientId,
                Password: password,
                Username: username,
                UserAttributes: attributes,
            },
        });

        try {
            const res = await cognitoClient.signUp(params).promise();
            logger.info(res);
        } catch (error) {
            logger.error(error);
        }
    }

    /**
     * Confirm user signup
     *
     * @param {*} param0
     */
    async confirmSignUp({username, code}) {
        const params = this._addSecretHash({
            username,
            options: {
                ClientId: this.clientId,
                Username: username,
                ConfirmationCode: code,
            },
        });

        try {
            const res = await cognitoClient.confirmSignUp(params).promise();
            logger.info(res);
        } catch (error) {
            logger.error(error.message);
        }
    }

    /**
     * Send user reset password email
     * @param {*} param0
     */
    async forgotPassword({username}) {
        const params = this._addSecretHash({
            username,
            options: {
                ClientId: this.clientId,
                Username: username,
            },
        });

        try {
            const res = await cognitoClient.forgotPassword(params).promise();
            logger.info(res);
        } catch (error) {
            logger.error(error.message);
        }
    }

    /**
     * Resend activation/forgot password email to user
     *
     * @param {*} param0
     */
    async resendConfirmationCode({username}) {
        const params = this._addSecretHash({
            username,
            options: {
                ClientId: this.clientId,
                Username: username,
            },
        });

        try {
            return await cognitoClient.resendConfirmationCode(params).promise();
        } catch (error) {
            logger.error(error.message);
        }
    }

    /**
     * Set a new password for the user
     *
     * * Requires admin permission
     *
     * @param {*} param0
     */
    async setUserPassword({username, newPassword}) {
        const params = {
            Password: newPassword,
            UserPoolId: this.userPoolId,
            Username: username,
            Permanent: true,
        };

        try {
            const res = await cognitoClient.adminSetUserPassword(params).promise();
            logger.info(res);
        } catch (error) {
            logger.error(error.message);
        }
    }

    /**
     * Get user profile from user pool
     *
     * @param {*} param0
     */
    async getUserProfile({username}) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: username,
        };

        try {
            const res = await cognitoClient.adminGetUser(params).promise();
            logger.info(res);
        } catch (error) {
            logger.error(error.message);
        }

    }

    /**
     * Auto verify user email
     *
     * @param {*} param0
     */
    async verifyUserEmail({username}) {
        const params = {
            UserAttributes: [
                {
                    Name: 'email_verified',
                    Value: 'true',
                },
            ],
            UserPoolId: this.userPoolId,
            Username: username,
        };

        try {
            const res = await cognitoClient.adminUpdateUserAttributes(params).promise();
            logger.info(res);
        } catch (error) {
            logger.error(error.message);
        }
    }

    /**
     * Disable user from logging in
     *
     * @param {*} param0
     */
    async disableUser({username}) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: username,
        };

        try {
            const res = await cognitoClient.adminDisableUser(params).promise();

            if (!res) logger.info(`User is disabled.`);
            else logger.info(res);
        } catch (error) {
            logger.error(error.message);
        }

    }

    /**
     * Enable user
     *
     * @param {*} param0
     */
    async enableUser({username}) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: username,
        };

        try {
            const res = await cognitoClient.adminEnableUser(params).promise();

            if (!res) logger.info(`User is enabled.`);
            else logger.info(res);
        } catch (error) {
            logger.error(error.message);
        }
    }

    /**
     * Update user attribute
     *
     * @param {*} param0
     */
    async updateUserAttribute({username, attributeName, attributeValue}) {
        const params = {
            UserAttributes: [
                {
                    Name: attributeName,
                    Value: attributeValue,
                },
            ],
            UserPoolId: this.userPoolId,
            Username: username,
        };

        try {
            return await cognitoClient.adminUpdateUserAttributes(params).promise();
        } catch (error) {
            logger.error(error.message);
        }
    }
}

export const userService = new UserService({
    userPoolId: config.userPoolId,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
});
