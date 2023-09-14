import Product from "../models/ProductsModel.js"
import CartItem from "../models/cartItem.js";
import Cart from "../models/cartModel.js";
import User from "../models/usersModel.js";
export let login = false;
export let user = null;
// get Home page
const getUserHomePage = async(request,response,next)=>{
    try{
        let products = await Product.findAll();
        response.render('home/home.ejs',{pageTitle:'home page',products:products,path:'/user/',login:login,user:user});
    }catch(e){
        response.render('home/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error'});
    }
}

// post register user
const postUserRegister = async(request,response,next)=>{
    try{
        const users = await User.findAll({where:{
            name:request.body.name,
            email:request.body.email
        }});
        if(users.length === 0){
            user = await User.create({...(request.body),login:true});
        }else{
            user = users[0];
        }
        login = true;
        response.redirect('/user/');
    }catch(e){
        response.render('home/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error'});
    }
}

// add procdut to cart
const postPorductToCart =  async(request,response,next)=>{
    const {id} = request.params;
    try{
        let cart =await user.getCart();
        let product = await Product.findByPk(id);
        if(!cart){
            cart = await user.createCart({totalPrice:product.price});
            await cart.addProduct(product,{through:{qty:1}});
        }else{
            const products = await cart.getProducts({
                where:{
                    id:id
                },
                limit:1,
            });
            const foundedProduct = products[0];
            if(foundedProduct){
                await cart.addProduct(product,{through:{qty:Number(foundedProduct.cartItems.qty) + 1}});
            }else{
                await cart.addProduct(product,{through:{qty:1}});
            }
            cart.totalPrice+=product.price;
            await cart.save();
        } 
        response.redirect('/user/cart');
    }catch(e){
        response.render('home/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error',login:true});
    }
}

// delete from cart
const deletePorductToCart =  async(request,response,next)=>{
    const {id} = request.params;
    try{
        let cart =await user.getCart();
        const products = await cart.getProducts({
            where:{
                id:id
            },
            limit:1,
        });
        const foundedProduct = products[0];
        if(foundedProduct.cartItems.qty>1){
            await cart.addProduct(foundedProduct,{through:{qty:Number(foundedProduct.cartItems.qty) - 1}});
        }else{
            await cart.removeProduct(foundedProduct);
        }
        cart.totalPrice -= foundedProduct.price;
        await cart.save();
        response.redirect('/user/cart');
    }catch(e){
        console.log(e);
        response.render('home/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error',login:true});
    }
}

// get Home page
const getCartHomePage = async(request,response,next)=>{
    try{
        const cart = await user.getCart();
        if(cart){
            const products = await cart.getProducts();
            response.render('home/cart.ejs',{pageTitle:'home page',products:products,path:'/user/cart',login:login,total:cart.totalPrice});
        }else{
            response.render('home/cart.ejs',{pageTitle:'home page',products:[],path:'/user/cart',login:login,total:0});
        }
    }catch(e){
        console.log(e);
        // response.render('home/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error'});
    }
}
export {getUserHomePage,postUserRegister,postPorductToCart , getCartHomePage,deletePorductToCart};