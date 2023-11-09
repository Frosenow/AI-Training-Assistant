import {
  getTrainingDays,
  getExercisesWithProgress,
  createProgressionData,
} from './utils/workoutSplitTransform';
import SwipeableGraph from '../SwipeableGraph/SwipeableGraph';

export default function ExerciseProgressLines({ workoutData }) {
  const { workoutSplit } = workoutData;
  const trainingDays = getTrainingDays(workoutSplit);
  const exercisesWithProgression = getExercisesWithProgress(
    trainingDays,
    workoutSplit
  );

  const plottingData = createProgressionData(exercisesWithProgression);

  return <SwipeableGraph plottingData={plottingData} />;
}
