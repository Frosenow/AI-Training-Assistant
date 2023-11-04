import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { DeleteExerciseButton } from '../Buttons/DeleteButton/DeleteExerciseButton/DeleteExerciseButton';
import { WorkoutsTableProps } from '../../types/types';
import CollapsibleTableForm from './CollapsibleTableForm';

interface Column {
  id: 'day' | 'exerciseName' | 'reps' | 'sets' | 'volume' | 'date';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'exerciseName', label: 'Exercise', minWidth: 100 },
  {
    id: 'sets',
    label: 'Sets',
    minWidth: 70,
  },
  {
    id: 'reps',
    label: 'Reps',
    minWidth: 70,
  },
];

const columnsHistory: readonly Column[] = [
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'sets',
    label: 'Sets',
    minWidth: 70,
  },
  {
    id: 'reps',
    label: 'Reps',
    minWidth: 70,
  },
  {
    id: 'volume',
    label: 'Volume',
    minWidth: 70,
  },
];

interface Data {
  exerciseName: string;
  reps: number[];
  sets: number;
  id: string;
  volume: number;
}

// Function to modify the data representation
function createData(
  exerciseName: string,
  reps: number[],
  sets: number,
  id: string
): Data {
  // eslint-disable-next-line no-param-reassign
  const formattedReps = `[${reps.join(', ')}]`;
  return { exerciseName, reps: formattedReps, sets, id };
}

function Row({ row, workoutPlanId, trainingDay, exerciseName, workoutSplit }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.id === 'exerciseName' && (
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              )}
              {column.format && typeof value === 'number'
                ? column.format(value)
                : value}
            </TableCell>
          );
        })}
        <TableCell>
          <DeleteExerciseButton
            workoutPlanId={workoutPlanId}
            exerciseId={row.id}
            exerciseDay={trainingDay}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {exerciseName} Progression History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {columnsHistory.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function WorkoutsTable({
  workoutSplit,
  trainingDay,
  workoutPlanId,
}: WorkoutsTableProps) {
  const rows: Data[] = [];

  workoutSplit.forEach((exercise: Data) => {
    rows.push(
      createData(
        exercise.exerciseName,
        exercise.reps,
        exercise.sets,
        exercise.id
      )
    );
  });

  return (
    <Paper
      sx={{
        width: '80%',
        overflow: 'hidden',
        margin: {
          xs: '6rem 1rem',
          sm: '6rem 1rem 1rem calc(1rem + 239px)',
        },
      }}
    >
      <Typography
        sx={{
          flex: '1 1 100%',
          pt: 1,
          pb: 1,
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          textTransform: 'uppercase',
          paddingLeft: 2,
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {trainingDay}
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.id}
                row={row}
                workoutPlanId={workoutPlanId}
                trainingDay={trainingDay}
                exerciseName={row.exerciseName}
                workoutSplit={workoutSplit}
              />
            ))}
          </TableBody>
          <caption>
            <CollapsibleTableForm
              exerciseDay={trainingDay}
              workoutPlanId={workoutPlanId}
            />
          </caption>
        </Table>
      </TableContainer>
    </Paper>
  );
}
