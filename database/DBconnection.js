import { Sequelize } from "sequelize";
const sequelize = new Sequelize('traningDB','root','fcaiomer2021',{
    dialect:'mysql',
    host:'localhost'
});
export default sequelize;