const {Genre,validateGenre}  = require('../models/genre');
const mongoose =  require('mongoose');
const express = require ('express');
const router  = express.Router();
const Joi = require('joi');



/* genres = [
    { id:1 , name:'Big Mouth', genre:'Comedy' },
    { id:2 , name:'Manic', genre:'Drama' },
    { id:3 , name:'Venom', genre:'Sci-Fi' },
    { id:4 , name:'The Walking Dead', genre:'Action' },
    { id:5 , name:'Dr. Who', genre:'Drama' },
    { id:6 , name:'American Horror Story', genre:'Horror' }
] */

router.get('/', async (req, res)=> {
    const genre = await Genre.find().sort('name');
    res.send(genre);
});
    
    
router.get('/:id', async (req, res)=> {
const genre = await Genre.findById(req.param.id);

if (!genre) {
    res.status(404).send('Id not found');
    return;
}
    res.send(genre);
});
    
router.post('/', async (req, res)=> {   
const result = validateGenre(req.body);

if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
} 

let genre =  new Genre( {
    name: req.body.name
});

genre = await genre.save();

res.send(genre);
});


router.put('/:id', async (req, res) => {

/* const result = validateGenre(req.body);
if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
} */

const genre = await Genre.findByIdAndUpdate(req.params.id, {genre:req.body.genre},
    {new : true});

if (!genre) {
    res.status(404).send('Id not found');
    return;
}

res.send(genre);
});


router.delete('/:id', async (req, res) => {

const genre = await Genre.findByIdAndRemove(req.params.id);

if (!genre){
res.status(404).send('Id not found');
return;
} 

res.send(genre);
});



module.exports = router;