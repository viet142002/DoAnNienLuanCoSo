import MyModal from '../../MyModal';
import InputComment from './InputComment';

function EditComment({ comment, handleClose, open, postData }) {
  return (
    <>
      <MyModal open={open} handleClose={handleClose}>
        <>
          <InputComment
            postData={postData}
            comment={comment}
            handleClose={handleClose}
            isEdit
            sx={{
              transform: 'translate(-50%, -50%)',
              width: '45%',
              position: 'fixed',
              top: '50%',
              left: '50%',
            }}
          />
        </>
      </MyModal>
    </>
  );
}

export default EditComment;
