import prompt from 'prompt';

import util from '../../util';

function enableUser() {
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

export default enableUser;
