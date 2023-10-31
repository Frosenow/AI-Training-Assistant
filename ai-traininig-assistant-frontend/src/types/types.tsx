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
  comments?: Comments[];
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
  email: string;
  token: string;
}

export interface AllPostsResult {
  getPosts: Post[];
}

export interface GetPostResult {
  getPost: Post;
}

export interface Comments {
  id: string;
  body: string;
  username: string;
  createdAt: string;
}

export interface CommentCardProps {
  comment: Comments;
  postId: string;
}
