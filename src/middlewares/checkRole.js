import jwt from 'jsonwebtoken';

const checkRole = async (req, res, next) => {
    let token = req.cookies.token;
    let secretKey = process.env.ACCESS_TOKEN;
    const userId = req.params.id;
    // Kiểm tra nếu không có access token, thử lấy refresh token
    if (!token) {
        token = req.cookies.refresh_token;
        secretKey = process.env.REFRESH_TOKEN;
    }
    try {
        const userData = jwt.verify(token, secretKey);

        if (userData?.isAdmin || userData?.id === userId) {
            next();
        } else {
            return res.status(401).json({ message: 'Not Permission' });
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            res.clearCookie('token');
            // Nếu token hết hạn, gửi phản hồi về client yêu cầu cập nhật token
            return res.status(401).json({
                message: 'Token hết hạn, vui lòng cập nhật token mới',
            });
        } else {
            console.log(error);
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }
    }
};

export default checkRole;
