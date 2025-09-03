import { useState } from 'react'

const Blog = ({ blog, onLike }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogMax = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 10
  }

  const blogMin = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 10
  }

  return (
    <div>
      <div style={blogMin}>
        {blog.title}
        <button style={{ marginLeft: '10px' }} onClick={toggleVisibility}> {visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div style={blogMax}>
          <div>Url: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={onLike}>like</button> </div>
          <div>Author: {blog.author}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
