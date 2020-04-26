import prompt from 'prompt';

import util from '../../util';

function confirmUserSignup() {
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

export default confirmUserSignup;
