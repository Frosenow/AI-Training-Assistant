/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { DeleteCommentButton } from '../Buttons/DeleteButton/DeleteCommentButton/DeleteCommentButton';
import { AuthContext } from '../../context/auth';
import { CommentCardProps } from '../../types/types';

// eslint-disable-next-line react/function-component-definition
export const CommentCard = ({ comment, postId }: CommentCardProps) => {
  const { user } = useContext(AuthContext);
  const { username, createdAt, body, id } = comment;
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.light' }} aria-label="recipe">
            {username && username[0].toUpperCase()}
          </Avatar>
        }
        action={
          user &&
          user.username === username && (
            <DeleteCommentButton postId={postId} commentId={id} />
          )
        }
        title={
          <Typography variant="subtitle1" color="text.secondary">
            {username}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="text.secondary">
            {moment(createdAt).fromNow()}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};
