import React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
/* import Certificate from '../../../../src/./assets/./images/./icons/Certificate.svg' */

const CustomProfileImage = ({ obj }) => {
  const { width, height, imgRef /* ,bottom,right,certificateWidth,certificateHeight,certificateLeft */ } = obj;
  return (
    <Stack sx={{ position: 'relative', width: { width } }}>
      <Avatar src={imgRef} sx={{ width: { width }, height: { height } }} />
      {/*  <Avatar  src={Certificate} sx={{ backgroundColor: 'transparent',position:'absolute',bottom:{ bottom},right:{right} ,left:certificateLeft,width:certificateWidth,height:certificateHeight}} /> */}
    </Stack>
  );
};

export default CustomProfileImage;
