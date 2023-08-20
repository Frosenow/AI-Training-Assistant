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
  },
};

export { commentsResolvers };
