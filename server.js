const express = require('express');
var cors = require('cors')
const app = express();
const dbConnection = require('./config/db');
const baseRoute = require('./routes/index');
const authController= require('./controller/authentication');
const cookieParser = require('cookie-parser');

//cors config
var corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  allowedHeaders:'Set-Cookie,Content-Type'
}

//connect database
dbConnection();

//enable cross origin resources sharing 

app.use(cors(corsOptions));
//initialize middleware 
app.use(cookieParser());
app.use(express.json({ extended: false }));

//initialize routes
app.use('/', baseRoute);

//declare port 

const PORT = process.env.PORT || 2000 ;


//create app listener
app.listen(PORT, () => console.log(`service running of port ${PORT}`));


