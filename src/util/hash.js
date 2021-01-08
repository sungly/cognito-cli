import crypto from 'crypto';

export function hash({ username, clientId, clientSecret }) {
    return crypto
        .createHmac('SHA256', clientSecret)
        .update(username + clientId)
        .digest('base64');
}

export function addSecretHashToParams({ params, username, clientId, clientSecret }) {
    if (clientSecret) {
        params.SECRET_HASH = hash({
            username,
            clientId,
            clientSecret,
        });
    }

    return params;
}