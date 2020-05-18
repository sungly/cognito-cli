import prompt from 'prompt';

import config from '../../config';
import { userService } from '../../services';
import logger from '../../util/logger';

class UserCmd {
    createUser() {
        config.requiredAttributeList.push('password');

        const requiredAttributes = config.requiredAttributeList.map((attr) => {
            return {
                name: attr,
                required: true,
            };
        });

        prompt.get(requiredAttributes, async (err, result) => {
            let username = result.username ? result.username : result.email;
            const password = result.password;

            delete result.password;

            const attributes = Object.keys(result).map((key) => {
                return {
                    Name: key,
                    Value: result[key],
                };
            });

            await userService.createUser({
                username,
                password,
                attributes,
            });
        });
    }

    confirmUserSignup() {
        const requiredAttributes = [
            {
                name: 'username',
                required: true,
            },
            {
                name: 'code',
                required: true,
            },
        ];

        prompt.get(requiredAttributes, async (err, result) => {
            const { username, code } = result;

            await userService.confirmSignUp({
                username,
                code,
            });
        });
    }

    resendConfirmationCode() {
        const requiredAttributes = [
            {
                name: 'username',
                required: true,
            },
        ];

        prompt.get(requiredAttributes, async (err, result) => {
            const { username } = result;

            const res = await userService.resendConfirmationCode({
                username,
            });

            logger.info(res);
        });
    }

    forgotPassword() {
        const requiredAttributes = [
            {
                name: 'username',
                required: true,
            },
        ];

        prompt.get(requiredAttributes, async (err, result) => {
            const { username } = result;

            await userService.forgotPassword({
                username,
            });
        });
    }

    setUserPassword() {
        const requiredAttributes = [
            {
                name: 'username',
                required: true,
            },
            {
                name: 'password',
                required: true,
            },
        ];

        prompt.get(requiredAttributes, async (err, result) => {
            const { username, password } = result;

            await userService.setUserPassword({
                username,
                newPassword: password,
            });
        });
    }

    getUserProfile() {
        const requiredAttributes = [
            {
                name: 'username',
                required: true,
            },
        ];

        prompt.get(requiredAttributes, async (err, result) => {
            const { username } = result;

            await userService.getUserProfile({
                username,
            });
        });
    }

    verifyUserEmail() {
        const requiredAttributes = [
            {
                name: 'email',
                required: true,
            },
        ];

        prompt.get(requiredAttributes, async (err, result) => {
            const { email } = result;

            await userService.verifyUserEmail({
                username: email,
            });
        });
    }

    disableUser() {
        const requiredAttributes = [
            {
                name: 'username',
                required: true,
            },
        ];

        prompt.get(requiredAttributes, async (err, result) => {
            const { username } = result;

            await userService.disableUser({
                username,
            });
        });
    }

    enableUser() {
        const requiredAttributes = [
            {
                name: 'username',
                required: true,
            },
        ];

        prompt.get(requiredAttributes, async (err, result) => {
            const { username } = result;

            await userService.enableUser({
                username,
            });
        });
    }
}

export default UserCmd;
