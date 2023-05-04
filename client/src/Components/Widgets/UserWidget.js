import {
  ManageAccountsOutlined,
  EditOutlined,
  LocalPhoneRounded,
  InfoRounded,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import FlexBetween from '../FlexBetween';
import UserImage from '../UserImage';
import WidgetWrapperFixed from '../WidgetWrapperFixed';
import EditProfile from '../Profile/EditProfile';
import ButtonFollow from '../ButtonFollow';

const UserWidget = ({
  userData,
  isMyProfile = false,
  notMoreAction = false,
}) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [onEdit, setOnEdit] = useState(false);
  const handleClose = () => setOnEdit(false);
  const handleClick = () => {
    navigate(`/profile/${userData._id}`);
  };

  return (
    <>
      <WidgetWrapperFixed>
        {/* FIRST ROW */}
        <FlexBetween gap="0.5rem" pb="1.1rem" width={'298px'}>
          <FlexBetween gap="1rem" onClick={handleClick}>
            <UserImage image={userData.avatar} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  '&:hover': {
                    opacity: 0.6,
                    cursor: 'pointer',
                  },
                }}
              >
                {userData.fullName}
              </Typography>
            </Box>
          </FlexBetween>

          {notMoreAction ? (
            ''
          ) : isMyProfile ? (
            <ButtonBase onClick={() => setOnEdit(true)}>
              <ManageAccountsOutlined />
            </ButtonBase>
          ) : (
            <ButtonFollow thisUser={userData} />
          )}
        </FlexBetween>
        <Divider />

        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem">
            <LocalPhoneRounded fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{userData.mobile}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem" mt={'0.5rem'}>
            <InfoRounded fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{userData.story}</Typography>
          </Box>
        </Box>

        <Divider />

        <Divider />

        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img
                src="https://cdn.pixabay.com/photo/2016/05/01/23/20/twitter-bird-1366218__340.png"
                alt="twitter"
                width="60px"
                height="60px"
              />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img
                src="https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688__340.png"
                alt="facebook"
                width="60px"
                height="60px"
              />
              <Box>
                <Typography color={main} fontWeight="500">
                  FaceBook
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </WidgetWrapperFixed>
      {<EditProfile handleClose={handleClose} open={onEdit} />}
    </>
  );
};

export default UserWidget;
