import Product from "../models/ProductsModel.js";
// get home page middleware
const handleHomePage = async(request,response,next)=>{
    try{
        const products = await Product.findAll();
        response.render('admin/home.ejs',{products:products,path:'/home',pageTitle:'home page'});
    }catch(e){
        response.render('admin/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page'});
    }
}

// get form add product middleware
const handleGetRequestAddProduct = (request,response,next)=>{;
    response.render('admin/addProduct.ejs',{product:null,path:'/addproduct',pageTitle:'add Product page'});
}

// Post add Product middleware
const handlePostRequestAddProduct = async(request,response,next)=>{;
    try{
        const product =await Product.create({...(request.body)});
        response.redirect('/admin');
    }catch(e){
        response.render('admin/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error'});
    }
}

// get form edit product middleware
const handleGetRequestEditProduct = async(request,response,next)=>{
    const {id} = request.params;
    try{
        const product =await Product.findByPk(id);
        response.render('admin/editProduct.ejs',{product:product,path:'/editPorduct',pageTitle:'add Product page'});
    }catch(e){
        response.render('admin/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error'});
    }
}

// post form edit product middleware
const handlePostRequestEditProduct = async(request,response,next)=>{
    const {id} = request.params;
    const {title,imageUrl,description,price} = request.body;
    try{
        const product =await Product.findByPk(id);
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
        await product.save();
        response.redirect('/admin');
    }catch(e){
        response.render('admin/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error'});
    }
}

// get form delete product middleware
const handleGetRequestDeleteProduct = async(request,response,next)=>{
    const {id} = request.params;
    try{
        const product =await Product.findByPk(id);
        product.destroy();
        response.redirect('/admin');
    }catch(e){
        response.render('admin/error.ejs',{error:`error on fetching data ${e}`,pageTitle:'error page',path:'error'});
    }
}
export {handleHomePage,handleGetRequestAddProduct,handlePostRequestAddProduct,handleGetRequestEditProduct,handlePostRequestEditProduct,handleGetRequestDeleteProduct};