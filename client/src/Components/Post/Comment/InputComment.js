import { Avatar, IconButton, InputBase, useTheme } from '@mui/material';
import FlexBetween from '../../FlexBetween';
import { SendRounded } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  updateComment,
} from '../../../Redux/Actions/commentAction';

function InputComment({
  postData,
  isEdit = false,
  handleClose,
  comment,
  ...props
}) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(isEdit ? comment.content : '');
  const theme = useTheme();
  const { auth } = useSelector((state) => state);
  const neutralLight = theme.palette.neutral.light;
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
    if (isEdit) {
      handleClose();
      dispatch(updateComment({ comment, post: postData, auth, content }));
    } else {
      const newComment = {
        content,
      };
      dispatch(
        createComment({
          newComment,
          post: postData,
          auth: auth,
        })
      );
    }
    setContent('');
  };
  return (
    <FlexBetween pt={'1rem'} {...props}>
      <FlexBetween flexBasis={'100%'}>
        <Avatar
          src={auth.user.avatar}
          sx={{ width: '1.8rem', height: '1.8rem' }}
        />
        <FlexBetween
          flexGrow={1}
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
          ml={'1rem'}
          position={'relative'}
        >
          <InputBase
            placeholder="Bình luận gì đê..."
            name="content"
            value={content}
            onChange={(e) => handleChange(e)}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            disabled={
              isEdit ? content === comment.content : content.trim().length === 0
            }
            onClick={handleSubmit}
          >
            <SendRounded />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
    </FlexBetween>
  );
}

export default InputComment;
