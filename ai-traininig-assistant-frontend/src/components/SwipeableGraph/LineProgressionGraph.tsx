import { Box, Container, useTheme } from '@mui/material';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineProgressionGraph({ progressionData }) {
  const { datesX, volumeY, exercise } = progressionData;
  const theme = useTheme();

  const data = {
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

  return (
    <Container>
      <Line data={data} options={options} />
    </Container>
  );
}
