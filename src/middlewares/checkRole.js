import jwt from 'jsonwebtoken';

const checkRole = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        const userData = jwt.verify(token, process.env.ACCESS_TOKEN);

        if (userData?.isAdmin) {
            next();
        } else {
            return res.status(401).json({ message: 'Not Permission' });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

export default checkRole;
