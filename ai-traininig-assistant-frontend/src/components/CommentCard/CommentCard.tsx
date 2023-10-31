/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { DeleteCommentButton } from '../Buttons/DeleteButton/DeleteCommentButton/DeleteCommentButton';
import { AuthContext } from '../../context/auth';

import moment from 'moment';

// eslint-disable-next-line react/function-component-definition
export const CommentCard = ({
  comment: { username, createdAt, body, id },
  postId,
}) => {
  const { user } = useContext(AuthContext);

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
