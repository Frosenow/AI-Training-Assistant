import { useQuery } from '@apollo/client';

import { Grid, Skeleton, Container } from '@mui/material';
import { FETCH_POSTS_QUERY } from './Queries/homeQueries';
import FeedCard from '../../FeedCard/FeedCard';
import { Post } from '../../../types/types';

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
    <Grid sx={{ marginTop: '4rem' }}>
      {loading ? (
        <Skeleton variant="rectangular" width={210} height={60} />
      ) : (
        posts &&
        posts.map((post: Post) => (
          <Grid item key={post.id} xs={12}>
            <FeedCard events={post} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default Home;
