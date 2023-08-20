import { gql } from "graphql-tag";

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

export { typeDefs };
