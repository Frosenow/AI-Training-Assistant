import { AuthenticationError, UserInputError } from "apollo-server";
import WorkoutPlan from "../../models/WorkoutPlan.mjs";
import { authUser } from "../../util/check-auth.js";
import {
  validateExercise,
  validateProgression,
  validateTrainingDay,
} from "../../util/validators.js";

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
    async getWorkout(_, { workoutPlanId }) {
      try {
        const workoutPlan = await WorkoutPlan.findById(workoutPlanId);
        if (workoutPlan) {
          return workoutPlan;
        } else {
          throw new Error("Workout Plan not found");
        }
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
          return workoutPlan;
        } else throw new AuthenticationError("Action not allowed");
      } else throw new UserInputError("Workout plan not found");
    },
    async deleteFromWorkoutSplit(
      _,
      { workoutPlanId, exerciseId, exerciseDay },
      context
    ) {
      const { username } = authUser(context);

      const workoutPlan = await WorkoutPlan.findById(workoutPlanId);

      if (workoutPlan) {
        if (workoutPlan.owner === username) {
          // Find the index of the exercise that should be deleted
          const workoutPlanUpdated = workoutPlan.workoutSplit[
            exerciseDay
          ].filter((exercise) => exercise.id !== exerciseId);
          workoutPlan.workoutSplit[exerciseDay] = workoutPlanUpdated;
          await workoutPlan.save();
          return workoutPlan;
        } else throw new AuthenticationError("Action not allowed");
      } else throw new UserInputError("Workout plan not found");
    },
    async addProgression(
      _,
      { workoutPlanId, exerciseId, trainingDay, progression },
      context
    ) {
      const { username } = authUser(context);

      // Validate progression input
      const { valid, errors } = validateProgression(progression);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const workoutPlan = await WorkoutPlan.findById(workoutPlanId);

      if (workoutPlan) {
        if (workoutPlan.owner === username) {
          // Transform to fit key in object and validate
          const trainingDayTransformed = trainingDay.trim().toLowerCase();

          const { valid, errors } = validateTrainingDay(trainingDayTransformed);

          if (!valid) {
            throw new UserInputError("Errors", { errors });
          }

          // Get all exercises from current training day
          const exercises = workoutPlan.workoutSplit[trainingDay];

          const progressedExerciseIdx = exercises.findIndex(
            (exercise) => exercise.id === exerciseId
          );

          exercises[progressedExerciseIdx].progressTracker.trainingDate =
            new Date().toISOString().slice(0, 10);
          exercises[progressedExerciseIdx].progressTracker.progression = {
            sets: progression.sets,
            reps: progression.reps,
            weight: progression.weight,
          };

          await workoutPlan.save();
          return workoutPlan;
        } else throw new AuthenticationError("Action not allowed");
      } else throw new Error("Workout Plan not found");
    },
  },
};

export { workoutResolvers };
