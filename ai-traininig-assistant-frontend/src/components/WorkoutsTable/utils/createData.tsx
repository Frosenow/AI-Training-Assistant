import { ProgressTracker } from '../../../types/types';
import { Data } from '../types/types';

// Function to modify the data representation
export function createData(
  exerciseName: string,
  reps: number[],
  sets: number,
  id: string,
  progressTracker: ProgressTracker[]
): Data {
  // eslint-disable-next-line no-param-reassign
  const formattedReps: string = `[${reps.join(', ')}]`;
  return { exerciseName, reps: formattedReps, sets, id, progressTracker };
}
