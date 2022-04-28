// module.exports = (req, res, next) => {
//     if(!req.user){
//         res.redirect('/auth/signin')
//     }
//     else{
//         next()
//     }
// } 

const jwt = require("jsonwebtoken")
require("dotenv").config()
module.exports = (req, res, next) =>{
    // Get token from header
    // const token = req.header("x-auth-token")
    // console.log(token)

    // Token from Authorization Header
    let authorizationToken = req.header("Authorization")
    console.log(authorizationToken,'authorization token in middleware')
    authorizationToken = authorizationToken.replace("Bearer ", '')
    console.log(authorizationToken)
    const token = authorizationToken

    if(!token){
        return res.json({
            "message":"You are not authorized to view this page"
        }).status(401)
    }

    try{
        const decoded = jwt.verify(token, process.env.secret)
        req.user = decoded.user
        next()
    }

    catch(error){
        return res.json({"message":"Invalid Token"})
    }
}