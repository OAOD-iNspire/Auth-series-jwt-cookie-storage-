const jwt = require('jsonwebtoken');
const config = require('config');



exports.jwtVerify = async (req, res, next) =>{ 

// retrieve token value from request
//const token = req.header('x-auth-token'); 

const token = req.cookies['jwtHolder'];
try{
//verify the presence of a value and handle possible error

if(!token){ 
	console.log("error line 1")
   res.status(403).json({msg:"user not permitted to access this route"});
  }

//verify token authenticity
const authJwt = await jwt.verify(token, config.get('JWTsecret'), (err, sessionData) => { 
   if(err){
   	console.log("error line 2")
   	res.status(403).json('invalid token')
   }

  req.sessionData = sessionData;

  next();
}); 



} catch(err){
	console.error(err.message)
}


}

