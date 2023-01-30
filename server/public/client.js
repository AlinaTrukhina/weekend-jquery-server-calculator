$(document).ready(onReady);

let calculations = [];

let inputString = '';
let inputSingleDigit = '';

function onReady() {
console.log('Calculator is ready!');
getSolutions();

    // event listeners
    $('#equalsBtn').on('click', onEquals);
    // $('#equalsBtn').on('click', getSolutions);
    $('#clearBtn').on('click', clearInputs);
    $('#deleteHistBtn').on('click', deleteHistory);
    $('table').on('click', '.inputbtn', addInput);
}

function addInput() {
    inputSingleDigit = $(this).data('input');
    //console.log('inputSingleDigit', inputSingleDigit);
    //  remove leading zero from input string (if zero exists) 
    if (inputString == '0') {
        inputString = ''; // reset string to nothing so that the leading zero doesn't appear
    }
    inputString = String(inputString) + String(inputSingleDigit);
    //console.log('inputString', inputString);
    $('#inputA').text(inputString);
    if (inputSingleDigit === ' + ' ||
    inputSingleDigit === ' - ' ||
    inputSingleDigit === ' * ' ||
    inputSingleDigit === ' / ') {
        $('.operator').attr('disabled', true);
    } else {$('.operator').attr('disabled', false);
    }
} //end addInput

// POST input data to server
function onEquals(evt) {
    evt.preventDefault();

    if (inputString == '') {
        alert('need input!')
        return;
    }

    // create new object to send to server
    newCalc = {
        inputA : inputString, // is a string
        solution : ''         // is a string (will be converted to numer later)
    }
    console.log(newCalc);

    $.ajax({
        url: '/calc',
        method: 'POST',
        data: newCalc
    })    

    .then(response => {
        console.log('POST calc inputs response', response);
        getSolutions();
    })

    .catch((err) => {
        console.log('POST error', err);
    })


}

// GET new array with answers from server
function getSolutions() {
    
    console.log('in getSolutions');
    $.ajax({
        url: '/calc',
        method: 'GET'
    })    

    .then(response => {
        calculations = response;
        console.log('calculations arr', calculations);
        if (calculations.length === 0){
            inputString = 0;
        } else {
        inputString = calculations[calculations.length-1].solution;
        }
        render();
    })

    .catch((err) => {
        console.log('GET solutions error:', err);
    })

}; // end getSolutions()

function clearInputs() {
    inputString = '0'; // clear
    console.log('in clear', inputString);
    $('#inputA').text('0');
} // end clearInputs

// DELETE data from server
function deleteHistory() {
    $.ajax({
        url: '/delete',
        method: 'DELETE'
    })  

    .then(response => {
        calculations = response;
        console.log('calculations arr', response);
        render();
    })

    .catch((err) => {
        console.log('GET error:', err);
    })
    clearInputs();
} // end deleteHistory()

function render() {
    //console.log('in render');
    $('#answerField').text(`${inputString}`);
    $('#inputA').text(`${inputString}`);
    $('#calcList').empty();

    // for loop to append every stored solution 
    calculations.reverse();
    for (let i=0; i<calculations.length; i++) {
    $('#calcList').append(`
    <li>
    ${calculations[i].inputA} = ${calculations[i].solution}
    </li>
    `);
    }
}
