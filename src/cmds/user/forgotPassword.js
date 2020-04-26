import prompt from 'prompt';

import util from '../../util';

function forgotPassword() {
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

export default forgotPassword;
