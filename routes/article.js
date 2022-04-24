// Dependencies
const express = require('express')
const articleCtrl = require('../controllers/article')
const methodOverride = require('method-override')
const isLoggedIn = require('../helper/isLoggedIn')
const { append } = require('express/lib/response')


const router = express.Router()
router.use(methodOverride('_method'))

router.use(express.urlencoded({extended: true}))

router.get('/article/add', articleCtrl.article_create_get)

router.post('/article/add', articleCtrl.article_create_post)

router.get('/article/index', articleCtrl.article_index_get)

router.get('/article/detail', articleCtrl.article_show_get)

router.get('/article/delete', isLoggedIn, articleCtrl.article_delete_get)

// Using method-override
// router.delete('/article/delete', articleCtrl.article_delete_get)

router.get('/article/edit', isLoggedIn, articleCtrl.article_edit_get)

// router.post('/article/edit', articleCtrl.article_edit_post)

router.put('/article/update', articleCtrl.article_update_put)

module.exports = router