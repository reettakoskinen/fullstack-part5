const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

describe('adding a new user', () => {
    beforeEach(async () => {
      await User.deleteMany({})
    })
  
    test('fails with status code 400 if username is missing', async () => {
      const newUser = {
        name: 'John Doe',
        password: 'password123'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('fails with status code 400 if password is missing', async () => {
      const newUser = {
        username: 'johndoe',
        name: 'John Doe'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('fails with status code 400 if username is already taken', async () => {
      const existingUser = {
        username: 'existinguser',
        name: 'Existing User',
        password: 'password123'
      }
  
      await api
        .post('/api/users')
        .send(existingUser)
        .expect(201)
  
      const newUser = {
        username: 'existinguser', 
        name: 'John Doe',
        password: 'password123'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('fails with status code 400 if password is shorter than 3 characters', async () => {
      const newUser = {
        username: 'johndoe',
        name: 'John Doe',
        password: 'pw' 
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  })

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'reetta',
      name: 'Reetta koskinen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
}) 
