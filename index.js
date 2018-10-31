const mongoose =  require('mongoose');
const express = require('express');

const app = express();
const movies = require('./routes/movies');
const home = require('./routes/home');

mongoose.connect('mongodb://localhost/vidly')
.then(()=> console.log('Connected to MongoDB'))
.catch(err => console.error('could not connect to MongoDB'));

app.use(express.json());
app.use('/api/movies', movies);
app.use('/', home);

const port = process.env.Port || 3000;
app.listen(port, ()=> console.log (`listening on port ${port}...`));