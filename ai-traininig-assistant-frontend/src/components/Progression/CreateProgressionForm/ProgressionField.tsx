/* eslint-disable no-unneeded-ternary */
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  TableCell,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TableRow,
  TableBody,
  Table,
  Badge,
  styled,
  BadgeProps,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import ScaleIcon from '@mui/icons-material/Scale';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import dayjs from 'dayjs';

import { ADD_PROGRESSION_MUTATION } from '../../Buttons/AddButton/AddProgressionButton/Mutations/addProgressionMutation';
import { CustomWidthTooltip } from '../../WorkoutCard/WorkoutCard';

type ProgressionFieldProps = {
  workoutPlanId: string;
  exerciseId: string;
  trainingDay: string;
};

export const ProgressionField = ({
  workoutPlanId,
  exerciseId,
  trainingDay,
}: ProgressionFieldProps) => {
  const initialState = {
    trainingDate: moment(Date.now()).format('DD/MM/YYYY'),
    sets: 1,
    reps: [],
    weight: 0,
    trainingDay,
  };
  const [values, setValues] = useState(initialState);
  const minSetsAmount = 1;
  const maxSetsAmount = 10;

  const [addProgression, { error }] = useMutation(ADD_PROGRESSION_MUTATION, {
    variables: {
      workoutPlanId,
      exerciseId,
      progression: {
        ...values,
      },
    },
  });

  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
      right: 10,
      top: -10,
    },
  }));

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        title={
          <Typography variant="h6" gutterBottom component="div">
            Add progression
          </Typography>
        }
      />
      <CardContent sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell color="secondary" sx={{ minWidth: 100 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    format="DD/MM/YYYY"
                    onChange={(newValue) => {
                      const formattedDate =
                        dayjs(newValue).format('DD/MM/YYYY');
                      setValues({
                        ...values,
                        trainingDate: formattedDate,
                      });
                    }}
                  />
                </LocalizationProvider>
              </TableCell>
              <TableCell sx={{ minWidth: 100 }}>
                <TextField
                  id="sets-number"
                  variant="standard"
                  onWheel={(e) => e.target.blur()}
                  label="Sets"
                  type="number"
                  error={error ? true : false}
                  placeholder="1"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                      reps:
                        value < values.sets
                          ? values.reps.slice(value)
                          : values.reps,
                    });
                  }}
                  sx={{ maxWidth: 50, mr: 1 }}
                />
              </TableCell>
              <TableCell sx={{ minWidth: 100 }}>
                {Number(values.sets) > 0 &&
                  Array(Number(values.sets))
                    .fill(0)
                    .map((_, idx) => (
                      <TextField
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        variant="standard"
                        // error={error ? true : false}
                        onWheel={(e) => e.target.blur()}
                        type="number"
                        error={error ? true : false}
                        label="Reps/Set"
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
                        sx={{
                          maxWidth: 50,
                          mr: 1,
                          mt: { sm: values.sets > 1 ? 1 : 0, lg: 0 },
                        }}
                      />
                    ))}
              </TableCell>
              <TableCell sx={{ minWidth: 100 }}>
                <TextField
                  id="progression-date"
                  onWheel={(e) => e.target.blur()}
                  label="Weight"
                  type="number"
                  error={error ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={(event) => {
                    setValues({
                      ...values,
                      weight: Number(event.target.value),
                    });
                  }}
                  sx={{ maxWidth: 50, mr: 1 }}
                />
              </TableCell>
              <TableCell sx={{ minWidth: 100 }}>
                <CustomWidthTooltip title="Volume" arrow>
                  <StyledBadge
                    badgeContent={
                      values.reps.reduce((acc, prev) => acc + prev, 0) *
                      values.weight
                    }
                    color="secondary"
                    max={9999999}
                    sx={{ mt: 2 }}
                  >
                    <ScaleIcon />
                  </StyledBadge>
                </CustomWidthTooltip>
              </TableCell>
              <TableCell>
                <Button
                  aria-label="settings"
                  onClick={() => addProgression()}
                  variant="contained"
                  color="success"
                  size="small"
                >
                  <AddIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
