import { IconButton, Typography, useTheme } from '@mui/material';
import FlexBetween from '../FlexBetween';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, unLikePost } from '../../Redux/Actions/postAction';
import { likeComment, unLikeComment } from '../../Redux/Actions/commentAction';
import moment from 'moment';

function FooterPost({
  postData,
  auth,
  onClick,
  isComment = false,
  comment = [],
}) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  useEffect(() => {
    if (isComment) {
      if (comment.likes.find((like) => like._id === auth.user._id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } else {
      if (postData.likes.find((like) => like._id === auth.user._id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [postData.likes, auth.user._id, comment.likes, isComment]);

  const handleLike = () => {
    if (isComment) {
      dispatch(likeComment({ comment, post: postData, auth }));
    } else {
      dispatch(likePost({ post: postData, auth }));
    }
  };
  const handleUnLike = () => {
    if (isComment) {
      dispatch(unLikeComment({ comment, post: postData, auth }));
    } else {
      dispatch(unLikePost({ post: postData, auth }));
    }
  };

  return (
    <FlexBetween mt="0.25rem">
      <FlexBetween gap="1rem">
        <FlexBetween gap="0.3rem">
          {isLiked ? (
            <IconButton onClick={handleUnLike}>
              <FavoriteOutlined
                sx={{ color: primary }}
                fontSize={isComment ? 'small' : 'medium'}
              />
            </IconButton>
          ) : (
            <IconButton onClick={handleLike}>
              <FavoriteBorderOutlined
                fontSize={isComment ? 'small' : 'medium'}
              />
            </IconButton>
          )}

          <Typography>
            {isComment ? comment.likes.length : postData.likes.length}
          </Typography>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <IconButton onClick={onClick}>
            <ChatBubbleOutlineOutlined
              fontSize={isComment ? 'small' : 'medium'}
            />
          </IconButton>
          <Typography>{isComment ? '' : postData.comments.length}</Typography>
          {isComment && (
            <Typography color={main} variant={'subtitle2'}>
              {moment(comment.createdAt).fromNow()}
            </Typography>
          )}
        </FlexBetween>
      </FlexBetween>

      {!isComment && (
        <IconButton>
          <ShareOutlined />
        </IconButton>
      )}
    </FlexBetween>
  );
}

export default FooterPost;
