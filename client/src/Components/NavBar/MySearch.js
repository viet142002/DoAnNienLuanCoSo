import { Search } from '@mui/icons-material';
import { Box, IconButton, InputBase } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDataAPI } from '../../utils/fetchData';
import FlexBetween from '../FlexBetween';
import { GLOBALTYPES } from '../../Redux/Actions/globalTypes';
import UserCard from './UserCard';

function MySearch({ bgColor }) {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search && auth.token) {
      let parseSearch = search.toLocaleLowerCase().replace(/ /g, '');
      getDataAPI(`search?username=${parseSearch}`, auth.token)
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch((error) => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.response.data.msg },
          });
        });
    }
  }, [search, auth.token, dispatch]);

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  return (
    <FlexBetween
      backgroundColor={bgColor}
      borderRadius="9px"
      gap="3rem"
      padding="0.1rem 1.5rem"
      position={'relative'}
    >
      <InputBase
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton>
        <Search />
      </IconButton>

      {search && users && (
        <Box
          position={'absolute'}
          backgroundColor={bgColor}
          width={'100%'}
          left={0}
          top={'110%'}
          borderRadius={'inherit'}
          padding={'0.5rem 1.5rem'}
          zIndex={999}
        >
          {users.map((user) => (
            <UserCard key={user._id} user={user} handleClose={handleClose} />
          ))}
        </Box>
      )}
    </FlexBetween>
  );
}

export default MySearch;
