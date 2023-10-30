import { useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';
import { FETCH_POST_QUERY } from './Queries/getPostQuery';

export default function SinglePost() {
  const { postId } = useParams();

  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  // TODO: Handle Loading State
  if (loading) {
    return <div>Loading...</div>;
  }

  // TODO: Handle Errors
  if (error) {
    return <div>{error.message}</div>;
  }

  // // Get Posts data if no errors
  // const { getPost } = data;

  // console.log(getPost);
  return <h1 style={{ margin: '10rem' }}>Test</h1>;
}
