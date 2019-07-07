const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const baseRoute = require('./routes/index');
const authController= require('./controller/authentication');
const cookieParser = require('cookie-parser');

//connect database
dbConnection();

//initialize middleware 
app.use(cookieParser());
app.use(express.json({ extended: false }));

//initialize routes
app.use('/', baseRoute);

//declare port 

const PORT = process.env.PORT || 2000 ;


//create app listener
app.listen(PORT, () => console.log(`service running of port ${PORT}`));


