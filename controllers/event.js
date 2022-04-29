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

  exports.event_detail = async (req, res) =>{
    console.log("what is req.params.id for evendID",req.params.eventid )
    let event = await Event.findById(req.params.eventid).populate("users hobby")
    res.json({event})
      // res.status(200).send('Done')
  }

  exports.event_add_user = async (req, res) =>{
    console.log("EVENT id, event obj: user", req.params.eventid, req.params.userid)
    let event = await Event.findById(req.params.eventid)
    await event.users.push(req.params.userid)
    event.save()
    let user = await User.findById(req.params.userid)
    await user.event.push(req.params.eventid)
    user.save()
    console.log("USER id:,user obj:", req.params.userid, user)
    .then(event => {
      res.json(eventid)
    })
    .catch(err => {
      console.log(err)
    })
  }

  exports.event_delete = (req,res) => {
    console.log("what is this",req.params.eventid)
    Event.findByIdAndDelete(req.params.eventid)
    .then(event =>{
        res.json(event)
    })
    .catch( err=> {
        console.log(err)
    })

  }

  exports.event_edit_put = (req, res) => {
    console.log("body",req.params)
    Event.findByIdAndUpdate(req.params.eventid, req.body, {new: true})
    .then((event) => {
        console.log(event)
        res.json({event})
    })
    .catch(err => {
        console.log(err)
    })
  }
