import sequelize from "../database/DBconnection.js";
import { DataTypes } from "sequelize";
const CartItem = sequelize.define('cartItems',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    qty:{
       type:DataTypes.INTEGER,
       allowNull:false, 
    }
});
export default CartItem;