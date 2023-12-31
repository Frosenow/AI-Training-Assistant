import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  CircularProgress,
  Collapse,
  CardActions,
  Card,
  Typography,
  Box,
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
  const [openCompare, setOpenCompare] = useState(true);
  const [openProgress, setOpenProgress] = useState(true);

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

  const { getWorkout } = data;

  const isWorkoutPlanEmpty = Object.keys(workoutSplit)
    .filter((day) => day !== '__typename') // Exclude the __typename property
    .map((day) => workoutSplit[day])
    .every((workoutPlanArr) => workoutPlanArr.length === 0);

  return (
    <>
      {error && <SnackBarError error={error} />}
      <Box
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
              expand={openCompare}
              onClick={() => setOpenCompare(!openCompare)}
              aria-expanded={openCompare}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={openCompare} timeout="auto" unmountOnExit>
            {!isWorkoutPlanEmpty && (
              <WorkoutsCompare workoutData={getWorkout} />
            )}
          </Collapse>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardActions disableSpacing>
            <Typography variant="h5" fontWeight="bold">
              Volume Progression of Exercise - Line Chart
            </Typography>
            <ExpandMore
              expand={openProgress}
              onClick={() => setOpenProgress(!openProgress)}
              aria-expanded={openProgress}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={openProgress} timeout="auto" unmountOnExit>
            {!isWorkoutPlanEmpty && (
              <ExerciseProgressLines workoutData={getWorkout} />
            )}
          </Collapse>
        </Card>
      </Box>
    </>
  );
}
