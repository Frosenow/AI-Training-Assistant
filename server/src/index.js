import { ApolloServer } from "apollo-server";
import { gql } from "graphql-tag";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

import User from "./models/User.mjs";
import Comment from "./models/Comment.mjs";

const typeDefs = gql`
  type Comment {
    id: ID
    name: String
    email: String
    text: String
    date: String
  }
  type Query {
    getComments: [Comment]
  }
`;

const resolvers = {
  Query: {
    async getComments() {
      try {
        const comments = await Comment.find();
        return comments;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

try {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
  });
  console.log("Connected to DB...");
} catch (error) {
  console.log(error);
} finally {
  server.listen({ port: 5000 }).then((res) => {
    console.log(`Server is running on: ${res.url}`);
  });
}
