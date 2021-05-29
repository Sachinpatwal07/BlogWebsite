//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const ellipsis = require('text-ellipsis');
const mongoose = require('mongoose');

const homeStartingContent = "Think blogging's just a hobby ? Think again – it can actually make you quite good money. Here's how to get started, find your niche and turn your blog into a nice little money earner. We'll be honest: blogging isn't the easiest way to make money. But, the great thing is that anyone can do it, and it looks amazing on your CV. All you need is something interesting to say and enough patience and dedication to build traffic and a following. But how do successful bloggers make their money ? We've interviewed a couple of them to reveal their monetisation secrets.";

const app = express();



mongoose.connect('mongodb+srv://sachinpatwal07:nikeemessi10@cluster0.ov8aw.mongodb.net/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    require: ["true", "title  is must required"]
  },
  body: String

})

const Blog = mongoose.model("Blog", blogSchema);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



app.get("/", function(req, res) {

  Blog.find({}, function(err, foundList) {


    if (!err)
      res.render("home", {
        startingContent: homeStartingContent,
        posts: foundList
      });



  })




});



app.get("/compose", function(req, res) {

  res.render("compose");



});


app.get("/posts/:par_id", function(req, res) {



  const requireId = req.params.par_id;

  Blog.findOne({
    _id: requireId
  }, (err, post) => {

    if (!err)
      res.render("post", {
        title: post.title,
        content: post.body
      })





  })


})



app.post("/compose", function(req, res) {



  const post = new Blog({

    title: req.body.postTitle,
    body: req.body.postBody

  })

  post.save((err)=>{

  if(!err)
  res.redirect("/");


  });



});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}




app.listen(port, function() {
  console.log("Server Started ");
});
