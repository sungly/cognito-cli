import prompt from 'prompt';

import util from '../../util';

function setUserPassword() {
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
        console.log('Setting user password');
        console.log('*** Requires admin permission ***');

        const { username, password } = result;

        const res = await util.cognitoService.setUserPassword({
            username,
            newPassword: password,
        });

        console.log(res);
    });
}

export default setUserPassword;
