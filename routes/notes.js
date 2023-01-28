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
    readFromFile('./db/db.json').then((data) => {
      console.log(data);
      res.json(JSON.parse(data));
    
})        
  });

//get route to get a specific note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });

  //delete route for a specific note
  notes.delete('/:note_id', (req, res) => {
   console.log(req.params);
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);
        writeToFile('./db/db.json', result)
        // Respond to the DELETE request
        res.json({Ok:true});
      });
  });

  //Post route
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body && title && text) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };

      readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        console.log(json);
        json.push(newNote);
        writeToFile('./db/db.json', json)
        res.json(`Note added successfully 🚀`);
      });
    } else {
      res.status(500).json('Error in adding note');
    }
  });

  module.exports = notes;