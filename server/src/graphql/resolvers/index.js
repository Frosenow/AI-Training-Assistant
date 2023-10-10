import { postsResolvers } from "./posts.js";
import { usersResolvers } from "./user.js";
import { commentsResolvers } from "./comments.js";
import { exerciseResolvers } from "./exercises.js";
import { workoutResolvers } from "./workout.js";

const resolvers = {
  Post: {
    likesCount: (parent) => parent.likes.length,
    commentsCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
    ...exerciseResolvers.Query,
    ...workoutResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...exerciseResolvers.Mutation,
    ...workoutResolvers.Mutation,
  },
};

export { resolvers };
