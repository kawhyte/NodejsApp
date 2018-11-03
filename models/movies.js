const mongoose =  require('mongoose');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength: 5,
        maxlength: 50
    },
    genre:{
        type: String,
        required:true,
        minlength: 5,
        maxlength: 50
    }
   
   });
   
const  Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    const schema ={
        name: Joi.string().min(5).max(50).required(),
        genre: Joi.string().min(5).max(50).required()
        };
        return Joi.validate( movie, schema);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;