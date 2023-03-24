const mongoose=require("mongoose");
// const dotenv=require("dotenv");

// dotenv.config();


module.exports=async function(){
  try {
   // console.log(process.env.DB_CONNECTION);
   console.log( process.env.ONLINE_DBURL);
    const connections=await mongoose.connect( process.env.ONLINE_DBURL,{useNewUrlParser:true,useUnifiedTopology:true,autoIndex:true,useFindAndModify:false})
        // useNewUrlParser:true,useUnifiedTopology:true
      
    console.log(connections.connection.host);
    console.log("Connection succss");

  } catch (error) {
    console.log("this is the conecton errror");
      console.log(error);

  }
}