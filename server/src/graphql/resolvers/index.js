import { commentsResolver } from "./comments.js";

const resolvers = {
  Query: {
    ...commentsResolver.Query,
  },
};

export { resolvers };
