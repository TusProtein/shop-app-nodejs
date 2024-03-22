import User from '../models/User.js';

class UserController {
    async createUser(req, res, next) {
        try {
            const result = await User.create({
                name: 'gymervietcode124',
                email: 'gymervietcode124@gmail',
                password: '123456',
                isAdmin: false,
                phone: '04983942344',
                access_token: 'access_token',
                refresh_token: 'refresh_token',
            });
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
