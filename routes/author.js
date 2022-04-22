const express = require('express')
const authorCtrl = require('../controllers/author')
const methodOverride = require('method-override')
const isLoggedIn = require('../helper/isLoggedIn')
const { append } = require('express/lib/response')


const router = express.Router()
router.use(methodOverride('_method'))

// router.use(express.urlencoded({extended: true}))
router.use(express.json())

router.get('/author/add', isLoggedIn, authorCtrl.author_create_get)

router.post('/author/add', isLoggedIn, authorCtrl.author_create_post)

router.get('/author/index', authorCtrl.author_index_get)

router.get('/author/detail', authorCtrl.author_show_get)

router.delete('/author/delete',  isLoggedIn, authorCtrl.author_delete_get)

// Using method-override
// router.delete('/author/delete', authorCtrl.author_delete_get)

router.get('/author/edit', isLoggedIn, authorCtrl.author_edit_get)

// router.post('/author/edit', authorCtrl.author_edit_post)

router.put('/author/update', isLoggedIn, authorCtrl.author_update_put)

module.exports = router