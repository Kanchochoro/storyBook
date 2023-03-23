const router=require("express").Router();
const {auth,checkForLogin,bandForEdit}=require("../middleware/auth");
const Post=require("../model/Post");

 router.use(auth);
router.get("/post",async(req,res)=>{
  try {
    const story=await Post.find().populate("user").lean();
   // const story=await Post.find({user:req.user._id}).lean();
    console.log(story);
    console.log(req.user);
    res.render("index",{
     loggedUser:req.user,
      stories:story,
      link:"post",
      col:"red"
    })
  } catch (error) {
    res.send(error);
  }
});

router.get("/post/add",(req,res)=>{
  res.render("post/add",{
    // layout:"post/layout.hbs"
  });
});

router.post("/post/add",async(req,res)=>{
  //  console.log(req.user);
  try {
      if(req.body.title=="" || req.body.body==""){
        throw new Error("Title and Body Must be Fill");
      }
    const postAdd=new Post({
      title:req.body.title,
      body:req.body.body,
      status:req.body.status,
      user:req.user._id,

  })
  const result=await postAdd.save();
  if(result){
    res.redirect("/post");
  }
  //console.log(result);
  } catch (error) {
    res.render("post/add",{
      // layout:"post/layout.hbs",
      error:error,
    })
  }
})

router.get("/post/edit/:id",bandForEdit,async(req,res)=>{
  try {
    const postId=req.params.id;
    const post=await Post.findOne({_id:postId}).lean();
    if(post){
      res.render("post/edit",{
        // layout:"post/layout",
        post
      });
    }
    else{
      res.status(404).send("Page not Found");
    }

    console.log(post);
  } catch (error) {
    
  }
 // res.render("post/add",{layout:"post/layout.hbs"});
});
 router.post("/post/edit/:id" ,async(req,res)=>{
 try {
    //res.send(req.params.id);
  var postId=req.params.id;
  var post=await Post.findOne({_id:postId});
  if(post){
    post.title=req.body.title;
    post.status=req.body.status;
    post.body=req.body.body;
    
    await post.save();
    res.redirect("/post");
  }else{
    res.send("Page not Found")
  }
 } catch (error) {
   res.status(500).render("post/edit",{error});
 }
 });
router.get("/post/delete/:id",bandForEdit,async(req,res)=>{
  try {
    const post=await Post.findById(req.params.id).lean();
    if(post){
        await Post.remove({_id:req.params.id});
        res.redirect("/post");
    }else{
      res.status(404).send("Page Not Found");
    }
  } catch (error) {
    
  }
})

router.get("/post/:id",async(req,res)=>{
try {
  const post=await Post.findById(req.params.id).populate("user").lean();
  if(!post){
    res.status(404).send('Page Not Found');
  }
  else{
    res.render("post/show",{
      story:post
    })
  }
} catch (error) {
  res.status(500).send("Server Error");
}
});

router.get("/user/post/:id",async(req,res)=>{
  try {
    const userPost=await Post.find({user:req.params.id,status:"public"}).populate("user").lean();
    //console.log(userPost);
    res.render("stories",{stories:userPost,loggedUser:req.user});
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
module.exports=router;