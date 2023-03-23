const router=require("express").Router();
const {auth,checkForLogin}=require("../middleware/auth");
const Post=require("../model/Post");

router.get("/",async(req,res)=>{
    try {
        const publicPost=await Post.find({status:"public"})
        .populate("user").sort({createdAt:"desc"}).lean();
       // console.log(req.user);
      //  console.log("req user");

        res.render("stories",{stories:publicPost,loggedUser:req.user});
    } catch (error) {
      console.log(error);
      res.send(error);
    }
   //res.render("dashboard")

});

router.get("/secret",auth,(req,res)=>{
  res.render("secret");
})

module.exports=router;