const mongoose = require('mongoose');
const model = mongoose.Schema;
const suggestionModel = require('../model/suggestion')
const suggestionSchema = mongoose.model('suggestionModel');
const bcrypt = require('bcryptjs');
const saltWork = 10 ;



const User = new model({ 

  alias:{
     type: String
  },
  
  email:{ 
     type: String
  },

  interest:{ 
    type: Number 
  }, 
   
  password:{ 
     type: String
  },

  suggestion:[{ type: model.Types.ObjectId, ref: suggestionSchema }]

});



User.pre('save', ()  => { 
 const user = this;

 //check if password was modified or if newly created. If not skip

 if(!this.isModified('password'))
 	return next()

//genrate sale and hash using slt function 

bcrypt.hash(password, saltWork, function(err, hash) {
  if(err)
  	return next(err) ;

  user.password = hash ;
  return next ;
});

//compare password function

User.methods.comparePassword = (candidatePassword, cb) => {

	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){ 
           if(err)
           	return cb(err);
           return cb(null, isMatch);
	});

         
}


});




module.exports = mongoose.model('userModel', User);





