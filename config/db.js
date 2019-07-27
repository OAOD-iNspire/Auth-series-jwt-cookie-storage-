const mongoose = require('mongoose');
const config = require('config');
const dbUrl = config.get('mongoURI');
const async = require('asyncawait/async');


const dbOptions = { 
useNewUrlParser: true,
useCreateIndex:true, 
useFindandModify:false   


}

const dbConnect = async () => { 
 
   try{ 

   const connectionLine = await mongoose.connect(dbUrl, dbOptions);

   	console.log('successful db connection');

   }

   catch (err) { 
    console.error(err.message);
    //Exit the process with failure
    process.exit(1);
   }


         }

         module.exports = dbConnect; 