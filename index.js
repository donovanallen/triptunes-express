var express = require('express');
var app = express();

var parser = require('body-parser');
var http = require('http');
var cors = require('cors');
var gmapsController = require("./controllers/gmapsController")

app.use("/assets", express.static("public"));
//setting body parser for form submissions
app.use(parser.json({extended: true}));
app.use(parser.urlencoded({extended:true}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});

//setting up port
app.set("port", process.env.PORT || 4000);


//routes for express
app.get("/api/trip", gmapsController.get)


app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
