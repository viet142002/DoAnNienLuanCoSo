import { Box, Divider } from '@mui/material';
import InputComment from './InputComment';
import CommentItem from './CommentItem';

function Comments({ postData, auth }) {
  const { comments } = postData;

  return (
    <Box p={'0.5rem 1rem'}>
      <Divider />
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          comment={comment}
          auth={auth}
          postData={postData}
        />
      ))}
      <Divider />
      <InputComment postData={postData} />
    </Box>
  );
}
export default Comments;
