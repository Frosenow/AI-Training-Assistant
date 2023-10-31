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

import { DELETE_COMMENT_MUTATION } from './Mutations/DeleteCommentMutation';

interface DeleteCommentButtonProps {
  postId: string;
  commentId: string;
  redirect?: (() => void | undefined) | undefined;
}

export const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({
  postId,
  commentId,
  redirect,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update() {
      if (redirect) redirect();
    },
    variables: {
      postId,
      commentId,
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
        <ClearIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" color="primary">
          Are you sure you want to delete the comment?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting a comment is a permanent operation. A deleted comment will
            not be able to be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CANCEL
          </Button>
          <Button onClick={() => deleteComment()}>DELETE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
