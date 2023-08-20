import Comment from "../../models/Comment.mjs";

const commentsResolver = {
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

export { commentsResolver };
