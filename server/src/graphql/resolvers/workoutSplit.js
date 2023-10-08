import { UserInputError } from "apollo-server";

import ExerciseList from "../../models/ExerciseList.mjs";
import { authUser } from "../../util/check-auth.js";

const exerciseResolvers = {
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

      const exerciseListName = await ExerciseList.find({ name: listName });

      console.log(exerciseListName.length);
      if (exerciseListName.length > 0) {
        throw new UserInputError("List already exist", {
          errors: {
            body: `Exercise list with name: ${listName} already exists`,
          },
        });
      }

      // Create empty list to later add exercises
      const newExerciseList = new ExerciseList({
        owner: username,
        name: listName,
        exercises: [],
      });

      const exercisesList = await newExerciseList.save();

      return exercisesList;
    },
  },
};

export { exerciseResolvers };
