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

  res.sendStatus(201);
}); // end POST

// send calc array to getSolutions() in client
app.get('/calc', (req, res) => {
  if (calculations === []) {return;}
  // get last item in array
  let newCalc = calculations[calculations.length-1];
  newCalc = newCalc.inputA.split(' ');
  //console.log(newCalc);
  // set the solution property to new value
  solver(newCalc);
  console.log('new solution', newsolution);
  calculations[calculations.length-1].solution = newsolution;
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
  }
  //console.log('new solution', newsolution);
  return newsolution;
}
//   solution = newCalc[0];
//   console.log('starting solution', solution);
//    for (let i = 1; i<(newCalc.length-1); i+1) {
//     if (newCalc[i] === '+') {
//       solution = Number(solution) + Number(newCalc[i+1]);
//       console.log(solution);
//     } else {return solution};
//     if (i >= (newCalc.length-1)) {
//       return solution;
//     }
//   }
// }
  // let i = 1;
  // do {
  //   solution = newCalc[i];
  //   console.log(solution);
  //   i+2;
  // }
  // while (i<newCalc.length);
  // return solution;

//     console.log(i);
//     console.log('new solution', solution);
//     // switch (newCalc[i]) {
    //   case '+': solution = solution + Number(newCalc[i+1]); i++;
    //   break;
    //   case '-': solution = solution - Number(newCalc[i+1]); i++;
    //   break;
    //   case '*': solution = solution * Number(newCalc[i+1]); i++;
    //   break;
    //   case '/': solution = solution / Number(newCalc[i+1]); i++;
    //   break;
    //   default: console.log('switch does not work');
    //   return solution;
    // }  
//   }
//   return solution;
// } // end solver


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
