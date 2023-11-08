/* eslint-disable no-unneeded-ternary */
import { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Collapse,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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

  const workoutsList = createWorkoutsList(getUserWorkouts, workoutData.name);

  return (
    <>
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
        <Card sx={{ width: '100%' }}>
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
                multiple
                id="combo-box-demo"
                options={workoutsList}
                getOptionLabel={(workout) => workout.name}
                sx={{ width: 300 }}
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
              <Button
                color="success"
                variant="contained"
                size="small"
                aria-label="expand row"
                onClick={() => console.log('compare')}
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
