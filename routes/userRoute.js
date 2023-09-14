import express from 'express';
import { getUserHomePage, postUserRegister , postPorductToCart , getCartHomePage, deletePorductToCart } from '../controllers/userController.js';
const userRoute = express.Router();

// get Home
userRoute.get('/',getUserHomePage);

userRoute.get('/cart',getCartHomePage);

// post register
userRoute.post('/register',postUserRegister);

// get Add To Cart
userRoute.get('/addtocart/:id',postPorductToCart);

// delete from cart
userRoute.get('/deletetocart/:id',deletePorductToCart);

export default userRoute;