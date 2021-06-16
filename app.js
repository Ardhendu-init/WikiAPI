const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine ',"ejs");

mongoose.connect('mongodb://localhost:27017/wikiApi', {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {title:String,content:String};
const Article = new mongoose.model('Article',articleSchema);


app.get("/",function(req,res){
  Article.find({},function(err,article){
    res.send(article);
  })
});




app.listen(3000, function(){
  console.log("Listening to port 3000");
});
