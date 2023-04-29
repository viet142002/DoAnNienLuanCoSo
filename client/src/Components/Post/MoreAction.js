import { MoreVert } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import MyPopper from '../MyPopper';
import { deletePost } from '../../Redux/Actions/postAction';
import EditPost from './EditPost';
import { Box } from '@mui/material';

function MoreAction({ auth, postData }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const contents = [
    { action: 'update', text: 'Chỉnh sửa bài viết' },
    { action: 'delete', text: 'Xoá Bài viết' },
  ];
  const handleUpdate = () => {
    setIsUpdate(true);
  };
  const handleDelete = () => {
    dispatch(deletePost({ auth: auth, id: postData._id }));
  };
  const handleClose = () => {
    setIsUpdate(false);
  };
  return (
    <Box>
      <MyPopper
        contents={contents}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      >
        <MoreVert />
      </MyPopper>
      <EditPost
        auth={auth}
        handleClose={handleClose}
        open={isUpdate}
        postData={postData}
      />
    </Box>
  );
}

export default MoreAction;
