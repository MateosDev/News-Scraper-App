//DEPENDENCIES
var express = require("express");
var router = express.Router();
var path = require("path");
var cheerio = require("cheerio");
var db = require("../models");
var Comment = require("../models/Comments.js");
var Article = require("../models/Article.js");

//Route for ALL ARTICLES
router.get("/", function(req,res){
    //Grabs from Articles Collection
    db.Article.find({})
        .sort({ _id: -1})
        .then(function(dbArticle){
            //Sends Articles back to Client Side
            res.render("index", { dbArticle });
        })
        .catch(function(err) {
            //Sends Errors back to Client Side
            res.json(err);
        });
});

router.get("/scrape", function(res,req) {
    //Use Axios To Grab Body
    axios.get("https://associatedpress.com")//notice it doesnt have a / behind .com, not all will
    .then(function(response) {
        //load the body of HTML
        var $ = cheerio.load(response.data);
        //Loop anything through containing H4 Headline-Url tags using Cheerio
        
        $("Component-h1-0-2-30").each(function(i, element) {
            var results = {};
            //Saves H4 tags as headlines
            results.headline = $(this)
            .find("h3")
            .html();
            results.summary = $(this)
            .find("p")
            .html();
            //h4s A Tag gets saved as URL
            var aTag = $(this)
                .find("a")
                .attr("href");
                results.url = "http://associatedpress.com" + aTag;
                //New Article Creation
                db.Article.create(results)
                .then(function(dbArticle) {
                    //check console for the result
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    //logs any errors
                    console.log(err);
                });

        });
        //Search/Scrape Complete Message to Client Side
        res.send("Scrape is Complete");

    })
})
//Route to get all Articles from 