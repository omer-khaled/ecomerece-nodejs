import { DataTypes } from "sequelize";
import sequelize from "../database/DBconnection.js";
import User from "./usersModel.js";
const Cart = sequelize.define('cart',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
            model:'users',
            key:'id',
        }  
    },
    totalPrice:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    }
});
export default Cart;