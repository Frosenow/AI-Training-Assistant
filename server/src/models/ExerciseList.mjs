import { model, Schema } from "mongoose";

const exerciseListSchema = new Schema({
  owner: String,
  name: String,
  exercises: [
    {
      exerciseName: String,
      muscleGroup: String,
    },
  ],
});

export default model("ExerciseList", exerciseListSchema);
