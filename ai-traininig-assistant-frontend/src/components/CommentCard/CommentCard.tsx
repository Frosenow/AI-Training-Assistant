/* eslint-disable import/prefer-default-export */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import moment from 'moment';

// eslint-disable-next-line react/function-component-definition
export const CommentCard = ({ comment: { username, createdAt, body } }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.light' }} aria-label="recipe">
            {username && username[0].toUpperCase()}
          </Avatar>
        }
        // action={
        //   user &&
        //   user.username === username && (
        //     <DeleteButton postId={id} redirect={() => navigate('/')} />
        //   )
        // }
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
