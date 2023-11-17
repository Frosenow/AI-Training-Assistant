import { Snackbar, Alert } from '@mui/material';
import { ApolloError } from '@apollo/client';

interface ApolloErrorMessage {
  error: ApolloError;
}

export default function SnackBarFormDetectionError(props) {
  const { error }: ApolloErrorMessage = props;
  const { open } = props;

  return (
    <Snackbar
      key={error ? error.message : undefined}
      open={open}
      autoHideDuration={5000}
    >
      <Alert severity="info">{error.message}</Alert>
    </Snackbar>
  );
}
