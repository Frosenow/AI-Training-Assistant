import { AuthenticationError } from "apollo-server";
import { UserInputError } from "apollo-server";

import Post from "../../models/Post.mjs";
import { authUser } from "../../util/check-auth.js";

const commentsResolvers = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = authUser(context);

      // If someone try to add empty comment
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      // Find the Post by postId in DB
      const post = await Post.findById(postId);

      if (post) {
        // Add comment on top
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        // Update post with newly added comment in DB
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = authUser(context);

      const post = await Post.findById(postId);

      if (post) {
        // Find index of the comment that should be deleted
        const commentIdx = post.comments.findIndex(
          (comment) => comment.id === commentId
        );

        // Check if the logged user own the comment
        if (post.comments[commentIdx].username === username) {
          // Delete the comment if the logged user own the comment
          post.comments.splice(commentIdx, 1);

          // Save the updated post back to DB
          await post.save();
          return post;
        } else throw new AuthenticationError("Action not allowed");
      } else throw new UserInputError("Post not found");
    },
  },
};

export { commentsResolvers };
