// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))



app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// html routes

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//   api routes

app.get('/api/notes', function (req, res) {
  return res.json(savedNotes());
});

app.post('/api/notes', function (req, res) {
    let newNote = req.body;
    updatedNotes(newNote);
    return res.json(newNote);
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.delete('/api/notes/:id', function (req, res) {
    let id = parseInt(req.params.id);
    
    const db = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8')
    console.log(db);

    let newArray = JSON.parse(db).filter(note => note.id !== id );
    console.log(newArray);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(newArray)) 

    res.sendFile(path.join(__dirname, 'db', 'db.json'), 'utf8');

});


function savedNotes() {

    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 
    'utf8'));

    return savedNotes;
}

const updatedNotes = newNote => {
    const notes = savedNotes();
    console.log(notes, newNote);

    notes.push({
        ...newNote,
        id: notes.length+1
    });
    if (notes) {
       
    }
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes)) 
        
   }
