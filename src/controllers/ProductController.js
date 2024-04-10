import Product from '../models/Product.js';
import paginations from '../utils/paginations.js';
import sortable from '../utils/sortable.js';

class ProductController {
    async createProduct(req, res, next) {
        const {
            name,
            image,
            type,
            price,
            discount,
            countInStock,
            rating,
            description,
        } = req.body;

        try {
            const checkProduct = await Product.findOne({ name });

            if (checkProduct !== null) {
                return res.status(400).json({
                    message: 'Sản phẩm đã tồn tại',
                });
            }

            const result = await Product.create({
                name,
                image,
                type,
                price,
                discount,
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

    async updateProduct(req, res, next) {
        try {
            const dataUpdate = req.body;

            const nameProduct = await Product.findOne({ name: req.body.name });
            if (nameProduct !== null) {
                return res.status(400).json({
                    message: 'Tên sản phẩm đã tồn tại',
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                {
                    _id: req.params.id,
                },
                dataUpdate,
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(400).json({
                    message: 'Sản phẩm không tồn tại',
                });
            }
            return res.json(updatedProduct);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: 'Cập nhật thất bại',
            });
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const { page, sort, type } = req.query;
            if (sort) {
                const products = await sortable(Product, sort, type);
                return res.json(products);
            }
            if (page) {
                const products = await paginations(Product, page, 8);
                return res.json(products);
            } else {
                const products = await Product.find({});
                return res.json(products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getDetailProduct(req, res, next) {
        try {
            const id = req.params.id;
            const product = await Product.find({ _id: id });

            return res.json(product);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductController();
