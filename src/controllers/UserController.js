import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import validateUserData from '../utils/validateUserData.js';
import bcrypt from 'bcrypt';
import generateJWT from '../utils/generateJWT.js';
import formattedDateOfBirth from '../utils/formattedDateOfBirth.js';
import paginations from '../utils/paginations.js';

class UserController {
    async createUser(req, res, next) {
        try {
            const { password, dateOfBirth } = req.body;

            // //Validate Date of Birth
            const formatted = formattedDateOfBirth(dateOfBirth);

            if (!formatted) {
                return res.status(400).json({
                    message: 'Ngày sinh không hợp lệ',
                });
            }

            // //Errors array
            const errors = await validateUserData(req.body);

            if (errors && errors?.length > 0) {
                return res.status(400).json({ message: errors[0] });
            }

            const hash = bcrypt.hashSync(password, 10);

            // Create new user
            const result = await User.create({
                ...req.body,
                password: hash,
                dateOfBirth: formatted,
            });
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
            const oneWeek = 3600000 * 24 * 7;

            // console.log(req.userData);
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message: 'Người dùng không tồn tại',
                });
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return res.status(400).json({
                    message: 'Mật khẩu không đúng, vui lòng thử lại!!!',
                });
            }

            const tokens = generateJWT({
                id: user?._id,
                isAdmin: user?.isAdmin,
            });

            const access_token = tokens.access_token;
            const refresh_token = tokens.refresh_token;

            res.cookie('token', access_token, {
                maxAge: oneWeek,
                secure: true,
                httpOnly: true,
            });

            res.cookie('refresh_token', refresh_token, {
                maxAge: 365 * 24 * 60 * 60 * 1000, // 1 năm
                secure: true,
                httpOnly: true,
            });

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
            let page = req.query.page;
            const user = await paginations(User, page, 4);

            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    }

    // getDetailUser/:id
    async getDetailUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await User.find({ _id: id });

            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    }

    //update Profile (phone, email, date of birth) /:id
    async updateUser(req, res, next) {
        try {
            const { password, dateOfBirth } = req.body;

            // //Validate Date of Birth
            const formatted = formattedDateOfBirth(dateOfBirth);
            if (!formatted) {
                return res.status(400).json({
                    message: 'Ngày sinh không hợp lệ',
                });
            }

            const hash = bcrypt.hashSync(password, 10);

            const data = {
                ...req.body,
                password: hash,
                dateOfBirth: formatted,
            };

            const updateUser = await User.findByIdAndUpdate(
                {
                    _id: req.params.id,
                },
                data,
                { new: true }
            );

            if (!updateUser) {
                return res.status(400).json({
                    message: 'Người dùng không tồn tại',
                });
            }
            return res.json(updateUser);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: 'Cập nhật thất bại',
            });
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

    async refreshToken(req, res, next) {
        try {
            const token = req.cookies.refresh_token;

            const dataUser = jwt.verify(token, process.env.REFRESH_TOKEN);

            if (!dataUser) {
                return res
                    .status(400)
                    .json({ message: 'Người dùng không hợp lệ' });
            }

            const tokens = generateJWT({
                id: dataUser?.id,
                isAdmin: dataUser?.isAdmin,
            });

            const new_access_token = tokens.refresh_token; // Check lại ở đây
            res.status(200).json({
                message: 'Refresh token thành công',
                new_access_token,
            });
        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: 'RefreshToken không hợp lệ',
            });
        }
    }
}

export default new UserController();
