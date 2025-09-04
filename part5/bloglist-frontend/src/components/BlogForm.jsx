import { useState } from 'react'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div> title <input type="text" placeholder="Title" value={title} onChange={({ target }) => setTitle(target.value)} /></div>
        <div>author <input type="text" placeholder="Author"value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>url <input type="text" placeholder="https://example.fi" value={url} onChange={({ target }) => setUrl(target.value)} /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
