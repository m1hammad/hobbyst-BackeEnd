const {Event} = require('../models/Event') 
const moment = require('moment')

// exports.event_post = (req, res) =>{
//   console.log("req.body user is",req.params.userid)
//     let newEvent= new Event(req.body)
//     newEvent.users.push(req.params.userid)
//     await newEvent.save()
//     let user = await User.findById(req.params.userid)
//     user.events.push(newEvent._id)
//     user.save()
//     res.status(200).send("Done") 
// }