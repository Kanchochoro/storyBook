const express=require("express");
const hbs=require("hbs");
const dotenv=require("dotenv");
const path=require("path");
const morgan=require("morgan");
const upload=require("express-fileupload");
const connectDb=require('../config/db');
const auth=require("../middleware/auth");
const cookieParser=require("cookie-parser");


 connectDb();

//variable
const staticPath=path.join(__dirname,"../public");
const viewsPath=path.join(__dirname,"../temp/views");
const partialsPath=path.join(__dirname,"../temp/partials");
const port=process.env.PORT||3000;
// handlerbar Helpers
const {formatDate,truncate,showEditAndDeleteIcon,isStatusPublic,editIcon, getUserRoles, isAdmin}=require("../helpers/hbs");
//dotenv middlewar
//dotenv.config({path:"../config"})
dotenv.config();

//app middleware
const app=express();
app.use(upload());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json())
hbs.registerPartials(partialsPath);
//regiter helper
hbs.registerHelper("formatDate",formatDate);
hbs.registerHelper("turncate",truncate);
hbs.registerHelper("showEditAndDeleteIcon",showEditAndDeleteIcon);
hbs.registerHelper("isStatusPublic",isStatusPublic);
hbs.registerHelper("editIcon",editIcon);
hbs.registerHelper("getUserRoles",getUserRoles)
hbs.registerHelper("isAdmin",isAdmin);
//set defatult path for all static file like css,js
app.use(express.static(staticPath));
// app.use(function(req,res,next){
//     res.locals.user=req.user || null;
//     next();
// });
app.use(morgan("dev"));
app.set("view engine","hbs");
app.set("views",viewsPath);

//set default view layout
app.set("view options",{layout:"layouts/main"});


//router section
app.use("/",require("../route/index"));
app.use("/account",require("../route/login"));

app.use("/",require("../route/post"));
app.use("/role",require("../route/role"));
app.use("/admin",require("../route/admin"));
app.get("/secret",(req,res)=>{
    res.render("secret");
    });
app.get("*",(req,res)=>{
    res.render("404error");
})
    // console.log(process.env.DB_CONNECTION);

//app.use("/",require("../route/index"));













app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})