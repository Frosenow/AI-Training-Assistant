import { ListSubheader } from '@mui/material';

import NestedListItems from './NestedListItems';

export default function NestedList({ workoutData, muscleGroupTrained }) {
  return (
    <>
      <ListSubheader>Exercises in {workoutData.name}</ListSubheader>
      {Object.keys(muscleGroupTrained).map((muscleGroup) => (
        <NestedListItems
          key={muscleGroupTrained[muscleGroup].id}
          exercises={muscleGroupTrained[muscleGroup]}
          muscleGroup={muscleGroup}
        />
      ))}
    </>
  );
}
