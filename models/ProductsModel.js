import { DataTypes } from "sequelize";
import sequelize from "../database/DBconnection.js";
const Product = sequelize.define('product',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            is:/^[a-zA-Z\d\W]{2,}$/,
        }
    },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        validate:{
            isPostive(value){
                if(value<0){
                    throw new Error('price should be positive number');
                }
            },
        }
    }
});
export default Product;