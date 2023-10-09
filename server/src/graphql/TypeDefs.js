import { gql } from "graphql-tag";

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likesCount: Int!
    commentsCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
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
  type Exercise {
    id: ID!
    exerciseName: String!
    muscleGroup: String
  }
  type ExerciseList {
    id: ID!
    owner: String!
    name: String!
    exercises: [Exercise]!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input ExerciseInput {
    exerciseName: String!
    muscleGroup: String
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getExercisesList: [ExerciseList]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    createExerciseList(listName: String!): ExerciseList!
    deleteExerciseList(exerciseListId: ID!): String!
    addExerciseToList(
      exerciseListId: ID!
      exercise: ExerciseInput!
    ): ExerciseList!
    deleteExerciseFromList(exerciseListId: ID!, exerciseId: ID!): ExerciseList!
  }
`;

export { typeDefs };
