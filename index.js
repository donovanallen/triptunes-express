var express = require('express');
var app = express();

var parser = require('body-parser');
var http = require('http');
var https = require('https');
var cors = require('cors');
var gmapsController = require("./controllers/gmapsController")
// var spotifyController = require("./controllers/spotifyController")

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
// app.get("/api/trip", gmapsController.get)
// app.get("/api/trip/tunes", spotifyController.get)

app.post("/api/trip", function(req, res) {
  let userOrigin = req.body.origin
  let userDestination = req.body.destination
  let gmaps_api_key = 'AIzaSyDUfo2Qpzsz-Q6uqYQjdNvRg5HBbj5Hwn8'

  console.log("****** " + userOrigin + " to " + userDestination + " -" + gmaps_api_key + "- ");


  var options = {
    host : 'maps.googleapis.com',
    path : '/maps/api/directions/json?origin=' + userOrigin + '&destination=' + userDestination + '&key=' + gmaps_api_key
  }


  var request = https.get(options,
    function(response){
      var body = ""

      response.on('data', function(data){
        body += data;

        // var result = (JSON.parse(body).routes[0].legs[0]);
        //
        // var tripdetails = {
        //   distance_text: result["distance"]["text"],
        //   distance_value: result["distance"]["value"],
        //   duration_text: result["duration"]["text"],
        //   duration_value: result["duration"]["value"],
        //   destination: result["end_address"],
        //   origin: result["start_address"]
        // }
        //
        // // res.json(result + '+++' + distance_text + '+++' + distance_value + '+++' + duration_text + '+++' + duration_value + '+++' + origin + '+++' + destination)
        // console.log("**** " + tripdetails + tripdetails.origin + ", " + tripdetails.destination + ", " + tripdetails.distance_text + " ******");
        // console.log(options.path);
        // // res.json(tripdetails)
      });

      response.on('end', function() {
        var result = (JSON.parse(body).routes[0].legs[0]);

        var tripdetails = {
          distance_text: result["distance"]["text"],
          distance_value: result["distance"]["value"],
          duration_text: result["duration"]["text"],
          duration_value: result["duration"]["value"],
          destination: result["end_address"],
          origin: result["start_address"]
        }

        // res.json(result + '+++' + distance_text + '+++' + distance_value + '+++' + duration_text + '+++' + duration_value + '+++' + origin + '+++' + destination)
        console.log("**** " + tripdetails + tripdetails.origin + ", " + tripdetails.destination + ", " + tripdetails.distance_text + " ******");
        console.log(options.path);
        res.json(tripdetails)
      });
  })

  request.on('error', function(e){
    console.log('Problem with request: ' + e.message);
  })
})

app.get("/api/trip", function(req, res) {
  // res.json(tripdetails)
})

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
