const router = require('express').Router()
const {body} = require('express-validator')

const profileCntrl = require('../controllers/profile')

//Creation in Auth route

//Read
router.get('/profile', profileCntrl.profile_get)

//Update

router.put('/profile/edit/:_id', profileCntrl.profile_edit_put)

//Delete
router.delete('/profile/delete/:_id', ()=>{profileCntrl.profile_delete_user})

module.exports = router