import prompt from 'prompt';

import util from '../../util';

function disableUser() {
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

export default disableUser;
