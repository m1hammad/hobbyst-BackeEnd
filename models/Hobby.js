//Dependencies
const mongoose = require('mongoose'); 

const hobbySchema = mongoose.Schema({
    name: String,
    photo: String,
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

// create Model with the name Article
const Hobby = mongoose.model('hobby', hobbySchema);

module.exports = {Hobby}