import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ApolloError } from '@apollo/client';

interface ApolloErrorMessage {
  error: ApolloError;
}

export default function SnackBarError({ error }: ApolloErrorMessage) {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      key={error ? error.message : undefined}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert severity="error">{error.message}</Alert>
    </Snackbar>
  );
}
