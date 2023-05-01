import React, { useState } from 'react';
import { Snackbar, Stack, Alert as MuiAlert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../../Redux/Actions/globalTypes';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toast({ msg }) {
  const dispatch = useDispatch();
  const [close, setClose] = useState(false);

  const handleClose = () => {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {},
    });
    setClose(true);
  };
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
