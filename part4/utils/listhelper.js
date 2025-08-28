const dummy = () => {
  return 1
}

const totalLikes =(blogs) =>{
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  return blogs.reduce((fav, blog) =>
    (blog.likes) > (fav.likes) ? blog : fav
  )
}

module.exports = {
  dummy,totalLikes,favBlog
}