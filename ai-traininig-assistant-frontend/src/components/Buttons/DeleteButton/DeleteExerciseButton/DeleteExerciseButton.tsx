/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import ClearIcon from '@mui/icons-material/Clear';

import { DELETE_EXERCISE_MUTATION } from './Mutations/deleteExerciseFromWorkoutPlanMutation';

interface DeleteExerciseButtonProps {
  workoutPlanId: string;
  exerciseId: string;
  exerciseDay: string;
  redirect?: (() => void | undefined) | undefined;
}

export const DeleteExerciseButton: React.FC<DeleteExerciseButtonProps> = ({
  workoutPlanId,
  exerciseId,
  exerciseDay,
  redirect,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteExerciseFromWorkoutPlan] = useMutation(
    DELETE_EXERCISE_MUTATION,
    {
      update() {
        if (redirect) redirect();
      },
      variables: {
        workoutPlanId,
        exerciseId,
        exerciseDay,
      },
    }
  );

  const fullScreen = useMediaQuery('md');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClickOpen} size="small">
        <ClearIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" color="primary">
          Are you sure you want to delete the exercise from workout plan?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting a exercise is a permanent operation. A deleted exercise
            will not be able to be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CANCEL
          </Button>
          <Button onClick={() => deleteExerciseFromWorkoutPlan()}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
