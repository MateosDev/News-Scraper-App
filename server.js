//DEPENDENCIES
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();

//SERVER STUFF
var port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port " + port));
//How ya like that ES6 :P
var MONGODB_URI