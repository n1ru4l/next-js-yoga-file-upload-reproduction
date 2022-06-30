// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// pages/api/graphql.ts

import { createServer } from '@graphql-yoga/node'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const server = createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema: {
    typeDefs: /* GraphQL */ `
      scalar File
      type Query {
        greetings: String!
      }
      type Mutation {
        saveFile(file: File!): Boolean!
      }
    `,
    resolvers: {
      Query: {
        greetings: () => 'Hello World!',
      },
      Mutation: {
        /**
         * TypeScript type `File` is globally available.
         * You don't need to install/import anything else
         * for both `File` GraphQL Scalar and this type
         */
        saveFile: async (_, { file }: { file: File }) => {
          try {

            /**
                Below does not work. because `writeFile` accepts Buffer,String, etc but not Stream
                Error is:
                    TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of 
                    type string or an instance of Buffer, TypedArray, or DataView. 
                    Received an instance of ReadableStream
            */
            // const fileStream = file.stream()
            // await fs.promises.writeFile(
            //   path.join(__dirname, file.name),
            //   fileStream,
            // )

            // To add on that, Below are all undefined
            // fileStream.on
            // fileStream.pipe
            // fileStream.read
            // fileStream.once
            // fileStream.setEncoding

                console.log(__dirname, file.name)

            // Below works but it corrupts images,pdf and any other non-text file.
            await fs.promises.writeFile(
              path.join(__dirname, file.name),
              Buffer.from(await file.arrayBuffer())
            )
          } catch (e) {
            console.log(e)
            return false
          }
          return true
        },
      },
    },
  },
})

export default server