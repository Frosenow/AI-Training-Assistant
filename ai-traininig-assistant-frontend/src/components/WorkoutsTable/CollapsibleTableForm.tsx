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
import { ADD_EXERCISE_MUTATION } from './Mutations/addExercsieMutation';

export default function CollapsibleTableForm({ exerciseDay, workoutPlanId }) {
  const [open, setOpen] = useState(false);
  const initialState = {
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

  if (error) {
    console.log(error);
  }

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
        <AddIcon />
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
                onChange={(event, exercise) => {
                  setValues({
                    ...values,
                    exerciseName: exercise?.name,
                    muscleGroup: exercise?.primaryMuscles[0] || undefined,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Exercise Name"
                    error={error ? true : false}
                  />
                )}
              />
              <TextField
                id="sets-number"
                error={error ? true : false}
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
