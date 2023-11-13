import { Container, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { predictProgressionData } from '../../computation/polynomialRegression/polynomialRegression';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineProgressionGraph({ progressionData, predictionSpan }) {
  const { datesX, volumeY, exercise } = progressionData;
  const theme = useTheme();

  let data = {
    labels: datesX,
    datasets: [
      {
        label: `Progression of ${exercise.exerciseName}`,
        data: volumeY,
        fill: false,
        borderColor: theme.palette.secondary.dark,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Volume progression of ${exercise.exerciseName} in time`,
      },
    },
  };

  const progressionDataset = {
    timestamp: [...datesX],
    volume: [...volumeY],
  };

  if (predictionSpan !== 0) {
    const predictedData = predictProgressionData(
      progressionDataset,
      predictionSpan
    );

    // Clone the original data object and append predicted data
    data = {
      ...data,
      labels: [...data.labels, predictedData.xValue],
      datasets: [
        {
          ...data.datasets[0],
          data: [...data.datasets[0].data, predictedData.yValue],
        },
      ],
    };

    const optionsPrediction = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: `Prediction of volume progression of ${exercise.exerciseName} in time`,
        },
      },
    };

    return (
      <Container
        sx={{
          minHeight: { sm: '300px', lg: '400px' },
        }}
      >
        <Line data={data} options={optionsPrediction} />
      </Container>
    );
  }

  return (
    <Container
      sx={{
        minHeight: { sm: '300px', lg: '400px' },
      }}
    >
      <Line data={data} options={options} />
    </Container>
  );
}
