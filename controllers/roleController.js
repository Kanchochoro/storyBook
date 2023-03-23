const Role=require("../model/Role");


module.exports={
    index:async(req,res)=>{
        res.render("role/add",{layout:"layouts/admin"},);
    },
    create:async(req,res)=>{
      try {
          const role=req.body.role;
        if(role.length>0){
            var roleExist=await Role.findOne({role});
           // console.log(roleExist)
            if(roleExist){
                throw new Error("This role is already added");
            }else{
                   var addRole=new Role({
                       role
                   });
                   if(await addRole.save()){
                    return res.redirect("/role");
                   }

                    throw new Error("This role cannot add");
            }
          //  res.send(role);
        }else{
            throw new Error("Please Fill Role");
        }
      } catch (error) {
          res.render("role/add",{
              layout:"layouts/admin",
              error:error
          })
      }
    },
    show:async(req,res)=>{
      const roles= await Role.find().lean();
      res.render("role/index",{
          layout:"layouts/admin",
          roles:roles,
          link:"role",
          col:"blue"
      });
    },
    delete:async(req,res)=>{
        //const roles=await Role.find().lean();
      const roleId=req.params.id;

      //console.log(roleId);
     const del=await Role.deleteOne({_id:roleId});
     //console.log(del.ok);
     if(del.ok==1){
         res.redirect("/role");
     }

    },
}