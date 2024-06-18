import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import CustomProfileImage from '../customComponent/CustomProfileImage';
import { Button } from '@mui/material';
// import { BarChart } from '@mui/x-charts/BarChart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import StyleIcon from '@mui/icons-material/Style';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
// import Imagesuser from '../../assets/images/3.png';
// import TeacherImg from '../../assets/images/user.jpg';
import AddStudentModal from '../dashboard/Students/AddStudentModal';
import { useDispatch, useSelector } from 'react-redux';
import { getStudent, teacherCardDetails } from '../../store/redux/userSlice';
import { ThreeDots } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import { eventsList } from '../../store/redux/EventSlice';

// import { ThreeDots } from 'react-loader-spinner';

const AdminDashboard = () => {
  const [addStudent, setAddStudent] = useState(false);
  const page = useSelector((state) => state.userAuth?.page);
  const studentList = useSelector((state) => state.userAuth?.studentList);
  const isLoading = useSelector((state) => state.userAuth?.isLoading);
  const teacherCardsInfo = useSelector((state) => state.userAuth?.teacherCardsInfo);
  const dashboardEventsList = useSelector((state) => state.events?.dashboardEventsList);
  const loading = useSelector((state) => state.events?.loading);
 /*  console.warn('teacherCardsInfo---', teacherCardsInfo);
  console.warn('dashboardEventsList ---', dashboardEventsList); */
  const schoolId = localStorage.getItem('schoolId');
  const classId = localStorage.getItem('classId');
  const dispatch = useDispatch();

  const handleClose = () => {
    setAddStudent(false);
  };

  useEffect(() => {
    // dispatch(getStudent({ schoolId: schoolId, classId: classId, page: page, limit: rowsPerPage }));
    // dispatch(getStudent());
    dispatch(getStudent({ page: page, search: '', limit: 6, classId: classId, schoolId: schoolId }))
      .unwrap()
      .then(() => {
        return dispatch(teacherCardDetails({ schoolId: schoolId, classId: classId }));
      })
      .then(() => {
        dispatch(eventsList({ schoolId: schoolId, classId: classId, page: 1, limit: 6 }));
      });

    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <AddStudentModal open={addStudent} handleClose={handleClose} />
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
              Welcome to the School days 365
            </Typography>
            <Typography variant="body1">Home / Dashboard</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                height: '52px',
                padding: '4px 20px 0px 20px',
                borderRadius: '100px',
                fontWeight: 600,
                fontSize: '14px',
                marginTop: { xs: '10px' }
              }}
              onClick={() => setAddStudent(true)}
            >
              Add New Student
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item container xs={12} sm={6} md={4} lg={3}>
          <Stack spacing={2} width="100%">
            <Stack xs={12} sm={12} md={4} lg={4} backgroundColor="#FFFFFF" borderRadius="15px" className="raw-ink-top">
              <Stack spacing={2} p={3}>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={16} variant="h2" fontWeight="bold" className="text-title">
                    Students <ArrowOutwardIcon> </ArrowOutwardIcon>
                  </Typography>
                </Stack>

                <Box>
                  <h2 className="number-title">{teacherCardsInfo?.students ? teacherCardsInfo?.students : 'N/A'}</h2>
                  <span className="icon-card">
                    <GroupsIcon></GroupsIcon>
                  </span>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item container xs={12} sm={6} md={4} lg={3}>
          <Stack spacing={2} width="100%">
            <Stack xs={12} sm={12} md={4} lg={4} backgroundColor="#FFFFFF" borderRadius="15px" className="raw-ink-top">
              <Stack spacing={2} p={3}>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={16} variant="h2" fontWeight="bold" className="text-title">
                    Events
                    <ArrowOutwardIcon> </ArrowOutwardIcon>
                  </Typography>
                </Stack>

                <Box>
                  <h2 className="number-title">{teacherCardsInfo?.events ? teacherCardsInfo?.events : 'N/A'}</h2>
                  <span className="icon-card">
                    <PersonIcon></PersonIcon>
                  </span>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item container xs={12} sm={6} md={4} lg={3}>
          <Stack spacing={2} width="100%">
            <Stack xs={12} sm={12} md={4} lg={4} backgroundColor="#FFFFFF" borderRadius="15px" className="raw-ink-top">
              <Stack spacing={2} p={3}>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={16} variant="h2" fontWeight="bold" className="text-title">
                    Yearbook created
                    <ArrowOutwardIcon> </ArrowOutwardIcon>
                  </Typography>
                </Stack>

                <Box>
                  <h2 className="number-title">800</h2>
                  <span className="icon-card">
                    <LocalLibraryIcon></LocalLibraryIcon>
                  </span>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item container xs={12} sm={6} md={4} lg={3}>
          <Stack spacing={2} width="100%">
            <Stack xs={12} sm={12} md={4} lg={4} backgroundColor="#FFFFFF" borderRadius="15px" className="raw-ink-top">
              <Stack spacing={2} p={3}>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={16} variant="h2" fontWeight="bold" className="text-title">
                    Templates
                    <ArrowOutwardIcon> </ArrowOutwardIcon>
                  </Typography>
                </Stack>

                <Box>
                  <h2 className="number-title">50</h2>
                  <span className="icon-card">
                    <StyleIcon></StyleIcon>
                  </span>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mrgin-top">
        <Grid item container xs={12} sm={12} md={12} lg={6}>
          <Stack spacing={2} width="100%">
            <Stack xs={12} sm={12} md={4} lg={4} backgroundColor="#FFFFFF" borderRadius="15px" className="raw-ink">
              <Stack spacing={2} p={4}>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={16} variant="h2" fontWeight="bold">
                    Your Students
                  </Typography>
                  <NavLink to="/students" style={{ color: '#38C7FC', textDecoration: 'none' }}>
                    View All
                  </NavLink>
                </Stack>

                <Box className="content-wrap">
                  <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
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
                    ) : studentList.length === 0 ? (
                      <ListItemText
                        primary=""
                        secondary={
                          <React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                              No Students Found
                            </Typography>
                            {' 16035'}
                          </React.Fragment>
                        }
                      />
                    ) : (
                      studentList.map((student) => {
                        return (
                          <>
                            <ListItem alignItems="flex-start" className="item-list" key={student._id}>
                              <ListItemAvatar>
                                <Avatar alt="Remy Sharp1" src={student?.profilePicture ? student?.profilePicture : ''} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={student.name}
                                secondary={
                                  <React.Fragment>
                                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                      {student?.schoolId?.schoolname ? student?.schoolId?.schoolname : 'N/A'}
                                    </Typography>
                                    {' 16035'}
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider  component="li" />
                          </>
                        );
                      })
                    )}
                  </List>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item container xs={12} sm={12} md={12} lg={6}>
          <Stack spacing={2} width="100%">
            <Stack xs={12} sm={12} md={4} lg={4} backgroundColor="#FFFFFF" borderRadius="15px" className="raw-ink">
              <Stack spacing={2} p={4}>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={16} variant="h2" fontWeight="bold">
                    Events
                  </Typography>
                 {/*  <a href="#" className="view-all">
                    View All{' '}
                  </a> */}
                </Stack>

                <Box className="content-wrap">
                  <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                    {loading ? (
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
                    ) : dashboardEventsList.length === 0 ? (
                      <ListItemText
                        primary=""
                        secondary={
                          <React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                              No Events Found
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    ) : (
                      dashboardEventsList.map((events) => {
                        return (
                          <>
                            <ListItem alignItems="flex-start" className="item-list" key={events._doc._id}>
                              <ListItemAvatar>
                                <Avatar alt={events?._doc?.title?.slice(0, 1).toUpperCase()} src={'./'} />
                              </ListItemAvatar>
                              <ListItemText
                                primary=""
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: 'inline', marginTop: '10px' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                      gutterBottom
                                    >
                                      {events._doc.title}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider  component="li" />
                          </>
                        );
                      })
                    )}
                  </List>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default AdminDashboard;
