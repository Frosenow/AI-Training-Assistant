import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  CircularProgress,
  Paper,
  Alert,
  AlertTitle,
  Typography,
  Box,
} from '@mui/material';

import { AuthContext } from '../../../context/auth';
import { FETCH_SINGLE_WORKOUT_QUERY } from './Queries/getSingleWorkout';
import WorkoutsTable from '../../WorkoutsTable/WorkoutsTable';
import SnackBarError from '../../SnackBarError/SnackBarError';
import CollapsibleTableForm from '../../WorkoutsTable/CollapsibleTableForm';

export default function SingleWorkout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { workoutPlanId } = useParams();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  if (isWorkoutPlanEmpty) {
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
        <Alert severity="info" sx={{ margin: 2 }}>
          <AlertTitle>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
              variant="h4"
              id="workoutPlanInfo"
              component="div"
            >
              You don&apos;t have any exercises in workout plan
            </Typography>
          </AlertTitle>
          <Typography variant="subtitle1" id="workoutPlanInfo" component="div">
            Add first exercise, to start creating your workout routine
          </Typography>
        </Alert>
        <Box sx={{ margin: 2 }}>
          <CollapsibleTableForm
            workoutPlanId={workoutPlanId}
            isWorkoutPlanEmpty={isWorkoutPlanEmpty}
            exerciseDay=""
          />
        </Box>
      </Paper>
    );
  }

  return (
    <>
      {error && <SnackBarError error={error} />}
      {Object.keys(workoutSplit)
        .filter(
          (trainingDay) =>
            Array.isArray(workoutSplit[trainingDay]) &&
            workoutSplit[trainingDay].length > 0
        )
        .map((trainingDay) => (
          <WorkoutsTable
            key={trainingDay}
            trainingDay={trainingDay}
            workoutSplit={workoutSplit[trainingDay]}
            workoutPlanId={workoutPlanId || ''}
          />
        ))}
    </>
  );
}
