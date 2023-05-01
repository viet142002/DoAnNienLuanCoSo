import {
  DeleteOutlined,
  ImageOutlined,
  HighlightOffOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import FlexBetween from '../FlexBetween';
import Dropzone from 'react-dropzone';
import UserImage from '../UserImage';
import WidgetWrapper from '../WidgetWrapper';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../Redux/Actions/postAction';

const MyPostWidget = ({
  handleClose,
  edit = false,
  postData = [],
  auth,
  ...props
}) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(postData.images ? true : false);
  const [images, setImages] = useState(postData.images ?? []);
  const [content, setContent] = useState(postData.content ?? '');
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = () => {
    if (edit) {
      handleClose();
      dispatch(updatePost({ content, images, auth: auth, status: postData }));
    } else {
      dispatch(createPost({ content, images, auth: auth }));
    }
    setIsImage(false);
    setImages([]);
    setContent('');
  };
  const handleRemovePicture = (removeImage) => {
    setImages(() => images.filter((image) => image.name !== removeImage.name));
    setImages(() => images.filter((image) => image.url !== removeImage.url));
  };
  return (
    <WidgetWrapper mb={'2rem'} {...props}>
      <FlexBetween gap="1.5rem">
        <UserImage image={auth.user.avatar} size="50px" />
        <InputBase
          placeholder="Bạn đang nghĩ..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '0.5rem 2rem',
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {images.length > 0 && (
            <FlexBetween>
              <ImageList cols={3}>
                {images.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image.url ? image.url : URL.createObjectURL(image)}
                      alt={image.name}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      sx={{
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      }}
                      position="top"
                      actionIcon={
                        <IconButton sx={{ color: 'white' }}>
                          <HighlightOffOutlined />
                        </IconButton>
                      }
                      onClick={() => handleRemovePicture(image)}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </FlexBetween>
          )}

          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={true}
            onDrop={(acceptedFiles) => {
              acceptedFiles.map((image) =>
                setImages((images) => [...images, image])
              );
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />

                  <p>Add Image Here</p>
                </Box>
                {images.length > 0 && (
                  <IconButton
                    onClick={() => setImages([])}
                    sx={{ marginLeft: '1rem' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        <Button
          disabled={!content}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
