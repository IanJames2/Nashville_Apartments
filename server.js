const dotenv = require('dotenv').config();
const express = require("express"); 
const cors = require("cors"); 
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const app = express(); 
const port = process.env.PORT;
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



require("./server/config/apartment.config")
require("./server/routes/apartment.routes")(app)
require("./server/routes/user.routes")(app)



app.listen(port, () => console.log(`Listening on port: ${port}`) ); //Don't forget this line of code
