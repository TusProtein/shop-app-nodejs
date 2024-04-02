import jwt from 'jsonwebtoken';

const generateJWT = (payload) => {
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: '1h',
    });

    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: '365d',
    });

    return { access_token, refresh_token };
};

export default generateJWT;
