import cognitoClient from './cognitoClient';
import config from '../config';
import hash from './hash';

class UserService {
    constructor({ userPoolId, clientId, clientSecret }) {
        this.userPoolId = userPoolId;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    _addSecretHash({ username, params }) {
        if (this.clientSecret) {
            params.SecretHash = hash({
                username,
                clientId: this.clientId,
                clientSecret: this.clientSecret,
            });
        }

        return params;
    }

    /**
     * Create a user profile
     *
     * @param {*} param0
     */
    async createUser({ username, password, attributes }) {
        const params = {
            ClientId: this.clientId,
            Password: password,
            Username: username,
            UserAttributes: attributes,
        };

        return cognitoClient.signUp(params).promise();
    }

    /**
     * Confirm user signup
     *
     * @param {*} param0
     */
    async confirmSignUp({ username }) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: username,
        };

        return cognitoClient.adminConfirmSignUp(params).promise();
    }

    /**
     * Send user reset password email
     * @param {*} param0
     */
    async forgotPassword({ username }) {
        let params = {
            ClientId: this.clientId,
            Username: username,
        };

        params = _addSecretHash({
            username,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            params,
        });

        return cognitoClient.forgotPassword(params).promise();
    }

    /**
     * Set a new password for the user
     *
     * @param {*} param0
     */
    async setUserPassword({ username, newPassword }) {
        const params = {
            Password: newPassword,
            UserPoolId: this.userPoolId,
            Username: username,
            Permanent: true,
        };
        return cognitoClient.adminSetUserPassword(params).promise();
    }

    /**
     * Resend activation/forgot password email to user
     *
     * @param {*} param0
     */
    async resendConfirmationCode({ username }) {
        let params = {
            ClientId: this.clientId,
            Username: username,
        };

        params = this._addSecretHash({ username, params });
        return cognitoClient.resendConfirmationCode(params).promise();
    }

    /**
     * Get user profile from user pool
     *
     * @param {*} param0
     */
    async getUserProfile({ username }) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: username,
        };

        return cognitoClient.adminGetUser(params).promise();
    }

    /**
     * Auto verify user email
     *
     * @param {*} param0
     */
    async verifyUserEmail({ username }) {
        const params = {
            UserAttributes: [
                {
                    Name: 'email',
                    Value: true,
                },
            ],
            UserPoolId: this.userPoolId,
            Username: username,
        };

        return cognitoClient.adminUpdateUserAttributes(params).promise();
    }

    /**
     * Disable user from logging in
     *
     * @param {*} param0
     */
    async disableUser({ username }) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: username,
        };

        return cognitoClient.adminDisableUser(params).promise();
    }

    /**
     * Enable user
     *
     * @param {*} param0
     */
    async enableUser({ username }) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: username,
        };

        return cognitoClient.adminEnableUser(params).promise();
    }

    /**
     * Update user attribute
     *
     * @param {*} param0
     */
    async updateUserAttribute({ username, attributeName, attributeValue }) {
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

        return cognitoClient.adminUpdateUserAttributes(params).promise();
    }
}

const _userService = new UserService({
    userPoolId: config.userPoolId,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
});

export default _userService;
