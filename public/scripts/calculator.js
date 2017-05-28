// CALCULATOR - CLIENT SIDE

$(onReady);

function onReady(){
  $('button').on('click', whichButton);
} // end of onReady

// variables
var inputNumber = '';
var inputOne = '';
var inputTwo = '';
var operator = '';

function clearInputs(){
  console.log('Clear Inputs Works!');
  $('#calcInput').val('0');
  inputNumber = '';
  inputOne = '';
  inputTwo = '';
  operator = '';
} // end of clearInputs function

function packageObj(){
  // this object gets created and sent to the server
  var objectToSend = {
    num1: inputOne,
    num2: inputTwo,
    type: operator
  }; // end of objectToSend

  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: objectToSend,
    success: function(response){
      console.log(response);
      $('#calcInput').val('COMPUTING...');
      setTimeout(showAnswer, 3000);
      function showAnswer(){
        var answer = response.answer.toLocaleString('en', {useGrouping:true});
        $('#calcInput').val(answer);
      }
    }
  }); // end ajax
} // end of packageObj function

function whichButton(){
  var value = $(this).val();
  if(value >= 0 && value <= 9){
    inputNumber += value;
    $('#calcInput').val(inputNumber);
  } else if (value === '+' || value === '-' || value === '*' || value === '/'){
    inputOne = inputNumber;
    operator = value;
    $('#calcInput').val('');
    inputNumber = '';
  } else if (value === '='){
    inputTwo = inputNumber;
    $('#calcInput').val('');
    inputNumber = '';
    packageObj();
  } else {
    clearInputs();
  }
} // end of whichButton function
