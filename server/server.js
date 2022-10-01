const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const calculations = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// get data from onEquals() in client
app.post('/calc', (req, res) => {
  let newCalc = req.body;
  console.log('posted calc object:', newCalc);

  calculations.push(newCalc);

  res.sendStatus(201);
}); // end POST

// send calc array to getSolutions() in client
app.get('/calc', (req, res) => {

  // get last item in array
  let lastCalc = calculations[calculations.length-1];

  // set the solution property to new value
  lastCalc.solution = solver(lastCalc);

  console.log('calc array is now:', calculations);
  res.send(calculations); // sends array to client

}); // end GET

app.listen(3000, () => {
    console.log ('Server is running on port 3000');
  })

  // functions
  function solver(lastCalc) {
    console.log('in solver:', lastCalc.operator);

    // if (lastCalc.operator === '+') {
    //   solution = Number(lastCalc.inputA) + Number(lastCalc.inputB);
    // } 
    // console.log('solution:', solution);
    // return solution;
    switch (lastCalc.operator) {
  
      case '+': 
      console.log('in switch');
      solution = Number(lastCalc.inputA) + Number(lastCalc.inputB);
      console.log('solution', solution);
      break;
      case '-': 
      solution = Number(lastCalc.inputA) - Number(lastCalc.inputB);
      console.log('solution', solution);
      break;
      case '*': 
      solution = Number(lastCalc.inputA) * Number(lastCalc.inputB);
      console.log('solution', solution);
      break;
      case '/': 
      solution = Number(lastCalc.inputA) / Number(lastCalc.inputB);
      console.log('solution', solution);
      break;
      default: console.log('no match');
    }
    return solution;
    //console.log('in solver', lastCalc.inputA + lastCalc.inputB);
  }
