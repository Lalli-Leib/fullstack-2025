const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(b => b.toJSON()))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const saved = await blog.save()
    response.status(201).json(saved.toJSON())
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
