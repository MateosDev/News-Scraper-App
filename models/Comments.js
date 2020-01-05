var mongoose = require("mongoose");

//Schema Constructor
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    headline: String,
    body: String
});

//CREATES MODEL FROM MONGOOSE MODEL METHOD
var Comment = mongoose.model("Comment", CommentSchema);

//Export the COMMENT MODULE
module.exports = Comment; 