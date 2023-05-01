import WidgetWrapper from '../WidgetWrapper';

import { useState } from 'react';
import HeaderPost from './HeaderPost';
import Comments from './Comment/Comments';
import BodyPost from './BodyPost';
import FooterPost from './FooterPost';

function PostWidget({ postData, auth }) {
  console.log({ postData });
  const [isComments, setIsComments] = useState(false);
  const handleClick = () => {
    setIsComments(!isComments);
  };
  return (
    <WidgetWrapper mb="2rem" pt={'1rem !important'}>
      <HeaderPost postData={postData} auth={auth} />
      <BodyPost postData={postData} />
      <FooterPost auth={auth} postData={postData} onClick={handleClick} />
      {isComments && <Comments postData={postData} auth={auth} />}
    </WidgetWrapper>
  );
}

export default PostWidget;
