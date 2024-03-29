import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        // confirmPassword: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        address: { type: String },
        avatar: { type: String },
        city: { type: String },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);

export default User;
