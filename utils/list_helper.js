const dummy = (blogs) => 1

const totalLikes = (blogs) => (blogs.length > 0
  ? blogs.map((blog) => blog.likes).reduce((pre, cur) => pre + cur)
  : 0)

const favoriteReducer = (pre, cur) => (pre.likes >= cur.likes ? pre : cur)
const favoriteBlog = (blogs) => (blogs.length > 0 ? blogs.reduce(favoriteReducer) : null)

const groupBy = (array, k) => array.reduce(
  (pre, cur) => {
    const key = cur[k]
    if (!pre.get(key)) pre.set(key, [])
    pre.get(key).push(cur)
    return pre
  }, new Map(),
)

const mostBlogs = (blogs) => {
  if (!blogs.length) return null
  const groups = groupBy(blogs, 'author')
  let mostBlog = { author: '', number: 0 }
  groups.forEach((value, author) => {
    if (value.length >= mostBlog.number) mostBlog = { author, number: value.length }
  })
  return mostBlog
}

const mostLike = (blogs) => {
  if (!blogs.length) return null
  const groups = groupBy(blogs, 'author')
  let mostBlog = { author: '', likes: 0 }
  groups.forEach((value, author) => {
    const likes = value.length > 1
      ? value.reduce((pre, cur) => pre.likes + cur.likes)
      : value[0].likes
    if (likes >= mostBlog.likes) mostBlog = { author, likes }
  })
  return mostBlog
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLike,
}
