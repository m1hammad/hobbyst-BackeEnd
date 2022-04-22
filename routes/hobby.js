const router = require('express').Router() 
const hobbyCntrl = require('../controllers/hobby')  
const methodOverride = require('method-override')
const { append } = require('express/lib/response')


router.use(methodOverride('_method'))

router.get('/hobbyindex',hobbyCntrl.hobbyseed)


module.exports = router