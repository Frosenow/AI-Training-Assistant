import { useContext, useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CommentIcon from '@mui/icons-material/Comment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LikeButton } from '../Buttons/LikeButton/LikeButton';
import { AuthContext } from '../../context/auth';
import { DeletePostButton } from '../Buttons/DeleteButton/DeletePostButton/DeletePostButton';
import { ExpandableComment } from '../ExpandableComment/ExpandableComment';
import { StyledBadge } from '../../styles/Badge/StyledBadge';

import { Post, Comments } from '../../types/types';

export default function FeedCard({
  events: {
    id,
    username,
    createdAt,
    commentsCount,
    likesCount,
    body,
    likes,
    comments,
  },
}: {
  events: Post & { comments: Comments[] };
}) {
  const { user } = useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardHeader
        component="div"
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.dark' }} aria-label="recipe">
            {username && username[0].toUpperCase()}
          </Avatar>
        }
        title={
          <>
            <Typography variant="body2" color="text.secondary">
              {username}
            </Typography>
            <Typography variant="subtitle1">
              <Link to={`/posts/${id}`}> {moment(createdAt).fromNow()}</Link>
            </Typography>
          </>
        }
        action={
          user && user.username === username && <DeletePostButton postId={id} />
        }
        sx={{
          color: 'black',
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <ExpandableComment
        comments={comments}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        postId={id}
      />
      <CardActions disableSpacing>
        <Stack direction="row" spacing={1}>
          <LikeButton user={user} post={{ id, likesCount, likes }} />
          <Chip
            icon={
              <StyledBadge badgeContent={commentsCount} color="secondary">
                <CommentIcon />
              </StyledBadge>
            }
            onClick={handleExpandClick}
            aria-label="comments"
            color="primary"
          />
        </Stack>
      </CardActions>
    </Card>
  );
}
