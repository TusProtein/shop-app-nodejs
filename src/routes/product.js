import express from 'express';
import ProductController from '../controllers/ProductController.js';
import checkRole from '../middlewares/checkRole.js';

const router = express.Router();

router.post('/createProduct', ProductController.createProduct);
router.delete('/:id', ProductController.deleteProduct);
router.put('/:id', ProductController.updateProduct);
router.get('/getAllProducts', ProductController.getAllProducts);
router.get('/getDetailProduct/:id', ProductController.getDetailProduct);

export default router;
