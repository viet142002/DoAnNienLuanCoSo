import React, { useState } from 'react';
import { Snackbar, Stack, Alert as MuiAlert } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toast({ msg, error }) {
  const [close, setClose] = useState(false);

  // let title = error ? 'Error' : 'Success';

  const handleClose = () => setClose(true);
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={!close}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: '100%', fontSize: '1.2rem' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Toast;
