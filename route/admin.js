const router=require("express").Router();
const adminController=require("../controllers/adminController");
const {isAdmin}=require("../middleware/auth");
// router.use(isAdmin);
router.get("/",adminController.index);
router.get("/user-list",adminController.getUsers);
router.get("/addRole/:id",adminController.addRoleGet);
router.post("/addRole/:id",adminController.addRolePost);
router.get("/user/delete/:id",adminController.deleteUser);


module.exports=router;