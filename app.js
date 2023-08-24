//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from"mongoose";
import _ from "lodash";

const homeStartingContent = "Welcome to my corner of the internet! I'm Rishav Raj, a passionate and driven Web-Developer and Programmer . With a blend of creativity and expertise, I strive to master in Full Stack Development and also master in DSA, e.g., "craft visually stunning designs that communicate powerful narratives" or "develop innovative software solutions that solve real-world challenges".";
const aboutContent = "Welcome to my corner of the internet! I'm [Your Name], a passionate and driven [Your Profession/Field] based in [Your Location]. With a blend of creativity and expertise, I strive to [Achievement or Goal in your Field, e.g., "craft visually stunning designs that communicate powerful narratives" or "develop innovative software solutions that solve real-world challenges"].

A Journey of Curiosity

My journey in the world of [Your Field] began with a spark of curiosity that has evolved into a burning passion. Through countless hours of learning, experimenting, and refining my skills, I've honed my craft to deliver [Your Unique Selling Points, e.g., "intuitive user experiences" or "elegant and functional designs"]. My dedication to continuous improvement drives me to explore new technologies and stay at the forefront of industry trends.

Bringing Ideas to Life

I take immense pride in my ability to transform ideas into reality. Whether it's through [Your Skills, e.g., "code that brings websites to life" or "captivating visuals that tell stories"], I am committed to delivering excellence in every project I undertake. My work is not just a job – it's a reflection of my commitment to pushing boundaries and creating lasting impressions.

Beyond the Workspace

When I'm not immersed in [Your Field], you'll often find me [Personal Interests/Hobbies related to your Field or Personality]. I believe that these pursuits not only enhance my creativity but also contribute to my holistic approach to problem-solving.

A Collaborative Spirit

Collaboration is at the heart of my work philosophy. I thrive on connecting with fellow creatives, professionals, and clients to bring diverse perspectives to the table. I firmly believe that the best results are achieved when ideas are shared, refined, and transformed through collective efforts.";
const contactContent = "Thank you for your interest in reaching out! I'm thrilled to connect with you. Whether you have questions, collaboration ideas, or just want to say hello, this is the place to get in touch. Feel free to reach out using any of the methods below, and I'll be sure to get back to you as soon as possible.

Contact Information

Email: [rajrishav011@gmail.com]
 
Stay Connected

To stay updated on my latest projects, insights, and industry news, feel free to subscribe to my newsletter. I'll keep you in the loop and ensure you're the first to know about exciting developments.

Thank you again for your interest. I'm looking forward to connecting with you and exploring how we can create something amazing together!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/postDB')
const postSchema = ({
  title:String,
  content:String
})
const Post = mongoose.model('Post' , postSchema);



app.get("/", function(req, res){
Post.find()
.then(function(posts){
  
res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    })
  
})
.catch(function(err){
  console.log(err);
})
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();
  res.redirect("/");
});

app.get("/posts/:postId", function(req, res){
  const requestedId = req.params.postId;
  Post.findOne({_id:requestedId})
  .then(function(post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
      
  }).then(function(err){
    console.log(err);
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
