import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../FlexBetween';
import FooterPost from '../FooterPost';
import MyPopper from '../../MyPopper';
import { deleteComment } from '../../../Redux/Actions/commentAction';
import EditComment from './EditComment';

function CommentItem({ comment, auth, postData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { palette } = useTheme();
  const light = palette.neutral.light;
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const isMyComment = comment.user._id === auth.user._id;
  const handleOpenEdit = () => {
    setIsEdit(true);
  };
  const handleDelete = () => {
    dispatch(deleteComment({ post: postData, comment, auth }));
  };
  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const contents = [
    { action: 'open', text: 'Chỉnh sửa bình luận' },
    { action: 'delete', text: 'Xoá bình luận' },
  ];
  return (
    <>
      <Box px={'0.5rem'}>
        <FlexBetween pt={'0.5rem'}>
          <FlexBetween>
            <Avatar
              src={comment.user.avatar}
              sx={{ width: '1.8rem', height: '1.8rem' }}
            />
            <Box
              p={'0.2rem 0.6rem'}
              ml={'1rem'}
              bgcolor={light}
              borderRadius={'0.5rem'}
            >
              <Box
                display={'inline-block'}
                onClick={() => navigate(`/profile/${comment.user._id}`)}
              >
                <Typography
                  color={dark}
                  sx={{
                    '&:hover': {
                      opacity: 0.6,
                      cursor: 'pointer',
                    },
                  }}
                  variant="h6"
                >
                  {comment.user.fullName}
                </Typography>
              </Box>
              <Typography color={main}>{comment.content}</Typography>
            </Box>
            {isMyComment && (
              <MyPopper
                contents={contents}
                handleOpen={handleOpenEdit}
                handleDelete={handleDelete}
              >
                <MoreHoriz />
              </MyPopper>
            )}
          </FlexBetween>
        </FlexBetween>
        <FooterPost
          auth={auth}
          postData={postData}
          isComment
          comment={comment}
        />
      </Box>

      {/*   modal edit Comment */}
      <EditComment
        open={isEdit}
        handleClose={handleCloseEdit}
        comment={comment}
        postData={postData}
      />
    </>
  );
}

export default CommentItem;
