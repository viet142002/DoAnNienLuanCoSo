import { ManageAccountsOutlined, EditOutlined } from '@mui/icons-material';
import { Box, Typography, Divider, useTheme, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import FlexBetween from '../FlexBetween';
import UserImage from '../UserImage';
import WidgetWrapperFixed from '../WidgetWrapperFixed';
import EditProfile from '../Profile/EditProfile';
import ButtonFollow from '../ButtonFollow';
import HeaderInfo from '../Post/HeaderPost';

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
  const { firstName, lastName } = userData;
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
                    color: palette.primary.light,
                    cursor: 'pointer',
                  },
                }}
              >
                {`${firstName} ${lastName}`}
              </Typography>
              {/* <Typography color={medium}>{friends.length} friends</Typography> */}
            </Box>
          </FlexBetween>

          {/* Btn edit profile || follow/unfollow */}

          {notMoreAction ? (
            ''
          ) : isMyProfile ? (
            <ButtonBase onClick={() => setOnEdit(true)}>
              <ManageAccountsOutlined />
            </ButtonBase>
          ) : (
            <ButtonFollow data={userData} />
          )}
        </FlexBetween>
        <Divider />

        {/* SECOND ROW */}
        {/* <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box> */}

        <Divider />

        {/* THIRD ROW */}
        {/* <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box> */}

        <Divider />

        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img
                src="/pictures/twitter.jpg"
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
                src="/pictures/Linkedin.jpg"
                alt="linkedin"
                width="60px"
                height="60px"
              />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
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
