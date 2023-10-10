import { model, Schema } from "mongoose";

const WorkoutSchema = new Schema({
  name: String,
  owner: String,
  createdAt: String,
  workoutSplit: [
    {
      dayOfTheWeek: String,
      exercises: {
        type: Schema.Types.ObjectId,
        ref: "ExerciseList",
        exerciseName: String,
        muscleGroup: String,
        sets: Number,
        reps: [Number],
        weight: Number,
      },
    },
  ],
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
