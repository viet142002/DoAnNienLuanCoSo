import { Box, Typography, useTheme } from '@mui/material';
import WidgetWrapperFixed from '../WidgetWrapperFixed';
import { useSelector } from 'react-redux';
import Friend from '../Friend';

const FriendListWidget = () => {
  const { palette } = useTheme();
  const { user } = useSelector((state) => state.auth);
  return (
    <WidgetWrapperFixed width={'347px'}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Following
      </Typography>
      <Box display="flex" flexDirection="column" gap="0.6rem">
        {user.following.map((follow) => (
          <Friend key={follow._id} thisUser={follow} />
        ))}
      </Box>
    </WidgetWrapperFixed>
  );
};

export default FriendListWidget;
