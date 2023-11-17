import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

import { resolvers } from './graphql/resolvers/index.js';
import { typeDefs } from './graphql/TypeDefs.js';

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

try {
  await mongoose.connect(String(process.env.MONGODB_CONNECTION_STRING), {
    useNewUrlParser: true,
  });
  console.log('Connected to DB...');
} catch (error) {
  console.log(error);
} finally {
  server.listen({ port: PORT }).then((res) => {
    console.log(`Server is running on: ${res.url}`);
  });
}
