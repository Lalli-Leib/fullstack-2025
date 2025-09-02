import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (!user) return
    blogService
      .getAll()
      .then(fetched => {
        console.log('Blogs:', fetched)
        setBlogs(fetched)
      })
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
    setSuccessMessage(`Logged out succesfully`)
    setTimeout(() => setSuccessMessage(null), 5000)
    setUser(null)
    setBlogs([])
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('Cleared session')
  }

   const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { title, author, url }
      const created = await blogService.create(newBlog)
      setBlogs(blogs.concat(created))
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`New blog "${created.title}" added by ${created.author}`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

 if (user === null) {
  return (
    <div>
      <h2>Log in to app</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      {loginForm()}
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
    {blogForm()}
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)
}

export default App
