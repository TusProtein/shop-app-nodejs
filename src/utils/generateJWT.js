import jwt from 'jsonwebtoken';

const generateJWT = (payload) => {
    const access_token = jwt.sign(payload, 'access_token', {
        expiresIn: '1h',
    });

    const refresh_token = jwt.sign(payload, 'refresh_token', {
        expiresIn: '365d',
    });

    return { access_token, refresh_token };
};

export default generateJWT;
