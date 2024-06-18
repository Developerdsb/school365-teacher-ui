import React, { useEffect, useRef } from 'react';
import { Grid, Typography, Stack, Box, TextField, Button, Tooltip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUser, updateUser } from '../../../store/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IconButton, Input } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ThreeDots } from 'react-loader-spinner';

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

// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const schema = Yup.object({
  name: Yup.string().required('Please enter name').min(3),
  qualification: Yup.string().nullable().required('Please enter qualification'),
  experience: Yup.string().nullable().required('Please enter experience'),
  city: Yup.string().nullable().required('Please enter city'),
  state: Yup.string().nullable().required('Please enter state'),
  country: Yup.string().nullable().required('Please enter country'),
  profilePicture: Yup.mixed().required('Image is required')
});

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userAuth?.user);
  const isLoading = useSelector((state) => state.userAuth?.isLoading);
  const fileInputRef = useRef(null);

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
    dispatch(getUser());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setValue('profilePicture', userData?.user?.profilePicture || '');
    setValue('name', userData?.user?.name || '');
    setValue('qualification', userData?.user?.qualification || '');
    setValue('experience', userData?.user?.experience || '');
    setValue('city', userData?.user?.city || '');
    setValue('state', userData?.user?.state || '');
    setValue('country', userData?.user?.country || '');
    // eslint-disable-next-line
  }, [userData]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('_id', userData?.user?._id);
    formData.append('schoolId', userData?.user?.schoolId);
    formData.append('profilePicture', data.profilePicture);
    formData.append('name', data.name);
    formData.append('qualification', data.qualification);
    formData.append('experience', data.experience);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('country', data.country);

    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        navigate('/');
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
            >
              <Stack width="100%" direction="row" justifyContent={{ xs: 'center', lg: 'flex-start' }}>
                <Typography variant="h2" fontSize="16px" fontWeight="bold">
                  Update your profile
                </Typography>
              </Stack>
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
                                <Tooltip title="Edit Profile Picture">
                                  <>
                                    <Box style={{ cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>
                                      {field.value ? (
                                        <img
                                          alt="profilePicture"
                                          src={field.value instanceof Blob ? URL.createObjectURL(field.value) : field.value}
                                          style={{ width: '160px', height: '160px', borderRadius: '50%', zIndex: 0, objectFit: 'cover' }}
                                        />
                                      ) : userData?.user?.profilePicture ? (
                                        <img
                                          alt="profilePicture"
                                          src={userData?.user?.profilePicture}
                                          style={{ width: '160px', height: '160px', borderRadius: '50%', zIndex: 0, objectFit: 'cover' }}
                                        />
                                      ) : (
                                        <Avatar
                                          color="inherit"
                                          sx={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                      )}
                                    </Box>

                                    <IconButton
                                      component="label"
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
                                        ref={fileInputRef}
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
                  <Grid item xs={12} lg={4} width="100%">
                    <Stack direction="column" spacing={{ xs: 2, lg: 3 }}>
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
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
                                  error={errors.name?.message}
                                  helperText={errors.name?.message}
                                />
                              </Box>
                            )}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} lg={4} width="100%">
                    <Stack direction="column" spacing={{ xs: 2, lg: 3 }} marginTop={{ xs: 2, lg: 0 }}>
                      <Stack width={{ xs: '100%' }} flexWrap="wrap">
                        <Box>
                          <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
                            Qualification
                          </Typography>
                        </Box>
                        <Box>
                          <Controller
                            name="qualification"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Box>
                                <CssTextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  placeholder="Enter your qualification"
                                  InputProps={{ sx: { borderRadius: '10px' } }}
                                  sx={{
                                    height: '50px'
                                    // '@media (min-width: 1280px)': {
                                    //   width: '400px'
                                    // }
                                  }}
                                  error={errors.qualification?.message}
                                  helperText={errors.qualification?.message}
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
                      <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
                        Experience
                      </Typography>
                    </Box>
                    <Box>
                      <Controller
                        name="experience"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Box>
                            <CssTextField
                              {...field}
                              fullWidth
                              size="small"
                              variant="outlined"
                              placeholder="Enter your experience"
                              InputProps={{ sx: { borderRadius: '10px' } }}
                              sx={{ height: '50px' }}
                              error={errors.experience?.message}
                              helperText={errors.experience?.message}
                            />
                          </Box>
                        )}
                      />
                    </Box>
                  </Stack>
                  <Stack width={{ xs: '100%' }} flexWrap="wrap">
                    <Box>
                      <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
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
                              error={errors.city?.message}
                              helperText={errors.city?.message}
                            />
                          </Box>
                        )}
                      />
                    </Box>
                  </Stack>
                  <Stack width={{ xs: '100%' }} flexWrap="wrap">
                    <Box>
                      <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
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
                              error={errors.state?.message}
                              helperText={errors.state?.message}
                            />
                          </Box>
                        )}
                      />
                    </Box>
                  </Stack>
                  <Stack width={{ xs: '100%' }} flexWrap="wrap">
                    <Box>
                      <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
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
                              error={errors.country?.message}
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
                <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="flex-end" width="100%">
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
                        transform: 'translate(-50%, -50%)'
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
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileUpdate;
