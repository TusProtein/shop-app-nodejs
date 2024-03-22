import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/createUser', UserController.createUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUser);

export default router;
