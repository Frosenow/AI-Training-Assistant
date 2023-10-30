import { useQuery } from '@apollo/client';

import { Grid, CircularProgress, Container } from '@mui/material';
import { FETCH_POSTS_QUERY } from './Queries/homeQueries';
import FeedCard from '../../FeedCard/FeedCard';
import PostField from '../../PostField/PostField';
import SnackBarError from '../../SnackBarError/SnackBarError';
import { Post } from '../../../types/types';

function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return (
      <Container
        sx={{
          mt: 'calc(4rem + 239px)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          variant="indeterminate"
          color="primary"
          size={500}
          thickness={1}
        />
      </Container>
    );
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
      {error && <SnackBarError error={error} />}
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
