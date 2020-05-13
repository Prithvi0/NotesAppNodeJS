const express = require('express');
const bodyParser = require('body-parser');

// create an app using express
const app = express();

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse request of content-type: application/json
app.use(bodyParser.json());

// defining a route
app.get('/', (request, response) => {
    response.json({'message': 'Welcome to Notes application!'});
});

// listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000'); 
});