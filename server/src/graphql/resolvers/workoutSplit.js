import { AuthenticationError, UserInputError } from "apollo-server";

import ExerciseList from "../../models/ExerciseList.mjs";
import { authUser } from "../../util/check-auth.js";

const exerciseResolvers = {
  Query: {
    async getExercisesList() {
      try {
        const exercisesList = await ExerciseList.find();
        return exercisesList;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createExerciseList(_, { listName }, context) {
      const { username } = authUser(context);

      // If someone try to create list without name
      if (listName.trim() === "") {
        throw new UserInputError("Empty list name", {
          errors: {
            body: "List name must not be empty",
          },
        });
      }

      const usersExerciseList = await ExerciseList.find({ owner: username });

      // Check if user already created a list
      if (usersExerciseList.length > 0) {
        throw new UserInputError("List already exist", {
          errors: {
            body: `Users can create only one exercise list`,
          },
        });
      }

      // Create empty list to later add exercises
      const newExerciseList = new ExerciseList({
        owner: username,
        name: listName,
      });

      const exercisesList = await newExerciseList.save();

      return exercisesList;
    },
    async deleteExerciseList(_, { exerciseListId }, context) {
      const { username } = authUser(context);

      try {
        // Get the exercise list from DB
        const exerciseList = await ExerciseList.findById(exerciseListId);
        // Check if the user is the owner of the list
        if (exerciseList.owner === username) {
          await exerciseList.deleteOne();
          return `Exercise list: "${exerciseList.name}" delted successfully`;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async addExerciseToList(
      _,
      { exerciseListId, exercise: { exerciseName, muscleGroup } },
      context
    ) {
      const { username } = authUser(context);

      // if someone try to add empty exercise name
      if (exerciseName.trim() === "") {
        throw new UserInputError("Empty exercise name", {
          errors: {
            body: "Exercise name must not be empty",
          },
        });
      }

      // Find the ExerciseLit in DB
      const exerciseList = await ExerciseList.findById(exerciseListId);

      // If ExerciseList was found
      if (exerciseList) {
        // If the user own the list, add exercise
        if (exerciseList.owner === username) {
          exerciseList.exercises.push({
            exerciseName,
            muscleGroup,
          });

          await exerciseList.save();
          return exerciseList;
        } else throw new AuthenticationError("Action not allowed");
      } else throw new UserInputError("Exercise List not found");
    },
    async deleteExerciseFromList(_, { exerciseListId, exerciseId }, context) {
      const { username } = authUser(context);

      // Find the ExerciseLit in DB
      const exerciseList = await ExerciseList.findById(exerciseListId);

      if (exerciseList) {
        // Find index of the exercise that should be deleted
        const exerciseIdx = exerciseList.exercises.findIndex(
          (exercise) => exercise.id === exerciseId
        );

        // Check if the logged user own the exercise list
        if (exerciseList.owner === username) {
          // Delete the exercise if the loffed user own the exercise list
          exerciseList.exercises.splice(exerciseIdx, 1);

          // Save the updated exercise list back to DB
          await exerciseList.save();
          return exerciseList;
        } else throw new AuthenticationError("Action not allowed");
      } else throw new UserInputError("Exercise List not found");
    },
  },
};

export { exerciseResolvers };
