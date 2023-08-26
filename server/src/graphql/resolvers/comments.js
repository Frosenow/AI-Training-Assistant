import Comment from "../../models/Comment.mjs";

const commentsResolvers = {
  Query: {
    async getComments() {
      try {
        const comments = await Comment.find();
        return comments;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getComment(_, { commentId }) {
      try {
        const comment = await Comment.findById(commentId);
        if (comment) {
          return comment;
        } else {
          throw new Error("Comment not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createComment(_, { body }, context) {},
  },
};

export { commentsResolvers };
