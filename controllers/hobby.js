const {Hobby} = require('../models/Hobby') 
const User = require('../models/User') 
let hobbies = require('./seed.js')
 

// this function takes in the hobbies from the seed and populates
// them into the model objects of 'Hobby'
exports.hobbyseed = async(req, res) =>{
    // let newHobby = new Hobby()    
    let hobbiesList = await Hobby.find({})
    if (hobbiesList.length == 0){
        for (let hobby of hobbies)
            {
                await Hobby.create(hobby)

            };
        console.log(hobbiesList)
    }
    try {
        hobbiesList = await Hobby.find({}).populate("events")
        res.json({hobbiesList})
    }
    catch(err){
        console.log(err)
        res.send('ERROR')
    }
}

exports.hobby_add_user = async(req, res) => {
    console.log("email:", req.params.email)
    console.log("req hobby ", req.body)
    let hobbyIds = req.body
    let user = await User.findOne({emailAddress: req.params.email})
    hobbyIds.forEach(async id => {
        let hobby = await Hobby.findById(id)
        console.log(user._id)
        await hobby.users.push(user._id)
        hobby.save()
        console.log(hobby)
        // let results = await Hobby.findById(hobbyIds)
        // console.log(results)
    })
    res.status(200).send('Done')

}

exports.hobby_show_get = async(req, res) => {
    let hobby = await Hobby.findById(req.params.id).populate('events')
    res.json(hobby)
}


// exports.showHobby = (req, res) => {
//     console.log("test")
//     console.log(req.params.id)
//     Hobby.findById(req.params.id) 
//     .then(hobby => {
//         console.log(hobby)
//         res.json({hobby})
//     })
//     .catch( err =>{
//         console.log(err)
//     })

// }

