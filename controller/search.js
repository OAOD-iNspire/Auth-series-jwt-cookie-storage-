const mongoose = require('mongoose');
const suggestionSchemaReference = require('../model/suggestion');
const suggestionModel = mongoose.model('suggestionModel');
const async = require('asyncawait/async');


exports.search_suggestion_category = 

async (req, res) => { 

  
const searchParameter = req.query.id ;

if(!searchParameter){
	res.status(403).json({"msg":"category not available"});
        }

const categoryData = await suggestionModel.find({category:searchParameter})

if(categoryData.length < 0){
	res.status(403).json({"msg":"category is empty"});
      }

res.json(categoryData);

}