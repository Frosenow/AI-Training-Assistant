export interface AuthError {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface Post {
  id: string;
  createdAt?: string;
  body?: string;
  username?: string;
  comments?: Comments;
  commentsCount?: number;
  likes?: User[];
  likesCount?: number;
}

export interface Like {
  username: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

interface Comments {
  id: string;
  body: string;
  username: string;
}
