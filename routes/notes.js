const notes = require(`express`).Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

//get route to get all notes
notes.get('/', (req, res) => {
    console.log(`${req.method} get request from user`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//get route to get a specific note
  notes.get('/:note_id', (req, res) => {
    const notesId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((notes) => notes.id === notesId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });

  //delete route for a specific note
  notes.delete('/:note_id', (req, res) => {
    const notesId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
    
        const result = json.filter((notes) => notes.id !== notesId);
  
        
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${notesId} has been removed 🗑️`);
      });
  });

  //Post route
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });