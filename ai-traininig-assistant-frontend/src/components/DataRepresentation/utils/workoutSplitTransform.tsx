export function getTrainingDays(workoutSplit) {
  return Object.keys(workoutSplit).filter(
    (trainingDay) =>
      Array.isArray(workoutSplit[trainingDay]) &&
      workoutSplit[trainingDay].length > 0
  );
}

export function getMuscleGroupTrained(trainingDays, workoutSplit) {
  const values = {
    ABDOMINALS: 0,
    HAMSTRINGS: 0,
    ADDUCTORS: 0,
    QUADRICEPS: 0,
    BICEPS: 0,
    SHOULDERS: 0,
    CHEST: 0,
    'MIDDLE BACK': 0,
    CALVES: 0,
    GLUTES: 0,
    'LOWER BACK': 0,
    LATS: 0,
    TRICEPS: 0,
    TRAPS: 0,
    FOREARMS: 0,
    NECK: 0,
    ABDUCTORS: 0,
  };

  // Count the amount of exercises for muscle group
  trainingDays.forEach((day) => {
    workoutSplit[day].forEach((exercise) => {
      values[exercise.muscleGroup.toUpperCase()] += 1;
    });
  });

  return values;
}
