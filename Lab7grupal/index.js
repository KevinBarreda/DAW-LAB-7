import express from 'express'
const app = express()
app.use(express.json())

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hola mundo</h1>')
})

app.get('/info', (request, response) => {
  const Fecha = new Date()
  const vista = `<h5>Phonebook has info for ${persons.length} people</h5>
                 <p>${Fecha}</p>`

  response.send(vista)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const ID = request.params.id
  const PersonaID = persons.find((person) => person.id === ID)

  if (PersonaID) {
    response.json(PersonaID)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const persons = persons.filter((persons) => persons.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const unique = persons.filter((persona) => {
    return persona.name === body.name
  })

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'number and name missings'
    })
  }
  if (unique.length > 0) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: ramdomid(100, 10000),
    name: body.name,
    number: body.number
  }
  console.log(person)
  const persons = persons.concat(person)
  response.json(person)
})

function ramdomid (ini, fin) {
  ini = Math.ceil(ini)
  fin = Math.floor(fin)
  return Math.floor(Math.random() * (fin - ini) + ini)
}

const PORT = 3000
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto:${PORT}`)
})
