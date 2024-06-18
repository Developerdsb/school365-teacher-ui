import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const TemplateModal = ({ open, pdfUrl, onClose, pdfLoading }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="pdf-modal"
      aria-describedby="pdf-message"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <>
        <CancelIcon onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', color: 'white' }} />
        <Paper
          sx={{
            position: 'absolute',
            width: { xs: '40vh', sm: '80vh', lg: '100vh' },
            height: '100vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: pdfLoading ? 'block' : 'none' }}>
            <ThreeDots
              visible={true}
              height="50"
              width="50"
              color="#00ADEE"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              wrapperClass=""
            />
          </Box>
          <Box sx={{ visibility: pdfLoading ? 'hidden' : 'visible', height: '100vh' }}>
            <iframe title="PDF" src={`${pdfUrl}#toolbar=0`} width="100%" height="100%"></iframe>;
          </Box>
        </Paper>
      </>
    </Modal>
  );
};
TemplateModal.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  pdfLoading: PropTypes.bool,
  onClose: PropTypes.func
};
export default TemplateModal;
