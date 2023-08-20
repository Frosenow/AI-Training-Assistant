import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

import { resolvers } from "./graphql/resolvers/index.js";
import { typeDefs } from "./graphql/TypeDefs.js";

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
