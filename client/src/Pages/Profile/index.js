import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import UserWidget from '../../Components/Widgets/UserWidget';

import FriendListWidget from '../../Components/Widgets/FriendListWidget';

import Loading from '../../Components/Loading';
import { getProfileUsers } from '../../Redux/Actions/profileAction';
import MyPostWidget from '../../Components/Post/MyPostWidget';
import PostsWidget from '../../Components/Post/PostsWidget';

function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { auth, profile, listPost } = useSelector((state) => state);
  const isMyProfile = id === auth.user._id;

  useEffect(() => {
    dispatch(getProfileUsers(id, auth));
  }, [auth, dispatch, id]);

  return (
    <>
      {profile.user ? (
        profile.loading ? (
          // <Loading />
          ''
        ) : (
          <Box
            width="100% - 80px"
            padding="2rem 6%"
            display={'flex'}
            gap="0.5rem"
            justifyContent="space-between"
          >
            <Box flexBasis={'26%'} position={'relative'} zIndex={'auto'}>
              <UserWidget userData={profile.user} isMyProfile={isMyProfile} />
            </Box>

            <Box flexBasis={'42%'}>
              {isMyProfile && <MyPostWidget auth={auth} />}
              {listPost.posts.length === 0 && !isMyProfile ? (
                <Typography mt={'8rem'} variant="h3" textAlign={'center'}>
                  Người này chưa đăng bắt kỳ bài viết gì
                </Typography>
              ) : (
                <PostsWidget auth={auth} posts={listPost} />
              )}
            </Box>

            <Box flexBasis="26%">
              <FriendListWidget userId={auth.user._id} />
            </Box>
          </Box>
        )
      ) : (
        ''
      )}
    </>
  );
}

export default ProfilePage;
