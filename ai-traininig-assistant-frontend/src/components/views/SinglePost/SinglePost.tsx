import { useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';
import { FETCH_POST_QUERY } from './Queries/getPostQuery';

export default function SinglePost() {
  const { postId } = useParams();

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  console.log(data);
  return <>test</>;
}
