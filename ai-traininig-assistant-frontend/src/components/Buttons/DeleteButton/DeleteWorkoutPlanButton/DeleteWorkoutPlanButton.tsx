/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';

import { AuthContext } from '../../../../context/auth';
import { DELETE_WORKOUT_PLAN_MUTATION } from './Mutations/deleteWorkoutPlanMutation';
import { FETCH_USER_WORKOUTS_QUERY } from '../../../views/Workouts/Queries/getUserWorkoutsQuery';
import { WorkoutsResult } from '../../../../types/types';

interface DeleteWorkoutPlanButtonProps {
  workoutPlanId: string;
  redirect?: (() => void | undefined) | undefined;
}

export const DeleteWorkoutPlanButton: React.FC<
  DeleteWorkoutPlanButtonProps
> = ({ workoutPlanId, redirect }) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [deleteWorkoutPlan] = useMutation(DELETE_WORKOUT_PLAN_MUTATION, {
    update(cache) {
      const result = cache.readQuery<WorkoutsResult>({
        query: FETCH_USER_WORKOUTS_QUERY,
        variables: {
          owner: user ? user.username : undefined,
        },
      });

      const getUserWorkouts = result?.getUserWorkouts || [];
      const filteredUserWorkouts = getUserWorkouts.filter(
        (workout) => workout.id !== workoutPlanId
      );

      cache.writeQuery({
        query: FETCH_USER_WORKOUTS_QUERY,
        variables: {
          owner: user?.username,
        },
        data: {
          getUserWorkouts: [...filteredUserWorkouts],
        },
      });

      if (redirect) redirect();
    },
    variables: {
      workoutPlanId,
    },
  });

  const fullScreen = useMediaQuery('md');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" color="primary">
          Are you sure you want to delete the workout plan?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting a workout plan is a permanent operation. A deleted workout
            plan will not be able to be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CANCEL
          </Button>
          <Button onClick={() => deleteWorkoutPlan()}>DELETE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
