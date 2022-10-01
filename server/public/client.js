$(document).ready(onReady);

let calculations = [];
//let operator = '';
let inputString = '';
let inputSingleDigit = '';

function onReady() {
console.log('so ready');
// event listeners

    // $('#plusBtn').on('click', selectPlus);
    // $('#minusBtn').on('click', selectMinus);
    // $('#multiplyBtn').on('click', selectMultiply);
    // $('#divideBtn').on('click', selectDivide);

    $('#equalsBtn').on('click', onEquals);
    $('#equalsBtn').on('click', getSolutions);

    $('#clearBtn').on('click', clearInputs);
    
    $('#deleteHistBtn').on('click', deleteHistory);

    $('table').on('click', '.inputbtn', addInput);

// render here or put it in a function below (GET?)
//    render();
}

function addInput() {
    inputSingleDigit = $(this).data('input');
//     console.log('inputSingleDigit', inputSingleDigit);
    if (inputString === '0') {
        inputString = ''; // reset string to nothing so that the leading zero doesn't appear
    }
    inputString = inputString + inputSingleDigit;
//    console.log('inputString', inputString);
    $('#inputA').text(inputString);
    if (inputSingleDigit === ' + ' ||
    inputSingleDigit === ' - ' ||
    inputSingleDigit === ' * ' ||
    inputSingleDigit === ' / ') {
        $('.operator').attr('disabled', true);
    } else {$('.operator').attr('disabled', false);
    }
} //end addInput

// selectPlus = () => operator = '+';
// selectMinus = () => operator = '-';
// selectMultiply = () => operator = '*';
// selectDivide = () => operator = '/';

// POST input data to server
function onEquals(evt) {
    evt.preventDefault();

    if (inputString == '') {
        alert('need input!')
        return;
    }

    // create new object to send to server
    newCalc = {
        inputA : inputString, // string
        solution : ''                // string (will be converted to numer later)
    }
    //console.log(newCalc);

    $.ajax({
        url: '/calc',
        method: 'POST',
        data: newCalc
    })    

    .then(response => {
        console.log('POST calc inputs response', response);
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
        inputString = calculations[calculations.length-1].solution;
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
}

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
}

function render() {
    console.log('in render');
    $('#answerField').text(`${inputString}`);
    $('#inputA').text(`${inputString}`);
    $('#calcList').empty();
    console.log(calculations[0].inputA);
    for (let i=0; i < calculations.length; i++) {
    $('#calcList').append(`
    <li>
    ${calculations[i].inputA} = ${calculations[i].solution}
    </li>
    `);
    }
}

// unused code below

    // empty table in DOM
    //$('.newrow').remove();

    // put calc array in DOM
    // for (let i=0; i < calculations.length; i++) {
    //     $('#calcTable').append(`
    //     <tr class="newrow>
    //         <td>${calculations[i].inputA}</td>
    //         <td>${calculations[i].operator}</td>
    //         <td>${calculations[i].inputB}</td>
    //         <td>${calculations[i].solution}</td>
    //     </tr>
    //     `)
    //}
