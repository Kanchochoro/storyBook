const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const registerUser=new mongoose.Schema({
  firstname:{
      type:String,
      required:true,
  },
  lastname:{
    type:String,
    required:true,
    lowercase:true,
},
email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
       if(!validator.isEmail(value)){
           throw new Error("Email is invalid");
       }
    }
         
},
phone:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true

},
createdAt:{
    type:Date,
    default:Date.now,
},
tokens:[{
    token:{
        type:String,
        required:true
    }
}],
emailVerify:{
    type:Boolean,
    default:false,
},
roles:[
    {type:String,
    default:"user",
    lowercase:true
    }
],
profileImage:{
    type:String,
    required:true
}

});


   registerUser.methods.generateAouthToken= async function(){
      try {
          const token=jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET);
          this.tokens=this.tokens.concat({token:token});
          //this.roles=this.roles.concat("user");
          await this.save();
          return token;
      } catch (error) {
          console.log(error);
      }
   };
   registerUser.pre("save",async function(next){
       if(this.isModified("password")){
           this.password=await bcrypt.hash(this.password,10);
           console.log(this.password);
       }
       next(); 
   })
const RegisterUser=new mongoose.model("RegisterUser",registerUser);

module.exports=RegisterUser;