//Dependencies
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    isPublished: Boolean,
    totalWordCount: Number,
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    }],
},
{
    timestamps: true // a shortHand for both createdAt and updatedAt
}
);

// create Model with the name Article
const Article = mongoose.model('Article', articleSchema);

module.exports = {Article} 
