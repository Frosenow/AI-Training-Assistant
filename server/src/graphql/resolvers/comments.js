import Comment from "../../models/Comment.mjs";
import { authUser } from "../../util/check-auth.js";

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
    async createComment(_, { body }, context) {
      const user = authUser(context);

      const newComment = new Comment({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const comment = await newComment.save();

      return comment;
    },
  },
};

export { commentsResolvers };
