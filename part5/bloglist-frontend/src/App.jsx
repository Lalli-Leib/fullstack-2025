import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const Notification = ({ message, type }) => {
  if (message === null) return null
  return <div className={type}>{message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!user) return
    blogService
      .getAll()
      .then(fetched => {
        const sorted = [...fetched].sort((a, b) => b.likes - a.likes)
        setBlogs(sorted)
      }
    )
      .catch(err => console.error('Fetching blogs failed:', err))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    setErrorMessage(null)
    console.log('Logging in with username', username)
    try {
      const user = await loginService.login({ username, password })
      console.log('Has token ', !!user?.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Logged in as "${user.username}"`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setSuccessMessage('Logged out succesfully')
    setTimeout(() => setSuccessMessage(null), 5000)
    setUser(null)
    setBlogs([])
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('Cleared session')
  }

  const addBlog = async (blog) => {
    try {
      const created = await blogService.create(blog)
      setBlogs(prev => [...prev, created].sort((a, b) => b.likes - a.likes))
      console.log('Created a new blog:', {title: created.title })
      setSuccessMessage(`New blog "${created.title}" added by ${created.author}`)
      setTimeout(() => setSuccessMessage(null), 5000)
      setShowForm(false)
    } catch (err) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => setErrorMessage(null), 5000)
      console.error('Create failed:', err)
    }
  }

  const handleLike = async (blog) => {
    try {
      const userField = blog.user && typeof blog.user === 'object' ? blog.user.id : blog.user
      const updated = { ...blog, likes: (blog.likes || 0) + 1, user: userField }
      const saved = await blogService.update(blog.id, updated)
      setBlogs(prev => prev.map(b => (b.id === blog.id ? saved : b)))
      console.log('Liked a blog:',{ title: saved.title})
      setSuccessMessage(`Liked ${saved.title}`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setErrorMessage('Failed to like blog')
      setTimeout(() => setErrorMessage(null), 5000)
      console.error('Like failed:', err)
    }
  }

  const handleRemove = async (blog) => {
    const ok = window.confirm(`Remove ${blog.title}`)
    if (!ok) return

    try{
     await blogService.remove(blog.id, blog.title)
     setBlogs(prev => prev.filter(b => b.id !== blog.id))
     setSuccessMessage(`Removed ${blog.title}`)
     setTimeout(() => setSuccessMessage(null), 5000)
     console.log(`Deleted blog ${blog.title} successfully`)
     console.log()
    } catch (err) {
      setErrorMessage('Failed to delete blog')
      setTimeout(() => setErrorMessage(null), 5000)
      console.error('Delete failed:', err)
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to app</h2>
        <Notification message={successMessage} type="success" />
        <Notification message={errorMessage} type="error" />
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={({target}) => setUsername(target.value)}
          onPasswordChange={({target}) => setPassword(target.value)}
          onSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <p> Logged in as: {user.name}</p>
      <p><button onClick={handleLogout}>logout</button></p>

      {!showForm ? (<button onClick={() => setShowForm(true)}>create a new blog</button>): 
        (
          <>
            <BlogForm onSubmit={addBlog} />
            <button onClick={() => setShowForm(false)}>cancel</button>
          </>
        )
      }
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={() => handleLike(blog)}
          onRmv={() => handleRemove(blog)}
        />
      ))}
    </div>
  )
}

export default App
