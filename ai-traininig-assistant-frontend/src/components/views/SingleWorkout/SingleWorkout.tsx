import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';

import { AuthContext } from '../../../context/auth';
import { FETCH_SINGLE_WORKOUT_QUERY } from './Queries/getSingleWorkout';
import WorkoutsTable from '../../WorkoutsTable/WorkoutsTable';
import SnackBarError from '../../SnackBarError/SnackBarError';

export default function SingleWorkout() {
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
