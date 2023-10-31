/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import { Typography, Chip, Divider } from '@mui/material';
import { CommentCard } from '../CommentCard/CommentCard';
import { ExpandMore } from '../../styles/ExpandableMore/ExpandableMore';
import { Comments } from '../../types/types';
import { CommentForm } from '../CommentForm/CommentForm';

export const ExpandableComment = ({
  comments,
  expanded,
  postId,
  handleExpandClick,
}: {
  comments: Comments[];
  expanded: boolean;
  postId: string;
  handleExpandClick: (value: boolean) => void;
}) => {
  return (
    <>
      <ExpandMore
        expand={expanded}
        aria-expanded={expanded}
        aria-label="show more"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider
            sx={{
              '&::before, &::after': {
                borderColor: 'primary.dark',
              },
            }}
          >
            <Chip
              label="COMMENTS"
              color="primary"
              onClick={() => handleExpandClick(expanded)}
            />
          </Divider>
          <CommentForm postId={postId} />
          {comments.length > 0 &&
            comments.map((comment: Comments) => (
              <CardContent key={comment.id}>
                <Typography color="text.secondary" component="span">
                  <CommentCard comment={comment} postId={postId} />
                </Typography>
              </CardContent>
            ))}
        </CardContent>
      </Collapse>
    </>
  );
};
