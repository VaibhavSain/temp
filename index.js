const express = require("express");
const db = require("./db.js");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());//req.body

//import 
const personRoutes = require('./routes/personRoutes.js');
app.use('/person',personRoutes);

app.listen(3000);
