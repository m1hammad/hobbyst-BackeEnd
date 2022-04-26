const {Event} = require('../models/Event') 
const User = require("../models/User")
const moment = require('moment')

exports.event_post = async (req, res) =>{
  // need to push the user that is being passed in as a param to the event.users list
    // console.log('hitting controller')

    console.log("req.body user is",req.params.userid)
    let newEvent= new Event(req.body)

    newEvent.users.push(req.params.userid)

    await newEvent.save()
    let user = await User.findById(req.params.userid)
    user.events.push(newEvent._id)
    user.save()
    res.status(200).send("Done")

  //   .then(async newEvent => {
  //     console.log("evet is", await newEvent)
  //     res.json({newEvent})
  //   }) 
  //   .catch((err) => {
  //     console.log(err)
  //     res.send('ERROR')
  // })
}

