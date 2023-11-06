import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, CircularProgress, Paper } from '@mui/material';

import { AuthContext } from '../../../context/auth';
import { FETCH_SINGLE_WORKOUT_QUERY } from '../SingleWorkout/Queries/getSingleWorkout';
import WorkoutsTable from '../../WorkoutsTable/WorkoutsTable';
import SnackBarError from '../../SnackBarError/SnackBarError';
import SpiderChart from '../../DataRepresentation/SpiderChart/SpiderChart';

export default function WorkoutAnalyze() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { workoutPlanId } = useParams();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading, error, data } = useQuery(FETCH_SINGLE_WORKOUT_QUERY, {
    variables: {
      workoutPlanId,
    },
  });

  if (loading) {
    return (
      <Container
        sx={{
          mt: 'calc(4rem + 239px)',
          display: 'flex',
          justifyContent: 'center',
          opacity: '50',
        }}
      >
        <CircularProgress
          variant="indeterminate"
          color="primary"
          size={500}
          thickness={1}
        />
      </Container>
    );
  }

  const {
    getWorkout: { workoutSplit },
  } = data;

  const variables = [
    { key: 'back', label: 'Back' },
    { key: 'chest', label: 'Chest' },
    { key: 'legs', label: 'Legs' },
    { key: 'abdominals', label: 'Abdominals' },
    { key: 'biceps', label: 'Biceps' },
    { key: 'lats', label: 'Lats' },
    { key: 'quadriceps', label: 'Quadriceps' },
    { key: 'shoulders', label: 'Shoulders' },
  ];
  const options = [
    {
      key: workoutPlanId,
      label: data.name,
      values: {},
    },
  ];

  const isWorkoutPlanEmpty = Object.keys(workoutSplit)
    .filter((day) => day !== '__typename') // Exclude the __typename property
    .map((day) => workoutSplit[day])
    .every((workoutPlanArr) => workoutPlanArr.length === 0);

  if (!isWorkoutPlanEmpty) {
    const trainingDays = Object.keys(workoutSplit).filter(
      (trainingDay) =>
        Array.isArray(workoutSplit[trainingDay]) &&
        workoutSplit[trainingDay].length > 0
    );

    // Count the amount of exercises for muscle group
    trainingDays.forEach((day) => {
      workoutSplit[day].forEach((exercise) => {
        options[0].values[exercise.muscleGroup.toLowerCase()] =
          (options[0].values[exercise.muscleGroup.toLowerCase()] || 0) + 1;
      });
    });
  }

  console.log(options);

  return (
    <Paper
      sx={{
        width: '50%',
        margin: {
          xs: '6rem 1rem',
          sm: '6rem 1rem 1rem calc(1rem + 239px)',
        },
      }}
    >
      <SpiderChart options={options} variables={variables} />;
    </Paper>
  );
}
