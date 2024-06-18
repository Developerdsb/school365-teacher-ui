import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

import Image1 from '../../../assets/images/first.svg';
import { getTemplatePdf } from '../../../store/redux/TemplateSlice';
import { StyledIconStack, StyledPaper, StyledImageStack } from '../styledComponent/HoverStyle';
import Modal from './PdfModal';

const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const templatePdf = useSelector((state) => state.template.templatePdf);
  // console.warn('templatePdf--->', templatePdf);
  const status = useSelector((state) => state.template.status);

  const handleOpenModal = (pdfUrl) => {
    setPdfUrl(pdfUrl);
    setPdfLoading(true);
    setTimeout(() => {
      setPdfLoading(false);
    }, 3000);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClick = () => {
    navigate('/createyearbook');
  };
  // eslint-disable-next-line
  useEffect(() => {
    dispatch(getTemplatePdf());
  }, [dispatch]);

  return (
    <>
      <Stack sx={{ mt: 2, width: '100% !important' }} direction={{ sm: 'row', xs: 'column' }}>
        <StyledPaper elevation={3} className="Paper" sx={{ paddingTop: '40px', paddingBottom: '40px', paddingLeft: '25px', width: '100%' }}>
          <Box sx={{ paddingLeft: '15px', paddingRight: '5px' }}>
            <h2 style={{ fontSize: '26px', paddingBottom: '20px' }}>Templates</h2>
            <Box sx={{ p: '2', backgroundColor: 'none !important' }}>
              <Box sx={{ flexGrow: 1, display: 'flex', direction: 'row', justifyContent: 'center' }} ml={3}>
                <Grid container spacing={4} justifyContent={'flex-start'} flexWrap="wrap" rowGap={1}>
                  <Grid xs={12} sm={6} lg={4}>
                    <Stack sx={{ mt: 2, width: '100% !important' }} direction={{ sm: 'row', xs: 'column' }}>
                      <StyledPaper elevation={3} className="Paper" sx={{ border: '1px solid #ECE6E6', boxShadow: 'none !important' }}>
                        <StyledImageStack sx={{ marginTop: 1, width: '100%', height: 'auto', minHeight: '170px' }} className="hover">
                          <img alt="yearbook" src={Image1} style={{ objectFit: 'cover' }} />
                        </StyledImageStack>
                        <Stack direction="row" justifyContent="space-between" sx={{ m: 1, width: '100%' }} alignItems={'center'}>
                          <Typography sx={{ flex: '0 0 50%' }}>Template</Typography>
                          <Stack direction={'row'} justifyContent={'flex-end'} sx={{ flex: '0 0 50%', paddingRight: '10px' }} gap={1}>
                            <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }} onClick={handleOpenModal}>
                              <VisibilityIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }} onClick={handleClick}>
                              <ModeEditOutlineIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                        <StyledIconStack className="icon-container">
                          <IconButton aria-label="Bookmark">
                            <BookmarkIcon />
                          </IconButton>
                        </StyledIconStack>
                      </StyledPaper>
                    </Stack>
                  </Grid>

                  <Grid xs={12} sm={6} lg={4}>
                    <Stack sx={{ mt: 2 }} spacing={1} direction={{ sm: 'row', xs: 'column' }}>
                      <StyledPaper
                        elevation={3}
                        className="Paper"
                        sx={{
                          filter: 'grayscale(0%)',
                          border: '1px solid #ECE6E6',
                          boxShadow: 'none !important',
                          position: 'relative',

                          '&:hover .paid-message': {
                            display: 'block'
                          }
                        }}
                      >
                        <StyledImageStack sx={{ marginTop: 1, width: '100%', height: 'auto', minHeight: '170px' }} className="hover">
                          <p style={{ position: 'absolute', right: '18px', top: '7px' }}>
                            <LockOutlinedIcon></LockOutlinedIcon>
                          </p>
                          <img alt="yearbook" src={Image1} style={{ objectFit: 'cover' }} />
                        </StyledImageStack>
                        <Stack direction="row" justifyContent="space-between" sx={{ m: 1, width: '100%' }} alignItems={'center'}>
                          <Typography sx={{ flex: '0 0 50%' }}>Template</Typography>
                          <Stack direction={'row'} justifyContent={'flex-end'} sx={{ flex: '0 0 50%', paddingRight: '10px' }} gap={1}>
                            <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }}>
                              <VisibilityIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }}>
                              <ModeEditOutlineIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                        <StyledIconStack className="icon-container">
                          <IconButton aria-label="Bookmark">
                            <BookmarkIcon />
                          </IconButton>
                        </StyledIconStack>
                        <Typography
                          variant="h3"
                          color="textSecondary"
                          textAlign="center"
                          className="paid-message"
                          sx={{
                            position: 'absolute',
                            display: 'none',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,
                            color: 'rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          Paid
                        </Typography>
                      </StyledPaper>
                    </Stack>
                  </Grid>
                  <Grid xs={12} sm={6} lg={4}>
                    <Stack sx={{ mt: 2 }} spacing={1} direction={{ sm: 'row', xs: 'column' }}>
                      <StyledPaper
                        elevation={3}
                        className="Paper"
                        sx={{
                          filter: 'grayscale(0%)',
                          position: 'relative',
                          border: '1px solid #ECE6E6',
                          boxShadow: 'none !important',
                          '&:hover .paid-message': {
                            display: 'block'
                          }
                        }}
                      >
                        <StyledImageStack sx={{ marginTop: 1, width: '100%', height: 'auto', minHeight: '170px' }} className="hover">
                          <p style={{ position: 'absolute', right: '18px', top: '7px' }}>
                            <LockOutlinedIcon></LockOutlinedIcon>
                          </p>
                          <img alt="yearbook" src={Image1} style={{ objectFit: 'cover' }} />
                        </StyledImageStack>
                        <Stack direction="row" justifyContent="space-between" sx={{ m: 1, width: '100%' }} alignItems={'center'}>
                          <Typography sx={{ flex: '0 0 50%' }}>Template</Typography>
                          <Stack direction={'row'} justifyContent={'flex-end'} sx={{ flex: '0 0 50%', paddingRight: '10px' }} gap={1}>
                            <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }}>
                              <VisibilityIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }}>
                              <ModeEditOutlineIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                        <StyledIconStack className="icon-container">
                          <IconButton aria-label="Bookmark">
                            <BookmarkIcon />
                          </IconButton>
                        </StyledIconStack>
                        <Typography
                          variant="h3"
                          color="textSecondary"
                          textAlign="center"
                          className="paid-message"
                          sx={{
                            position: 'absolute',
                            display: 'none',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,
                            color: 'rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          Paid
                        </Typography>
                      </StyledPaper>
                    </Stack>
                  </Grid>

                  <Grid xs={12} sm={6} lg={4}>
                    <Stack sx={{ mt: 2 }} spacing={1} direction={{ sm: 'row', xs: 'column' }}>
                      <StyledPaper
                        elevation={3}
                        className="Paper"
                        sx={{
                          filter: 'grayscale(0%)',
                          position: 'relative',
                          border: '1px solid #ECE6E6',
                          boxShadow: 'none !important',
                          '&:hover .paid-message': {
                            display: 'block'
                          }
                        }}
                      >
                        <StyledImageStack sx={{ marginTop: 1, width: '100%', height: 'auto', minHeight: '170px' }} className="hover">
                          <p style={{ position: 'absolute', right: '18px', top: '7px' }}>
                            <LockOutlinedIcon></LockOutlinedIcon>
                          </p>
                          <img alt="yearbook" src={Image1} style={{ objectFit: 'cover' }} />
                        </StyledImageStack>
                        <Stack direction="row" justifyContent="space-between" sx={{ m: 1, width: '100%' }} alignItems={'center'}>
                          <Typography sx={{ flex: '0 0 50%' }}>Template</Typography>
                          <Stack direction={'row'} justifyContent={'flex-end'} sx={{ flex: '0 0 50%', paddingRight: '10px' }} gap={1}>
                            <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }}>
                              <VisibilityIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }}>
                              <ModeEditOutlineIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                        <StyledIconStack className="icon-container">
                          <IconButton aria-label="Bookmark">
                            <BookmarkIcon />
                          </IconButton>
                        </StyledIconStack>
                        <Typography
                          variant="h3"
                          color="textSecondary"
                          textAlign="center"
                          className="paid-message"
                          sx={{
                            position: 'absolute',
                            display: 'none',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,
                            color: 'rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          Paid
                        </Typography>
                      </StyledPaper>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </StyledPaper>
      </Stack>

      <Grid container pt={2}>
        <StyledPaper elevation={3} className="Paper" sx={{ paddingTop: '40px', paddingBottom: '40px', paddingLeft: '25px', width: '100%' }}>
          <Grid container>
            <Grid item xs={12}>
              <h2 style={{ fontSize: '26px' }}>Your Templates</h2>
            </Grid>

            {status == 'templateloading' ? (
              <Grid item xs={12} sm={12} md={12} sx={{ p: 3 }}>
                <Stack justifyContent={'center'} p={6} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
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
              </Grid>
            ) : templatePdf?.length > 0 ? (
              templatePdf.map((pdf, index) => {
                return (
                  <Grid xs={12} sm={6} lg={4} key={index}>
                    <Stack sx={{ mt: 2, width: '100% !important' }} direction={{ sm: 'row', xs: 'column' }}>
                      <StyledPaper elevation={3} className="Paper" sx={{ border: '1px solid #ECE6E6', boxShadow: 'none !important' }}>
                        <StyledImageStack sx={{ marginTop: 1, width: '100%', height: 'auto', minHeight: '170px' }} className="hover">
                          <img alt="yearbook" src={Image1} style={{ objectFit: 'cover' }} />
                        </StyledImageStack>
                        <Stack direction="row" justifyContent="space-between" sx={{ m: 1, width: '100%' }} alignItems={'center'}>
                          <Typography sx={{ flex: '0 0 50%' }}>Template</Typography>
                          <Stack direction={'row'} justifyContent={'flex-end'} sx={{ flex: '0 0 50%', paddingRight: '10px' }} gap={1}>
                            <IconButton
                              sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }}
                              onClick={() => handleOpenModal(pdf.templateUrl)}
                            >
                              <VisibilityIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton>
                            {/* <IconButton sx={{ border: '2px solid rgba(57, 201, 254, 0.1)' }} onClick={handleClick}>
                              <ModeEditOutlineIcon sx={{ color: '#39C9FE' }} fontSize="small" />
                            </IconButton> */}
                          </Stack>
                        </Stack>
                        <StyledIconStack className="icon-container">
                          <IconButton aria-label="Bookmark">
                            <BookmarkIcon />
                          </IconButton>
                        </StyledIconStack>
                      </StyledPaper>
                    </Stack>
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12} sm={12} md={12} sx={{ p: 3 }}>
                <Stack justifyContent={'center'} p={6} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
                  <Typography variant="h5">Empty Templates</Typography>
                </Stack>
              </Grid>
            )}
            {modalOpen && pdfUrl && <Modal open={modalOpen} pdfUrl={pdfUrl} onClose={handleCloseModal} pdfLoading={pdfLoading} />}
          </Grid>
        </StyledPaper>
      </Grid>
    </>
  );
};
export default Templates;
