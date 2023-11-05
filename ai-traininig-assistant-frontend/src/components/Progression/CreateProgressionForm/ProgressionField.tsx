import { useState } from 'react';
import {
  TableCell,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import moment from 'moment';

export const ProgressionField = () => {
  const initialState = {
    date: moment(Date.now()).format('YYYY-MM-DD'),
    sets: 1,
    reps: [],
    weight: 0,
  };
  const [values, setValues] = useState(initialState);
  const minSetsAmount = 1;
  const maxSetsAmount = 10;
  console.log(values);
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        title={
          <Typography variant="h6" gutterBottom component="div">
            Add progression
          </Typography>
        }
      />
      <CardContent>
        <TableCell color="secondary" sx={{ minWidth: 30 }}>
          <TextField
            id="progression-date"
            onWheel={(e) => e.target.blur()}
            label="Date"
            type="date"
            defaultValue={moment(Date.now()).format('YYYY-MM-DD')}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={(event) =>
              setValues({
                ...values,
                date: moment(event.target.value).format('DD/MM/YYYY'),
              })
            }
          />
        </TableCell>
        <TableCell sx={{ minWidth: 100 }}>
          <TextField
            id="sets-number"
            //   error={error ? true : false}
            variant="standard"
            onWheel={(e) => e.target.blur()}
            label="Sets"
            type="number"
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
                  value < values.sets ? values.reps.slice(value) : values.reps,
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
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={(event) => {
              setValues({ ...values, weight: Number(event.target.value) });
            }}
            sx={{ maxWidth: 50, mr: 1 }}
          />
        </TableCell>
        <TableCell sx={{ minWidth: 100 }}>
          <TextField
            id="progression-date"
            disabled
            onWheel={(e) => e.target.blur()}
            label="Volume"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            value={
              values.reps.reduce((prev, sum) => prev + sum, 0) * values.weight
            }
            sx={{ maxWidth: 50, mr: 1 }}
          />
        </TableCell>
      </CardContent>
    </Card>
  );
};
