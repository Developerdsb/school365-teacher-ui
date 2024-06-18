import React from 'react';
import PropTypes from 'prop-types';
// import ProfileSection from '../../../Header/ProfileSection/index';
// material-ui
import { useTheme } from '@mui/material/styles';
import { List, Typography, Grid } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} childrens={item.children} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} childrens={item.children} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <Grid container direction="column" style={{ position: 'relative', height: '100%' }}>
        <List
          subheader={
            item.title && (
              <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                {item.title}
                {item.caption && (
                  <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                    {item.caption}
                  </Typography>
                )}
              </Typography>
            )
          }
        >
          {items}
        </List>
        {/*   <Grid item style={{ position: 'absolute', bottom: 0, left: -59, right: 0 }}>
          <ProfileSection />
        </Grid> */}
      </Grid>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
