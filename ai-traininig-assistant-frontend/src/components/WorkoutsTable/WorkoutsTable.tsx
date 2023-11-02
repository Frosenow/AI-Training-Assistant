import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ClearIcon from '@mui/icons-material/Clear';
import { DeleteExerciseButton } from '../Buttons/DeleteButton/DeleteExerciseButton/DeleteExerciseButton';
import { Typography, IconButton } from '@mui/material';

interface Column {
  id: 'day' | 'exerciseName' | 'reps' | 'sets';
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

interface Data {
  exerciseName: string;
  reps: number[];
  sets: number;
  id: string;
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

export default function WorkoutsTable({
  workoutSplit,
  trainingDay,
  workoutPlanId,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = [];

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
