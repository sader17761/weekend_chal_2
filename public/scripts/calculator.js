// CALCULATOR - CLIENT SIDE

$(onReady);

function onReady(){
  // event (button) listeners
  // $('#addBtn').on('click', addition);
  // $('#subtractBtn').on('click', subtraction);
  // $('#multiplyBtn').on('click', multiplication);
  // $('#divisionBtn').on('click', division);
  $('button').on('click', whichButton);
} // end of onReady

// variables
var operator = '';

function clearInputs(){
  console.log('Clear Inputs Works!');
  $('#numOneInput').val('');
  $('#numTwoInput').val('');
  $('#answer').text('');
} // end of clearInputs function

function packageObj(){
  console.log($('#numOneInput').val());
  console.log($('#numTwoInput').val());
  var objectToSend = {
    num1: $('#numOneInput').val(),
    num2: $('#numTwoInput').val(),
    type: operator
  }; // end of objectToSend
  console.log(objectToSend);
  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: objectToSend,
    success: function(response){
      console.log(response);
      $('#answer').text(response.answer);
    }
  }); // end ajax
} // end of packageObj function

function whichButton(){
  if($(this).val() === '+'){
    operator = '+';
    console.log('The button clicked was: ', operator);
    packageObj();
  } else if ($(this).val() === '-'){
    operator = '-';
    console.log('The button clicked was: ', operator);
    packageObj();
  } else if ($(this).val() === '*'){
    operator = '*';
    console.log('The button clicked was: ', operator);
    packageObj();
  } else if ($(this).val() === '/'){
    operator = '/';
    console.log('The button clicked was: ', operator);
    packageObj();
  } else {
    clearInputs();
  }
} // end of whichButton function
