const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyList = []

  const listWithManyBlogs = [
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
      }
   ]

describe('total likes', () => {
     test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
      })
    
      test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(24)
      })
  })

  describe('favorite blog', () => {
    test('of empty list is null', () => {
      const result = listHelper.favoriteBlog(emptyList);
      expect(result).toBe(null)
    })
  
    test('when list has only one blog, equals that blog', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })
  
    test('of a bigger list is calculated right', () => {
      const result = listHelper.favoriteBlog(listWithManyBlogs)
      expect(result).toEqual({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      })
    })
  })
  