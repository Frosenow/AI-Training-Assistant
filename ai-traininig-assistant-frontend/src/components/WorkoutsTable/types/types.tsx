import { ProgressTracker } from '../../../types/types';

export interface Column {
  id: 'exerciseName' | 'reps' | 'sets';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

export interface ColumnProgression {
  id: keyof ProgressionData; // Use keyof to ensure column.id matches ProgressionData keys
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

export interface Data {
  exerciseName: string;
  reps: string | number[];
  sets: number;
  id: string;
  progressTracker?: ProgressTracker[];
}

export interface ProgressionData {
  id: string;
  trainingDate: string;
  sets: number;
  reps: number[] | string;
  volume: number;
  weight: number;
}
