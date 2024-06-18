import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Box, Stack } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
// import CircleProgress from '../../ui-component/CircularProgress';
// import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent, setStudentData, getStudent } from '../../../store/redux/userSlice';
import { ThreeDots } from 'react-loader-spinner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '300px', md: '370px' },
  backgroundColor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px'
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  status: PropTypes.string,
  deletstatus: PropTypes.string
};

export default function DeleteModal({ open, setOpen, handleClose }) {
  const studentId = useSelector((state) => state.userAuth.studentId);
/*   console.warn('studentId---->', studentId);
  console.warn('setOpen--->', setOpen); */
  const page = useSelector((state) => state.userAuth?.page);
  const limit = useSelector((state) => state.userAuth?.limit);
  const deleteIsLoading = useSelector((state) => state.userAuth?.deleteIsLoading);
  // console.warn('deleteIsLoading--->', deleteIsLoading);
  const schoolId = localStorage.getItem('schoolId');
  const classId = localStorage.getItem('classId');
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteStudent(studentId));
    // .then(() => {
    //   dispatch(getStudent({ page: page, search: '', limit: limit, classId: classId, schoolId: schoolId }));
    //   dispatch(setStudentData({ key: 'deleteIsLoading', value: false }));
    //   handleClose();
    // });
    // handleClose();
  };
  useEffect(() => {
    if (deleteIsLoading !== 'delsuccess') {
      return;
    }
    dispatch(getStudent({ page: page, search: '', limit: limit, classId: classId, schoolId: schoolId }));
    handleClose();
    dispatch(setStudentData({ key: 'deleteIsLoading', value: '' }));
  }, [deleteIsLoading]);

  return (
    <Modal
      aria-labelledby="add-modal-title"
      aria-describedby="add-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Grid container spacing={1} p={4}>
            <Grid item xs={12} sx={{ textAlign: 'left' }}>
              <Typography id="modal-modal-title" variant="h3" component="h2">
                Confirm Delete
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete this student?
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {deleteIsLoading == 'deleloading' ? (
                <Stack justifyContent={'center'} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
                  <ThreeDots
                    visible={true}
                    height="50"
                    width="50"
                    color="#00ADEE"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperClass=""
                  />
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} mt={2} justifyContent="flex-start">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#38c7fc',
                      color: 'white',
                      '&:hover': {
                        color: '#38c7fc'
                      }
                    }}
                    onClick={handleDelete}
                  >
                    Yes, Delete
                  </Button>
                  <Button variant="contained" color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
