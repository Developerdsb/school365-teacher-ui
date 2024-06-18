import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Backdrop from '@mui/material/Backdrop';
import Confetti from 'react-confetti';
import PropTypes from 'prop-types';

const TemplateModal = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        onClose(); // Close the modal after a certain delay
      }, 3000); // Close after 5 seconds (adjust as needed)
    }
  }, [open, onClose]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="image-saved-modal"
      aria-describedby="image-saved-message"
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { backdropFilter: 'blur(8px)' }
      }}
    >
      <>
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} gravity={0.5} />
        <Paper
          sx={{
            position: 'absolute',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <CheckCircleOutlineIcon sx={{ fontSize: 100, color: 'green' }} />
            <Typography variant="h4" mt={3} textAlign="center">
              Your image template has been successfully saved.
            </Typography>
          </Box>
        </Paper>
      </>
    </Modal>
  );
};
TemplateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default TemplateModal;
