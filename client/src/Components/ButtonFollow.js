import { ButtonBase } from '@mui/material';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unFollow } from '../Redux/Actions/profileAction';
import { useTheme } from '@emotion/react';

function ButtonFollow({ thisUser = [] }) {
  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    if (auth.user.following.find((user) => user._id === thisUser._id)) {
      setIsFollow(true);
    }
  }, [auth.user.following, thisUser._id]);

  const handleClick = () => {
    if (isFollow) {
      dispatch(unFollow({ user: thisUser, auth }));
    } else {
      dispatch(follow({ user: thisUser, auth }));
    }
    setIsFollow(!isFollow);
  };
  return (
    <ButtonBase onClick={handleClick} sx={{ borderRadius: '10px' }}>
      {isFollow ? (
        <PersonRemoveOutlined sx={{ color: primaryDark }} />
      ) : (
        <PersonAddOutlined sx={{ color: primaryDark }} />
      )}
    </ButtonBase>
  );
}

export default ButtonFollow;
