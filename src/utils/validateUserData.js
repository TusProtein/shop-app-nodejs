import User from '../models/User.js';

const validateUserData = async (data) => {
    const { email, password, confirmPassword, fullname, phone } = data;
    const errors = [];
    // Check if any required field is empty
    if (!email || !password || !confirmPassword || !fullname || !phone) {
        errors.push('Vui lòng nhập đầy đủ thông tin');
    }

    // Check email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = emailRegex.test(email);
    if (!isCheckEmail) {
        errors.push('Email không hợp lệ');
    }

    // Check if email or phone already exists
    const existingEmail = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });
    if (existingEmail) {
        errors.push('Email đã tồn tại');
    } else if (existingPhone) {
        errors.push('Số điện thoại đã tồn tại');
    } else if (password !== confirmPassword) {
        errors.push('Mật khẩu không trùng khớp');
    }

    return errors;
};

export default validateUserData;
