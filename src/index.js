import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import db from './config/db/connect.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

//Connect to database
db.connect();

// Sử dụng body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server is running at port: ' + port);
});
