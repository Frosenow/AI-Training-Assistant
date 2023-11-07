import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useTheme, Box } from '@mui/material';

import {
  getTrainingDays,
  getMuscleGroupTrained,
} from './utils/workoutSplitTransform';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function MuscleGroupsChart({ workoutData, workoutSplit }) {
  const { palette } = useTheme();

  const trainingDays = getTrainingDays(workoutSplit);
  const muscleGroupTrained = getMuscleGroupTrained(trainingDays, workoutSplit);

  const chartData = {
    labels: Object.keys(muscleGroupTrained),
    datasets: [
      {
        label: `Muscle Groups Trained in ${workoutData.name}`,
        data: Object.values(muscleGroupTrained),
        backgroundColor: palette.secondary.light,
        borderColor: palette.secondary.dark,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    devicePixelRatio: 4,
    scale: {
      ticks: {
        beginAtZero: true,
        max: Math.max(...Object.values(muscleGroupTrained)),
        min: 1,
        stepSize: 1,
      },
    },
  };

  return (
    <Box
      sx={{
        maxBlockSize: 400,
      }}
    >
      <Radar
        data={chartData}
        updateMode="resize"
        options={chartOptions}
        style={{ padding: '10px' }}
      />
    </Box>
  );
}
