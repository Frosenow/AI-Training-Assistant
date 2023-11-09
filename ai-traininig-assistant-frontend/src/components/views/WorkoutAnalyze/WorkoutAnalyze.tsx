import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  CircularProgress,
  Paper,
  Collapse,
  CardActions,
  Card,
  Typography,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { AuthContext } from '../../../context/auth';
import { FETCH_SINGLE_WORKOUT_QUERY } from '../SingleWorkout/Queries/getSingleWorkout';
import SnackBarError from '../../SnackBarError/SnackBarError';
import WorkoutsCompare from '../../ExpandableWorkoutsCompare/WorkoutsCompare';
import ExerciseProgressLines from '../../DataRepresentation/ExerciseProgressLines';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function WorkoutAnalyze() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { workoutPlanId } = useParams();
  const [open, setOpen] = useState(true);

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

  const { getWorkout } = data;

  const isWorkoutPlanEmpty = Object.keys(workoutSplit)
    .filter((day) => day !== '__typename') // Exclude the __typename property
    .map((day) => workoutSplit[day])
    .every((workoutPlanArr) => workoutPlanArr.length === 0);

  return (
    <>
      {error && <SnackBarError error={error} />}
      <Paper
        sx={{
          width: '90%',
          margin: {
            xs: '6rem 1rem',
            sm: '6rem 1rem 1rem calc(1rem + 239px)',
          },
        }}
      >
        <Card>
          <CardActions disableSpacing>
            <Typography variant="h5" fontWeight="bold">
              Muscles Trained - Radar Chart
            </Typography>
            <ExpandMore
              expand={open}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {!isWorkoutPlanEmpty && (
              <WorkoutsCompare workoutData={getWorkout} />
            )}
          </Collapse>
        </Card>
        <Card sx={{ mt: 1 }}>
          {!isWorkoutPlanEmpty && (
            <ExerciseProgressLines workoutData={getWorkout} />
          )}
        </Card>
      </Paper>
    </>
  );
}
