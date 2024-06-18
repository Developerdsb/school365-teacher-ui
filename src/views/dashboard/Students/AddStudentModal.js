import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { addStudent, getStudent } from '../../../store/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
import { toast } from 'react-toastify';
import { Stack } from '@mui/system';
import { ThreeDots } from 'react-loader-spinner';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter name').min(2),
  email: Yup.string().required('Email is required').matches(emailRegex, 'Please enter valid email'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

export default function AddStudentModal({ open, handleClose }) {
  //   const collegeList = useSelector((state) => state.student.collegeList);
  //   const SkillError = useSelector((state) => state?.student.error);
  // console.log('SkillError---', SkillError);
  const limit = useSelector((state) => state.userAuth?.studentLimit);
  const loading = useSelector((state) => state.userAuth?.loading);
  // console.warn('loading--->', loading);

  const dispatch = useDispatch();

  /*  useEffect(() => {
    console.warn('render----');
    setValue('name', '');
    setValue('email', '');
    setValue('password', '');
    // eslint-disable-next-line
  },[]); */
  const schoolId = localStorage.getItem('schoolId');
  const classId = localStorage.getItem('classId');
  const {
    handleSubmit,
    control,
    formState: { errors }
    /*  ,
    setValue
    clearErrors */
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    console.log('data---=>', { ...data, schoolId: schoolId, classId: classId });
    /*  dispatch(addStudent({ ...data, schoolId: schoolId, classId: classId })); */
    dispatch(addStudent({ ...data, schoolId: schoolId, classId: classId }))
      .unwrap()
      .then((data) => {
        toast.success(data.message, {
          autoClose: 2000
        });
        dispatch(getStudent({ page: '', search: '', limit: limit }));
        // console.log('studeent added', data);
        handleClose();
        reset();
      })
      .catch((error) => {
        toast.error(error, {
          autoClose: 2000
        });
      });
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" sx={{ '& .MuiDialog-paper': { width: '60%' }, padding: '10px' }}>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h3">Add Student</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Typography fontWeight={500} style={{ marginTop: '10px', marginBottom: '10px' }}>
                Name
              </Typography>

              <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Enter your name"
                    sx={
                      {
                        // '@media (min-width: 1280px)': {
                        //   width: '400px'
                        // }
                      }
                    }
                    error={!!errors?.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography fontWeight={500} style={{ marginTop: '10px', marginBottom: '10px' }}>
                Email id
              </Typography>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    style={{
                      width: '100%'
                    }}
                    size="small"
                    placeholder="example@123"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography fontWeight={500} style={{ marginTop: '10px', marginBottom: '10px' }}>
                Password
              </Typography>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    style={{
                      width: '100%'
                    }}
                    type="password"
                    size="small"
                    placeholder="Enter your password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        {!loading ? (
          <DialogActions>
            <Button
              sx={{
                backgroundColor: '#38c7fc',
                color: 'white',
                '&:hover': {
                  color: '#38c7fc',
                  border: '1px solid #38c7fc'
                }
              }}
              type="submit"
            >
              Add
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: '#38c7fc',
                color: 'white',
                marginRight: '15px',
                '&:hover': {
                  color: '#38c7fc',
                  border: '1px solid #38c7fc'
                }
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        ) : (
          <Stack justifyContent={'center'} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
            <ThreeDots visible={true} height="50" width="50" color="#00ADEE" radius="9" ariaLabel="three-dots-loading" wrapperClass="" />
          </Stack>
        )}
      </form>
    </Dialog>
  );
}

AddStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};
