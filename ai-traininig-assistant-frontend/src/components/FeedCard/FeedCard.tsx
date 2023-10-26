import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Link } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

import moment from 'moment';

import { Post } from '../../types/types';

export default function FeedCard({
  events: { id, username, createdAt, commentsCount, likesCount, body },
}: {
  events: Post;
}) {
  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username[0].toUpperCase()}
          </Avatar>
        }
        title={
          <>
            <Typography variant="body2" color="text.secondary">
              {username}
            </Typography>
            <Link href={`/posts/${id}`}>{moment(createdAt).fromNow()}</Link>
          </>
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
      <CardActions disableSpacing>
        <Stack direction="row" spacing={1}>
          <Chip
            icon={<FavoriteIcon />}
            label={likesCount}
            aria-label="likes"
            color="primary"
          />
          <Chip
            icon={<CommentIcon />}
            label={commentsCount}
            aria-label="comments"
            color="primary"
          />
        </Stack>
      </CardActions>
    </Card>
  );
}
