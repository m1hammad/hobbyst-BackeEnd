//Dependencies
const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
        minlength: [5, "Event name must be longer than 5 characters"],
        maxlength: [100, 'Your title is too wordy'],
    }, 
    photo: { 
        type: String, 
        required: true,  
        minlength: [5, "Please upload a photo"], 
    },
    description: {
        type:String,
        required: true,
        minlength: [10, 'Event description must be longer than 10 characters'],
        maxlength:[1000,'Event description must be shorter than 1000 characters']
    },
    maxParticipants:{
        type:Number,   
    },
    preciseLocation: {
        type:String,
        required:true,
        minlength: [10, 'Location must be longer than 10 characters'],
        maxlength:1000
    }, 
    generalLocation: {
        type: String,
        required: true,
        minlength: [10, 'Location must be longer than 10 characters'],
        maxlength:1000
    }, 
    hobby: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Hobby'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
},
{
    timestamps: true // a shortHand for both createdAt and updatedAt
}
);

// create Model with the name Event
const Event = mongoose.model('Event', eventSchema);

module.exports = {Event}

