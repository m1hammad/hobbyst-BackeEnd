// API for article module
const {Article} = require('../models/Article')
const {Author} = require('../models/Author')
const moment = require('moment')

// HTTP GET - Load in Add Article Form
exports.article_create_get = function(req, res){
    Author.find()
    .then(authors => {
        res.render('article/add', {authors})
        // res.json({authors})
    }) 
    .catch(err => {console.log(err)})
    // res.render('article/add');
}

// HTTP POST - Article
exports.article_create_post = (req, res) =>{
    console.log(req.body)
    let article = new Article(req.body)

    article
    .save()
    .then(() => {
        // save article to authors as well
        req.body.author.forEach(author => {
            Author.findById(author, (error, author) => {
              author.article.push(article);
              author.save();
              });
              
          });
          res.redirect("/article/index");

        // res.redirect('/article/index');
    })
    .catch((err) => {
        console.log(err)
        res.send('ERROR')
    })

    // Author.findById( req.body.author, (error ,author) =>{
    //     console.log(req.body.author)
    //     author.article.push(article)
    //     author.save();
    //     res.redirect('/author/index')
    // })
}

// HTTP GET - Article Index
exports.article_index_get = (req, res) => {
    Article.find().populate('author')
    .then(articles => {
        
        res.render('article/index', {articles: articles, moment}) // moment: moment 
    })
    .catch(err => {
        console.log(err)
    })
}

// HTTP GET - Article By ID
exports.article_show_get = (req, res) => {
    console.log(req.query.id)
    Article.findById(req.query.id).populate('author')
    .then(article => {
        res.render('article/details', {article, moment})
    })
    .catch( err =>{
        console.log(err)
    })
}

// HTTP DELETE
exports.article_delete_get = (req,res) => {
    console.log(req.query.id)
    Article.findByIdAndDelete(req.query.id)
    .then(article =>{
        res.redirect('/article/index')
    })
    .catch( err=> {
        console.log(err)
    })
}

// HTTP GET edit
exports.article_edit_get = (req, res) => {
    Article.findById(req.query.id)
    .then(article => {
        console.log(article)
        res.render('article/edit', {article})
    })
    .catch(err => {
        console.log(err)
    })
}

// HTTP POST edit
exports.article_update_put = (req, res) =>{
    Article.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect('/article/index');
    })
    .catch((err) => {
        console.log(err)
    })
}