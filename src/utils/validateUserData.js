import User from '../models/User.js';

const validateUserData = async (data) => {
    const { email, password, confirmPassword, fullname, phone } = data;

    const errors = [];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?(84|0\d{1,3})?\d{9,10}$/;

    const validations = [
        {
            condition:
                !email || !password || !confirmPassword || !fullname || !phone,
            message: 'Vui lòng nhập đầy đủ thông tin',
        },
        {
            condition: fullname.length < 6,
            message: 'Họ và tên phải lớn hơn 6 ký tự',
        },
        {
            condition: !emailRegex.test(email),
            message: 'Email không hợp lệ',
        },
        {
            condition: await User.findOne({ email }),
            message: 'Email đã tồn tại',
        },
        {
            condition: !phoneRegex.test(phone) || isNaN(phone),
            message: 'Số điện thoại không hợp lệ',
        },
        {
            condition: await User.findOne({ phone }),
            message: 'Số điện thoại đã tồn tại',
        },
        {
            condition: password !== confirmPassword,
            message: 'Mật khẩu không trùng khớp',
        },

        {
            condition: password.length < 6,
            message: 'Mật khẩu phải lớn hơn 6 ký tự',
        },
    ];

    validations.forEach((validation) => {
        if (validation.condition) {
            errors.push(validation.message);
        }
    });

    return errors;
};

export default validateUserData;
