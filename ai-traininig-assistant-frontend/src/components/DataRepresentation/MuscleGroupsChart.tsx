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
  workoutPlanId,
}) {
  const dataset = {
    key: workoutPlanId,
    label: workoutData.name,
    values: {
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
    },
  };

  const chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        max: 5,
        min: 1,
        stepSize: 1,
      },
    },
  };

  const trainingDays = Object.keys(workoutSplit).filter(
    (trainingDay) =>
      Array.isArray(workoutSplit[trainingDay]) &&
      workoutSplit[trainingDay].length > 0
  );

  // Count the amount of exercises for muscle group
  trainingDays.forEach((day) => {
    workoutSplit[day].forEach((exercise) => {
      dataset.values[exercise.muscleGroup.toUpperCase()] += 1;
    });
  });

  const chartData = {
    labels: Object.keys(dataset.values),
    datasets: [
      {
        label: 'Muscles Groups in',
        data: Object.values(dataset.values),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={chartData} updateMode="resize" options={chartOptions} />;
}
