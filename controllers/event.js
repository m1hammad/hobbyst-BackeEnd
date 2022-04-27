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
    // find the id's of the hobbies in Event
    // let hobbies = await newEvent.hobby
    // hobbi =Hobby.find({})
   
    // for (let hobby in hobbies){
    //   await hobbi.findById(hobby._id).push(newEvent._id)
    //   console.log("hobby", Hobby.findById(hobby._id))
    //   Hobby.save()
    // }
    res.status(200).send('Done')
  
  }


    // exports.hobby_add_avent = async(req, res) => {
    //   console.log("email:", req.params.email)
    //   console.log("req hobby ", req.body)
    //   let hobbyIds = req.body
    //   let user = await User.findOne({emailAddress: req.params.email})
    //   hobbyIds.forEach(async id => {
    //       let hobby = await Hobby.findById(id)
    //       hobby.users.push(user._id)
    //       hobby.save()
    //   })
      
      
  //   .then(async newEvent => {
  //     console.log("evet is", await newEvent)
  //     res.json({newEvent})
  //   }) 
  //   .catch((err) => {
  //     console.log(err)
  //     res.send('ERROR')
  // })

