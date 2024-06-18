import React, { useEffect, useState } from 'react';
// import { nanoid } from '@reduxjs/toolkit';
import TransitionModal from './TransitionModal';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { Grid, Box, Pagination, Stack } from '@mui/material';
import { setPageNumber, studentGalleryImages } from '../../../store/redux/userSlice';
// import Typography from '@mui/material/Typography';

const Gallery = () => {
  const [clickedImg, setClickedImg] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const galleryImages = useSelector((state) => state.userAuth?.studentGalleryImages);
  const page = useSelector((state) => state.userAuth?.studentPage);
  const limit = useSelector((state) => state.userAuth?.limit);
  const studentId = useSelector((state) => state.userAuth?.studentId);
  const studentGalleryTotalPages = useSelector((state) => state.userAuth?.studentGalleryTotalPages);
  const isLoading = useSelector((state) => state.userAuth?.isLoading);

  const handleClick = (image) => {
    setClickedImg(image);
    setModalOpen(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentGalleryImages({ page: page, limit: limit, studentId: studentId }));
    // eslint-disable-next-line
  }, []);

  /* const handleChange = (event, value) => {
    dispatch(setPageNumber(value));

    console.log('value--->', value);
    dispatch(getGalleryImages({ page: value, limit: limit }));
  };
 */
  const styles = {
    imageBox: {
      width: '100%',
      boxSizing: 'border-box',
      margin: 'auto auto',
      padding: '8px'
    },
    image: {
      width: '100%',
      minHeight: '270px',
      maxHeight: '270px',
      maxWidth: '100%',
      boxSizing: 'border-box',
      borderRadius: '10px',
      cursor: 'pointer',
      objectFit: 'cover'
    },
    centerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto',
      width: '100%',
      height: '100%'
    }
  };
  const handleChange = (event, value) => {
    setPageNumber(value);
    dispatch(studentGalleryImages({ page: value, limit: limit, studentId: studentId }));
  };
  return isLoading ? (
    // <Box sx={styles.centerContainer}>
    <Stack justifyContent={'center'} p={8} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
      <ThreeDots visible={true} height="50" width="50" color="#00ADEE" radius="9" ariaLabel="three-dots-loading" wrapperClass="" />
    </Stack>
  ) : (
    // </Box>
    <Box>
      <Grid container spacing={1} style={{ ...styles.centerContainer, flexDirection: 'column' }}>
        <Grid item xs={12}>
          <Box>
            <Grid container spacing={1} style={{ justifyContent: 'center' }}>
              {isLoading ? (
                <Stack justifyContent={'center'} p={8} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
                  <ThreeDots
                    visible={true}
                    height="50"
                    width="50"
                    color="#00ADEE"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperClass=""
                  />
                </Stack>
              ) : galleryImages.length === 0 ? (
                <Stack justifyContent={'center'} p={8} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
                  No Images found
                </Stack>
              ) : (
                galleryImages?.map((image) => (
                  <Grid item xs={12} sm={6} md={4} key={image._id}>
                    <Box onClick={() => handleClick(image.imageurl)} sx={styles.imageBox}>
                      <img src={image.imageurl} key={image._id} alt={`student ${image.imageurl}`} style={styles.image} loading="lazy" />
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box>{clickedImg && <TransitionModal clickedImg={clickedImg} open={modalOpen} setOpen={setModalOpen} />}</Box>
      <Stack alignItems={'center'} p={2}>
        <Pagination count={studentGalleryTotalPages} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
      </Stack>
    </Box>
  );
};

export default Gallery;
