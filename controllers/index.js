// API
const hobbies = require('./seed.js')

const {Event} = require('../models/Event')


exports.index_get = (req, res) => {

    res.render('home/index', {welcomeMessage: "Welcome to HOBBYST."})
} 