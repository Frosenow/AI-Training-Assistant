import { AuthenticationError, UserInputError } from "apollo-server";
import WorkoutPlan from "../../models/WorkoutPlan.mjs";
import { authUser } from "../../util/check-auth.js";
import { validateExercise } from "../../util/validators.js";

const workoutResolvers = {
  Query: {
    async getWorkouts() {
      try {
        const workouts = await WorkoutPlan.find();
        return workouts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createWorkoutPlan(_, { name }, context) {
      const { username } = authUser(context);

      // If someone try to create list without name
      if (name.trim() === "") {
        throw new UserInputError("Empty name", {
          errors: {
            body: "Workout Plan name must not be empty",
          },
        });
      }

      const newWorkoutPlan = new WorkoutPlan({
        name: name,
        owner: username,
        createdAt: new Date().toISOString(),
        workoutSplit: [],
      });

      const workoutPlan = await newWorkoutPlan.save();
      return workoutPlan;
    },
    async deleteWorkoutPlan(_, { workoutPlanId }, context) {
      const { username } = authUser(context);

      try {
        // Get the workout plan from DB
        const workoutPlan = await WorkoutPlan.findById(workoutPlanId);
        // Check if the user is the owner of the workout plan
        if (workoutPlan.owner === username) {
          await workoutPlan.deleteOne();
          return `Workout Plan: "${workoutPlan.name}" delted successfully`;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async addToWorkoutSplit(_, { workoutPlanId, exercise }, context) {
      const { username } = authUser(context);

      // Validate exercise provided by user
      const { valid, errors } = validateExercise(exercise);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Find the Workout Plan in DB
      const workoutPlan = await WorkoutPlan.findById(workoutPlanId);

      // Add the exercise with the correct day
      if (workoutPlan) {
        if (workoutPlan.owner === username) {
          // Get the key for the workoutSplit value
          const dayOfTheWeek = String(
            exercise.exerciseDay.trim()
          ).toLowerCase();

          workoutPlan.workoutSplit[dayOfTheWeek].push({
            exerciseName: exercise.exerciseName,
            muscleGroup: exercise.muscleGroup,
            sets: exercise.sets,
            reps: exercise.reps,
          });

          await workoutPlan.save();
          console.log(workoutPlan);
          return workoutPlan;
        } else throw new AuthenticationError("Action not allowed");
      } else throw new UserInputError("Workout plan not found");
    },
  },
};

export { workoutResolvers };
