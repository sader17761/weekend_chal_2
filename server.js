// CALCULATOR - SERVER SIDE

// requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// listen on port
app.listen( 5000, function(){
  console.log( 'Server is up and running on port: 5000' );
});

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
