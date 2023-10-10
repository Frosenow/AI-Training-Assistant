import WorkoutPlan from "../../models/WorkoutPlan.mjs";
import { authUser } from "../../util/check-auth.js";

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
  },
};

export { workoutResolvers };
