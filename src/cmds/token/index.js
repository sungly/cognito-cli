import prompt from 'prompt';
import jwt from 'jsonwebtoken';

import logger from '../../util/logger';

class TokenCmd {
    decode() {
        const requiredAttributes = {
            name: 'token',
            required: true,
        };

        prompt.get(requiredAttributes, async (err, result) => {
            const decoded = jwt.decode(result.token);
            logger.info(JSON.stringify(decoded, null, 4));
        });
    }
}

export default TokenCmd;