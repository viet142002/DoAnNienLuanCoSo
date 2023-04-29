import { Modal } from '@mui/material';

function MyModal({ handleClose, open, children }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
}

export default MyModal;
