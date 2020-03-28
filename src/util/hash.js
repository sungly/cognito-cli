import crypto from 'crypto';

function hash({ username, clientId, clientSecret }) {
    return crypto
        .createHmac('SHA256', clientSecret)
        .update(username + clientId)
        .digest('base64');
}

export default hash;
