const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// create an app using express
const app = express();

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse request of content-type: application/json
app.use(bodyParser.json());

// connecting to the database
mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(error => {
    console.log('Could not connect to the database. Exiting now...', error);
    process.exit();
});

// defining a route
app.get('/', (request, response) => {
    response.json({ 'message': 'Welcome to Notes application!' });
});

// require notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});