import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop_app_nodejs');
        console.log('Connect Successfully');
    } catch (error) {
        console.log(error);
    }
};

export default { connect };
