const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine ', "ejs");

mongoose.connect('mongodb://localhost:27017/wikiApi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};
const Article = new mongoose.model('Article', articleSchema);
/////////////////// Found all the elements / articles ///////////////////////////////////////
app.route("/")
  .get(function(req, res) {
    Article.find({}, function(err, article) {
      if (!err) {
        res.send(article);
      } else {
        res.send(err)
      }
    });
  })

  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (!err) {
        res.send("successfully added to the database");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany({}, function(err) {
      if (!err) {
        res.send("successfully deleted");
      } else {
        res.send(err)
      }
    });
  });

/////////////////// operation of elements on ths basis of condition / articles ///////////////////////////////////////

app.route("/:articlename")
  .get(function(req, res) {

    Article.findOne({
      title: req.params.articlename
    }, function(err, singlearticle) {
      if (singlearticle) {
        res.send("Article found:" + singlearticle);
      } else {
        res.send("not found");
      }
    });
  })

  .put(function(req,res){
    Article.update(
      {title: req.params.articlename},
      {title:req.body.title, content:req.body.content},
      {overwrite:true},
      function(err){
        if(!err){
          res.send("successfully updated")
        }else{
          res.send(err)
        }
      }
    );
  })


.patch(function(req, res){
  Article.update(
    {title:req.params.articlename},
    {$set:req.body},
    function(err){
      if(!err){
        res.send("Successfully Updated");
      }else{
        res.send(err);
      }
    }
  );
})
.delete(function(req,res){
  Article.deleteOne({title:req.params.articlename},function(err){
    if(!err){
      res.send(`Successfully deleted ${req.params.articlename}`);
    }else{
      res.send(err);
    }
  });
});

app.listen(3000, function() {
  console.log("Listening to port 3000");
});
