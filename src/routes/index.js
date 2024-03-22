import userRouter from './user.js';
import productRouter from './product.js';

const routes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
};

export default routes;
