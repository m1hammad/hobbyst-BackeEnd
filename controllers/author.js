// API for author module
const {Article} = require('../models/Article')
const {Author} = require('../models/Author')
const moment = require('moment')

// HTTP GET - Load in Add Author Form
exports.author_create_get = function(req, res){
    res.render('author/add');
}

// HTTP POST - Author
exports.author_create_post = (req, res) =>{
    console.log(req.body)
    let author = new Author(req.body)

    author
    .save()
    .then((author) => {
        // res.redirect('/author/index');
        res.json({author})
    })
    .catch((err) => {
        console.log(err)
        res.send('ERROR')
    })
}

// HTTP GET - Author Index
exports.author_index_get = (req, res) => {
    Author.find().populate(`article`)
    .then(authors => {
        // res.render('author/index', {authors: authors, moment}) // moment: moment 
        res.json({authors})
    })
    .catch(err => {
        console.log(err)
    })
}

// HTTP GET - Author By ID
exports.author_show_get = (req, res) => {
    console.log(req.query.id)
    Author.findById(req.query.id).populate('article')
    .then(author => {
        console.log(author)
        res.render('author/details', {author, moment})
    })
    .catch( err =>{
        console.log(err)
    })
}

// HTTP DELETE
exports.author_delete_get = (req,res) => {
    console.log(req.query.id)
    Author.findByIdAndDelete(req.query.id)
    .then(author =>{
        // res.redirect('/author/index')
        res.json(author)
    })
    .catch( err=> {
        console.log(err)
    })
}

// HTTP GET edit
exports.author_edit_get = (req, res) => {
    Author.findById(req.query.id)
    .then((author) => {
        console.log(author)
        // res.render('author/edit', {author})
        res.json({author})
    })
    .catch(err => {
        console.log(err)
    })
}

// HTTP POST edit
exports.author_update_put = (req, res) =>{
    Author.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((author) => {
        // res.redirect('/author/index');
        res.json({author})
    })
    .catch((err) => {
        console.log(err)
    })
}