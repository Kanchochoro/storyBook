const Post = require("../model/Post");
const RegisterUser = require("../model/Register")
const Role=require("../model/Role");



module.exports={
    getUsers:async(req,res)=>{
     const users=await RegisterUser.find().select(["email","firstname","lastname"]);
     //console.log(users);
     return res.render("admin/userlist",{users,layout:"layouts/admin"});

    },
    addRoleGet:async(req,res)=>{
        const user=await RegisterUser.findOne({_id:req.params.id});
        const allRole=await  Role.find().select(["role",{_id:1}]);
      //  console.log(allRole);
        demyRole=["user","admin"]
      //  console.log(user)
        res.render("admin/addRole",{user,roles:allRole,layout:"layouts/admin"},)
    },
    addRolePost:async(req,res)=>{
     try {
      const user=await RegisterUser.findOne({_id:req.params.id});
      //user.roles=[];
    const addedRole=req.body.role;  
    //console.log(addedRole);
     if(addedRole){
      // console.log(addedRole);
          if(!user.roles.includes(addedRole.toLowerCase())){
            user.roles=user.roles.concat(addedRole.toLowerCase());
          }else{
            throw new Error("This role is already added");
          }
        await user.save();
     }else{
      throw new Error("Please select one of this Role");
     }
     res.redirect("/admin/user-list");
      
     } catch (error) {
      // console.log(error)
       const user=await RegisterUser.findOne({_id:req.params.id});
       const allRole=await  Role.find().select(["role",{_id:1}]);
       res.render("admin/addRole",{error:error,user,roles:allRole,layout:"layouts/admin"});
     }
     // console.log(user);
    },
    index:async(req,res)=>{

      return res.render("admin/index",{
        layout:"layouts/admin",
      })
    },
    deleteUser:async(req,res)=>{
     const userId=req.params.id;
     console.log(await RegisterUser.remove({_id:userId}));
     const post=await Post.remove({user:userId});
     return res.redirect("/admin/user-list");
    }


}


