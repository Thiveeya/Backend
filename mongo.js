const mongoose = require('mongoose');
const url ='mongodb+srv://rbsthivi:thiveeya@cluster0.vgypaij.mongodb.net/NotesDB?retryWrites=true&w=majority'

mongoose.connect(url)

   .then(()=> {

    console.log ('Connected to mongoDB');
   })

   .catch((err)=> {
      console.error(err);
   });

//    save a note in db
//  define a schema

const noteSchema =new mongoose.Schema(
    {
        content:String,
        important : Boolean
    }
);
// create amodel

const Note=mongoose.model('Note', noteSchema,'notes');

const note =new Note ({
    content:'Mongodb connection using mongoose library',
    important : false,
});

note.save()
.then ((result)=> {
    console.log('note saved!');
    mongoose.connection.close();
});


