import { musclesGroupLabels } from '../consts/consts';

export function getTrainingDays(workoutSplit) {
  return Object.keys(workoutSplit).filter(
    (trainingDay) =>
      Array.isArray(workoutSplit[trainingDay]) &&
      workoutSplit[trainingDay].length > 0
  );
}

export function getMuscleGroupTrained(trainingDays, workoutSplit) {
  const musclesTrained = {};

  // Count the amount of exercises for muscle group
  trainingDays.forEach((day) => {
    workoutSplit[day].forEach((exercise) => {
      if (!musclesTrained[exercise.muscleGroup.toUpperCase()]) {
        musclesTrained[exercise.muscleGroup.toUpperCase()] = {
          amount: 1,
          exercisesInvolved: [exercise.exerciseName],
          id: exercise.id,
        };
      } else {
        musclesTrained[exercise.muscleGroup.toUpperCase()].amount += 1;
        musclesTrained[
          exercise.muscleGroup.toUpperCase()
        ].exercisesInvolved.push(exercise.exerciseName);
      }
    });
  });

  return musclesTrained;
}

export function getDataset(muscleGroupTrained) {
  const dataset = {};

  musclesGroupLabels.forEach((label) => {
    if (muscleGroupTrained[label]) {
      dataset[label] = muscleGroupTrained[label].amount;
    } else {
      dataset[label] = 0;
    }
  });

  return dataset;
}
