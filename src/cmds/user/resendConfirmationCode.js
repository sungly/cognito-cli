import prompt from 'prompt';

import util from '../../util';

function resendConfirmationCode() {
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

export default resendConfirmationCode;
