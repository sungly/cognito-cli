import prompt from 'prompt';

import util from '../../util';

function verifyUserEmail() {
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

export default verifyUserEmail;
