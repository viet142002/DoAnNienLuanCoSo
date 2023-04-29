import PostWidget from './PostWidget';
import { CircularProgress } from '@mui/material';
import FlexBetween from '../FlexBetween';
function PostsWidget({ auth, posts }) {
  return (
    <>
      {posts.loading ? (
        <FlexBetween justifyContent={'center !important'}>
          <CircularProgress />
        </FlexBetween>
      ) : (
        posts.posts.map((post, index) => (
          <PostWidget auth={auth} postData={post} key={index} />
        ))
      )}
    </>
  );
}

export default PostsWidget;
