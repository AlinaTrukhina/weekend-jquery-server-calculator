const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));


app.listen(3000, () => {
    console.log ('Server is running on port 3000');
  })