const mongoose=require("mongoose");
// const dotenv=require("dotenv");

// dotenv.config();


module.exports=async function(){
  try {
   // console.log(process.env.DB_CONNECTION);
    const connections=await mongoose.connect("mongodb://127.0.0.1:27017/localdb",{useNewUrlParser:true,useUnifiedTopology:true})
        // useNewUrlParser:true,useUnifiedTopology:true
      
    console.log(connections.connection.host);
    console.log("Connection succss");

  } catch (error) {
    console.log("this is the conecton errror");
      console.log(error);

  }
}