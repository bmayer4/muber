const express = require('express');
const routes = require('./routes/routes');  //routes is a function that takes app arg
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/muber');
}


app.use(bodyParser.json());

routes(app);

//we want to define this error handling middleware after the routes 
app.use((err, req, res, next) => {
    //err object will be defined if the previous middleware threw an error
    console.log(err.message);
    res.status(422).send({err: err.message});
    //req and res are incoming request object and outgoing response object

    //next is a function which forces middleware to move on to the next middleware in our chain
});

module.exports = app;