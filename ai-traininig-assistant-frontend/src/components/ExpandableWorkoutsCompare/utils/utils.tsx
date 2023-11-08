export function createWorkoutsList(userWorkouts, currentWorkoutName) {
  const workoutsList = [];

  userWorkouts.forEach((workout) => {
    if (workout.name !== currentWorkoutName) {
      const workoutObj = {
        name: workout.name,
        id: workout.id,
      };

      workoutsList.push(workoutObj);
    }
  });
  return workoutsList;
}
