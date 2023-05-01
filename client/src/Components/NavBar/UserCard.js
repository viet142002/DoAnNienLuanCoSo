import { Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function UserCard({ user, handleClose }) {
  return (
    <Link to={`/profile/${user._id}`} onClick={handleClose}>
      <Box
        display={'flex'}
        alignItems={'center'}
        paddingY={'0.5rem'}
        justifyContent={'flex-start'}
      >
        <Avatar src={user.avatar} />

        <Box paddingLeft={'0.5rem'}>
          <span className="d-block">{user.fullName}</span>
        </Box>
      </Box>
    </Link>
  );
}

export default UserCard;
