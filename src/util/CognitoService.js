import cognitoClient from './cognitoClient';
import config from '../config';

class UserService {
    /**
     * Create a user profile
     *
     * @param {*} param0
     */
    async createUser({ username, password, attributes }) {
        const params = {
            ClientId: config.clientId,
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
    async confirmSignUp({ username }) {}

    /**
     * Send user reset password email
     * @param {*} param0
     */
    async forgotPassword({ username }) {}

    /**
     * Set a new password for the user
     *
     * @param {*} param0
     */
    async setUserPassword({ username, newPassword }) {}

    /**
     * Resend activation/forgot password email to user
     *
     * @param {*} param0
     */
    async resendConfirmationCode({ username }) {}

    /**
     * Get user profile from user pool
     *
     * @param {*} param0
     */
    async getUserProfile({ username }) {}

    /**
     * Auto verify user email
     *
     * @param {*} param0
     */
    async verifyUserEmail({ email }) {}

    /**
     * Disable user from logging in
     *
     * @param {*} param0
     */
    async disableUser({ username }) {}

    /**
     * Update user attribute
     *
     * @param {*} param0
     */
    async updateUserAttribute({ username, attributeName, attributeValue }) {}
}

const _userService = new UserService();

export default _userService;
