import User from '../models/User.js';

class UserController {
    async createUser(req, res, next) {
        try {
            const { email, password, confirmPassword, fullname, phone } =
                req.body;

            // Check if any required field is empty
            if (
                !email ||
                !password ||
                !confirmPassword ||
                !fullname ||
                !phone
            ) {
                return res.status(400).json({
                    message: 'Vui lòng nhập đầy đủ thông tin',
                });
            }

            // Check email format
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isCheckEmail = emailRegex.test(email);
            if (!isCheckEmail) {
                return res.status(400).json({
                    message: 'Email không hợp lệ',
                });
            }

            // Check if email or phone already exists
            const existingEmail = await User.findOne({ email });
            const existingPhone = await User.findOne({ phone });
            if (existingEmail) {
                return res.status(400).json({
                    message: 'Email đã tồn tại ',
                });
            } else if (existingPhone) {
                return res.status(400).json({
                    message: 'Số điện thoại đã tồn tại ',
                });
            } else if (password !== confirmPassword) {
                return res.status(400).json({
                    message: 'Mật khẩu không trùng khớp',
                });
            }

            // Create new user
            const result = await User.create({
                email,
                password,
                confirmPassword,
                fullname,
                phone,
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
