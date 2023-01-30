const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let calculations = [];
let solution = 0;
let newsolution = 0;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// get data from onEquals() in client
app.post('/calc', (req, res) => {
  let newCalc = req.body;
  console.log('posted calc object:', newCalc);
  calculations.push(newCalc);
  
  newCalcArray = newCalc.inputA.split(' ');
  //console.log(newCalc);
  solver(newCalcArray);

  // set the solution property to new value
  console.log('new solution', newsolution);
  calculations[calculations.length-1].solution = newsolution;
  
  console.log('calc array is now:', calculations);

  res.sendStatus(201);
}); // end POST

// send calc array to getSolutions() in client
app.get('/calc', (req, res) => {
  if (calculations === []) {return;}

  res.send(calculations); // sends array to client

}); // end GET

// DELETE all objects inside calc array
app.delete('/delete', (req, res) => {
  calculations = [];
  console.log('new array = ', calculations);
  res.send(calculations);
});

// app.listen(3001, () => {
//     console.log ('Server is running on port 3001');
//   })

// function compares the operator in calc object and performs the appropriate operation
function solver(newCalc) {
  console.log('in solver:', newCalc);
  // assign first number to be the new solution
  newsolution = Number(newCalc[0]);
  // separate into two arrays
  newCalc.shift();
  
  let opArray = [];
  let numArray = [];
  let n=0;
  for ( ; n<=(newCalc.length/2); ) {
    opArray.push(newCalc[n]); n++;
    numArray.push(newCalc[n]); n++;
  }
  console.log('opArray', opArray);
  console.log('numArray', numArray);

  // for loop goes through opArray
  for (let i = 0; i < opArray.length; i++){
    switch (opArray[i]) {
      case '+': newsolution = newsolution + Number(numArray[i]);
      break;
      case '-': newsolution = newsolution - Number(numArray[i]);
      break;
      case '*': newsolution = newsolution * Number(numArray[i]);
      break;
      case '/': newsolution = newsolution / Number(numArray[i]);
      break;
      default: console.log('switch does not work');
    }
    newsolution = Math.round(100*newsolution)/100;
    //console.log(newsolution);
  }
  //console.log('new solution', newsolution);
  return newsolution;
}

// Use the `PORT` env var, if it's set
// otherwise, default to port 3000
const PORT = process.env.PORT || 3000;
// ...
app.listen(PORT, /* ... */);