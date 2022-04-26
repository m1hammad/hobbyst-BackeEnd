const router = require('express').Router()
const {body} = require('express-validator')
const eventCntrl = require('../controllers/event')  



router.post('/eventcreateform/:userid', eventCntrl.event_post)


module.exports = router