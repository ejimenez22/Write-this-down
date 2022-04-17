const express = require('express')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const app = express()
const PORT = process.env.PORT || 3001;


//app.use middleware
app.use(express.urlencoded({ extended: true}))

app.use(express.json())

app.use(express.static('public'))




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
  req.body.id = notes.uuid.v4()
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  