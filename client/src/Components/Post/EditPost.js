import MyModal from '../MyModal';
import MyPostWidget from './MyPostWidget';

function EditPost({ auth, handleClose, open, postData }) {
  return (
    <>
      <MyModal handleClose={handleClose} open={open}>
        <>
          <MyPostWidget
            handleClose={handleClose}
            edit
            postData={postData}
            auth={auth}
            width="45%"
            position="fixed"
            top="50%"
            left="50%"
            sx={{ transform: 'translate(-50%, -50%)' }}
          />
        </>
      </MyModal>
    </>
  );
}

export default EditPost;
