import { gql } from "graphql-tag";

const typeDefs = gql`
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
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
    getComment(commentId: ID!): Comment
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createComment(body: String!): Comment!
    deleteComment(commentId: ID!): String!
  }
`;

export { typeDefs };
