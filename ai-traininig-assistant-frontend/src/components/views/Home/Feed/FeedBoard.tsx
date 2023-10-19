import { Feed, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Post } from '../types';

function FeedBoard({
  events: { id, username, createdAt, commentsCount, likesCount, body },
}: {
  events: Post;
}) {
  return (
    <Feed size="large">
      <Feed.Event key={id}>
        <Feed.Label icon="pencil" />
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{username}</Feed.User>
            <Feed.Date>{moment(createdAt).fromNow()}</Feed.Date>
            <p>{body}</p>
          </Feed.Summary>
          <Feed.Meta>
            <div className="ui two buttons tiny">
              <Button basic color="red">
                <Icon name="like" />
                {likesCount}
              </Button>
              <Button basic color="green">
                <Icon name="comments" />
                {commentsCount}
              </Button>
            </div>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
}

export default FeedBoard;
