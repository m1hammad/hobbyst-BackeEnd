const router = require('express').Router()
const {body} = require('express-validator')
const eventCntrl = require('../controllers/event')  


// router.post('/eventcreateform', 
// [
//     body('title').isLength({min: 3}).withMessage('event name must be at least 3 characters long'),
// //     // body('photo').isLength({min: 3}),
// //     // body('description').isEmail(),
// //     // body('dateAndTime').isLength({min : 6}),
// //     // body('maxParticipants').isLength({min: 1}),
// //     // body('generalLocation').isLength({min: 10}),
// //     // body('preciseLocation').isLength({min: 10})

// ], 
// )
// // but how does this get the userid?
router.post('/eventcreateform/:userid', eventCntrl.event_post)

module.exports = router