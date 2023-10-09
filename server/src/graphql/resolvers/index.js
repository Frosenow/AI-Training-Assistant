import { postsResolvers } from "./posts.js";
import { usersResolvers } from "./user.js";
import { commentsResolvers } from "./comments.js";
import { exerciseResolvers } from "./workoutSplit.js";

const resolvers = {
  Post: {
    likesCount: (parent) => parent.likes.length,
    commentsCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
    ...exerciseResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...exerciseResolvers.Mutation,
  },
};

export { resolvers };
