import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import FlexBetween from '../FlexBetween';
import UserImage from '../UserImage';
import ButtonFollow from '../ButtonFollow';
import MoreAction from './MoreAction';

function HeaderPost({ auth, postData }) {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const isAuth = auth.user._id === postData.user._id;

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
                opacity: 0.6,
                cursor: 'pointer',
              },
            }}
          >
            {postData.user.fullName}
          </Typography>
          <Typography color={main} variant={'subtitle2'}>
            {moment(postData.createdAt).fromNow()}
          </Typography>
        </Box>
      </FlexBetween>

      {!isAuth ? (
        <ButtonFollow thisUser={postData.user} />
      ) : (
        <MoreAction auth={auth} postData={postData} />
      )}
    </FlexBetween>
  );
}

export default HeaderPost;
