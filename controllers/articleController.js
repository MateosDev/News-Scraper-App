
var express = require("express");
var router = express.Router();

var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

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

router.get("/scrape", function(req,res) {
    //Use Axios To Grab Body
    var url = "https://apnews.com/";
    axios.get(url)//notice it doesnt have a / behind .com, not all will
    .then(function(response) {
        //load the body of HTML
        var $ = cheerio.load(response.data);
        //Loop anything through containing H4 Headline-Url tags using Cheerio
        
        $(".Component-root-0-2-9").each(function(i, element) {
            var result = {};
            //Saves H4 tags as headlines
            result.headline = $(this)
            .find("h1")
            .html();
            result.summary = $(this)
            .find("p")
            .html();
            //h4s A Tag gets saved as URL
            var aTag = $(this)
                .find("a")
                .attr("href");
                result.url = "https://apnews.com" + aTag;
                //New Article Creation
                db.Article.create(result)
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

    });
});
//Route to get all Articles from the DOM

router.get("/articles" , function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

//Grab specific article by ID
router.get("/articles/ :id", function(req,res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("comment")
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
        .catch(function(err) {
            res.json(err);
        });
    });
    //Route for Saving/updating an associated comment
    router.post("/articles/:id", function(req,res) {
        db.Comment.create(req.body)
        .then(function(dbComment) {
            return db.Article.findOneAndUpdate(
                {_id: req.params.id },
                { Comment: dbComment._id},
                { new:true}
            );
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    module.exports = router;

