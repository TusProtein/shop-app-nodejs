import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/createUser', UserController.createUser);
router.post('/loginUser', UserController.loginUser);
router.get('/getUser', UserController.getUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUser);

export default router;
