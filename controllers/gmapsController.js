var express = require('express');
var app = express();

var parser = require('body-parser');
var http = require('http');
var https = require('https');

var gmapsController = {

  get: (req, res) => {
    let origin = 'seatle'
    let destination = 'houston'
    let gmaps_api_key = 'AIzaSyDUfo2Qpzsz-Q6uqYQjdNvRg5HBbj5Hwn8'

    var options = {
      host : 'maps.googleapis.com',
      path : '/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&key=' + gmaps_api_key
    }


    var request = https.get(options,
    function(response){
      var body = ""
      response.on('data', function(data){
        body += data;
      });

      response.on('end', function() {
        var result = (JSON.parse(body));
        var distance_text = result["routes"][0]["legs"][0]["distance"]["text"]
        var distance_value = result["routes"][0]["legs"][0]["distance"]["value"]
        var duration_text = result["routes"][0]["legs"][0]["duration"]["text"]
        var duration_value = result["routes"][0]["legs"][0]["duration"]["value"]
        var destination = result["routes"][0]["legs"][0]["end_address"]
        var origin = result["routes"][0]["legs"][0]["start_address"]
        res.json(result + '+++' + distance_text + '+++' + distance_value + '+++' + duration_text + '+++' + duration_value + '+++' + origin + '+++' + destination)
      })


    })

    request.on('error', function(e){
      console.log('Problem with request: ' + e.message);
    })
  }
}
module.exports = gmapsController;
