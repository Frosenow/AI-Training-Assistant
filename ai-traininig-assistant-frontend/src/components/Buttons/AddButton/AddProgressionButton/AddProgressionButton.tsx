/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
/**
 * @deprecated MOVED PROGRESSION BUTTON INTO PROGRESSION_FIELD COMPONENT
 */
import { useMutation } from '@apollo/client';

import { Button } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { ADD_PROGRESSION_MUTATION } from './Mutations/addProgressionMutation';

interface AddProgressionButtonProps {
  workoutPlanId: string;
  exerciseId: string;
  progression: unknown;
  redirect?: (() => void | undefined) | undefined;
}

export const AddProgressionButton: React.FC<AddProgressionButtonProps> = ({
  workoutPlanId,
  exerciseId,
  progressionInput,
}) => {
  const [addProgression, { error }] = useMutation(ADD_PROGRESSION_MUTATION, {
    variables: {
      workoutPlanId,
      exerciseId,
      progression: {
        ...progressionInput,
      },
    },
  });

  return (
    <Button
      aria-label="settings"
      onClick={() => addProgression()}
      variant="contained"
      color="success"
      size="small"
    >
      <AddIcon />
    </Button>
  );
};
