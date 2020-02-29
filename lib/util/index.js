const aws = require('aws-sdk');

const { config } = require('../config');

class UserManagement {
  constructor() {
    this.cognito = new aws.CognitoIdentityServiceProvider({
      region: config.region,
    });
  }

  /**
   * Create a user profile
   *
   * @param {*} param0
   * locale     - preferred language of communication eg. en-CA | fr-CA [required]
   * email      - email used to register the user                       [required]
   * password   - user password                                         [required]
   * appCode    - venture app code                                      [optional]
   * memberId   - Identity 1.0 memberId                                 [optional]
   */
  async createUser({ locale = 'en-CA', email, password, appCode, memberId }) {}

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

const user = new UserManagement();

module.exports = user;
