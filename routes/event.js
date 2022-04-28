const router = require('express').Router()
const {body} = require('express-validator')
const { route } = require('.')
const eventCntrl = require('../controllers/event')  
const isLoggedIn = require('../helper/isLoggedIn')



router.get('/eventdetail/:eventid', eventCntrl.event_detail)
router.post('/eventcreateform/:userid',isLoggedIn, eventCntrl.event_post)



module.exports = router