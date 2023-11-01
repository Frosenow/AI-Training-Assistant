import { useQuery } from '@apollo/client';
import WorkoutsTable from '../../WorkoutsTable/WorkoutsTable';

import { FETCH_WORKOUTS_QUERY } from './Queries/getWorkoutsQuery';

export default function Workouts() {
  const { loading, error, data } = useQuery(FETCH_WORKOUTS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    console.log(data);
  }
  return <WorkoutsTable />;
}
