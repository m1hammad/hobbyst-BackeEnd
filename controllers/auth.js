// API's for authentication
const User = require('../models/User')
const bcrypt = require('bcrypt')
let passport = require('../helper/ppConfig');
const salt = 10;
const {validationResult} = require('express-validator')
const jwt = require("jsonwebtoken")

// HTTP GET - Signup - load the signup form 
exports.auth_signup_get = (req, res) => {
    res.render('auth/signup')
}

// HTTP POST - Signup - to post data
exports.auth_signup_post = (req, res) => {
    const user = new User(req.body)

    let hash = bcrypt.hashSync(req.body.password, salt)
    console.log(hash)
    user.password = hash;
    user.save()
    .then(() => {
        // res.redirect("/");
        res.json({"message":"User Created Successfully"})
      })
    .catch(err => {
        if(err.code === 11000){
            req.flash('error','username already exists')
            // res.redirect('/auth/signup')
            res.json({"message":"Email Already Exists"})
        }
        else{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                // res.status(400).json({errors: errors.array})
                // req.flash('validationErrors', errors.errors)
                res.json({"message":"Validation Errors", "ValidationErrors": errors.errors})
                // res.redirect('/auth/signup')
                // res.json({"message":"errorCreating User. please try again later"})
            }
            
            // console.log(err);
            // res.send(err);
        }
    })
}

//HTTP GET - Signin - to load signin form 
exports.auth_signin_get = (req, res) => {
    res.render('auth/signin')
}
// HTTP POST - Signin - to post the data
// exports.auth_signin_post = 
//   passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/auth/signin",
//       failureFlash: 'Invalid username or password',
//       successFlash: 'Login successful!',
//   })

exports.auth_signin_post = async (req, res) => {
    // req.body.emailAddress
    // req.body.password
  
    let { emailAddress, password} = req.body
  
    try{
      let user = await User.findOne({ emailAddress });
      console.log(user);
  
      if(!user)
      {
        return res.json({ "message": "User Not Found!!!"}).status(400);
      }
  
      const isMatch = await bcrypt.compareSync(password, user.password);
  
      if(!isMatch){
        return res.json({ "message": "Password mismatched!!!"}).status(400);
      }
  
      const payload = {
        user:{
          id: user._id,
          name: user.firstName,
          
        }
      };
  
      jwt.sign(
        payload,
        process.env.secret,
        { expiresIn: 36000000},
        (err, token) => {
          if(err) throw err;
          res.json({ token }).status(200);
        }
      )
  
    } 
    catch (error){
      res.json({"message": "Your are not logged in!!!"}).status(400);
    }
  
  }

// HTTP GET - Logout - to logout user

exports.auth_logout_get = (req,res) => {
    req.logout()
    req.flash('success', "You are logged out")
    res.redirect('/auth/signin')
}