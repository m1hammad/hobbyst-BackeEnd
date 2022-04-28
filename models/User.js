const mongoose= require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [2, "First name must be more than 2 characters"],
        maxlength: [99, 'Dude, STOP!!!'],
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "First name must be more than 2 characters"],
        maxlength: [99, 'Dude, STOP!!!'],
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6,"Password must be at least 6 characters"]
    },
    image: {
        // data:Buffer,
        // contentType: String,
        type:String,
        required: false,
        default: 'https://i.imgur.com/cCd9g1g.png',
        maxlength: 2000,
        blank:true, 
        null:true
    },
    city:{
        type:String,
        required: true,
        minlength: 2,
        maxlength:150
    },
    province:{
        type:String,
        required: true,
        minlength: 2,
        maxlength:150
    },
    about:{
        type:String,
        required: true,
        default:' ',
        minlength: 2,
        maxlength:150
    },
    hobby: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hobby',
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }]
    },

{
    timestamps: true,
})

//verifyPassword

userSchema.methods.verifyPassword = function(password){
    console.log(password)
    console.log(this)
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User