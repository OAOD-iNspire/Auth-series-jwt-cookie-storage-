const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;




const suggestion = new Schema({ 

  heading:{
  	type:String
  },
  about:{
  	type:String
  },
  date:{
  	type:Date,
  	default: Date.now()
  },
  category:{
  	type:Number
  },
  email:{
  	type:String
  }

}); 




module.exports = mongoose.model('suggestionModel', suggestion)

