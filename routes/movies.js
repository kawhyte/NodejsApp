const {Movie,validateMovie}  = require('movieApp/models/movie');
const mongoose =  require('mongoose');
const express = require ('express');
const router  = express.Router();
const Joi = require('joi');



/* movies = [
    { id:1 , name:'Big Mouth', movie:'Comedy' },
    { id:2 , name:'Manic', movie:'Drama' },
    { id:3 , name:'Venom', movie:'Sci-Fi' },
    { id:4 , name:'The Walking Dead', movie:'Action' },
    { id:5 , name:'Dr. Who', movie:'Drama' },
    { id:6 , name:'American Horror Story', movie:'Horror' }
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
const genre =  await Genre.

let movie =  new Movie( {
    title: req.body.title,
    genre: {
        _id: genre._id,
        name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
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

const movie = await Movie.findByIdAndUpdate(req.params.id, {movie:req.body.movie},
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