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
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClearIcon from '@mui/icons-material/Clear';

import { DELETE_PROGRESSION_MUTATION } from './Mutations/deleteProgressionMutation';

interface DeleteProgressionButtonProps {
  workoutPlanId: string;
  exerciseId: string;
  progressionId: string;
  trainingDay: string;
  redirect?: (() => void | undefined) | undefined;
}

export const DeleteProgressionButton: React.FC<
  DeleteProgressionButtonProps
> = ({ workoutPlanId, exerciseId, progressionId, trainingDay, redirect }) => {
  const [open, setOpen] = useState(false);
  const [deleteProgression] = useMutation(DELETE_PROGRESSION_MUTATION, {
    update() {
      if (redirect) redirect();
    },
    variables: {
      workoutPlanId,
      exerciseId,
      progressionId,
      trainingDay,
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
      <Button
        aria-label="settings"
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        size="small"
      >
        <ClearIcon />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" color="primary">
          Are you sure you want to delete the progression?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting a progression is a permanent operation. A deleted exercise
            will not be able to be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CANCEL
          </Button>
          <Button onClick={() => deleteProgression()}>DELETE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
