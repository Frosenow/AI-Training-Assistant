import { useQuery } from '@apollo/client';

import { Grid } from '@mui/material';
import { FETCH_POSTS_QUERY } from './Queries/homeQueries';
import FeedCard from '../../FeedCard/FeedCard';
import PostField from '../../PostField/PostField';
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
    <Grid
      container
      justifyContent="flex-start"
      direction="column"
      flexWrap="nowrap"
      alignItems="stretch"
      sx={{
        mt: '4rem',
        maxWidth: { sm: '60%', xs: '90%' },
      }}
    >
      <Grid item>
        <PostField />
      </Grid>
      <Grid container spacing={3}>
        {posts &&
          posts.map((post: Post) => (
            <Grid
              item
              key={post.id}
              sx={{ margin: '0 auto', minWidth: { xs: 250, sm: 300 } }}
            >
              <FeedCard events={post} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default Home;
