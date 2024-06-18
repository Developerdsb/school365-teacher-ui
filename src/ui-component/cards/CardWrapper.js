import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MainCard from './MainCard';
import { Box, Breadcrumbs, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Wrapper = styled(MainCard)(() => ({
  backgroundColor: '#A2DE41',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative'
}));

const CardWrapper = ({ title, breadcrumbItems, totalMarks, obtainedMarks }) => {
  const theme = useTheme();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(breadcrumbItems);
  }, [breadcrumbItems]);
  // useEffect(() => {
  //   setItems(breadcrumbItems);
  // }, [breadcrumbItems?.length]);

  return (
    <Wrapper border={false} content={false}>
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h3" color={theme.palette.background.paper}>
                  {title}
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                  {items?.length != 0 &&
                    items?.map((item) => {
                      return item.disable ? (
                        <Typography key={uuidv4()} mt={1.3} variant="h5" color={theme.palette.background.paper} fontSize={'14px'}>
                          {item.label}
                        </Typography>
                      ) : (
                        <Link style={{ color: theme.palette.background.paper, textDecoration: 'none' }} to={item.to}>
                          <Typography mt={1.3} variant="h5" color={theme.palette.background.paper} fontSize={'14px'}>
                            {item.label}
                          </Typography>
                        </Link>
                      );
                    })}
                </Breadcrumbs>
              </Grid>
              {obtainedMarks && totalMarks && (
                <Grid item>
                  <Typography variant="h1" color={theme.palette.background.paper} style={{ fontSize: '3rem' }}>
                    {obtainedMarks}/{totalMarks}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};
CardWrapper.propTypes = {
  title: PropTypes.string,
  totalMarks: PropTypes.string,
  obtainedMarks: PropTypes.string,
  breadcrumbItems: PropTypes.array
};
export default CardWrapper;
