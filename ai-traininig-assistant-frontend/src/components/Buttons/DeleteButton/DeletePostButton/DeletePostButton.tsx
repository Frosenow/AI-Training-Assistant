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

import { DELETE_POST_MUTATION } from './Mutations/deletePostMutation';
import { FETCH_POSTS_QUERY } from '../../../views/Home/Queries/homeQueries';
import { AllPostsResult } from '../../../../types/types';

interface DeleteButtonProps {
  postId: string;
  redirect?: (() => void | undefined) | undefined;
}

export const DeletePostButton: React.FC<DeleteButtonProps> = ({
  postId,
  redirect,
}) => {
  const [open, setOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(cache) {
      const { getPosts } = cache.readQuery<AllPostsResult>({
        query: FETCH_POSTS_QUERY,
      }) || { getPosts: [] };

      // Get all posts, except the one that was deleted
      const filteredPosts = getPosts.filter((post) => post.id !== postId);

      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [...filteredPosts],
        },
      });
      setOpen(false);
      if (redirect) redirect();
    },
    variables: {
      postId,
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
          Are you sure you want to delete the post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting a post is a permanent operation. A deleted post will not be
            able to be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CANCEL
          </Button>
          <Button onClick={() => deletePost()}>DELETE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
