const {Hobby} = require('../models/Hobby') 
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
        hobbiesList = await Hobby.find({})
        res.json({hobbiesList})
    }
    catch(err){
        console.log(err)
        res.send('ERROR')
    }
}


exports.showHobby = (req, res) => {
    console.log("test")
    console.log(req.params.id)
    Hobby.findById(req.params.id) 
    .then(hobby => {
        console.log(hobby)
        res.json({hobby})
    })
    .catch( err =>{
        console.log(err)
    })

}




