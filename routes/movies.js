const express = require ('express');
const router  = express.Router();

movies = [
    { id:1 , name:'Big Mouth', genre:'Comedy' },
    { id:2 , name:'Manic', genre:'Drama' },
    { id:3 , name:'Venom', genre:'Sci-Fi' },
    { id:4 , name:'The Walking Dead', genre:'Action' },
    { id:5 , name:'Dr. Who', genre:'Drama' },
    { id:6 , name:'American Horror Story', genre:'Horror' }
]

router.get('/', (req, res)=> {
    res.send(movies);
});
    
    
router.get('/:id', (req, res)=> {

    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        res.status(404).send('Id not found');
        return;
    }
        res.send(movie);
});
    
router.post('/', (req, res)=> {
    
    const result = valiateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const movie =  {
        id: movies.length +1,
        name: req.body.name,
        genre: req.body.genre
    };

    movies.push(movie);
    res.send(movie);
});


router.put('/:id', (req, res) => {

    const movie =  movies.find(m=> m.id === parseInt(req.params.id));
    if (!movie) {
        res.status(404).send('Id not found');
        return;
    }
    const result = valiateCourse(req.body);
    
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }
    
        movie.name = req.body.name;
        movie.genre = req.body.genre;
        res.send(movies);

});

router.delete('/:id', (req, res) => {

    const movie =  movies.find(c=> c.id === parseInt(req.params.id));
    if (!movie){
    res.status(404).send('Id not found');
    return;
    } 

    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);

});

function valiateCourse(movie){
    const schema ={
        name: Joi.string().min(3).required(),
        genre: Joi.string().min(3).required()
        };
        return Joi.validate( movie, schema);
}

module.exports = router;