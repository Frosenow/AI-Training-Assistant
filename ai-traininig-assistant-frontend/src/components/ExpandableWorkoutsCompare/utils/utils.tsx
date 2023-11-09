export function createWorkoutsList(userWorkouts, currentWorkoutName) {
  const workoutsList = [];

  userWorkouts.forEach((workout) => {
    if (workout.name !== currentWorkoutName) {
      const isWorkoutPlanEmpty = checkIfWorkoutPlanEmpty(workout);

      if (!isWorkoutPlanEmpty) {
        workoutsList.push(workout);
      }
    }
  });
  return workoutsList;
}

export function checkIfWorkoutPlanEmpty(workout) {
  return Object.keys(workout.workoutSplit)
    .filter((day) => day !== '__typename') // Exclude the __typename property
    .map((day) => workout.workoutSplit[day])
    .every((workoutPlanArr) => workoutPlanArr.length === 0);
}
