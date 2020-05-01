import prompt from 'prompt';

import config from '../../config';
import util from '../../util';

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

            const res = await util.cognitoService.createUser({
                username,
                password,
                attributes,
            });

            console.log(res);
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

            const res = await util.cognitoService.confirmSignUp({
                username,
                code,
            });

            console.log(res);
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

            const res = await util.cognitoService.resendConfirmationCode({
                username,
            });

            console.log(res);
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

            const res = await util.cognitoService.forgotPassword({
                username,
            });

            console.log(res);
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

            const res = await util.cognitoService.setUserPassword({
                username,
                newPassword: password,
            });

            console.log(res);
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

            const res = await util.cognitoService.getUserProfile({
                username,
            });

            console.log(res);
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

            const res = await util.cognitoService.verifyUserEmail({
                username: email,
            });

            console.log(res);
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

            const res = await util.cognitoService.disableUser({
                username,
            });

            if (!res) console.log(`User is disabled.`);
            else console.log(res);
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

            const res = await util.cognitoService.enableUser({
                username,
            });

            if (!res) console.log(`User is enabled.`);
            else console.log(res);
        });
    }
}

export default UserCmd;
