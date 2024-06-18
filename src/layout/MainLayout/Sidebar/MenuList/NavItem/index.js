import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

import { menuOpen, setMenu } from '../../../../../store/redux/customizationSlice';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const NavItem = ({ item, level, childrens }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  // let itemTarget = '_self';
  // if (item.target) {
  //   itemTarget = '_blank';
  // }

  // let listItemProps = {
  //   component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  // };
  // if (item?.external) {
  //   listItemProps = { component: 'a', href: item.url, target: itemTarget };
  // }

  const itemHandler = (item) => {
    const id = item.id;

    dispatch(menuOpen(id));
    if (matchesSM) dispatch(setMenu(false));
    // window.location.href = item.url;
    navigate(item.url);
  };

  // active menu item on page load
  useEffect(() => {
    // const currentIndex = document.location.pathname
    //   .toString()
    //   .split('/')
    //   .findIndex((id) => id === item.id);
    const paths = document.location.pathname;
    let firstElement = paths.split('/').slice(0, 2).join('/');
    const currentIndex = childrens.findIndex((x) => x.url == firstElement);
    const items = childrens[currentIndex];

    if (currentIndex > -1) {
      dispatch(menuOpen(items.id));
    } else {
      dispatch(menuOpen('default'));
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      // {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `10px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`
      }}
      selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  childrens: PropTypes.array
};

export default NavItem;
