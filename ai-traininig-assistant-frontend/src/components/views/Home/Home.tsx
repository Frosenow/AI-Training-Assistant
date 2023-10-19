import { useQuery } from '@apollo/client';
import { Grid, Loader, Container } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from './Queries/homeQueries';
import FeedBoard from './Feed/FeedBoard';
import { Post } from './types';

function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  // TODO: Handle Loading State
  if (loading) {
    return <div>Loading...</div>;
  }

  // TODO: Handle Errors
  if (error) {
    return <div>{error.message}</div>;
  }

  // Get Posts data if no errors
  const { getPosts: posts } = data;

  return (
    <Container>
      <Grid columns={1}>
        <Grid.Row>
          <h1>Your Feed</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <Loader size="massive">Loading</Loader>
          ) : (
            posts &&
            posts.map((post: Post) => (
              <Grid.Column key={post.id}>
                <FeedBoard events={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Home;
