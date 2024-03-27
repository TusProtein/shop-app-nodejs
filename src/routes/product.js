import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.post('/createProduct', ProductController.createProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
