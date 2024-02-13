const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
  })

test('returns the correct amount of blog posts in JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog post has id property instead of _id', async () => {
  const response = await api.get('/api/blogs')
  .expect(200)
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
      })    
  })

test('creating a new blog post is succesfull', async () => {
const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 10 
}

await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

const response = await api.get('/api/blogs')

expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

const titles = response.body.map(blog => blog.title)
expect(titles).toContain('Test Blog')
})

test('if likes are missing default is 0', async () => {
    const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com'
        // likes missing
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const createdBlog = response.body.find(blog => blog.title === 'Test Blog')
    
      expect(createdBlog.likes).toBe(0)
})

test('creating a new blog without title returns 400 Bad Request', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'http://testblog.com'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  
test('creating a new blog without url returns 400 Bad Request', async () => {
const newBlog = {
    title: 'Test Blog',
    author: 'Test Author'
}

await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting a blog post is succesfull', async () => {
    const response = await api.get('/api/blogs')
    const lastBlogIndex = response.body.length - 1
    const deleteId = response.body[lastBlogIndex].id

    await api.delete(`/api/blogs/${deleteId}`).expect(204)

    const blogs = await Blog.find({});
    expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
})

test('updating a blog post', async () => {
    const response = await api.get('/api/blogs')
    const lastBlogIndex = response.body.length - 1
    const lastId = response.body[lastBlogIndex].id
  
    const updatedLikes = 10
    await api
      .put(`/api/blogs/${lastId}`)
      .send({ likes: updatedLikes })
      .expect(200)
  
    const updatedBlog = await Blog.findById(lastId)
    expect(updatedBlog.likes).toBe(updatedLikes)
  })
  

afterAll(async () => {
await mongoose.connection.close()
})
  

