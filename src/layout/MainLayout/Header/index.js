import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';
import Grid from '@mui/material/Grid';
// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 268,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>

        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              color: theme.menuSelected,
              background: 'linear-gradient(90deg, rgba(57,201,254,1) 0%, rgba(2,100,136,1) 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, rgba(57,201,254,1) 0%, rgba(2,100,136,1) 100%)',
                color: theme.menuSelected
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      {/* <Box
        sx={{
          ml: 2,
          mr: 1,
          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        }}
      >
        <Typography variant="h4">Hello Author</Typography>
      </Box> */}
      {/* notification & profile */}
      {/* <NotificationSection /> */}
      {/* <ProfileSection /> */}

      {/* <SearchSection /> */}
      {/* <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} /> */}

      <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
        {/* Left side content goes here (if any) */}

        {/* Right side content */}
        {/* <Grid item>
          <NotificationSection />
        </Grid> */}

        <Grid item>
          <ProfileSection />
        </Grid>
      </Grid>
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
