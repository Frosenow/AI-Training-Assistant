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

export interface WorkoutProgression {
  volume: number;
  reps: number[];
  sets: number;
  weight: number;
}

export interface ProgressTracker {
  id: string;
  trainingDay: string;
  progression: WorkoutProgression;
}

export interface WorkoutDay {
  id: string;
  exerciseName: string;
  muscleGroup: string;
  reps: number[];
  sets: number;
  progressTracker?: ProgressTracker[];
}

export interface WorkoutSplit {
  monday: WorkoutDay[];
  tuesday: WorkoutDay[];
  wednesday: WorkoutDay[];
  thursday: WorkoutDay[];
  friday: WorkoutDay[];
  saturday: WorkoutDay[];
  sunday: WorkoutDay[];
}

export interface Workout {
  owner: string;
  createdAt: string;
  id: string;
  name: string;
  workoutSplit?: WorkoutSplit;
}

export interface AllPostsResult {
  getPosts: Post[];
}

export interface WorkoutsResult {
  getUserWorkouts: Workout[] | [];
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
