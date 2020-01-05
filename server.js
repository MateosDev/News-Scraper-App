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

//Parse into JSON - BodyParser not recommended
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//MONGODB Connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var db = mongoose.connection;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to Mongoose!"));


//CONNECT APP TO PUBLIC FOLDER 
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//IMPORT ROUTES FOR SERVER USE
var routes = require("./controllers/articlesController.js");
app.use(routes);

//Server Listening / Start

