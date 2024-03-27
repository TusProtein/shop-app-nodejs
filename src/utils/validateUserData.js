const validateUserData = (data) => {
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

    return errors;
};

export default validateUserData;
