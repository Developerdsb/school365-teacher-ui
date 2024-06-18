import React, { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../../store/redux/userSlice';
import { toast } from 'react-toastify';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, ClickAwayListener, List, ListItemButton, ListItemIcon, ListItemText, Popper, Typography } from '@mui/material';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';

// assets
import { IconLogout } from '@tabler/icons';
const route = '/sign-in';
// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userAuth?.user);

  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleLogout = async () => {
    try {
      // await dispatch(logoutUser());
      localStorage.removeItem('schoolId');
      localStorage.removeItem('classId');
      localStorage.removeItem('teacherId');
      localStorage.removeItem('authToken');
      setOpen(false);
      if (route && route !== '') {
        toast('Logout Successfull!');
        setTimeout(() => {
          navigate(route);
        }, 1000);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error if needed
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Avatar
        src={userData?.user?.profilePicture}
        sx={{
          ...theme.typography.mediumAvatar,
          margin: '8px 8px 8px 8px !important',
          cursor: 'pointer'
        }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleToggle}
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <ClickAwayListener onClickAway={handleClose}>
              <MainCard
                border={false}
                elevation={16}
                content={false}
                boxShadow
                shadow={theme.shadows[16]}
                sx={{
                  borderRadius: '100px',

                  textAlign: 'center',
                  fontSize: '13px'
                }}
              >
                <PerfectScrollbar
                  style={{ height: '100%', overflowX: 'hidden' }}
                  options={{ suppressScrollX: true, suppressScrollY: true }}
                >
                  <List
                    component="a"
                    sx={{
                      width: '100%',
                      maxWidth: 350,
                      minWidth: 200,
                      backgroundColor: theme.palette.background.paper,
                      [theme.breakpoints.down('md')]: {
                        minWidth: '100%'
                      },
                      '& .MuiListItemButton-root': {
                        mt: 0
                      }
                    }}
                  >
                    <ListItemButton
                      sx={{
                        borderRadius: `${customization.borderRadius}px`,
                        padding: '8px 15px',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          '& .MuiTypography-root, & svg': {
                            color: '#fff'
                          }
                        }
                      }}
                      onClick={handleLogout}
                    >
                      <ListItemIcon sx={{ color: '#38c7fc' }}>
                        <IconLogout stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ color: '#38c7fc' }}>
                            Logout
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </PerfectScrollbar>
              </MainCard>
            </ClickAwayListener>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
