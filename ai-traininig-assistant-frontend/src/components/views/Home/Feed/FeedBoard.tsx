import { Feed, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Post } from '../types';

function FeedBoard({
  events: { id, username, createdAt, commentsCount, likesCount, body },
}: {
  events: Post;
}) {
  const likePost = () => {
    console.log('Like post');
  };

  const commentPost = () => {
    console.log('Comment post');
  };

  return (
    <Feed size="large">
      <Feed.Event key={id} style={{ paddingTop: '2rem' }}>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{username}</Feed.User>
            <Feed.Date as={Link} to={`/posts/${id}`}>
              {moment(createdAt).fromNow()}
            </Feed.Date>
            <p>{body}</p>
          </Feed.Summary>
          <Feed.Meta>
            <div className="ui two buttons tiny">
              <Button
                basic
                color="red"
                icon="like"
                content={likesCount}
                onClick={likePost}
              />
              <Button
                basic
                color="green"
                icon="comments"
                content={commentsCount}
                onClick={commentPost}
              />
            </div>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
}

export default FeedBoard;
