import React, { useState } from 'react';
import {
  Snackbar,
  Stack,
  Alert as MuiAlert,
  Typography,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../../Redux/Actions/globalTypes';
import { logout } from '../../../Redux/Actions/authAction';
import { Navigate, useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toast({ msg, error = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [close, setClose] = useState(false);
  const handleClick = () => {
    setClose(true);
    dispatch(logout(navigate));
  };
  const handleClose = () => {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: [],
    });
    setClose(true);
  };
  if (msg === 'jwt expired') {
    msg = 'Vui lòng đăng nhập lại';
  }
  const Content = () => (
    <>
      <Typography fontSize={'1.2rem'}>{msg}</Typography>
      <Button
        sx={{ color: 'white' }}
        variant="outlined"
        size="small"
        onClick={handleClick}
      >
        Đăng nhập
      </Button>
    </>
  );

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
          // severity="error"
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          <Content />
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Toast;
