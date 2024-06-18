import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import appLogo from '../../../assets/images/appLogo.png';
import { ButtonBase } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import config from '../../../config';
import { menuOpen } from '../../../store/redux/customizationSlice';

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch(menuOpen(defaultId))} component={Link} to={config.defaultPath}>
      <CardMedia component="img" src={appLogo} alt="schoolDays365 Logo" style={{ width: '170px', height: 'auto', marginLeft: 'auto' }} />
    </ButtonBase>
  );
};

export default LogoSection;
