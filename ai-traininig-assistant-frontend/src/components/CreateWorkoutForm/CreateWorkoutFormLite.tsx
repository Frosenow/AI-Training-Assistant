import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Tooltip,
  CardContent,
  Typography,
  Box,
  IconButton,
  Input,
  InputAdornment,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { CREATE_WORKOUT_PLAN_MUTATION } from './Mutations/createWorkoutPlanMutation';
import { FETCH_USER_WORKOUTS_QUERY } from '../views/Workouts/Queries/getUserWorkoutsQuery';
import { AuthContext } from '../../context/auth';
import { WorkoutsResult } from '../../types/types';
import { CustomWidthTooltip } from '../WorkoutCard/WorkoutCard';

export function CreateWorkoutFormLite() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [createWorkoutPlan] = useMutation(CREATE_WORKOUT_PLAN_MUTATION, {
    update(cache, { data }) {
      const result = cache.readQuery<WorkoutsResult>({
        query: FETCH_USER_WORKOUTS_QUERY,
        variables: {
          owner: user?.username,
        },
      });

      const getUserWorkouts = result?.getUserWorkouts || [];

      cache.writeQuery({
        query: FETCH_USER_WORKOUTS_QUERY,
        variables: {
          owner: user?.username,
        },
        data: {
          getUserWorkouts: [data.createWorkoutPlan, ...getUserWorkouts],
        },
      });
    },
    variables: {
      name: value,
    },
    onCompleted() {
      setValue('');
    },
  });

  return (
    <Card sx={{ width: { xs: '100%', lg: '30%' } }}>
      <CardContent>
        <Box
          component="form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            createWorkoutPlan();
          }}
        >
          <CustomWidthTooltip title="Create new workout plan" arrow>
            <Box component="span">
              <IconButton
                type="submit"
                color="success"
                disabled={value.trim() === ''}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </CustomWidthTooltip>
          <Input
            size="medium"
            id="workoutPlan"
            name="workoutPlan"
            placeholder="Enter a name of workout plan..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
            sx={{
              color: 'secondary.contrastText',
              width: { xs: '80%', md: '80%' },
            }}
            startAdornment={
              <InputAdornment position="start">
                <CreateIcon />
              </InputAdornment>
            }
          />
        </Box>
      </CardContent>
    </Card>
  );
}
