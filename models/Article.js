var mongoose = require("mongoose");

//Save to Constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: false
    },

    link: {
        type: String,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})
  //Creates Model from Schema using Mongoose Model Method
  var Article = mongoose.model("Article", ArticleSchema);

  module.exports = Article;

