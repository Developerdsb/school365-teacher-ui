import React, { useEffect, useState, useRef, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { loginUser, setRegistration } from '../../../.././store/redux/userSlice';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Picture from '../left-side';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';
import appLogo from '../../../../assets/images/appLogo.png';
import { ThreeDots } from 'react-loader-spinner';
import config from '../../../../config';

const siteKey = config.ReCAPTCHASiteKey;

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

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(emailRegex, 'Please enter valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

export default function SignIn() {
  const [token, setToken] = useState(null);
  const scriptRef = useRef(null);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userAuth.isLoading);

  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema)
  });

  const loadRecaptchaScript = useCallback(() => {
    scriptRef.current = document.createElement('script');
    scriptRef.current.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    scriptRef.current.async = true;
    scriptRef.current.defer = true;
    scriptRef.current.onload = () => {
      // console.log('reCAPTCHA script loaded');
      refreshToken();
    };
    document.body.appendChild(scriptRef.current);
  }, []);

  const refreshToken = () => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        // console.log('reCAPTCHA ready');
        window.grecaptcha
          .execute(siteKey, { action: 'submit' })
          .then((token) => {
            // console.log('Token generated: ', token);
            setToken(token);
          })
          .catch((error) => {
            console.error('Error executing reCAPTCHA: ', error);
          });
      });
    }
  };

  useEffect(() => {
    loadRecaptchaScript();
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, [loadRecaptchaScript]);

  const handleLogin = async (credentials) => {
    if (!token) {
      toast.error('Captcha verification failed. Please try again.');
      refreshToken();
      return;
    }

    // const newCredentials = { captcha: token, ...credentials };
    const newCredentials = {
      captcha: token,
      email: credentials.email.toLowerCase(), // Convert email to lowercase
      password: credentials.password
    };
    try {
      await dispatch(loginUser(newCredentials))
        .unwrap()
        .then((data) => {
          console.log(data);
          toast.success('Login Successful');
          setTimeout(() => {
            window.location.assign('/');
          }, 1000);
          dispatch(setRegistration({ key: 'status', value: false }));
        });
    } catch (error) {
      console.log('Login failed');
      refreshToken();
    }
  };

  const handleNavigate = () => {
    window.location.href = 'https://schooldays365.com';
  };

  return (
    <Grid container>
      <Grid item lg={7} md={false} xs={false} sm={false}>
        <Picture />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={5} sx={{ backgroundColor: 'white' }}>
        <FromUI>
          <Grid container direction="column" justifyContent="center" sx={{ minHeight: '100vh' }}>
            <Grid item xs={12} sx={{ display: { xs: 'none', lg: 'block' } }} width={'100%'}>
              <CardMedia
                component="img"
                sx={{ margin: '0 400px 40px auto', marginLeft: 'auto', marginBottom: '40px' }}
                image={appLogo}
                alt="schoolDays365 Logo"
                style={{ width: '220px', height: 'auto' }}
                onClick={handleNavigate}
              />
            </Grid>
            <Box component="form" noValidate onSubmit={handleSubmit(handleLogin)}>
              <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                <Typography component="h1" variant="h2" fontWeight={600} fontSize={'34px'} textAlign={'left'}>
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ color: '#c2c3c3', textAlign: 'left', marginTop: '10px', fontSize: '14px' }}>
                <Typography fontWeight={'200'}>Welcome back ! Please Login to your account</Typography>
              </Grid>
              <Grid item xs={12} display={'flex'} alignContent={'flex-start'} flexDirection={'column'} flexWrap="wrap" mt={2} width={'80%'}>
                <Typography fontWeight={500} style={{ marginBottom: '10px', color: 'grey', fontSize: '16px' }}>
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
              <Grid item xs={12} display={'flex'} alignContent={'center'} flexDirection={'column'} flexWrap="wrap" width={'80%'} mt={2}>
                <Typography fontWeight={500} style={{ marginBottom: '10px', color: 'grey', fontSize: '16px' }}>
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
              <Grid container style={{ marginTop: '20px' }}></Grid>
              <Grid item xs={12} sx={{ fontWeight: 'bold', textAlign: 'center' }} width={'80%'}>
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
                    borderRadius: '14px',
                    boxShadow: '0px 4px 4px 0 #00000025',
                    textTransform: 'none',
                    fontSize: '20px',
                    width: '100%',
                    marginTop: '6px'
                  }}
                  sx={{ px: 6, py: 1, my: 2 }}
                  md={{ textAlign: 'left' }}
                >
                  Log in
                </Button>
              </Grid>
            </Box>
          </Grid>
        </FromUI>
      </Grid>
    </Grid>
  );
}
