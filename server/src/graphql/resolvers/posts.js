import { AuthenticationError } from "apollo-server";

import Post from "../../models/Post.mjs";
import { authUser } from "../../util/check-auth.js";

const postsResolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      // Authenticate user
      const user = authUser(context);

      // Create post from passed data
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      // Save post to DB
      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = authUser(context);

      try {
        // Get the post data from DB
        const post = await Post.findById(postId);
        // Check if the user is the owner of the post
        if (user.username === post.username) {
          await post.deleteOne();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export { postsResolvers };
