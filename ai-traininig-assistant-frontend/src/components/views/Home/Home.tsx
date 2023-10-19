import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from './Queries/homeQueries';

function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const { getPosts: posts } = data;

  if (posts) {
    console.log(posts);
  }

  return <h1>Home Page</h1>;
}

export default Home;
