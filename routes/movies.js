const {Movie,validateMovie}  = require('../models/movies');
const mongoose =  require('mongoose');
const express = require ('express');
const router  = express.Router();
const Joi = require('joi');



/* movies = [
    { id:1 , name:'Big Mouth', genre:'Comedy' },
    { id:2 , name:'Manic', genre:'Drama' },
    { id:3 , name:'Venom', genre:'Sci-Fi' },
    { id:4 , name:'The Walking Dead', genre:'Action' },
    { id:5 , name:'Dr. Who', genre:'Drama' },
    { id:6 , name:'American Horror Story', genre:'Horror' }
] */

router.get('/', async (req, res)=> {
    const movie = await Movie.find().sort('name');
    res.send(movie);
});
    
    
router.get('/:id', async (req, res)=> {
const movie = await Movie.findById(req.param.id);

if (!movie) {
    res.status(404).send('Id not found');
    return;
}
    res.send(movie);
});
    
router.post('/', async (req, res)=> {   
const result = validateMovie(req.body);

if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
} 

let movie =  new Movie( {
    name: req.body.name,
    genre: req.body.genre
});

movie = await movie.save();

res.send(movie);
});


router.put('/:id', async (req, res) => {

/* const result = validateMovie(req.body);
if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
} */

const movie = await Movie.findByIdAndUpdate(req.params.id, {name: req.body.name, genre:req.body.genre},
    {new : true});

if (!movie) {
    res.status(404).send('Id not found');
    return;
}

res.send(movie);
});


router.delete('/:id', async (req, res) => {

const movie = await Movie.findByIdAndRemove(req.params.id);

if (!movie){
res.status(404).send('Id not found');
return;
} 

res.send(movie);
});



module.exports = router;