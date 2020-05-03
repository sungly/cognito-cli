import crypto from 'crypto';

export function hash({ username, clientId, clientSecret }) {
    return crypto
        .createHmac('SHA256', clientSecret)
        .update(username + clientId)
        .digest('base64');
}
