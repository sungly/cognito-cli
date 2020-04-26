import prompt from 'prompt';

import config from '../../config';
import util from '../../util';

function createUser() {
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

export default createUser;
