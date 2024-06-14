const http = require('http')

const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config()
const Note = require('./models/note');
app.use(express.static('dist'))
app.use(cors());
app.use(express.json());


app.get('/', (request, response) => {
  response.send('<h1>Hello Sad World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
    console.log(notes);
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
    })
    console.log("important",body.important);
    console.log("note from server",note);
    note.save().then(savedNote => {
      response.json(savedNote)
    })
  })
  const PORT = process.env.PORT;
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

