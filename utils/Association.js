import User from "../models/usersModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/ProductsModel.js";
import CartItem from "../models/cartItem.js";
const makeAssociation = ()=>{
    // connect user and his cart
    User.hasOne(Cart,{foreignKey:'user_id'});
    Cart.belongsTo(User,{foreignKey:'user_id'});

    // connect products and Cart
    Product.belongsToMany(Cart,{through:CartItem,constraints:true,onDelete:'CASCADE'});
    Cart.belongsToMany(Product,{through:CartItem,constraints:true,onDelete:'CASCADE'});
}
export default makeAssociation;