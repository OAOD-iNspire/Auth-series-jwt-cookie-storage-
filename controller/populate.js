const async = require('asyncawait/async');
const mongoose = require('mongoose');
const userModelReference = require('../model/user');
const suggestionModelReference = require('../model/suggestion');
const userSchema = mongoose.model('userModel')
const suggestionSchema = mongoose.model('suggestionModel');
const ObjectId = mongoose.Types.ObjectId;

//const jwtChecker = require('../middleware/jwtchecker.js');



 exports.suggestion_board = 

 async (req, res) => { 
   //console.log(req.email);
   //res.status(200).json(req.sessionData);
   console.log(req.sessionData)
try
{
   const user = await userSchema.findOne(req.sessionData.email)

 if(!user){
      return res.status(401).json("cant find user data");
   }

   return res.json(user);
} 
catch(err)
{
	console.error(err.message)
	return res.status(401).json(err.message)
}
}
  

exports.new_suggestion = 

async (req, res) => { 

  console.log()
  
  const {heading, about, date, category} = req.body
   
  
  //create data object 
   const suggestionDetails = new suggestionSchema({   
             heading,
             about,
             date,
             category,
             email : req.sessionData.user.email
   });

  try{
    //save new user
  	const addSuggestion = await suggestionDetails.save();

  	console.log(addSuggestion)

  	if(!addSuggestion){	throw err }

  	const updateUser = await userSchema.findOneAndUpdate(req.sessionData.email, {$push:{suggestion: addSuggestion.id }}, {new:true})

    if(!updateUser){ throw err }

    res.json(updateUser)

  }
  catch(err){ 
    console.error(err.message);
    return res.status(401).json('check suggestion creation server route');
}
  }




exports.delete_suggestion = 

  // extract id parameter from url
 

  async (req, res) => { 

  const id = req.params.id

   console.log(id)
  try
  {
  	 //find suggestion
  	 const selectedSuggestion = await suggestionSchema.findById(id);

     console.log(selectedSuggestion)
  	 if(!selectedSuggestion){res.status(401).json("suggestion does not exisit")}

     //confirm user owns data
    function checkUserAuthority () {
      if( selectedSuggestion.email !== req.sessionData.email) 
      	{
      	 return res.status(403)
      	} 
      }
 
     const userAuthorised = await checkUserAuthority();

     if(userAuthorised){
     //perform delete operation
     console.log(ObjectId(selectedSuggestion._id))
  	  await suggestionSchema.findByIdAndRemove(req.params.id)

  	  res.status(201).json('suggestion Deleted');
  	}
  }
  catch(err)
  {
    console.error(err.message);
    return res.status(401).json(err.message);
  }
  

  }



