import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import { Grid, Divider } from '@mui/material';

import moment from 'moment';
import { FETCH_POST_QUERY } from './Queries/getPostQuery';
import { LikeButton } from '../../Buttons/LikeButton/LikeButton';
import { DeleteButton } from '../../Buttons/DeleteButton/DeleteButton';
import { CommentCard } from '../../CommentCard/CommentCard';

import { AuthContext } from '../../../context/auth';

export default function SinglePost() {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  // TODO: Handle Loading State
  if (loading) {
    return <div>Loading...</div>;
  }

  // TODO: Handle Errors
  if (error) {
    return <div>{error.message}</div>;
  }

  // Get Post data if no errors
  const {
    getPost: {
      id,
      username,
      createdAt,
      comments,
      commentsCount,
      likesCount,
      body,
      likes,
    },
  } = data;

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      flexWrap="nowrap"
      sx={{
        mt: '4rem',
        maxWidth: { sm: '60%', xs: '90%' },
      }}
    >
      <Grid item xs={comments.length > 0 ? 8 : 12}>
        <Card>
          <CardContent>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'secondary.light' }} aria-label="recipe">
                  {username && username[0].toUpperCase()}
                </Avatar>
              }
              title={
                <>
                  <Typography variant="h5" color="text.secondary">
                    {username}
                  </Typography>
                  <Typography variant="body2">
                    {moment(createdAt).fromNow()}
                  </Typography>
                </>
              }
              action={
                user &&
                user.username === username && (
                  <DeleteButton postId={id} redirect={() => navigate('/')} />
                )
              }
              sx={{
                color: 'black',
              }}
            />
            <CardContent>
              <Typography
                variant="body1"
                fontSize="1.5rem"
                color="text.secondary"
              >
                {body}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Stack direction="row" spacing={1}>
                <LikeButton user={user} post={{ id, likesCount, likes }} />
                <Chip
                  icon={<CommentIcon />}
                  label={commentsCount}
                  aria-label="comments"
                  color="primary"
                />
              </Stack>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
      {comments.length > 0 && (
        <Grid item xs={4}>
          <Card>
            <CardHeader
              title={
                <Divider
                  sx={{
                    '&::before, &::after': {
                      borderColor: 'primary.dark',
                    },
                  }}
                >
                  <Chip label="COMMENTS" color="primary" />
                </Divider>
              }
            />
            {comments.map((comment) => (
              <CardContent key={comment.id}>
                <Typography color="text.secondary">
                  <CommentCard comment={comment} />
                </Typography>
              </CardContent>
            ))}
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
