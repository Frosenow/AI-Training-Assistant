/* eslint-disable no-unneeded-ternary */
import { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Container,
  TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import MuscleGroupsChart from '../DataRepresentation/MuscleGroupsChart';
import { AuthContext } from '../../context/auth';
import { FETCH_USER_WORKOUTS_QUERY } from '../views/Workouts/Queries/getUserWorkoutsQuery';
import { createWorkoutsList } from './utils/utils';

export default function WorkoutsCompare({ workoutData }) {
  const [open, setOpen] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const { user } = useContext(AuthContext);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const { loading, error, data } = useQuery(FETCH_USER_WORKOUTS_QUERY, {
    variables: {
      owner: user ? user.username : undefined,
    },
  });

  if (loading) {
    return (
      <Container
        sx={{
          mt: 'calc(4rem + 239px)',
          display: 'flex',
          justifyContent: 'center',
          opacity: '50',
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

  const { getUserWorkouts } = data;

  // Filter out workouts that don't have any exercises
  const workoutsList = createWorkoutsList(getUserWorkouts, workoutData.name);

  return (
    <>
      <MuscleGroupsChart
        workoutData={workoutData}
        workoutSplit={workoutData.workoutSplit}
        workoutsToCompare={workouts}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 1,
        }}
      >
        <Button
          color="success"
          variant="contained"
          size="small"
          aria-label="expand row"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Compare Workouts
        </Button>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Autocomplete
            multiple
            disableCloseOnSelect
            id="combo-box-demo"
            options={workoutsList}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(workout) => workout.name}
            sx={{ width: 300, margin: 1 }}
            onChange={(_, workout) => {
              setWorkouts(workout);
            }}
            renderOption={(props, workout, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {workout.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Workout Plan name"
                error={error ? true : false}
                onWheel={(e) => e.target.blur()}
              />
            )}
          />
        </Collapse>
      </Box>
    </>
  );
}
