import { useQuery } from '@apollo/client';

import { FETCH_POST_QUERY } from './Queries/getPostQuery';

export default function SinglePost(props) {
  const { postId } = props.match.params;
  console.log(postId);

  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  console.log(getPost);

  return <>test</>;
}
