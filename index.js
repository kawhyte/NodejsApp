const express = require('express');
const Joi = require('joi');
const app = express();
const movies = require('./routes/movies');
const home = require('./routes/home');

app.use(express.json());
app.use('/api/movies', movies);
app.use('/', home);

const port = process.env.Port || 3000;
app.listen(port, ()=> console.log (`listening on port ${port}...`));