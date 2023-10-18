import { model, Schema } from 'mongoose';

const ExerciseSchema = new Schema({
  exerciseName: String,
  muscleGroup: String,
  sets: Number,
  reps: [Number],
  progressTracker: [
    {
      trainingDate: String,
      progression: {
        sets: Number,
        reps: { type: Array, default: [] },
        weight: Number,
      },
    },
  ],
});

const WorkoutSchema = new Schema({
  name: String,
  owner: String,
  createdAt: String,
  workoutSplit: {
    monday: [ExerciseSchema],
    tuesday: [ExerciseSchema],
    wednesday: [ExerciseSchema],
    thursday: [ExerciseSchema],
    friday: [ExerciseSchema],
    saturday: [ExerciseSchema],
    sunday: [ExerciseSchema],
  },
});

export default model('WorkoutPlan', WorkoutSchema);
