import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUser } from '../../../store/redux/userSlice';
import Avatar from '@mui/material/Avatar';
import { ThreeDots } from 'react-loader-spinner';

const Teacher = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userAuth?.user);
  const isLoading = useSelector((state) => state.userAuth?.isLoading);
  const studentList = useSelector((state) => (state.userAuth?.studentList?.students ? state.userAuth?.studentList?.students : []));

  // const schoolId = localStorage.getItem('schoolId');
  // const classId = localStorage.getItem('classId');
  useEffect(() => {
    dispatch(getUser({ page: 1, limit: 3 }));
    // dispatch(getStudent({ schoolId: schoolId, classId: classId, page: 1, limit: 3 }));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div>
      <Box
        sx={{
          background: 'linear-gradient(90deg, rgba(57,201,254,1) 0%, rgba(2,100,136,1) 100%)',
          padding: '40px 35px',
          borderRadius: '20px',
          color: 'white',
          marginBottom: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography gutterBottom variant="h2" sx={{ fontSize: '34px', color: 'white' }}>
              Welcome to the Dashboard
            </Typography>
            <Typography variant="body1">Home / Dashboard</Typography>
          </Grid>
          <Grid item>
            <Link to={'/createyearbook'}>
              <Button
                variant="contained"
                sx={{
                  height: '50px',
                  padding: '0px 20px',
                  borderRadius: '100px',
                  fontWeight: 600,
                  fontSize: '14px',
                  marginTop: { xs: '10px' }
                }}
              >
                Create Yearbook
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
      {/* end */}

      <Grid container spacing={2}>
        <Grid item container xs={12} sm={12} md={12} lg={8.5}>
          <Stack spacing={2} width="100%">
            <Stack xs={12} sm={12} md={12} lg={12} backgroundColor="#ffffff" borderRadius="15px">
              {/* FIRST CONTAINER  STARTS HERE */}
              <Stack spacing={2} p={4} sx={{ alignItems: isLoading && 'center' }}>
                {/* 111 */}
                {isLoading ? (
                  <ThreeDots
                    visible={true}
                    height="50"
                    width="50"
                    color="#00ADEE"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperClass=""
                  />
                ) : (
                  <>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                
                  <Typography variant="h2" fontSize="16px" fontWeight="bold">
                    Profile Section
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      border: '1px solid #39C9FE',
                      color: '#39C9FE',
                      borderRadius: '100px',
                      '&:hover': {
                        background: ' linear-gradient(90deg, rgba(57,201,254,1) 0%, rgba(2,100,136,1) 100%)',
                        color: '#FFFFFF'
                      }
                    }}
                    component={Link}
                    to="/profileupdate"
                  >
                    Update profile
                  </Button>
                </Stack>

                {/* 2222 */}
                <Box>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2, md: 2, lg: 4 }} width="100%">
                      <Stack alignSelf={{ xs: 'center', sm: 'flex-start' }}>
                        {userData?.user?.profilePicture ? (
                          <img
                            src={userData?.user?.profilePicture}
                            alt="profilepicture"
                            style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          <Avatar color="inherit" sx={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: '50%' }} />
                        )}
                      </Stack>
                      <Stack
                        direction={{ md: 'row' }}
                        justifyContent={{ md: 'space-between' }}
                        alignItems={{ md: 'center' }}
                        spacing={{ xs: 2, md: 0 }}
                        width="100%"
                      >
                        <Stack spacing={2} minWidth={'260px'} maxWidth={'320px'}>
                          <Typography
                            variant="h5"
                            fontSize="25px"
                            style={{}}
                            sx={{ textTransform: 'capitalize', color: '#33aad6', width: '100%' }}
                          >
                            {userData?.user?.name}
                          </Typography>
                          <Stack direction="row" spacing={1} width={{ xs: '100%' }} flexWrap="wrap" alignItems="center">
                            <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
                              School Name :
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              fontSize={{ xs: '13px', sm: '14px' }}
                              // sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '190px', minWidth: '189px', flex: '1' }}
                              justifySelf={'flex-start'}
                            >
                              {userData?.schoolName}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} width={{ xs: '100%' }} flexWrap="wrap" alignItems="center">
                            <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
                              Qualification:
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              fontSize={{ xs: '13px', sm: '14px' }}
                              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: '1' }}
                              justifySelf={'flex-start'}
                            >
                              {userData?.user?.qualification}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} width={{ xs: '100%' }} flexWrap="wrap" alignItems="center">
                            <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
                              Email :
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              fontSize={{ xs: '13px', sm: '14px' }}
                              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: '1' }}
                              justifySelf={'flex-start'}
                            >
                              {userData?.user?.email}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack spacing={2} paddingTop={{ md: '8px' }}>
                          <Stack direction="row" spacing={1} width={{ xs: '100%' }} flexWrap="wrap" alignItems="center">
                            <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
                              Experience:
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              fontSize={{ xs: '13px', sm: '14px' }}
                              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: '1' }}
                              justifySelf={'flex-start'}
                            >
                              {userData?.user?.experience}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} width={{ xs: '100%' }} flexWrap="wrap" alignItems="center">
                            <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363', justifySelf: 'flex-start' }}>
                              Class :
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              fontSize={{ xs: '13px', sm: '14px' }}
                              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: '1' }}
                              justifySelf={'flex-start'}
                            >
                              {userData?.className}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>

                {/* 3333 */}
                <Box>
                  <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} spacing={{ xs: 1, sm: 1, md: 2, lg: 10 }} gap={5}>
                    <Stack spacing={2} alignItems="center">
                      <Stack direction="row" spacing={1} width={{ xs: '100%' }} flexWrap="wrap" alignItems="center">
                        <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363' }}>
                          City:
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          fontSize={{ xs: '13px', sm: '14px' }}
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: '1' }}
                        >
                          {/* {user.city} */}
                          {userData?.user?.city}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} width={{ xs: '100%' }} flexWrap="wrap" alignItems="center">
                        <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363' }}>
                          State :
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          fontSize={{ xs: '13px', sm: '14px' }}
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: '1' }}
                        >
                          {userData?.user?.state}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} width={{ xs: '100%' }} flexWrap="wrap" alignItems="center">
                        <Typography variant="h5" fontSize="14px" fontWeight="bold" sx={{ color: '#636363' }}>
                          Country :
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          fontSize={{ xs: '13px', sm: '14px' }}
                          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: '1' }}
                        >
                          {userData?.user?.country}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
                </>
                )}
              </Stack>
              
             
            </Stack>
            {/* FIRST CONTAINER  ENDS HERE */}
            <Stack sx={{ backgroundColor: '#ffffff', borderRadius: '15px' }} p={3}>
              <Stack direction={{ xs: 'column', md: 'row' }} md={{ alignItems: 'center' }} flexWrap="wrap">
                <Stack direction={'column'} spacing={2} width="100%">
                  <Stack>
                    <Typography variant="h2" fontSize="16px" fontWeight="bold" paddingLeft="7px">
                      Students
                    </Typography>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" justifyContent="space-between" marginTop={{ xs: '5px' }}>
                    {studentList?.map((student) => (
                      <Stack key={student._id} direction="row" spacing={4} alignItems="center" m={1}>
                        <Stack>
                          <Stack sx={{ position: 'relative', width: '50px' }}>
                            <Avatar src={student?.profilePicture} sx={{ width: '50px', height: '50px' }} />
                          </Stack>
                        </Stack>
                        <Stack direction="column">
                          <Typography fontSize={18} fontWeight="semiBold" sx={{ color: '#4299BE' }}>
                            {student?.name}
                          </Typography>
                          <Typography variant="subtitle2" fontSize="14px">
                            {student?.classId?.className}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item container xs={12} sm={12} md={12} lg={3.5}>
          <Stack spacing={2} width="100%">
            <Stack p={2} backgroundColor="#FFFFFF" borderRadius="12px" rowGap={1} mb={2}>
              <Typography variant="h2" fontSize="16px" fontWeight="bold" mb={1}>
                How to make yearbook
              </Typography>
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/MlNNGeusB7M?si=AtC5YK0RNQk563lj"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  '@media (maxWidth: 1200px)': {
                    height: '400px'
                  },
                  borderRadius: '10px',
                  border: '0'
                }}
              ></iframe>
            </Stack>
            <Stack backgroundColor="#FFFFFF" p={2} borderRadius="12px" display={{ xs: 'none', lg: 'block' }}>
              <Avatar
                src={userData?.user?.profilePicture}
                sx={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                variant="square"
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Teacher;
