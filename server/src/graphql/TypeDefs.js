import { gql } from "graphql-tag";

const typeDefs = gql`
  type Comment {
    id: ID!
    name: String!
    email: String
    text: String!
    date: String
  }
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    token: String!
    createdAt: String
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getComments: [Comment]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;

export { typeDefs };
