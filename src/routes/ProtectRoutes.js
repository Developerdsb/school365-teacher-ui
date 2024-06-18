import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CircleProgress from '../ui-component/CircularProgress';
import { Grid } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  if (loading) {
    return (
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        {' '}
        <CircleProgress />
      </Grid>
    );
  }

  return authenticated ? children : <Navigate to="/sign-in" replace={true} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node
};
export default ProtectedRoute;
