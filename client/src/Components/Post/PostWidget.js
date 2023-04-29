import WidgetWrapper from '../WidgetWrapper';
import FlexBetween from '../FlexBetween';
import { IconButton, Typography, useTheme, ButtonBase } from '@mui/material';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState } from 'react';
import HeaderPost from './HeaderPost';
import { useDispatch } from 'react-redux';
import { likePost, unLike } from '../../Redux/Actions/postAction';

function PostWidget({ postData, auth }) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    if (postData.likes.find((like) => like._id === auth.user._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [postData.likes, auth.user._id]);

  const handleLike = () => {
    dispatch(likePost({ post: postData, auth }));
  };
  const handleUnLike = () => {
    dispatch(unLike({ post: postData, auth }));
  };

  return (
    <WidgetWrapper mb="2rem" pt={'1rem !important'}>
      <HeaderPost postData={postData} auth={auth} />
      {postData.images.length !== 0 && (
        <Carousel autoPlay={false} animation="slide" duration={650}>
          {postData.images.map((image, index) => (
            <img
              key={index}
              width="100%"
              alt={image.name}
              style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
              src={image.url}
            />
          ))}
        </Carousel>
      )}
      <Typography fontSize={'1rem'} color={main} sx={{ mt: '1rem' }}>
        {postData.content.length > 200
          ? isMore
            ? postData.content
            : postData.content.slice(0, 200)
          : postData.content}
        {postData.content.length > 200 && (
          <ButtonBase
            sx={{ padding: '5px', textDecoration: 'underline' }}
            onClick={() => setIsMore(!isMore)}
          >
            {isMore ? 'Thu nhỏ' : 'Xem thêm'}
          </ButtonBase>
        )}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {isLiked ? (
              <IconButton onClick={handleUnLike}>
                <FavoriteOutlined sx={{ color: primary }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleLike}>
                <FavoriteBorderOutlined />
              </IconButton>
            )}

            <Typography>{postData.likes.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{postData.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/* {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )} */}
    </WidgetWrapper>
  );
}

export default PostWidget;
