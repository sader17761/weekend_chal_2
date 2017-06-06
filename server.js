// CALCULATOR - SERVER SIDE

// requires
var express = require('express');
var app = express();
var path = require('path');  // path comes with Node...
var bodyParser = require('body-parser');

// uses
app.use(express.static('public'));  // allows static files to be available in the public folder
app.use(bodyParser.urlencoded({extended:true}));

//globals
var port = process.env.PORT || 5000;

// listen on port
app.listen( port, function(){
  console.log( 'Server is up and running on port: 5000' );
});

// base url
app.get('/', function(req, res){
  console.log('We are in the base url.');
  res.sendFile(path.resolve('views/index.html'));
});

app.post('/calculate', function(req, res){
  console.log(req.body);
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var type = req.body.type;

  var answerToReturn = {
    answer: calculation(num1, num2, type)
  };
  console.log(answerToReturn);
  // this will return the object
  res.send(answerToReturn);
}); // end of /calculate

function calculation(num1, num2, type){
  if(type === '+'){
    return num1 + num2;
  } else if (type === '-'){
    return num1 - num2;
  } else if (type === '*'){
    return num1 * num2;
  } else {
    return num1 / num2;
  }
}
