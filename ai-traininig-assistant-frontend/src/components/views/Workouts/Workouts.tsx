import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';

import WorkoutCard from '../../WorkoutCard/WorkoutCard';
import SnackBarError from '../../SnackBarError/SnackBarError';
import { CreateWorkoutForm } from '../../CreateWorkoutForm/CreateWorkoutForm';
import { FETCH_USER_WORKOUTS_QUERY } from './Queries/getUserWorkoutsQuery';
import { AuthContext } from '../../../context/auth';
import { Workout } from '../../../types/types';
import { CreateWorkoutFormLite } from '../../CreateWorkoutForm/CreateWorkoutFormLite';

export default function Workouts() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading, error, data } = useQuery(FETCH_USER_WORKOUTS_QUERY, {
    variables: {
      owner: user ? user.username : undefined,
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

  const { getUserWorkouts } = data;

  if (!getUserWorkouts) {
    <CreateWorkoutForm />;
  }

  return (
    <>
      {error && <SnackBarError error={error} />}
      {getUserWorkouts.map((workout: Workout) => (
        <WorkoutCard workout={workout} key={workout.id} />
      ))}
      <CreateWorkoutFormLite />
    </>
  );
}
