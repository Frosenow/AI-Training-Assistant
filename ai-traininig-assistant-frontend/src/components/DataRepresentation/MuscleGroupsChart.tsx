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
import { useTheme, Box, Container } from '@mui/material';

import NestedList from '../NestedList/NestedList';
import {
  getTrainingDays,
  getMuscleGroupTrained,
  getDataset,
} from './utils/workoutSplitTransform';
import { musclesGroupLabels } from './consts/consts';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function MuscleGroupsChart({
  workoutData,
  workoutSplit,
  workoutsToCompare,
}) {
  const { palette } = useTheme();
  const workoutsToAnalyze = [workoutData, ...workoutsToCompare];

  const workoutsDatasetsTransformed = workoutsToAnalyze.map((workout, key) => {
    const trainingDays = getTrainingDays(workout.workoutSplit);
    const muscleGroupTrained = getMuscleGroupTrained(
      trainingDays,
      workout.workoutSplit
    );
    const datasetValues = getDataset(muscleGroupTrained);

    return {
      key,
      workout,
      trainingDays,
      muscleGroupTrained,
      datasetValues,
    };
  });

  const chartDatasets = workoutsDatasetsTransformed.map((data) => {
    return {
      label: `Muscle Groups Trained in ${data.workout.name}`,
      data: Object.values(data.datasetValues),
      backgroundColor: palette.secondary.light,
      borderColor: palette.secondary.dark,
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: musclesGroupLabels,
    datasets: [...chartDatasets],
  };

  const chartOptions = {
    devicePixelRatio: 4,
    scale: {
      ticks: {
        beginAtZero: true,
        // max: Math.max(...Object.values(datasetValues)),
        max: 5,
        min: 1,
        stepSize: 1,
      },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <Container
        sx={{
          maxBlockSize: { xs: '400px', sm: '500px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Radar
          data={chartData}
          updateMode="resize"
          options={chartOptions}
          style={{ padding: '10px' }}
        />
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {workoutsDatasetsTransformed.map((data) => (
          <NestedList
            key={data.key}
            workoutData={data.workout}
            muscleGroupTrained={data.muscleGroupTrained}
          />
        ))}
      </Container>
    </Box>
  );
}
