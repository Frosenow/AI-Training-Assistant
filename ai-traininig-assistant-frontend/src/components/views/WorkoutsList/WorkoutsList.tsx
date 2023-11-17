/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  CircularProgress,
  Stack,
  Alert,
  AlertTitle,
  Typography,
  Paper,
  Link,
} from '@mui/material';

import WorkoutCard from '../../WorkoutCard/WorkoutCard';
import SnackBarError from '../../SnackBarError/SnackBarError';
import { FETCH_USER_WORKOUTS_QUERY } from '../Workouts/Queries/getUserWorkoutsQuery';
import { AuthContext } from '../../../context/auth';
import { Workout } from '../../../types/types';
import { checkIfWorkoutPlanEmpty } from '../../ExpandableWorkoutsCompare/utils/utils';

export default function WorkoutsList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  if (!getUserWorkouts.length) {
    return (
      <Paper
        sx={{
          width: '80%',
          overflow: 'hidden',
          margin: {
            xs: '6rem 1rem',
            sm: '6rem 1rem 1rem calc(1rem + 239px)',
          },
        }}
      >
        <Alert severity="info">
          <AlertTitle>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
              variant="h4"
              id="workoutPlanInfo"
              component="div"
            >
              You don&apos;t have any workout plans to analyze
            </Typography>
          </AlertTitle>
          <Typography variant="subtitle1" id="workoutPlanInfo" component="div">
            Get back to{' '}
            <Link component="button" onClick={() => navigate('/workouts')}>
              workouts tab
            </Link>{' '}
            to create workout plan!
          </Typography>
        </Alert>
      </Paper>
    );
  }

  return (
    <Stack
      sx={{
        mt: '6rem',
        width: { xs: '90%', sm: '80%' },
        margin: {
          xs: '6rem 1rem',
          sm: '6rem 1rem 1rem calc(1rem + 239px)',
        },
      }}
      spacing={2}
      alignItems="stretch"
    >
      {error && <SnackBarError error={error} />}
      {getUserWorkouts.map((workout: Workout) => {
        return (
          !checkIfWorkoutPlanEmpty(workout) && (
            <WorkoutCard workout={workout} key={workout.id} />
          )
        );
      })}
    </Stack>
  );
}
