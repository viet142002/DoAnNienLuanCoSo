import { ButtonBase } from '@mui/material';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unFollow } from '../Redux/Actions/profileAction';
import { useTheme } from '@emotion/react';

function ButtonFollow({ data }) {
  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useDispatch();
  const { auth, profile } = useSelector((state) => state);

  useEffect(() => {
    if (auth.user.following.find((user) => user._id === data._id)) {
      setIsFollow(true);
    }
  }, [auth.user.following, data._id]);

  const handleClick = () => {
    if (isFollow) {
      dispatch(unFollow({ user: profile.user, auth }));
    } else {
      dispatch(follow({ user: profile.user, auth }));
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
