import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ApartmentIcon from '@mui/icons-material/Apartment';
// import SchoolIcon from '@mui/icons-material/School';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LanguageIcon from '@mui/icons-material/Language';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import Avatar from '@mui/material/Avatar';

/* import { Button, Box, TextField } from '@mui/material';

import { toast } from 'react-toastify'; */

import { useParams } from 'react-router-dom';
import { singleStudent } from '../../../store/redux/userSlice';

const SingleStudent = () => {
  const { studentId } = useParams();
  console.warn(' studentId-->', studentId);
  const studentProfileData = useSelector((state) => state.userAuth.singleStudent);
  console.warn('studentProfile---->', studentProfileData);
  useEffect(() => {
    dispatch(singleStudent(studentId));
    // eslint-disable-next-line
  }, [studentId]);
  const dispatch = useDispatch();

  return (
    <Paper sx={{ p: 2 }}>
      {/* Content */}

      <Stack spacing={2} mb={4}>
        <Typography variant="h2">Student Profile</Typography>
      </Stack>
      <Grid container spacing={2}>
        {/* First Grid Item */}
        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            alt="Remy Sharp"
            src={studentProfileData?.profilePicture ? studentProfileData?.profilePicture : ''}
            sx={{ bgcolor: '#38C7FC', width: 156, height: 156 }}
          />
        </Grid>

        {/* Second Grid Item */}
        <Grid item xs={12} md={9}>
          <Stack direction={'column'} spacing={2}>
            <Stack>
              <Typography variant="h3">{studentProfileData?.name ? studentProfileData?.name : 'Null'} </Typography>
            </Stack>
            <Stack direction={{ xs: 'row' }} spacing={2}>
              <Stack direction={{ xs: 'row' }} spacing={0.5}>
                <MailOutlineIcon fontSize="small" />
                <Typography variant="h5">{studentProfileData?.email ? studentProfileData?.email : 'Null'}</Typography>
              </Stack>
              <Stack direction={{ xs: 'row' }} spacing={0.5}>
                <LocationCityIcon fontSize="small" />
                <Typography variant="h5">{studentProfileData?.city ? studentProfileData?.city : 'Null'}</Typography>
              </Stack>
              <Stack direction={{ xs: 'row' }} spacing={0.5}>
                <ApartmentIcon fontSize="small" />
                <Typography variant="h5">{studentProfileData?.state ? studentProfileData?.state : 'Null'}</Typography>
              </Stack>
              <Stack direction={{ xs: 'row' }} spacing={0.5}>
                <LanguageIcon fontSize="small" />
                <Typography variant="h5">{studentProfileData?.country ? studentProfileData?.country : 'Null'}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Stack mt={2} spacing={2}>
        <Typography variant="h3">Contact Number</Typography>
        <Stack direction={{ xs: 'row' }} spacing={2}>
          <LocalPhoneIcon fontSize="small" />

          <Typography variant="body1">{studentProfileData?.contactNumber ? studentProfileData?.contactNumber : 'Null'}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SingleStudent;
