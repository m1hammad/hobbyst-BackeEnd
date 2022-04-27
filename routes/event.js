const router = require('express').Router()
const {body} = require('express-validator')
const eventCntrl = require('../controllers/event')  


router.get ('/events/:eventid', eventCntrl.event_getOne)
router.post('/eventcreateform/:userid', eventCntrl.event_post)


module.exports = router