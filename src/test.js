const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();

app.use(cookieParser());

app.get("/",(req,res)=>{
       res.cookie("ilove","THis is my cookie");
       res.send("Cookie set");

})

app.get("/about",(req,res)=>{
    res.send(req.cookies.ilove);
})
app.listen(8000,()=>{
    console.log("hello in port");
})