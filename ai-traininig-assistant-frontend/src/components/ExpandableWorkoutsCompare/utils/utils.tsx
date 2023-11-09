export function createWorkoutsList(userWorkouts, currentWorkoutName) {
  const workoutsList = [];

  userWorkouts.forEach((workout) => {
    if (workout.name !== currentWorkoutName) {
      const isWorkoutPlanEmpty = Object.keys(workout.workoutSplit)
        .filter((day) => day !== '__typename') // Exclude the __typename property
        .map((day) => workout.workoutSplit[day])
        .every((workoutPlanArr) => workoutPlanArr.length === 0);

      if (!isWorkoutPlanEmpty) {
        workoutsList.push(workout);
      }
    }
  });
  return workoutsList;
}
