import jwt from 'jsonwebtoken';

import config from './config';

export const checkToken = ({ token, onError = () => {} }) => {
    if (!token) return;

    try {
        return jwt.verify(token, config.cert);
    } catch (e) {
        console.log(e);
        onError(e);
        return;
    }
};

export const clearConsole = () => {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
};

export const getPath = (original, querystring) => {
    if (/\.\w+(\?\w+)?$/.test(original)) {
        return null;
    }
    if (querystring.length) {
        return original.slice(0, -querystring.length - 1);
    }

    return original;
};

export const missingSlash = path => path.slice(-1) !== '/';
