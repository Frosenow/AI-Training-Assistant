import { gql } from 'graphql-tag';

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
    muscleGroup: String!
    sets: Int
    reps: [Int]
    progressTracker: [ProgressTrackerItem!]
  }
  type ExerciseProgres {
    sets: Int!
    reps: [Int!]!
    weight: Float!
    volume: Float
  }
  type WorkoutSplitItems {
    monday: [Exercise!]
    tuesday: [Exercise!]
    wednesday: [Exercise!]
    thursday: [Exercise!]
    friday: [Exercise!]
    saturday: [Exercise!]
    sunday: [Exercise!]
  }
  type ProgressTrackerItem {
    id: ID!
    trainingDate: String!
    progression: ExerciseProgres!
  }
  type WorkoutPlan {
    id: ID!
    name: String!
    owner: String!
    createdAt: String
    workoutSplit: WorkoutSplitItems!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input ExerciseInput {
    exerciseName: String!
    muscleGroup: String!
  }
  input ExerciseSplitInput {
    exerciseDay: String!
    exerciseName: String!
    muscleGroup: String!
    sets: Int!
    reps: [Int!]!
  }
  input ProgressionInput {
    trainingDay: String!
    trainingDate: String!
    sets: Int!
    reps: [Int!]!
    weight: Float!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUserWorkouts(owner: String!): [WorkoutPlan]
    getWorkout(workoutPlanId: ID!): WorkoutPlan!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    createWorkoutPlan(name: String!): WorkoutPlan!
    deleteWorkoutPlan(workoutPlanId: ID!): String!
    addToWorkoutSplit(
      workoutPlanId: ID!
      exercise: ExerciseSplitInput!
    ): WorkoutPlan!
    deleteFromWorkoutSplit(
      workoutPlanId: ID!
      exerciseId: ID!
      exerciseDay: String!
    ): WorkoutPlan!
    addProgression(
      workoutPlanId: ID!
      exerciseId: ID!
      progression: ProgressionInput!
    ): WorkoutPlan!
    editProgression(
      workoutPlanId: ID!
      exerciseId: ID!
      progressionId: ID!
      progression: ProgressionInput!
    ): WorkoutPlan!
    deleteProgression(
      workoutPlanId: ID!
      exerciseId: ID!
      progressionId: ID!
      trainingDay: String!
    ): WorkoutPlan!
  }
`;

export { typeDefs };
