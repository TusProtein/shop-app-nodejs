import User from '../models/User.js';
import validateUserData from '../utils/validateUserData.js';
import bcrypt from 'bcrypt';
import generateJWT from '../utils/generateJWT.js';

class UserController {
    async createUser(req, res, next) {
        const password = req.body.password;
        try {
            const errors = await validateUserData(req.body);
            if (errors.length > 0) {
                return res.status(400).json({ message: errors[0] });
            }

            const hash = bcrypt.hashSync(password, 10);

            // Create new user
            const result = await User.create({ ...req.body, password: hash });
            return res.json({
                message: 'Tạo tài khoản thành công',
                data: result,
            });
        } catch (error) {
            res.status(400).json({
                message: 'Tạo tài khoản thất bại',
            });
            console.log(error);
        }
    }

    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return res.status(400).json({
                    message: 'Mật khẩu không đúng, vui lòng thử lại!!!',
                });
            }

            const tokens = generateJWT({
                id: user._id,
                isAdmin: user.isAdmin,
            });

            const access_token = tokens.access_token;
            const refresh_token = tokens.refresh_token;

            return res.json({
                message: 'Đăng nhập thành công',
                access_token,
                refresh_token,
            });
        } catch (error) {
            res.status(400).json({
                message: 'Đăng nhập thất bại',
            });
            console.log(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const result = await User.find({});
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const updateUser = await User.findByIdAndUpdate(
                {
                    _id: req.params.id,
                },
                req.body,
                { new: true }
            );
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(updateUser);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const deletedUser = await User.findByIdAndDelete({
                _id: req.params.id,
            });
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json('Delete successful');
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserController();
