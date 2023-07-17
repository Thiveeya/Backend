const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const url ='mongodb+srv://rbsthivi:thiveeya@cluster0.vgypaij.mongodb.net/NotesDB?retryWrites=true&w=majority'

mongoose.connect(url)

   .then(()=> {

    console.log ('Connected to mongoDB');
   })

   .catch((err)=> {
      console.error(err);
   });

   const noteSchema =new mongoose.Schema(
    {
        content:String,
        important : Boolean
    }
);
// create amodel

const Note=mongoose.model('Note', noteSchema,'notes');


/*
    endpoints

    URL             Request Type    Functionality
    /api/notes      GET             fetches all the notes
    /api/notes/10   GET             fetches a single note
    /api/notes      POST            creates a new note based on the request data
    /api/notes/10   DELETE          deletes a note identified by id
    /api/notes/10   PUT             replaces the entire note identified by id with the request data
    /api/notes/10   PATCH           replaces a part of the note identified by id with the request data
*/

let notes = [
    {
        id: 1,
        content: 'backend server using Nodejs',
        important: true
    },
    {
        id: 2,
        content: 'backend restful using nodejs will grow complex',
        important: false
    },
    {
        id: 3,
        content: 'express makes backend restful painless',
        important: true
    }
];

// set the endpoints
// set the / route
// app.get('/', (request, response) => {
//     response.send('<h1>Notes Application</h1>');
// });

// // endpoint to get all the notes
app.get('/api/notes', (request, response) => {
    response.status(200).json(notes);
});

// // creates a new resource based on the request data
// app.post('/api/notes', (request, response) => {
//     notes = notes.concat(request.body);
//     response.status(201).json({message: 'note created successfully'});
// });

// fetches a single resource based on id
// app.get('/api/notes/:id', (request, response) => {
//     const id = request.params.id;
//     const note = notes.find(note => note.id == id);
//     if(note){
//         response.status(200).json(note);
//     } else {
//         response.status(404).json({message: 'id does not exists'});
//     }
// });

// // deletes a single resource based on id
// app.delete('/api/notes/:id', (request, response) => {
//     // get the id
//     const id = request.params.id;
//     const note = notes.find(note => note.id == id);
//     notes = notes.filter(note => note.id != id);
//     if(note){
//         response.status(204).json(note);
//     } else {
//         response.status(404).json({message: 'id does not exists'});
//     }
// });

// // replaces the entire note object identified by an id
// app.put('/api/notes/:id', (request, response) => {
//     const id = request.params.id;
//     const noteToReplace = request.body;
//     const note = notes.find(note => note.id == id);
//     notes = notes.map(note => note.id == id ? noteToReplace : note);
//     if(note){
//         response.status(200).json({message: 'note replaced'});
//     } else {
//         response.status(404).json({message: 'id does not exists'});
//     }
// });

// app.patch('/api/notes/:id', (request, response) => {
//     const id = request.params.id;
//     const noteToReplace = request.body;
//     const note = notes.find(note => note.id == id);
//     notes = notes.map(note => note.id == id ? {...note, ...noteToReplace} : note);
//     if(note){
//         response.status(200).json({message: 'note patched'});
//     } else {
//         response.status(404).json({message: 'id does not exists'});
//     }
// });


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});