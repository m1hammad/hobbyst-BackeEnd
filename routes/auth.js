const router = require('express').Router()
const {body} = require('express-validator')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

const authCntrl = require('../controllers/auth')

router.post('/auth/signin', authCntrl.auth_signin_post)

router.post('/auth/signup', 
[
    body('firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('lastName').isLength({min: 3}),
    body('emailAddress').isEmail(),
    body('password').isLength({min : 6}),
    body('city').isLength({min: 2}),
    body('province').isLength({min: 2})
], authCntrl.auth_signup_post)


router.get('/auth/allusers', authCntrl.auth_all_users_get)
router.get('/auth/user/:_id', authCntrl.current_user_get)
router.delete('/user/delete/:_id', authCntrl.delete_user)

router.get('/profile', authCntrl.auth_profile_get)
router.put("/user/edit/:_id", authCntrl.user_edit_put)

module.exports = router