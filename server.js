const express = require('express')
const fs = require('fs')
const path = require('path')
const { notes } = require('./db/db.json')
const { uniqueId } = require('uuid')
const app = express()
const PORT = process.env.PORT || 3001;


//app.use middleware
app.use(express.urlencoded({ extended: true}))

app.use(express.json())

app.use(express.static('public'))

// generate new notes
function generateNote(body, notesArray) {
  const note = body;
  notesArray.push(note)
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({notes: notesArray}, null, 1)
  )
  return note
}

// html routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

// api routes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.post('/api/notes', (req, res) => {
  const note = generateNote(req.body, notes)
  req.body.id = uniqueId(note)
  res.json(note)
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  