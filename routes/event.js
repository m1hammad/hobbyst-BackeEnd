const router = require('express').Router() 
const eventCntrl = require('../controllers/event')  
const isLoggedIn = require('../helper/isLoggedIn')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

router.get('/eventdetail/:eventid', eventCntrl.event_detail)
router.post('/eventcreateform/:userid',isLoggedIn, eventCntrl.event_post)
router.delete('/event/delete/:eventid', eventCntrl.event_delete)
router.put('/event/edit/:eventid', eventCntrl.event_edit_put)



module.exports = router