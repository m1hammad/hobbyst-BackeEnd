const {Event} = require('../models/Event') 
const User = require("../models/User")
const moment = require('moment')
const {Hobby} = require('../models/Hobby')


  exports.event_post = async (req, res) =>{
  // need to push the user that is being passed in as a param to the event.users list
    // console.log('hitting controller')

    console.log("req.body user is",req.params.userid)
    let newEvent= new Event(req.body)
    console.log("body", req.body)

    newEvent.users.push(req.params.userid)
    console.log("new event", newEvent)

    await newEvent.save()
    let user = await User.findById(req.params.userid)
    user.events.push(newEvent._id)
    user.save()
    let hobbies = await newEvent.hobby
    console.log("I am printing",hobbies)
    console.log("hardcoded string")
    hobbies.forEach(async hobbyid => {
      console.log("hobbyid", hobbyid._id)
      let hobby = await Hobby.findById(hobbyid._id)
      console.log("hobby",hobby)
      hobby.events.push(newEvent._id)
      hobby.save()
      let results = await Hobby.findById(hobbyid._id)
      console.log(results)
    })
    res.status(200).send('Done')
  
  }

  exports.event_delete = (req,res) => {
    console.log("what is this",req.params)
    Event.findByIdAndDelete(req.params)
    .then(event =>{
        res.json(event)
    })
    .catch( err=> {
        console.log(err)
    })
  }

  exports.event_edit_put = (req, res) => {
    console.log("body",req.params)
    Event.findByIdAndUpdate(req.params, req.body, {new: true})
    .then((event) => {
        console.log(event)
        res.json({event})
    })
    .catch(err => {
        console.log(err)
    })
  }