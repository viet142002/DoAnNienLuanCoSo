import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import ButtonFollow from './ButtonFollow';
import { useNavigate } from 'react-router-dom';

function Friend({ thisUser }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;

  return (
    <FlexBetween width={'298px'}>
      <FlexBetween
        gap="1rem"
        onClick={() => navigate(`/profile/${thisUser._id}`)}
      >
        <UserImage image={thisUser.avatar} size="40px" />
        <Box>
          <Typography
            variant="h5"
            color={dark}
            fontWeight="500"
            sx={{
              '&:hover': {
                opacity: 0.6,
                cursor: 'pointer',
              },
            }}
          >
            {thisUser.fullName}
          </Typography>
        </Box>
      </FlexBetween>
      <ButtonFollow thisUser={thisUser} />
    </FlexBetween>
  );
}

export default Friend;
