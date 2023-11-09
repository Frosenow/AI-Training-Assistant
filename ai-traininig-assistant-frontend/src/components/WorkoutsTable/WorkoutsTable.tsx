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

import moment from 'moment';
import { DeleteExerciseButton } from '../Buttons/DeleteButton/DeleteExerciseButton/DeleteExerciseButton';
import CollapsibleTableForm from './CollapsibleTableForm';
import { ProgressionField } from '../Progression/CreateProgressionForm/ProgressionField';
import { DeleteProgressionButton } from '../Buttons/DeleteButton/DeleteProgressionButton/DeleteProgressionButton';
import { createData } from './utils/createData';
import {
  Column,
  ColumnProgression,
  Data,
  ProgressionData,
} from './types/types';
import { WorkoutsTableProps, ProgressTracker } from '../../types/types';

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

const columnsHistory: readonly ColumnProgression[] = [
  { id: 'trainingDate', label: 'Date', minWidth: 100 },
  {
    id: 'sets',
    label: 'Sets',
    minWidth: 50,
  },
  {
    id: 'reps',
    label: 'Reps',
    minWidth: 30,
  },
  {
    id: 'weight',
    label: 'Weight',
    minWidth: 30,
  },
  {
    id: 'volume',
    label: 'Volume',
    minWidth: 30,
  },
];

type ProgressRowProps = {
  progress: ProgressTracker;
  exerciseId: string;
  workoutPlanId: string;
  trainingDay: string;
};

type RowProps = {
  row: Data;
  workoutPlanId: string;
  trainingDay: string;
  exerciseId: string;
};

function ProgressRow({
  progress: { id, trainingDate, progression },
  exerciseId,
  workoutPlanId,
  trainingDay,
}: ProgressRowProps) {
  const rowProgress: ProgressionData = {
    id,
    trainingDate,
    sets: progression.sets,
    reps: Array.isArray(progression.reps)
      ? `[${progression.reps.join(', ')}]`
      : '',
    volume: progression.volume,
    weight: progression.weight,
  };

  return (
    <TableRow>
      {columnsHistory.map((column) => {
        const value = rowProgress[column.id];
        return (
          <TableCell key={column.id} sx={{ minWidth: column.minWidth }}>
            {column.format && typeof value === 'number'
              ? column.format(value)
              : value}
          </TableCell>
        );
      })}
      <TableCell>
        <DeleteProgressionButton
          workoutPlanId={workoutPlanId}
          exerciseId={exerciseId}
          progressionId={id}
          trainingDay={trainingDay}
        />
      </TableCell>
    </TableRow>
  );
}

function Row({ row, workoutPlanId, trainingDay, exerciseId }: RowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell
              key={column.id}
              align={column.align}
              sx={{ minWidth: column.minWidth }}
            >
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
                {row.exerciseName} Progression History
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
                <TableBody>
                  {row.progressTracker &&
                    row.progressTracker.map((progress: ProgressTracker) => (
                      <ProgressRow
                        key={progress.id}
                        progress={progress}
                        workoutPlanId={workoutPlanId}
                        trainingDay={trainingDay}
                        exerciseId={exerciseId}
                      />
                    ))}
                </TableBody>
                <caption>
                  <ProgressionField
                    workoutPlanId={workoutPlanId}
                    exerciseId={exerciseId}
                    trainingDay={trainingDay}
                  />
                </caption>
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
        exercise.reps as number[],
        exercise.sets,
        exercise.id,
        exercise.progressTracker || []
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
        <Table stickyHeader aria-label="sticky table" size="medium">
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
                exerciseId={row.id}
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
