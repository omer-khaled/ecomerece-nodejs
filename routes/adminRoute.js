import express from 'express';
import { handleHomePage , handleGetRequestAddProduct , handlePostRequestAddProduct , handleGetRequestEditProduct , handlePostRequestEditProduct, handleGetRequestDeleteProduct } from '../controllers/adminContrrollers.js';
const adminRoute = express.Router();
// home page for admin
adminRoute.get('/',handleHomePage);

// add product form get
adminRoute.get('/addproduct',handleGetRequestAddProduct);

// add product form Post
adminRoute.post('/addproduct',handlePostRequestAddProduct);

// edit product form get
adminRoute.get('/editProduct/:id',handleGetRequestEditProduct);

// edit product form Post
adminRoute.post('/editProduct/:id',handlePostRequestEditProduct);

// delete product form get
adminRoute.get('/deleteProduct/:id',handleGetRequestDeleteProduct);
export default adminRoute;