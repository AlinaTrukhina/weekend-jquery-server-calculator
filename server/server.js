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
  console.log('calc array is now:', calculations);
  res.sendStatus(201);
}); // end POST

app.listen(3000, () => {
    console.log ('Server is running on port 3000');
  })
