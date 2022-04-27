const router = require('express').Router()
const {body} = require('express-validator')
const eventCntrl = require('../controllers/event')  
const isLoggedIn = require('../helper/isLoggedIn')



// router.get ('/events/:eventid', eventCntrl.event_getOne)
router.post('/eventcreateform/:userid',isLoggedIn, eventCntrl.event_post)


module.exports = router