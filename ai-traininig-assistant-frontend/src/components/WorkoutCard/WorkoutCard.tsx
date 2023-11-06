import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import moment from 'moment';

import { DeleteWorkoutPlanButton } from '../Buttons/DeleteButton/DeleteWorkoutPlanButton/DeleteWorkoutPlanButton';
import { Workout } from '../../types/types';

export const CustomWidthTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#000',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    textAlign: 'center',
    backgroundColor: '#000',
  },
});

type WorkoutProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <CustomWidthTooltip
      title={
        <Typography>
          Using icons on the right you can see more details or delete workout
          plan
        </Typography>
      }
      placement="bottom"
      arrow
      leaveDelay={100}
    >
      <Card
        sx={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <CardHeader
          avatar={<FitnessCenterIcon />}
          title={<Typography variant="h5">{workout.name}</Typography>}
          subheader={
            <Typography>
              Created at:{' '}
              {moment(workout.createdAt).format('dddd, MMMM Do YYYY')}
            </Typography>
          }
          action={
            <Stack spacing={2}>
              <IconButton
                aria-label="settings"
                color="primary"
                edge="end"
                size="large"
                onClick={() => navigate(`${pathname}/${workout.id}`)}
              >
                <ReadMoreIcon />
              </IconButton>
              <DeleteWorkoutPlanButton workoutPlanId={workout.id} />
            </Stack>
          }
        />
      </Card>
    </CustomWidthTooltip>
  );
}
