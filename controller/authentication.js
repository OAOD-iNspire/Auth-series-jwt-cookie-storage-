const mongoose = require('mongoose');
const userModelReference = require('../model/user');
const userModel = mongoose.model('userModel');
const async = require('asyncawait/async');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');





//save a new user

exports.create_user = 

async (req, res) => {

const {alias, password, interest, suggestion, email } = req.body;
 console.log(req.body)

 try {
         //check if email exists
         let user = await userModel.findOne({email});
         if(user){
         	return res.status(400).json(user);
         }
//create data object
const createUser = new userModel({ 
	            alias,
	            password,
	            interest,
	            suggestion,
	            email
         });
   
   const salt = await bcrypt.genSalt(10);

   createUser.password = await bcrypt.hash(password, salt);

   let userCreated = await createUser.save();

   if(userCreated){
   	   return res.status(200).json({msg:"user created"});
   }

 }

catch(err){
    console.error(err.message)
	return res.status(500).json({msg: err.message});
}
}



exports.validate_user = 

async (req, res) => { 
 
 const {email, password} = req.body

 console.log(req.body)

try {
	//search db for user
 let user = await userModel.find({email})
 
  console.log(user)
//catch error if user doesnt exist
 if(!user){
 	return res.status(400).json('user doesnt exist')
   }  

console.log(user[0].password)
const isMatch = await bcrypt.compare(password, user[0].password)

//handle error if passwords do not match
if(!isMatch){
     
	return res.status(401).json({msg:'incorrect password'})
   }

const uniqueId = {
	     user:{
         email: user[0].email
        }
     }
console.log(uniqueId)
console.log(config.get('JWTsecret'));
jwt.sign(uniqueId, config.get('JWTsecret'), (err, token ) => {
console.log('iran')
                   if(err){ console.log('i ran'); throw err}
                console.log (res.cookie('jwtHolder', token, {domain:'localhost:3000', path: '/', httpOnly: false}));
               console.log(res.set('Set-Cookie', token ))
                   res.header('Access-Control-Allow-Credentials', 'true');
                   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
               console.log (res.setHeader('set-cookie', token))
                   return res.status(200).json(token)
              

})

}catch(err){
	    console.error(err.message)
	 	return res.status(500).json({msg:err.message})
}

}
