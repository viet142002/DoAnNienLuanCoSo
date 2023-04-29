import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
  Avatar,
} from '@mui/material';
import { Formik } from 'formik';

import { initialValuesProfile, validateProfile } from './initialAndValidate';
import FlexBetween from '../FlexBetween';
import { PhotoCamera } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileUser } from '../../Redux/Actions/profileAction';
import { useState } from 'react';
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../Redux/Actions/globalTypes';
import MyModal from '../MyModal';

function EditProfile({ handleClose, open }) {
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState('');
  const { auth } = useSelector((state) => state);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });
    setAvatar(file);
  };

  const handleFormSubmit = (userData) => {
    dispatch(updateProfileUser({ userData, avatar, auth }));
    handleClose();
  };

  return (
    <MyModal handleClose={handleClose} open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '1rem',
          padding: '2rem 2rem',
          backgroundColor: `${alt}`,
        }}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesProfile}
          validationSchema={validateProfile}
        >
          {({
            handleSubmit,
            handleChange,
            isSubmitting,
            touched,
            errors,
            values,
          }) => (
            <form onSubmit={handleSubmit} method="post">
              <Box display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
                <Typography
                  variant="h2"
                  textAlign={'center'}
                  paddingBottom={'2rem'}
                >
                  Cập nhật thông tin
                </Typography>
                <Box
                  position={'relative'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    position={'absolute'}
                    bottom={0}
                    zIndex={10}
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={changeAvatar}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                  <Avatar
                    src={
                      avatar ? URL.createObjectURL(avatar) : auth.user.avatar
                    }
                    sx={{ width: 120, height: 120 }}
                  />
                </Box>
                <FlexBetween columnGap={'0.5rem'}>
                  <TextField
                    name="firstName"
                    helperText={
                      touched.firstName && errors.firstName && errors.firstName
                    }
                    variant="standard"
                    label="Họ"
                    onChange={handleChange}
                    value={values.firstName}
                  />
                  <TextField
                    name="lastName"
                    helperText={
                      touched.lastName && errors.lastName && errors.lastName
                    }
                    variant="standard"
                    label="Tên"
                    onChange={handleChange}
                    value={values.lastName}
                  />
                </FlexBetween>

                <FlexBetween>
                  <TextField
                    name="mobile"
                    fullWidth
                    helperText={
                      touched.mobile && errors.mobile && errors.mobile
                    }
                    variant="standard"
                    label="Số điện thoại"
                    onChange={handleChange}
                    value={values.mobile}
                  />
                </FlexBetween>

                <FlexBetween paddingBottom={'2rem'}>
                  <TextField
                    name="story"
                    fullWidth
                    helperText={touched.story && errors.story && errors.story}
                    variant="standard"
                    label="Tiểu sử"
                    onChange={handleChange}
                    value={values.story}
                    multiline
                  />
                </FlexBetween>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Cập nhật
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </MyModal>
  );
}

export default EditProfile;
