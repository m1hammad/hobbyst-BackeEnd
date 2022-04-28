// API's for authentication
const User = require('../models/User')
const {Hobby} = require('../models/Hobby')



exports.profile_get = async (req,res)=>{
    console.log('hitting this')
    let user= await User.findById(req.query.id).populate('hobby events')
    console.log(user)
    res.json(user)
  }