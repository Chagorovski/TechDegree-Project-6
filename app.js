const express = require('express');
const path = require('path');
const homeRoute = require('./routes');
const about = require('./routes/about');
const projects = require('./routes/projects');  

const app = express();

// Static method 
app.use('/static', express.static(path.join(__dirname, 'public')));

// View engine set up
app.set('view engine', 'pug');

// Mounting the middlewares
app.use(homeRoute);
app.use('/about', about);
app.use('/project', projects);

// Middleware for Handle errors
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log('The Page you are looking for was not found!');
    res.render('error');
});

// Server Start (listening on port 3000)
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});