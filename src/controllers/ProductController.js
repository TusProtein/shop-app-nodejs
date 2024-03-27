import Product from '../models/Product.js';

class ProductController {
    async createProduct(req, res, next) {
        const { name, image, type, price, countInStock, rating, description } =
            req.body;

        try {
            const result = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description,
            });
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const deletedProduct = await Product.findByIdAndDelete({
                _id: req.params.id,
            });
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.json('Delete successful');
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductController();
