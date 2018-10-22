const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

movies = [
    { id:1 , name:'Big Mouth', genre:'Comedy' },
    { id:2 , name:'Manic', genre:'Drama' },
    { id:3 , name:'Venom', genre:'Sci-Fi' },
    { id:4 , name:'The Walking Dead', genre:'Action' },
    { id:5 , name:'Dr. Who', genre:'Drama' },
    { id:6 , name:'American Horror Story', genre:'Horror' }
]

app.get('/', (req, res)=> {

    res.send('Vidly App');

});

app.get('/api/movies', (req, res)=> {

res.send(movies);

});


app.get('/api/movies/:id', (req, res)=> {

    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        res.status(404).send('Id not found');
        return;
    }
     res.send(movie);
});

app.post('/api/movies', (req, res)=> {
   
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


app.put('/api/movies/:id', (req, res) => {

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

app.delete('/api/movies/:id', (req, res) => {

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

const port = process.env.Port || 3000;
app.listen(port, ()=> console.log (`listening on port ${port}...`));