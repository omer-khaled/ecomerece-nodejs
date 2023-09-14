import sequelize from "../database/DBconnection.js";
import { DataTypes } from "sequelize";
const User = sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    login:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }
});
export default User;