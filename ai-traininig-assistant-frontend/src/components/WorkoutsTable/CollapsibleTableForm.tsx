/* eslint-disable react/require-default-props */
/* eslint-disable no-unneeded-ternary */
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  Typography,
  Collapse,
  Card,
  CardHeader,
  CardContent,
  Box,
  Autocomplete,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { exercisesList } from '../../assets/exercises';
import { daysList } from '../../assets/days';
import { ADD_EXERCISE_MUTATION } from './Mutations/addExerciseMutation';

type CollapsibleTableFormProps = {
  exerciseDay: string;
  workoutPlanId: string;
  isWorkoutPlanEmpty?: boolean;
};

type InitialStateType = {
  exerciseDay: string;
  exerciseName: string;
  muscleGroup: string;
  sets: number;
  reps: number[];
};

export default function CollapsibleTableForm({
  exerciseDay,
  workoutPlanId,
  isWorkoutPlanEmpty = false,
}: CollapsibleTableFormProps) {
  const [open, setOpen] = useState(false);
  const initialState: InitialStateType = {
    exerciseDay,
    exerciseName: '',
    muscleGroup: '',
    sets: 1,
    reps: [],
  };
  const [values, setValues] = useState(initialState);

  const [addExercise, { error }] = useMutation(ADD_EXERCISE_MUTATION, {
    onCompleted() {
      setOpen(!open);
      setValues(initialState);
    },
    variables: {
      workoutPlanId,
      exercise: {
        ...values,
      },
    },
  });

  const minSetsAmount = 0;
  const maxSetsAmount = 10;

  return (
    <>
      <Button
        color="success"
        variant="contained"
        size="small"
        aria-label="expand row"
        onClick={() => {
          setOpen(!open);
          setValues(initialState);
        }}
      >
        {isWorkoutPlanEmpty ? 'ADD EXERCISE' : <AddIcon />}
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Card sx={{ width: '100%' }}>
          <CardHeader
            title={
              <Typography variant="h6" gutterBottom component="div">
                Add new exercise
              </Typography>
            }
          />
          <CardContent>
            <Box
              component="form"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
              }}
              sx={{
                '& .MuiTextField-root': { m: 1, width: '35ch' },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={exercisesList}
                getOptionLabel={(exercise) => exercise.name}
                sx={{ width: 300 }}
                onChange={(_, exercise) => {
                  setValues({
                    ...values,
                    exerciseName: exercise?.name || '',
                    muscleGroup: exercise?.primaryMuscles[0] || '',
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Exercise Name"
                    error={error ? true : false}
                    onWheel={(e) => e.target.blur()}
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={daysList}
                defaultValue={daysList.find(
                  (day) => day.name.toUpperCase() === exerciseDay.toUpperCase()
                )}
                getOptionLabel={(day) => day.name}
                sx={{ width: 300 }}
                onChange={(_, day) => {
                  setValues({
                    ...values,
                    exerciseDay: day?.name || '',
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Exercise Day"
                    error={error ? true : false}
                    onWheel={(e) => e.target.blur()}
                  />
                )}
              />
              <TextField
                id="sets-number"
                error={error ? true : false}
                onWheel={(e) => e.target.blur()}
                label="Sets"
                type="number"
                placeholder="0"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                InputProps={{
                  inputProps: {
                    type: 'number',
                    min: minSetsAmount,
                    max: maxSetsAmount,
                  },
                }}
                onChange={(event) => {
                  let value = parseInt(event.target.value, 10);

                  if (value > maxSetsAmount) value = maxSetsAmount;
                  if (value < minSetsAmount) value = minSetsAmount;

                  setValues({
                    ...values,
                    sets: value,
                  });
                }}
              />
              {Number(values.sets) > 0 &&
                Array(Number(values.sets))
                  .fill(0)
                  .map((_, idx) => (
                    <TextField
                      // eslint-disable-next-line react/no-array-index-key
                      key={idx}
                      error={error ? true : false}
                      onWheel={(e) => e.target.blur()}
                      type="number"
                      label="Repetition amount"
                      placeholder="0"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{ inputProps: { min: 1 } }}
                      onChange={(event) =>
                        setValues((prevValues) => {
                          const updatedReps = [...prevValues.reps];
                          updatedReps[idx] = Number(event.target.value);
                          return {
                            ...prevValues,
                            reps: updatedReps,
                          };
                        })
                      }
                    />
                  ))}
              <Button
                color="success"
                variant="contained"
                size="small"
                aria-label="expand row"
                onClick={() => addExercise()}
              >
                <AddIcon />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
}
