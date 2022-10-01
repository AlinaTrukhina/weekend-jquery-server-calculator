$(document).ready(onReady);

let calculations = [];
//let operator = '';
let inputString = '';

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
    console.log('in addInput', $(this));
    inputSingleDigit = $(this).data('input');
    console.log('inputSingleDigit', inputSingleDigit);
    inputString = inputString + inputSingleDigit;
    console.log('inputString', inputString);
} //end addInput

// selectPlus = () => operator = '+';
// selectMinus = () => operator = '-';
// selectMultiply = () => operator = '*';
// selectDivide = () => operator = '/';

// POST input data to server
function onEquals(evt) {
    evt.preventDefault();

    if ($('#inputA').val() == '') {
        alert('please input values and click on operator')
        return;
    }

    // create new object to send to server
    newCalc = {
        inputA : $('#inputA').val(), // number
        inputB : $('#inputB').val(), // number
        operator : operator,         // string
        solution : ''                // string (will be converted to numer later)
    }
    console.log(newCalc);

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
        render();
    })

    .catch((err) => {
        console.log('GET error:', err);
    })



}; // end getSolutions()



function clearInputs() {
    $('#inputA').val('') // clear
    $('#inputB').val('') // clear
    operator = ''        // clear
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
        $('#calcList').empty();
    })

    .catch((err) => {
        console.log('GET error:', err);
    })
}

function render() {
    console.log('in render');
    $('#answerField').text(`${calculations[calculations.length-1].solution}`);
    $('#calcList').empty();
    console.log(calculations[0].inputA);
    for (let i=0; i < calculations.length; i++) {
    $('#calcList').append(`
    <li>
    ${calculations[i].inputA} ${calculations[i].operator} ${calculations[i].inputB} 
    = ${calculations[i].solution}
    </li>
    `);
    }
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
}