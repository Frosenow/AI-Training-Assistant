import { postsResolvers } from './posts.js';
import { usersResolvers } from './user.js';
import { commentsResolvers } from './comments.js';
import { workoutResolvers } from './workout.js';

const resolvers = {
  Post: {
    likesCount: (parent) => parent.likes.length,
    commentsCount: (parent) => parent.comments.length,
  },
  ExerciseProgres: {
    volume: (parent) =>
      parent.weight * parent.reps.reduce((acc, prev) => acc + prev),
  },
  Query: {
    ...postsResolvers.Query,
    ...workoutResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...workoutResolvers.Mutation,
  },
};

export { resolvers };
