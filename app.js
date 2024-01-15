const express = require('express');
const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');


const app = express();

// Connect to DB
mongoose.connect('mongodb://localhost:27017/smartedu-db').then(() => console.log('DB Connected Successfully'))

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template Engine
app.set('view engine', 'ejs');
// Middlewares
app.use(express.static('public'));

// Routes
app.use('/', pageRoute); 
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);


const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
