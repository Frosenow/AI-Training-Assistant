import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, CircularProgress, Paper } from '@mui/material';

import { AuthContext } from '../../../context/auth';
import { FETCH_SINGLE_WORKOUT_QUERY } from '../SingleWorkout/Queries/getSingleWorkout';
import MuscleGroupsChart from '../../DataRepresentation/MuscleGroupsChart';

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

  const isWorkoutPlanEmpty = Object.keys(workoutSplit)
    .filter((day) => day !== '__typename') // Exclude the __typename property
    .map((day) => workoutSplit[day])
    .every((workoutPlanArr) => workoutPlanArr.length === 0);

  return (
    <Paper
      sx={{
        margin: {
          xs: '6rem 1rem',
          sm: '6rem 1rem 1rem calc(1rem + 239px)',
        },
      }}
    >
      {!isWorkoutPlanEmpty && (
        <MuscleGroupsChart
          workoutData={data}
          workoutSplit={workoutSplit}
          workoutPlanId={workoutPlanId}
        />
      )}
    </Paper>
  );
}
