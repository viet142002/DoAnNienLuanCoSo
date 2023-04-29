import { Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function UserCard({
  user,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) {
  const name = `${user.firstName} ${user.lastName}`;
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <Link to={`/profile/${user._id}`} onClick={handleCloseAll}>
      <Box
        display={'flex'}
        alignItems={'center'}
        paddingY={'0.5rem'}
        justifyContent={'flex-start'}
      >
        <Avatar src={user.avatar} />

        <Box paddingLeft={'0.5rem'}>
          <span className="d-block">{name}</span>
          <span className="d-block">{user._id}</span>
          {/* <small style={{ opacity: 0.7 }}>
            {msg ? showMsg(user) : user.fullname}
          </small> */}
        </Box>
      </Box>
    </Link>
  );
}

export default UserCard;
