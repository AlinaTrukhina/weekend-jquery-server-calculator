$(document).ready(onReady);

let calculations = [];
let operator = '';

function onReady() {
console.log('so ready');
// event listeners

    $('#plusBtn').on('click', selectPlus);
    $('#minusBtn').on('click', selectMinus);
    $('#multiplyBtn').on('click', selectMultiply);
    $('#deleteBtn').on('click', selectDivide);

    $('#equalsBtn').on('click', onEquals);
// render here or put it in a function below (GET?)
//    render();
}

selectPlus = () => operator = '+';
selectMinus = () => operator = '-';
selectMultiply = () => operator = '*';
selectDivide = () => operator = '/';

// POST input data to server
function onEquals(evt) {
    evt.preventDefault();

    if ($('#inputA').val() == '' || $('#inputB').val() == 0 || 
    operator == '') {
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
    });

    $('#inputA').val('') // clear
    $('#inputB').val('') // clear
    operator = ''        // clear

    getSolutions();
}
// GET new array with answers from server

// DELETE data from server

// call the get function