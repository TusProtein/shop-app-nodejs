import express from 'express';
import UserController from '../controllers/UserController.js';
import checkRole from '../middlewares/checkRole.js';

const router = express.Router();

router.post('/createUser', UserController.createUser);
router.post('/loginUser', UserController.loginUser);
router.get('/getUser', checkRole, UserController.getUser);
router.get('/getDetailUser/:id', checkRole, UserController.getDetailUser);
router.delete('/:id', checkRole, UserController.deleteUser);
router.put('/:id', UserController.updateUser);
router.post('/refreshToken', UserController.refreshToken);

export default router;
