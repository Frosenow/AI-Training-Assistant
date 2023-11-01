import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import moment from 'moment';

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

  return (
    <CustomWidthTooltip
      title={
        <Typography>Click icon on the right to get more details</Typography>
      }
      placement="bottom"
      arrow
      leaveDelay={200}
    >
      <Card
        sx={{
          width: '80%',
          overflow: 'hidden',
          margin: {
            xs: '6rem 1rem',
            sm: '6rem 1rem 1rem calc(1rem + 239px)',
          },
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
            <IconButton
              aria-label="settings"
              color="primary"
              edge="end"
              size="large"
              sx={{
                margin: '1rem',
              }}
              onClick={() => navigate(`/workouts/${workout.id}`)}
            >
              <ReadMoreIcon />
            </IconButton>
          }
        />
      </Card>
    </CustomWidthTooltip>
  );
}
