const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const Register=require("../model/Register");


const postSchema=new mongoose.Schema({
  title:{
      type:String,
      required:true,
      trim:true
  },
  body:{
    type:String,
    required:true,
    lowercase:true,
},
status:{
    type:String,
    default:"public",
    enum:["public","private"]
         
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Register,
},

createdAt:{
    type:Date,
    default:Date.now,
},

});


   
const Post=new mongoose.model("Post",postSchema);

module.exports=Post;