const {Event} = require('../models/Event') 
const moment = require('moment')

exports.event_post = (req, res) =>{
    console.log('hitting controller')
    let newEvent= new Event(req.body)
    newEvent.save()
    .then(newEvent => {
      res.json({newEvent})
    }) 
    .catch((err) => {
      console.log(err)
      res.send('ERROR')
  })
}

