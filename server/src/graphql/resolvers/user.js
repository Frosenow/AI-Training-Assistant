import User from "../../models/User.mjs";

const usersResolvers = {
  Mutation: {
    register(_, args, context, info) {
      // TODO: Validate user data
      // TODO: Make sure user doesnt already exits
      // TODO: Hash password and create auth token
    },
  },
};

export { usersResolvers };
