const router = require('express').Router() 
const hobbyCntrl = require('../controllers/hobby')  
const methodOverride = require('method-override')
const { append } = require('express/lib/response')


router.use(methodOverride('_method'))


router.get('/hobbyindex',hobbyCntrl.hobbyseed)
router.post('/hobbyUser/:email', hobbyCntrl.hobby_add_user)
router.get('/hobbylist/:id', hobbyCntrl.hobby_user_show)
router.get('/hobbydetail/:id', hobbyCntrl.hobby_show_get)





module.exports = router