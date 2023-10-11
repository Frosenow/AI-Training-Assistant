import { model, Schema } from "mongoose";

const ExerciseSchema = new Schema({
  exerciseName: String,
  muscleGroup: String,
  sets: Number,
  reps: [Number],
  weight: Number,
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
  progressTracker: [
    {
      trainingDate: String,
      progression: [
        {
          exerciseName: String,
          sets: Number,
          reps: { type: Array, default: [] },
          weight: Number,
        },
      ],
    },
  ],
});

export default model("WorkoutPlan", WorkoutSchema);
