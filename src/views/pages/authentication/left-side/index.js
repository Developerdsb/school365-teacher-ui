import React from 'react';
import { Box } from '@mui/material';
import './styles.css';
import leftImage from '../left-side/images/leftImage.jpg';
const Picture = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${leftImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        overflow: 'hidden',
        minHeight: '100%',
        position: 'relative'
      }}
    ></Box>
  );
};

export default Picture;
