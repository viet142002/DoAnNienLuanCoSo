import { Box, Typography, useTheme } from '@mui/material';

import FlexBetween from '../FlexBetween';
import UserImage from '../UserImage';
import ButtonFollow from '../ButtonFollow';
import MoreAction from './MoreAction';
import { Navigate, useNavigate } from 'react-router-dom';

function HeaderPost({ auth, postData }) {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const isAuth = auth.user._id === postData.user._id;
  const userName = `${postData.user.firstName} ${postData.user.lastName}`;
  return (
    <FlexBetween>
      <FlexBetween
        gap="1rem"
        onClick={() => navigate(`/profile/${postData.user._id}`)}
      >
        <UserImage image={postData.user.avatar} size="50px" />
        <Box>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {userName}
          </Typography>
        </Box>
      </FlexBetween>
      {!isAuth ? (
        <ButtonFollow data={postData.user} />
      ) : (
        <MoreAction auth={auth} postData={postData} />
      )}
    </FlexBetween>
  );
}

export default HeaderPost;
