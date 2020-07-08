const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

test('should dummy be 1', () => {
  expect(listHelper.dummy([])).toBe(1)
})

const oneBlogList = [
  Blog({
    title: 'blog one', author: 'elon musk', url: 'tesla', likes: '1000',
  }),
]
const biggerBlogList = [
  Blog({
    title: 'blog one', author: 'elon musk', url: 'tesla', likes: '1000',
  }),
  Blog({
    title: 'blog two', author: 'elon musk', url: 'pop', likes: '10',
  }),
  Blog({
    title: 'blog two', author: 'west', url: 'pop', likes: '10',
  }),
]

describe('should total likes', () => {
  test('of empty list is zero', () => {
    // debugger
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('be the likes of that when list has only one blog', () => {
    expect(listHelper.totalLikes(oneBlogList)).toEqual(oneBlogList[0].likes)
  })
  test('be bigger than 1000, when list is biggerBlogList', () => {
    expect(listHelper.totalLikes(biggerBlogList)).toBeGreaterThan(1000)
  })
})

describe('should favoriteBlog', () => {
  test('be first one if list only has one item', () => {
    expect(listHelper.favoriteBlog(oneBlogList)).toEqual(oneBlogList[0])
  })
  test('be null if list is empty', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })
  test('be first one if list is biggerBlogList', () => {
    expect(listHelper.favoriteBlog(biggerBlogList)).toEqual(biggerBlogList[0])
  })
})

describe('should mostBlogs', () => {
  test('be { author: elon musk, number: 1 } if list only has one item', () => {
    const result = { author: oneBlogList[0].author, number: 1 }
    expect(listHelper.mostBlogs(oneBlogList)).toEqual(result)
  })
  test('be null if list is empty', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })
  test('be { author: elon musk, number: 2 } if list is biggerBlogList', () => {
    expect(listHelper.mostBlogs(biggerBlogList))
      .toEqual({ author: biggerBlogList[0].author, number: 2 })
  })
})

describe('should mostLike', () => {
  test('be { author: elon musk, likes: 1000 } if list only has one item', () => {
    const result = { author: oneBlogList[0].author, likes: 1000 }
    expect(listHelper.mostLike(oneBlogList)).toEqual(result)
  })
  test('be null if list is empty', () => {
    expect(listHelper.mostLike([])).toBe(null)
  })
  test('be { author: elon musk, number: 2 } if list is biggerBlogList', () => {
    expect(listHelper.mostLike(biggerBlogList))
      .toEqual({ author: biggerBlogList[0].author, likes: 1010 })
  })
})
