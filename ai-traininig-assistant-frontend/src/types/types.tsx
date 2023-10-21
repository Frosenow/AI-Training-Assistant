export interface AuthError {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface Post {
  id: string;
  createdAt: string;
  body: string;
  username: string;
  comments: Comments;
  commentsCount: number;
  likes: Likes;
  likesCount: number;
}

interface Comments {
  id: string;
  body: string;
  username: string;
}

interface Likes {
  username: string;
}
