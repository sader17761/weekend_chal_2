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
var power = false;

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

  // this will determine if the on/off button is on or off and change its properties
  if(value === 'on-off'){
    if(power){
      power = false;
      $('#calcInput').val('');
      $('#onOffBtn').html('Power On');
      $('#calcInput').css('background-color', 'rgb(158, 168, 168)');
      $('#onOffBtn').removeClass('btnOn').addClass('btnOff');
      console.log(power);
    } else {
      power = true;
      $('#onOffBtn').html('Power Off');
      $('#calcInput').css('background-color', 'rgb(207, 218, 218)');
      $('#onOffBtn').removeClass('btnOff').addClass('btnOn');
      console.log(power);
    }
  }

  // of the power is 'on' then this will allow the buttons to be used
  if(power){
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
    } else if (value === 'clear'){
      clearInputs();
    }
  } // end of power if statement
} // end of whichButton function
