import { Box } from '@mui/material';
import UserWidget from '../../Components/Widgets/UserWidget';
import PostsWidget from '../../Components/Post/PostsWidget';
import { useDispatch, useSelector } from 'react-redux';
import MyPostWidget from '../../Components/Post/MyPostWidget';
import FriendListWidget from '../../Components/Widgets/FriendListWidget';
import { useEffect } from 'react';
import { getPosts } from '../../Redux/Actions/postAction';

function Home() {
  const dispatch = useDispatch();
  const { auth, listPost } = useSelector((state) => state);

  useEffect(() => {
    auth.token && dispatch(getPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <Box
      width="100% - 80px"
      padding="2rem 6%"
      display={'flex'}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={'26%'} position={'relative'} zIndex={'auto'}>
        <UserWidget userData={auth.user} notMoreAction />
      </Box>

      <Box flexBasis={'42%'}>
        <MyPostWidget auth={auth} />
        <PostsWidget auth={auth} posts={listPost} />
      </Box>

      <Box flexBasis="26%">
        <FriendListWidget userId={auth.user._id} />
      </Box>
    </Box>
  );
}

export default Home;
