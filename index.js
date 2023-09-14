import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import dirname from './utils/path.js';
import sequelize from "./database/DBconnection.js";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";
import makeAssociation from "./utils/Association.js";
import { login, user } from "./controllers/userController.js";
const app = express();
// set engin (ejs)
app.set('view engin','ejs');
app.set('views',path.join(dirname,'views'));

// parsing body on http post requests (extednded is false so act with data as simple key-value-piar);
app.use(bodyParser.urlencoded({extended:false}));

// allow request for all static files
app.use(express.static(path.join(dirname,'public')));
app.use(express.static(path.join(dirname)));

// add user
app.use((request,response,next)=>{
    request.user = user;
    request.login = login;
    next();
});

// admin Route
app.use('/admin',adminRoute);

// user Route
app.use('/user',userRoute);

makeAssociation();

// make DB 
// open server on port 3002 on localhost
sequelize.sync({}).then(()=>{app.listen(3002)}).catch(error=>console.log('db connection error',error));