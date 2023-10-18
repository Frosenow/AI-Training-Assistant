import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { config } from 'dotenv';
config();

const authUser = (context) => {
  // Get authorization header
  const authHeader = context.req.headers.authorization;

  // Check if the authorization header was passed
  if (authHeader) {
    // Get only the auth user jwt token
    const token = authHeader.split('Bearer ')[1];

    // Check if the token exists
    if (token) {
      try {
        // Verify the token by decoding it using jwt key
        const user = jwt.verify(token, String(process.env.JWT_KEY));
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};

export { authUser };
