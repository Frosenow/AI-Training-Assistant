import { commentsResolvers } from "./comments.js";
import { usersResolvers } from "./user.js";

const resolvers = {
  Query: {
    ...commentsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};

export { resolvers };
