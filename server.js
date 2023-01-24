const express = require(`express`);
const port =process.env.PORT || 3001;
const app = express();
const path = require(`path`);
const api = require("./routes/notes.js");

//Middleware for json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);



//get route for notes
app.get('/notes', (req, res) => {
    console.log("should be going to notes");
      res.sendFile(path.join(__dirname, './public/notes.html'));
    });

//get route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port} 🚀`)
);
