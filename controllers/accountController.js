const bcrypt = require("bcryptjs");
const RegisterUser = require("../model/Register");
const nodemailer = require("nodemailer");
const dotent = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");
dotent.config();


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nb.ucsmdy@gmail.com",
    pass: "asp.netphp"

  }
});

module.exports = {
  login: async (req, res) => {
    try {
      const action=req.body.action;
      const email = req.body.email;
      const password = req.body.password;
      //loging section
      if(action=="Login"){
        console.log("hello");
        if(email=="" || password==""){
         throw new Error("Plase enter your email and password");
        }else{
          var loginUser = await RegisterUser.findOne({ email });
          if (loginUser) {
            if(loginUser){
          //  if (loginUser.emailVerify) {
             //console.log(loginUser.emailVerify)
             const isMatch = await bcrypt.compare(password, loginUser.password);
             if (isMatch) {
               const token = await loginUser.generateAouthToken();
               console.log(token);
               res.cookie("jwt", token, { maxAge: 9000000, httpOnly: true });
               res.redirect("/");
             } else {
               // // req.flash("hello")
               throw new Error("Invalid login attempt");
             }
            //  req.user=loginUser;
            // res.redirect("/")
   
           } else {
             throw new Error("Please verify your account on gmail");
           }
   
         } else {
           throw new Error("Invalid login attempt")
         }
         }
      }else{
        if(email==""){
          throw new Error("Please Enter your email");
        }else{
          const verifyToken = await jwt.sign({ email}, process.env.JWT_SECRET);

          transport.sendMail(getMailOption(email,verifyToken),async(err,info)=>{
            if(err){
              throw new Error("Check your internet connection and try again!");
            }else{
              res.render("login",{layout:"layouts/login",success:"Check your email to activate account"})
            }
          })
        }
      }
      
    } catch (error) {
      res.render("login", { layout: "layouts/login", error: error });
    }

  },
  //Register Function
  register: async (req, res) => {
    try {
      console.log(new Date().valueOf());
      console.log(req.files.profileImage);
      const email = req.body.email;
      if (email == "" || req.body.phone == "" || req.body.password == "" || req.body.firstname == "") {

        throw new Error("Please Enter all form data");
      }
      else {
        const imagePath = path.join(__dirname, "../public/images");
        //console.log(imagePath);
        if (req.files.profileImage) {
          var file = req.files.profileImage;

          var filename = `${new Date().valueOf()}-${file.name}`;
          // console.log(filename);
          const isUserExist = await RegisterUser.findOne({ email:email });
          if (!isUserExist) {
            const password = req.body.password;

            if (password === req.body.cpassword) {
              if (password.length >= 6) {

                const registerUser = new RegisterUser({
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: email,
                  phone: req.body.phone,
                  password: req.body.password,
                  profileImage: filename
                });
                registerUser.roles = registerUser.roles.concat("user");
                //  const token=registerUser.generateAouthToken();
                const getToken = await registerUser.generateAouthToken();
                 res.cookie("jwt", getToken, { maxAge: 9000000, httpOnly: true });
                 const saveUser = await registerUser.save();
                //  const verityToken = await jwt.sign({ email }, process.env.JWT_SECRET);
                // console.log(verityToken);
                // const mailOptions = {
                //   from: process.env.G_USER,
                //   to: req.body.email,
                //   subject: "User Account Activation",
                //   html: `<a href="http://localhost:${process.env.PORT}/verify/${verityToken}">Click Here for activation</a>`
                // }
                // const verifyToken = await jwt.sign({ email}, process.env.JWT_SECRET,{expiresIn:"1m"});
                // transport.sendMail(getMailOption(email,verifyToken), async (error, info) => {
                //   if (error) {
                //     throw new Error("Registration failed");
                //   }
                //   else {
                //     console.log(info);
                //     await file.mv(`${imagePath.toString()}/${filename}`, function (e) {
                //       if (e) {
                //         console.log(e);
                //         throw new Error(e);
                //       }
                //     })
                //     await registerUser.save();
                //     res.redirect("/account/login");
                //   }
                // })
                // await registerUser.save();
                 res.redirect("/account/login");

              }


              else {
                throw new Error("Password must contain at least 6 character!");
              }
            } else {
              throw new Error("Password and Confirm password should match!");
            }
          }
          else {
            throw new Error("This email is already use in registration !");
          }
        } else {
          throw new Error("Please select your Profile Image");
        }

      }
    } catch (error) {
      res.render("register", {
        layout: "layouts/login",
        error: error
      })
    }
  },

  // Logout function
  logout: async (req, res) => {
    try {
      res.clearCookie("jwt");

      req.user.tokens = [];
      await req.user.save();
      res.redirect("/account/login");
    } catch (error) {
      res.status(400).send(error);
    }
  },

  //verify Token function
  verifyToken: async (req, res) => {
    try {
      const token = req.params.token
      const verifyToken=await  jwt.verify(token,process.env.JWT_SECRET);
     // res.status(400).render("404error",{error:"Your token is expire .Request new token from login Page"})
      const user = await RegisterUser.findOne({ email: verifyToken.email });
      if (user) {
        user.emailVerify = true;
        const getToken = await user.generateAouthToken();
        res.cookie("jwt", getToken, { maxAge: 9000000000, httpOnly: true });

        await user.save();
        res.redirect("/account/login");
      }
      else {
        res.status(404).render("404error");
      }
    } catch (error) {
            res.status(400).render("404error",{error:error})
    }
  }


}

const getMailOption=(to,verifyToken)=> {
  
  return {
    from: process.env.G_USER,
    to: to,
    subject: "User Account Activation",
    html: `<a href="http://localhost:${process.env.PORT}/account/verify/${verifyToken}">Click Here for activation</a>`
  }
}







