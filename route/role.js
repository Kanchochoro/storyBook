const router=require("express").Router();

const roleController=require("../controllers/roleController");
const {isAdmin}=require("../middleware/auth");
// router.use(isAdmin);
router.get("/",roleController.show);
router.get("/add",roleController.index);
router.post("/add",roleController.create);
router.get("/delete/:id",roleController.delete);

module.exports=router;