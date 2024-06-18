import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Buttons = ({ buttonName, variant, handleClick, icon }) => {
  const theme = useTheme();
  const buttonStyles = {
    background: variant === 'outlined' ? '' : 'linear-gradient(90deg, rgb(202, 239, 136), #7FB823)',
    borderRadius: '82px',
    boxShadow: variant === 'outlined' ? 'none' : '0px 4px 4px 0 #00000025',
    textTransform: 'none',
    borderColor: theme.palette.secondary.dark,
    color: variant === 'outlined' ? theme.palette.secondary.dark : '#fff'
  };

  return (
    <Button style={buttonStyles} variant={variant} onClick={handleClick}>
      {icon}
      {buttonName}
    </Button>
  );
};
Buttons.propTypes = {
  buttonName: PropTypes.string,
  handleClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outlined', 'contained']),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};
export default Buttons;
