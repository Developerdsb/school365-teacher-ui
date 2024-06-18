import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Box } from '@mui/system';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  borderRadius: '10px',
  outline: 'none',
  '&:focus': {
    boxShadow: '0'
  }
};

const closeButtonStyle = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  fontSize: '20px',
  backgroundColor: 'rgba(50, 50, 50, 0.8)',
  borderRadius: '50%',
  color: 'white',
  zIndex: 9999
};

TransitionModal.propTypes = {
  clickedImg: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};
export default function TransitionModal({ clickedImg, open, setOpen }) {
  const handleClick = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // Adjust width based on screen size
  if (isSmScreen) {
    style.width = '90%';
  } else if (isMdScreen) {
    style.width = '70%';
  } else if (isLgScreen) {
    style.width = '50%';
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <img
              src={clickedImg}
              alt="bigger pic"
              style={{
                width: '100%',
                height: '80vh',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          </Box>
        </Fade>
      </Modal>
      {open && (
        <IconButton sx={closeButtonStyle} onClick={handleClick} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );
}
