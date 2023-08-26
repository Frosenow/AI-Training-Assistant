import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";
import { config } from "dotenv";
config();

import {
  validateRegisterInput,
  validateLoginInput,
} from "../../util/validators.js";
import User from "../../models/User.mjs";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    String(process.env.JWT_KEY),
    { expiresIn: "1h" }
  );
}

const usersResolvers = {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Invalid Login input", { errors });
      }

      const user = await User.findOne({ username });

      // Error from DB
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const isInputPasswordMatchingUserPassword = await bcrypt.compare(
        password,
        user.password
      );
      if (!isInputPasswordMatchingUserPassword) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure user doesnt already exits
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // Hash password and sent to DB
      password = await bcrypt.hash(password, 12);

      // Create new user with hashed password and creation time
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      // Save user to database
      const res = await newUser.save();

      // Generate JWT token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export { usersResolvers };
