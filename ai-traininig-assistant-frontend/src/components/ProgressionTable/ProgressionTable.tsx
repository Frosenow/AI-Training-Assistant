import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';

function createData(
  trainingDate: string,
  volume: number,
  reps: string,
  sets: number
) {
  const repsFormatted = Array.isArray(reps) ? `[${reps.join(', ')}]` : '';
  return { trainingDate, volume, reps: repsFormatted, sets };
}

const columns = [
  {
    id: 'trainingDate',
    label: `Date`,
    align: 'left',
    minWidth: 70,
  },
  {
    id: 'volume',
    label: `Volume`,
    align: 'left',
    minWidth: 30,
  },
  {
    id: 'reps',
    label: `Reps`,
    align: 'left',
    minWidth: 50,
  },
  {
    id: 'sets',
    label: `Sets`,
    align: 'left',
    minWidth: 30,
  },
];

export function ProgressionTable({ progressionData }) {
  const {
    exercise: { progressTracker },
  } = progressionData;

  const rows = progressTracker.map((tracker) =>
    createData(
      tracker.trainingDate,
      tracker.progression.volume,
      tracker.progression.reps,
      tracker.progression.sets
    )
  );

  return (
    <TableContainer component={Container} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.trainingDate}
              </TableCell>
              <TableCell align="left">{row.volume}</TableCell>
              <TableCell align="left">{row.reps}</TableCell>
              <TableCell align="left">{row.sets}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
