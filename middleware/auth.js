const jwt=require("jsonwebtoken");
const Post = require("../model/Post");
const RegisterUser=require("../model/Register");

const auth=async(req,res,next)=>{
try {
    //console.log(process.env.JWT_SECRET)
    const token=req.cookies.jwt;
    //console.log(token);
    const verify=jwt.verify(token,process.env.JWT_SECRET);
    const registeredUser= await RegisterUser.findOne({_id:verify._id});
    if(registeredUser){
        
        req.user=registeredUser,
        req.token=token;
        //console.log(verify);
        next();
    }else{
        res.clearCookie("jwt");
        res.redirect("/account/login");
    }
    
} catch (err) {
    res.redirect("/account/login");
}

}
// if use try login page before logout then show home page;
const checkForLogin=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        const tokens=await jwt.verify(token,process.env.JWT_SECRET);
        
        console.log(tokens._id);
        res.redirect("/");
    } catch (error) {
        next();
    }

    }
    const bandForEdit=async(req,res,next)=>{
       try {
           const token=req.cookies.jwt;
           const tokens=await jwt.verify(token,process.env.JWT_SECRET);
           const post=await Post.findById(req.params.id).lean();
           if(tokens._id.toString()==post.user.toString()){
               //console.log("Equal")
               next();
           }
           else{
               res.redirect("/");
           }
          // console.log(tokens._id);
       } catch (err) {
           res.status(404).send("Page Not Found");
       }
    }
    const isAdmin=async(req,res,next)=>{
         const token=req.cookies.jwt;
         const tokens=await jwt.verify(token,process.env.JWT_SECRET);
         const user=await RegisterUser.findById(tokens._id);
         if(user.roles.includes("admin")){
             return next();
         }
         return res.status(404).render("404error");
        
    }
    const isSuperAdmin=async(req,res,next)=>{
        const token=req.cookies.jwt;
        const tokens=await jwt.verify(token,process.env.JWT_SECRET);
        const user=await RegisterUser.findById(tokens._id);
        if(user.roles.includes("super admin")){
            return next();
        }
        return res.status(404).render("404error");
       
   }

module.exports={auth,checkForLogin,bandForEdit,isAdmin,isSuperAdmin};