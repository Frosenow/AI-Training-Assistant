/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Chip } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Post, User } from '../../../types/types';
import { LIKE_POST_MUTATION } from './Mutatations/LikePostMutation';

interface LikeButtonProps {
  user: User | null;
  post: Post;
}

// eslint-disable-next-line react/function-component-definition
export const LikeButton: React.FC<LikeButtonProps> = ({ user, post }) => {
  const { id, likesCount, likes } = post;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (
      user &&
      likes &&
      likes.find((like) => like.username === user.username)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  return (
    <Chip
      icon={<FavoriteIcon sx={{ fill: liked ? red.A400 : 'primary' }} />}
      label={likesCount}
      aria-label="likes"
      color="primary"
      onClick={() => likePost()}
    />
  );
};
