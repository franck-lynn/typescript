import { Resolvers } from "../../types"

// example data
const authors = [
  { id: 1, firstName: "Tom", lastName: "Coleman" },
  { id: 2, firstName: "Sashko", lastName: "Stubailo" },
  { id: 3, firstName: "Mikhail", lastName: "Novikov" },
]

const posts = [
  { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
  { id: 2, authorId: 2, title: "Welcome to Meteor", votes: 3 },
  { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
  { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 },
]

// type Post = (typeof posts)[0]
// type Author = (typeof authors)[0]

export const resolvers: Resolvers = {
  Query: {
    posts: () => posts,
    // author: (_: Post, { id }: { id: number }) => authors.find((author) => author.id === id),
    author: (_, { id }) => authors.find((author) => author.id === id)!,
  },

  Mutation: {
    // upvotePost(_, { postId }: { postId: number }) {
    //   const post = posts.find((post) => post.id === postId)
    //   if (!post) {
    //     throw new Error(`Couldn't find post with id ${postId}`)
    //   }
    //   post.votes += 1
    //   return post
    // },
    upvotePost: (_, { postId }) => {
      const post = posts.find((post) => post.id === postId)
      if (!post) throw new Error(`Couldn't find post with id ${postId}`)
      post.votes += 1
      return post
    },
  },

  Author: {
    posts: (author) => posts.filter((post) => post.authorId === author.id),
  },

  Post: {
    // author: (post) => authors.find((author) => author.id === post.authorId),
    author: ({ id }) => authors.find((author) => author.id === id)!,
  },
}
