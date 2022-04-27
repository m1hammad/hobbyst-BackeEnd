const router = require('express').Router() 
const hobbyCntrl = require('../controllers/hobby')  
const methodOverride = require('method-override')
const { append } = require('express/lib/response')


router.use(methodOverride('_method'))


router.get('/hobbyindex',hobbyCntrl.hobbyseed)
router.post('/hobbyUser/:email', hobbyCntrl.hobby_add_user)
// router.get('/:hobbyId', hobbyCntrl.hobby_show_get)
 

// router.get('/hobbydetail/:id',hobbyCntrl.showHobby)



module.exports = router