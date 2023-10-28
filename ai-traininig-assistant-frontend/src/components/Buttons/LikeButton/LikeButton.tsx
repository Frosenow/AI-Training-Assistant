/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import gql from 'graphql-tag';

import Icon from '@mui/material/Icon';
import FavoriteIcon from '@mui/icons-material/Favorite';

// eslint-disable-next-line react/function-component-definition
export const LikeButton = ({ post: { id, likesCount, likes }, user }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  return (
    <Chip
      icon={<FavoriteIcon color="error" />}
      label={likesCount}
      aria-label="likes"
      color="primary"
    />
  );
};
