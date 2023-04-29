import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function Info() {
  const { id } = useParams();
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  console.log(auth);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (id === auth.user._id) {
      setUserData(auth.user);
    }
  }, [id, auth.user]);
  return <Typography variant="h2">info {id}</Typography>;
}

export default Info;
