// API's for authentication
const User = require('../models/User')
const {Hobby} = require('../models/Hobby')


//Profile Create happens on signup

exports.profile_get = async (req,res)=>{
    console.log('hitting this')
    let user= await User.findById(req.query.id).populate('hobby events')
    console.log(user)
    res.json(user)
  }


exports.profile_edit_put = (req, res) => {
  console.log("body",req.params)
  User.findByIdAndUpdate(req.params, req.body, {new: true})
  .then((user) => {
      console.log(user)
      res.json({user})
  })
  .catch(err => {
      console.log(err)
  })
}

exports.profile_delete_user = (req,res) => {
    User.findByIdAndDelete(req.params)
    .then(user =>{
        res.json(user)
    })
    .catch( err=> {
        console.log(err)
    })
  }