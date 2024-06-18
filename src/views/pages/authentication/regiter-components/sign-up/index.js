import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Picture from '../../../authentication/left-side';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { styled } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';
import appLogo from '../../../../../assets/images/appLogo.png';
import { Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getClasses, getSchools } from '../../../../../store/redux/userSlice';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import Autocomplete from '@mui/material/Autocomplete';
import { registerUser } from '../../../../../store/redux/userSlice';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').matches(emailRegex, 'Please enter valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  schoolId: yup.string().nullable().required('School Name is required'),
  classId: yup.string().required('Class Name is required')
});

const FromUI = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '0 10%'
  },
  [theme.breakpoints.between('sm', 'md')]: {
    padding: '0 20%'
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 25%'
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 15%'
  }
}));

export default function Signup() {
  const [isSchoolSelected, setIsSchoolSelected] = useState(null);
  const userStatus = useSelector((state) => state.userAuth.userRegister.created);
  const isLoading = useSelector((state) => state.userAuth.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schoolData = useSelector((state) => state.userAuth?.schools?.schools || []);
  const classdata = useSelector((state) => state.userAuth?.classes?.classDetails || []);
  const signupStatus = useSelector((state) => state.userAuth?.userRegister?.created);

  const { handleSubmit, control, formState, setValue, clearErrors } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    dispatch(getClasses({ page: 1, limit: 5, search: '' }));
    dispatch(getSchools({ page: 1, limit: 5, search: '' }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (signupStatus) {
      toast('SignUp Successfull!');
      setTimeout(() => {
        navigate('/sign-in');
      }, 1000);
    }
    // eslint-disable-next-line
  }, [userStatus, navigate]);

  const setSearchCatg = (e) => {
    dispatch(getSchools({ page: 1, limit: 5, search: e }));
  };

  const setSearchClass = (e) => {
    dispatch(getClasses({ page: 1, limit: 5, search: e }));
  };

  const onSubmit = async (data) => {
    dispatch(registerUser({ ...data }));
  };

  const handleNavigate = () => {
    window.location.href = 'https://schooldays365.com';
  };

  return (
    <>
      <Grid container>
        <Grid item lg={6} md={false} xs={false} sm={false} sx={{ margin: '0 auto' }}>
          <Picture />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} pb={2} sx={{ backgroundColor: ' #F0F0F0' }}>
          <FromUI>
            <Grid container direction="column" justifyContent="center" sx={{ minHeight: '100vh' }}>
              <Grid item xs={12} sx={{ display: { xs: 'none', lg: 'block' } }}>
                <CardMedia
                  component="img"
                  sx={{ margin: '3px auto 10px auto' }}
                  image={appLogo}
                  alt="schoolDays365 Logo"
                  style={{ width: '170px', height: 'auto' }}
                  onClick={handleNavigate}
                />
              </Grid>
              <Grid item xs={12} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                <Typography component="h1" variant="h2" fontWeight={600}>
                  Signup
                </Typography>
              </Grid>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  alignContent={'center'}
                  flexDirection={'column'}
                  flexWrap="wrap"
                  style={{ height: '95px' }}
                >
                  <Typography fontWeight={500} style={{ marginBottom: '10px' }}>
                    Name
                  </Typography>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        style={{
                          width: '100%'
                        }}
                        required
                        size="small"
                        placeholder="Type your name"
                        error={!!formState.errors.name}
                        helperText={formState.errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  alignContent={'center'}
                  flexDirection={'column'}
                  flexWrap="wrap"
                  style={{ height: '95px' }}
                >
                  <Typography fontWeight={500} style={{ marginBottom: '10px' }}>
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
                        required
                        size="small"
                        placeholder="example@123"
                        error={!!formState.errors.email}
                        helperText={formState.errors.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  alignContent={'center'}
                  flexDirection={'column'}
                  flexWrap="wrap"
                  style={{ height: '95px' }}
                >
                  <Typography fontWeight={500} style={{ marginBottom: '10px' }}>
                    School Name
                  </Typography>
                  <Controller
                    name="schoolId"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <>
                        <Autocomplete
                          value={schoolData.find((option) => option._id === field.value)} // Find the selected option based on the field value
                          onChange={(event, value) => {
                            setIsSchoolSelected(value?._id);
                            setValue('schoolId', value?._id); // Update react-hook-form's value with the _id of the selected option
                            clearErrors('schoolId');
                          }}
                          onInputChange={(e, val) => setSearchCatg(val)}
                          options={schoolData}
                          getOptionLabel={(option) => option?.schoolname || ''}
                          filterOptions={(options) => options}
                          style={{ width: '100%' }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...field}
                              placeholder="Select Your school"
                              required
                              size="small"
                              error={!!formState.errors.schoolId}
                              helperText={formState.errors.schoolId?.message}
                            />
                          )}
                        />
                      </>
                    )}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  alignContent={'center'}
                  flexDirection={'column'}
                  flexWrap="wrap"
                  style={{ height: '95px' }}
                >
                  <Typography fontWeight={500} style={{ marginBottom: '10px' }}>
                    Class
                  </Typography>
                  <Controller
                    name="classId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        {isSchoolSelected ? (
                          <Autocomplete
                            value={classdata.find((option) => option._id === field.value)} // Find the selected option based on the field value
                            onChange={(event, value) => {
                              setValue('classId', value?._id); // Update react-hook-form's value with the _id of the selected option
                              clearErrors('classId');
                            }}
                            onInputChange={(e, val) => setSearchClass(val)}
                            options={classdata}
                            getOptionLabel={(option) => option?.className || ''}
                            filterOptions={(options) => options}
                            style={{ width: '100%' }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                {...field}
                                placeholder="Select Your class"
                                required
                                size="small"
                                error={!!formState.errors.classId}
                                helperText={formState.errors.classId?.message}
                              />
                            )}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            {...field}
                            placeholder="Please Select School First"
                            size="small"
                            error={!!formState.errors.classId}
                            helperText={formState.errors.classId?.message}
                            disabled
                          />
                        )}
                      </>
                    )}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  alignContent={'center'}
                  flexDirection={'column'}
                  flexWrap="wrap"
                  style={{ height: '95px' }}
                >
                  <Typography fontWeight={500} style={{ marginBottom: '10px' }}>
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
                        required
                        size="small"
                        placeholder="Enter your password"
                        error={!!formState.errors.password}
                        helperText={formState.errors.password?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {isLoading ? (
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
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2
                      }}
                      wrapperClass=""
                    />
                  ) : null}
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      background: '#00ADEE',
                      color: '#fff',
                      borderRadius: '10px',
                      boxShadow: '0px 4px 4px 0 #00000025',
                      textTransform: 'none',
                      fontSize: '20px'
                    }}
                    sx={{ px: 6, mb: 1 }}
                  >
                    SignUp
                  </Button>{' '}
                </Grid>
              </Box>

              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body1" fontSize={17}>
                    Already have an account?{' '}
                    <Link
                      href="/sign-in"
                      variant="body1"
                      fontSize={17}
                      style={{ textDecoration: 'underline', color: '#70D8FE', cursor: 'pointer' }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    onClick={handleNavigate}
                    style={{ textDecoration: 'underline', color: '#70D8FE', cursor: 'pointer', fontSize: '17px' }}
                  >
                    Go Back to Homepage
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </FromUI>
        </Grid>
      </Grid>
    </>
  );
}
