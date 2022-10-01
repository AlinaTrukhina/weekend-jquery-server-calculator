const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let calculations = [];

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
  if (calculations === []) {return;}
  // get last item in array
  let lastCalc = calculations[calculations.length-1];
  lastCalc = lastCalc.inputA.split(' ');
  //console.log(lastCalc);
  // set the solution property to new value
  lastCalc.solution = solver(lastCalc);

  console.log('calc array is now:', calculations);
  res.send(calculations); // sends array to client

}); // end GET

// DELETE all objects inside calc array
app.delete('/delete', (req, res) => {
  calculations = [];
  console.log('new array = ', calculations);
  res.send(calculations);
});

app.listen(3000, () => {
    console.log ('Server is running on port 3000');
  })

// function compares the operator in calc object and performs the appropriate operation
function solver(lastCalc) {
  console.log('in solver:', lastCalc);
  solution = lastCalc[0];
  console.log('starting solution', solution);
   for (let i = 1; i<lastCalc.length; i+2) {
    switch (lastCalc[i]) {
      case '+': solution = solution + Number(lastCalc[i+1]);
      break;
      case '-': solution = solution - Number(lastCalc[i+1]);
      break;
      case '*': solution = solution * Number(lastCalc[i+1]);
      break;
      case '/': solution = solution / Number(lastCalc[i+1]);
      break;
      default: console.log('switch does not work');
    }
  }
  return solution;
} // end solver


  // switch (lastCalc.operator) {
  //   case '+': 
  //   console.log('in switch');
  //   solution = Number(lastCalc.inputA) + Number(lastCalc.inputB);
  //   console.log('solution', solution);
  //   break;
  //   case '-': 
  //   solution = Number(lastCalc.inputA) - Number(lastCalc.inputB);
  //   console.log('solution', solution);
  //   break;
  //   case '*': 
  //   solution = Number(lastCalc.inputA) * Number(lastCalc.inputB);
  //   console.log('solution', solution);
  //   break;
  //   case '/': 
  //   solution = Number(lastCalc.inputA) / Number(lastCalc.inputB);
  //   console.log('solution', solution);
  //   break;
  //   default: console.log('no match');
  // }
//   return solution;
// }
