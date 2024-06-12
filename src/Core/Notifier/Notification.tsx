import React, { SyntheticEvent } from 'react';
import { Snackbar, Alert } from '@mui/material';
import useNotifier from './use-notifier';

/**
 * Component make use of use Notifier hook to show the snack bar message
 * @returns
 */
export default function Notification() {
  const { message, removeMessage, severity } = useNotifier();

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    removeMessage();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={5000}
      onClose={handleClose}
      open={!!message}
      sx={{ height: '100px' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
