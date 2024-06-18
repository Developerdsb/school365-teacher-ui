import React, { useEffect } from 'react';
import { Grid, Typography, Stack, Box, TextField, Button, Tooltip, Paper } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { singleStudent, studentUpdate, studentYearbook } from '../../../store/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
/* import { Input } from '@mui/base/Input';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle'; */
import Avatar from '@mui/material/Avatar';
import { ThreeDots } from 'react-loader-spinner';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import { Input } from '@mui/base/Input';
import Gallery from './Gallery';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7'
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C'
    }
  },
  '& input::placeholder': {
    color: 'black'
  }
});

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const schema = Yup.object({
  profilePicture: Yup.mixed(),
  name: Yup.string(),
  contactNumber: Yup.string(),
  email: Yup.string().matches(emailRegex, 'Please enter valid email'),
  admissionNumber: Yup.string().nullable(),
  rollNumber: Yup.string().nullable(),
  city: Yup.string().nullable(),
  state: Yup.string().nullable(),
  country: Yup.string().nullable(),
  password: Yup.string()
});

// import Divider from '@mui/material/Divider';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const fileInputRef = useRef(null);

  const studentId = useSelector((state) => state.userAuth.studentId);
  // console.warn('studentId---->', studentId);

  const userinfo = useSelector((state) => (state.userAuth.userinfo?.userDetails?.user ? state.userAuth.userinfo?.userDetails?.user : ''));
  const studentProfileData = useSelector((state) => state.userAuth.singleStudent);
  // console.warn('studentProfile---->', studentProfileData);
  const isLoading = useSelector((state) => state.userAuth.isLoading);
  const schoolId = localStorage.getItem('schoolId');
  const classId = localStorage.getItem('classId');
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (!studentId) {
      // console.log('useEffect sudentId--->', studentId);
      navigate('/students');
      return;
    }
    const fetchData = async () => {
      try {
        await dispatch(singleStudent(studentId)).unwrap();
        dispatch(studentYearbook(studentId));
      } catch (error) {
        console.error('Failed to fetch student data:', error);
        // Handle error accordingly, e.g., set error state
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [studentId]);

  useEffect(() => {
    // dispatch(singleStudent(studentId));
    // setValue('schoolId', schoolId || '');
    // setValue('classId', classId || '');
    setValue('profilePicture', studentProfileData?.profilePicture || '');
    setValue('name', studentProfileData?.name || '');
    setValue('contactNumber', studentProfileData?.contactNumbe || '');
    setValue('email', studentProfileData?.email || '');
    setValue('admissionNumber', studentProfileData?.admissionNumber || '');
    setValue('rollNumber', studentProfileData?.rollno || '');
    setValue('city', studentProfileData?.city || '');
    setValue('state', studentProfileData?.state || '');
    setValue('country', studentProfileData?.country || '');
    setValue('password', studentProfileData?.password || '');
    // eslint-disable-next-line
  });
  const onSubmit = (data) => {
    // console.log('data sbmited--->', data);
    const formData = new FormData();
    formData.append('student_id', studentId);
    formData.append('schoolId', schoolId);
    formData.append('classId', classId);
    formData.append('profilePicture', data.profilePicture);
    formData.append('name', data.name);
    formData.append('contactNumber', data.contactNumber);
    formData.append('email', data.email);
    formData.append('admissionNumber', data.admissionNumber);
    formData.append('rollNumber', data.rollNumber);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('country', data.country);
    formData.append('password', data.password);
    dispatch(studentUpdate(formData))
      .unwrap()
      .then(() => {
        navigate('/students');
        reset();
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item container xs={12}>
          <form onSubmit={handleSubmit(onSubmit)} method="POST" style={{ width: '100%' }}>
            <Stack
              p={4}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              backgroundColor="white"
              borderRadius="15px"
              width="100%"
              spacing={{ xs: 2, sm: 2, md: 2, lg: 4 }}
              sx={{ alignItems: isLoading && 'center' }}
            >
              {isLoading ? (
                <Stack justifyContent={'center'} p={8} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
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
                <>
                  {/*   <Stack width="100%" direction="row" justifyContent={{ xs: 'center', lg: 'flex-start' }}>
                    <Typography variant="h2" fontSize="16px" fontWeight="bold">
                      Update Student profile
                    </Typography>
                  </Stack> */}
                  <Grid container spacing={{ lg: 2 }} direction={{ xs: 'column', lg: 'row' }} alignItems="center" width="100%">
                    <Stack width="100%" direction={{ xs: 'column', lg: 'row' }} justifyContent="space-around">
                      <Grid item xs={12} lg={2} width="100%">
                        <Stack direction="row" justifyContent={{ xs: 'center', lg: 'flex-start' }} mb={2}>
                          <Controller
                            name="profilePicture"
                            control={control}
                            render={({ field }) => (
                              <>
                                <Stack direction="column" alignItems={{ xs: 'center', lg: 'flex-start' }}>
                                  <Box style={{ position: 'relative' }}>
                                    {field.value ? (
                                      <img
                                        alt="profilePicture"
                                        src={field.value instanceof Blob ? URL.createObjectURL(field.value) : field.value}
                                        style={{ width: '160px', height: '160px', borderRadius: '50%', zIndex: 0, objectFit: 'cover' }}
                                      />
                                    ) : userinfo?.profilePicture ? (
                                      <img
                                        alt="profilePicture"
                                        src={userinfo.profilePicture}
                                        style={{ width: '160px', height: '160px', borderRadius: '50%', zIndex: 0, objectFit: 'cover' }}
                                      />
                                    ) : (
                                      <Avatar
                                        color="inherit"
                                        sx={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover' }}
                                      />
                                    )}
                                    <Tooltip title="Edit Profile Picture">
                                      <>
                                        <IconButton
                                          component="label"
                                          /* sx={{
                                      position: 'absolute',
                                      bottom: '0',
                                      right: '5px',
                                      width: '50%',
                                      maxWidth: '54px',
                                      overflow: 'hidden',
                                      zIndex: 2,
                                      color: '#00ADEE'
                                    }} */
                                          sx={{
                                            position: 'absolute',
                                            bottom: '8px',
                                            right: '20px',
                                            width: '25px',
                                            height: '25px',
                                            overflow: 'hidden',
                                            zIndex: 2,
                                            color: '#00ADEE',
                                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                                            borderRadius: '50%',
                                            padding: '14px !important'
                                          }}
                                        >
                                          <AddCircleIcon fontSize="large" />
                                          <Input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                              field.onChange(e.target.files[0]);
                                              // Add code to display the selected image
                                            }}
                                          />
                                        </IconButton>
                                      </>
                                    </Tooltip>
                                  </Box>
                                  {errors.profilePicture && (
                                    <FormHelperText sx={{ color: '#F42525' }}>{errors.profilePicture?.message}</FormHelperText>
                                  )}
                                </Stack>
                              </>
                            )}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} lg={4} width="100%" sx={{ margin: 'auto' }}>
                        <Stack direction="column" spacing={{ xs: 2, lg: 3 }}>
                          <Stack width={{ xs: '100%' }} flexWrap="wrap">
                            <Box>
                              <Typography
                                variant="h5"
                                fontSize="14px"
                                fontWeight="bold"
                                sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                              >
                                Enter Name
                              </Typography>
                            </Box>

                            <Box>
                              <Controller
                                name="name"
                                defaultValue=""
                                control={control}
                                render={({ field }) => (
                                  <Box>
                                    <CssTextField
                                      {...field}
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      placeholder="Enter your name"
                                      InputProps={{ sx: { borderRadius: '10px' } }}
                                      sx={{
                                        height: '50px'
                                        // '@media (min-width: 1280px)': {
                                        //   width: '400px'
                                        // }
                                      }}
                                      error={!!errors?.name}
                                      helperText={errors.name?.message}
                                    />
                                  </Box>
                                )}
                              />
                            </Box>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} lg={4} width="100%" sx={{ margin: 'auto' }}>
                        <Stack direction="column" spacing={{ xs: 2, lg: 3 }} marginTop={{ xs: 2, lg: 0 }}>
                          <Stack width={{ xs: '100%' }} flexWrap="wrap">
                            <Box>
                              <Typography
                                variant="h5"
                                fontSize="14px"
                                fontWeight="bold"
                                sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                              >
                                Contact
                              </Typography>
                            </Box>
                            <Box>
                              <Controller
                                name="contactNumber"
                                defaultValue=""
                                control={control}
                                render={({ field }) => (
                                  <Box>
                                    <CssTextField
                                      {...field}
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      placeholder="Enter your contact"
                                      InputProps={{ sx: { borderRadius: '10px' } }}
                                      sx={{
                                        height: '50px'
                                        // '@media (min-width: 1280px)': {
                                        //   width: '400px'
                                        // }
                                      }}
                                      error={!!errors?.contactNumber}
                                      helperText={errors.contactNumber?.message}
                                    />
                                  </Box>
                                )}
                              />
                            </Box>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Stack>
                  </Grid>

                  <Stack>
                    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} justifyContent="space-evenly" width="100%">
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography
                            variant="h5"
                            fontSize="14px"
                            fontWeight="bold"
                            sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                          >
                            Email
                          </Typography>
                        </Box>
                        <Box>
                          <Controller
                            name="email"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <CssTextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  placeholder="Enter your email"
                                  InputProps={{ sx: { borderRadius: '10px' } }}
                                  sx={{ height: '50px' }}
                                  error={!!errors?.email}
                                  helperText={errors.email?.message}
                                />
                              </Box>
                            )}
                          />
                        </Box>
                      </Stack>
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography
                            variant="h5"
                            fontSize="14px"
                            fontWeight="bold"
                            sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                          >
                            Admission Number
                          </Typography>
                        </Box>
                        <Box>
                          <Controller
                            name="admissionNumber"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <CssTextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  placeholder="Enter your  Admission Number"
                                  InputProps={{ sx: { borderRadius: '10px' } }}
                                  sx={{ height: '50px' }}
                                  error={!!errors?.admissionNumber}
                                  helperText={errors.admissionNumber?.message}
                                />
                              </Box>
                            )}
                          />
                        </Box>
                      </Stack>
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography
                            variant="h5"
                            fontSize="14px"
                            fontWeight="bold"
                            sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                          >
                            Roll Number
                          </Typography>
                        </Box>
                        <Box>
                          <Controller
                            name="rollNumber"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <CssTextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  placeholder="Enter your Roll Number"
                                  InputProps={{ sx: { borderRadius: '10px' } }}
                                  sx={{ height: '50px' }}
                                  error={!!errors?.rollNumber}
                                  helperText={errors.rollNumber?.message}
                                />
                              </Box>
                            )}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack>
                    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} justifyContent="space-evenly" width="100%">
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography
                            variant="h5"
                            fontSize="14px"
                            fontWeight="bold"
                            sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                          >
                            City
                          </Typography>
                        </Box>
                        <Box>
                          <Controller
                            name="city"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <CssTextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  placeholder="Enter your city"
                                  InputProps={{ sx: { borderRadius: '10px' } }}
                                  sx={{ height: '50px' }}
                                  error={!!errors?.city}
                                  helperText={errors.city?.message}
                                />
                              </Box>
                            )}
                          />
                        </Box>
                      </Stack>
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography
                            variant="h5"
                            fontSize="14px"
                            fontWeight="bold"
                            sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                          >
                            State
                          </Typography>
                        </Box>
                        <Box>
                          <Controller
                            name="state"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <CssTextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  placeholder="Enter your state"
                                  InputProps={{ sx: { borderRadius: '10px' } }}
                                  sx={{ height: '50px' }}
                                  error={!!errors?.state}
                                  helperText={errors.state?.message}
                                />
                              </Box>
                            )}
                          />
                        </Box>
                      </Stack>
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography
                            variant="h5"
                            fontSize="14px"
                            fontWeight="bold"
                            sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                          >
                            Country
                          </Typography>
                        </Box>
                        <Box>
                          <Controller
                            name="country"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <CssTextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  placeholder="Enter your country"
                                  InputProps={{ sx: { borderRadius: '10px' } }}
                                  sx={{ height: '50px' }}
                                  error={!!errors?.country}
                                  helperText={errors.country?.message}
                                />
                              </Box>
                            )}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack>
                    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} justifyContent="space-evenly" width="100%">
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography
                            variant="h5"
                            fontSize="14px"
                            fontWeight="bold"
                            sx={{ color: '#636363', justifySelf: 'flex-start', marginBottom: '5px' }}
                          >
                            Password
                          </Typography>
                        </Box>
                        <Box>
                          <Controller
                            name="password"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <CssTextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  placeholder="Enter your Password"
                                  InputProps={{ sx: { borderRadius: '10px' } }}
                                  sx={{ height: '50px' }}
                                  error={!!errors?.password}
                                  helperText={errors.password?.message}
                                />
                              </Box>
                            )}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack>
                    <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="flex-end" width="100%">
                      {isLoading ? (
                        <ThreeDots
                          visible={true}
                          height="80"
                          width="80"
                          color="#00ADEE"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 2
                          }}
                          wrapperClass=""
                        />
                      ) : null}
                      <Button
                        variant="outlined"
                        type="submit"
                        size="small"
                        sx={{
                          border: '1px solid #39C9FE',
                          color: '#39C9FE',
                          borderRadius: '100px',
                          marginTop: {
                            xs: '8px',
                            lg: '0'
                          }
                        }}
                      >
                        Save
                      </Button>
                    </Stack>
                  </Stack>
                </>
              )}
            </Stack>
          </form>
        </Grid>
      </Grid>
      <Paper sx={{ mt: '30px', borderRadius: '15px' }}>
        <Gallery />
      </Paper>
    </>
  );
};

export default ProfileUpdate;
