import { ButtonBase, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

function BodyPost({ postData }) {
  const [isMore, setIsMore] = useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  return (
    <>
      {postData.images.length !== 0 && (
        <Carousel
          interval={5000}
          autoPlay={false}
          animation="slide"
          duration={650}
        >
          {postData.images.map((image, index) => (
            <img
              key={index}
              width="100%"
              height={'auto'}
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
    </>
  );
}

export default BodyPost;
