const router = require('express').Router()
const {body} = require('express-validator')

const profileCntrl = require('../controllers/profile')

router.get('/profile', profileCntrl.profile_get)

module.exports = router