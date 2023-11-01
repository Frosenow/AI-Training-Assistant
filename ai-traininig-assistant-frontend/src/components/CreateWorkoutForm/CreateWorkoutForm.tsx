import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Alert,
  AlertTitle,
  Box,
  Button,
  Input,
  InputAdornment,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { CREATE_WORKOUT_PLAN_MUTATION } from './Mutations/createWorkoutPlanMutation';

export function CreateWorkoutForm() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [createWorkoutPlan] = useMutation(CREATE_WORKOUT_PLAN_MUTATION, {
    variables: {
      name: value,
    },
    onCompleted(data) {
      setValue('');
      console.log(data);
      navigate(`/workouts/${data.createWorkoutPlan.id}`);
    },
  });

  return (
    <>
      <Paper
        sx={{
          width: '80%',
          overflow: 'hidden',
          margin: '6rem 1rem 1rem calc(1rem + 239px)',
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
              You don&apos;t have any workout plans
            </Typography>
          </AlertTitle>
          <Typography variant="subtitle1" id="workoutPlanInfo" component="div">
            Create your first workout plan, by clicking the button below!
          </Typography>
        </Alert>
      </Paper>
      <Paper sx={{ width: '50%', margin: '6rem 1rem 1rem calc(1rem + 239px)' }}>
        <Box
          component="form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            createWorkoutPlan();
          }}
          sx={{ padding: '4rem' }}
        >
          <Input
            fullWidth
            size="medium"
            id="workoutPlan"
            name="workoutPlan"
            placeholder="Enter a name of workout plan..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
            // TODO: Change it later
            sx={{
              color: 'secondary.contrastText',
              width: '100%',
            }}
            startAdornment={
              <InputAdornment position="start">
                <CreateIcon />
              </InputAdornment>
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            disabled={value.trim() === ''}
            sx={{ mt: 3, mb: 2 }}
          >
            CREATE
          </Button>
        </Box>
      </Paper>
    </>
  );
}
