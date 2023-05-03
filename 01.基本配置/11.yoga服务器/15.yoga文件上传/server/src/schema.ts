import { nanoid } from "nanoid"

import { createSchema } from "graphql-yoga"
import path from "path"

import fs from "fs"
import { PATH_CWD, HOST_NAME, PORT } from "./contstants"

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    scalar Upload
    type Query {
      greetings: String!
    }
    type File {
      url: String!
    }
    type Mutation {
      singleUpload(file: Upload!): File!
    }
  `,
  resolvers: {
    Query: {
      greetings: () => "Hello World!",
    },
    Mutation: {
      singleUpload: async (root: unknown, { file }: { file: any }) => {
        console.log("file=====> ", file)
        const { blobParts, type, encoding, name } = await file
        console.log("file=====> ", file.blobParts)
        // const stream = fs.createReadStream()
        // const pathname = path.join(PATH_CWD, `./src/uploads/${filename}`)

        // await stream.pipe(fs.createWriteStream(pathname))
        return {
          url: `http://localhost:3000/uploads/${name}`,
        }
      },
    },
  },
})
