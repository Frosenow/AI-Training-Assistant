import { AuthenticationError } from "apollo-server";

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
      // Authenticate user
      const user = authUser(context);

      // Create comment from passed data
      const newComment = new Comment({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      // Save comment to DB
      const comment = await newComment.save();

      return comment;
    },
    async deleteComment(_, { commentId }, context) {
      const user = authUser(context);

      try {
        // Get the commet data from DB
        const comment = await Comment.findById(commentId);
        // Check if the user is the owner of the comment
        if (user.username === comment.username) {
          await comment.deleteOne();
          return "Comment deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export { commentsResolvers };
