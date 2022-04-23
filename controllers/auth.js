// API's for authentication
const User = require('../models/User')
const bcrypt = require('bcrypt')
let passport = require('../helper/ppConfig');
const salt = 10;
const {validationResult} = require('express-validator')
const jwt = require("jsonwebtoken")


exports.auth_signup_post = (req, res) => {
    const user = new User(req.body)
    // try{
    let hash = bcrypt.hashSync(req.body.password, salt)
    console.log('this is hash', hash)
    user.password = hash;
    user.save()
    
      // const isMatch = bcrypt.compareSync(password, user.password);
      // console.log(password)
      // console.log(user.password)
  
      // if(!isMatch){
      //   return res.json({ "message": "Password mismatched!!!"}).status(400);
      // }
    .then( response => {
      const payload = {
        user:{
          id: user._id,
          name: user.firstName,
          
        }
      }

      jwt.sign(
        payload,
        process.env.secret,
        { expiresIn: 36000000},
        (err, token) => {
          if(err) throw err;
          res.json({"message":"User Created Successfully", token }).status(200);
        }
      )
    })
    // }
    .catch(err => {
        if(err.code === 11000){
            req.flash('error','username already exists')

            res.json({"message":"Email Already Exists"})
        }
        else{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                res.json({"message":"Validation Errors", "ValidationErrors": errors.errors})
            }
        }
    })
}

exports.auth_signin_post = async (req, res) => {
    // req.body.emailAddress
    // req.body.password
  
    let { emailAddress, password} = req.body
  
    try{
      let user = await User.findOne({ emailAddress });
      console.log('sign in backend',user);
  
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