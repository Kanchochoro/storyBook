const router = require("express").Router();
const { auth, checkForLogin } = require("../middleware/auth");
const accountController=require("../controllers/accountController");

//delcare to user form data in project
router.use(require("express").urlencoded({
  extended: false
}));

router.use(require("express").json());


router.get("/login", checkForLogin, (req, res) => {
  res.render("login", { layout: "layouts/login" });
});

router.post("/login",accountController.login) 

router.get("/register", checkForLogin, async (req, res) => {
  res.render("register", { layout: "layouts/login" });
});

router.post('/register',accountController.register)

router.get("/logout", auth,accountController.logout)

router.get("/verify/:token",accountController.verifyToken);



module.exports = router;