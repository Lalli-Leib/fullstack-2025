const { describe, test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const { MONGODB_URI } = require('../utils/config')
const api = supertest(app)

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('GET /api/blogs', () => {

  before(async () => {
    await mongoose.connect(MONGODB_URI)
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
  })

  test('Returns JSON with status 200', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })
  test('Returns the correct number of blogs', async () => {
    const response = await api.get('/api/blogs').expect(200)
    assert.strictEqual(response.body.length, blogs.length)
  })

  test('Blogs have field id', async () => {
    const response = await api.get('/api/blogs').expect(200)
    response.body.forEach(blog => {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})

describe('POST /api/blogs', () => {
  before(async () => {
    await mongoose.connect(MONGODB_URI)
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
  })

  test('Adds a test blog and increases blog count by one', async () => {
    const blog = {
      title: 'Tiku-kissan blogi',
      author: 'Tiku Kissa',
      url: 'http://kissanblogi.com',
      likes: 42,
    }

    await api

      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs').expect(200)
    assert.strictEqual(res.body.length, blogs.length + 1)

  })
  after(async () => {
    await mongoose.connection.close()
  })
})

describe('DELETE /api/blogs', () => {

    before(async () => {
    await mongoose.connect(MONGODB_URI)
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)  
  })

  test('Deletes a blog and lowers count by one', async () => {
    const startingBlogs = await Blog.find({})
    const toDelete = startingBlogs[0]

    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .expect(204)

    const blogsAfterDelete = await Blog.find({})
    assert.strictEqual(blogsAfterDelete.length, startingBlogs.length - 1)
  })
    after(async () => {
    await mongoose.connection.close()
  })
})

