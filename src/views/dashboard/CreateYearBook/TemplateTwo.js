import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import halfBackground from '../../../assets/images/halfBackground.svg';
// import gradient from '../../../assets/images/background/gradient.png';
import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css';
import './TemplateTwo.css';
import './index.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { getGalleryImages, setPageNumber } from '../../../store/redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useScreenshot } from 'use-react-screenshot';
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material';

const TemplateTwo = ({
  initialState0,
  initialState1,
  initialState2,
  initialState3,
  initialState4,
  initialState5,
  initialState6,
  initialState7,
  initialState8,
  initialState9,
  setInitialState0,
  setInitialState1,
  setInitialState2,
  setInitialState3,
  setInitialState4,
  setInitialState5,
  setInitialState6,
  setInitialState7,
  setInitialState8,
  setInitialState9,
  setCurrentTemplate2,
  enableNext,
  setEnableNext,
  setIndex
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [boxIndex, setBoxIndex] = useState(false);
  const [image, takeScreenshot] = useScreenshot(false);
  const ref = useRef(null);
  const myImages = useSelector((state) => state.userAuth?.galleryImages);
  const page = useSelector((state) => state.userAuth?.page);
  const totalpages = useSelector((state) => state.userAuth?.totalpages);
  const limit = useSelector((state) => state.userAuth?.limit);

  useEffect(() => {
  /*   console.log('enableNext--->', enableNext);
    console.log('temp 2--->', enableNext); */
    setEnableNext(false);
    setCurrentTemplate2(2);
    dispatch(getGalleryImages({ page: page, limit: limit }));
    // eslint-disable-next-line
  }, []);
  const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    margin: '10px 0'
  };

  const handleOpen = (e, index) => {
    setBoxIndex(index);
    if (e.target.className === 'image-holder' || e.target.tagName === 'IMG') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (e, imageUrl) => {
    switch (parseInt(boxIndex)) {
      case 0:
        setInitialState0(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 1:
        setInitialState1(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 2:
        setInitialState2(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 3:
        setInitialState3(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 4:
        setInitialState4(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 5:
        setInitialState5(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 6:
        setInitialState6(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 7:
        setInitialState7(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 8:
        setInitialState8(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      case 9:
        setInitialState9(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page2: true
        }));
        break;
      default:
        alert('Irrelevent image Clicked');
    }
    handleClose();
  };

  const captureScreenshot = () => {
    takeScreenshot(ref.current);
  };
  useEffect(() => {
    const handleWindowBeforeUnload = (event) => {
      if (
        initialState0 ||
        initialState1 ||
        initialState2 ||
        initialState3 ||
        initialState4 ||
        initialState5 ||
        initialState6 ||
        initialState7 ||
        initialState8 ||
        initialState9
      ) {
        event.preventDefault();
        event.returnValue = '';
        return '';
      }
    };
    window.addEventListener('beforeunload', handleWindowBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleWindowBeforeUnload);
    };
  }, [
    initialState0,
    initialState1,
    initialState2,
    initialState3,
    initialState4,
    initialState5,
    initialState6,
    initialState7,
    initialState8,
    initialState9
  ]);
  console.log('temp 2 Outside useEffect--->', enableNext);
  const handleChange = (event, value) => {
    setPageNumber(value);
    dispatch(getGalleryImages({ page: value, limit: limit }));
  };
  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            flexWrap: 'wrap',
            width: '100%',
            ...ModalStyle,
            justifyContent: 'center'
          }}
        >
          {myImages?.map((image) => (
            <Avatar
              src={image.imageurl}
              key={image._id}
              alt={'image'}
              onClick={(e) => handleClick(e, image.imageurl)}
              variant="square"
              sx={{
                width: '160px',
                height: '160px',
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            />
          ))}
          <Stack alignItems={'center'} p={2}>
            <Pagination count={totalpages} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
          </Stack>
        </Box>
      </Modal>

      <div className="Imagae_bg" id="template-2" ref={ref}>
        <div className="leftpage">
          <div style={{ width: '100%', height: '100%' }}>
            <Box
              onClick={(e) => handleOpen(e, '0')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState0}
              />
            </Box>
          </div>
          {/* <img alt="gradient" src={gradient} /> */}
        </div>
        <div className="rightpage ">
          <div className="single_wide_images one">
            <Box
              onClick={(e) => handleOpen(e, '1')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState1}
              />
            </Box>
          </div>
          <div className="single_wide_images second">
            <Box
              onClick={(e) => handleOpen(e, '2')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState2}
              />
            </Box>
          </div>
          <div className="single_wide_images third">
            <Box
              onClick={(e) => handleOpen(e, '3')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState3}
              />
            </Box>
          </div>
          <div className="single_wide_images four">
            <Box
              onClick={(e) => handleOpen(e, '4')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState4}
              />
            </Box>
          </div>
          <div className="single_wide_images five">
            <Box
              onClick={(e) => handleOpen(e, '5')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState5}
              />
            </Box>
          </div>
          <div className="single_wide_images six">
            <Box
              onClick={(e) => handleOpen(e, '6')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState6}
              />
            </Box>
          </div>
          <div className="single_wide_images seven">
            <Box
              onClick={(e) => handleOpen(e, '7')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState7}
              />
            </Box>
          </div>
          <div className="single_wide_images eight">
            <Box
              onClick={(e) => handleOpen(e, '8')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState8}
              />
            </Box>
          </div>
          <div className="single_wide_images nine">
            <Box
              onClick={(e) => handleOpen(e, '9')}
              className="MODALOPEN"
              style={{ width: '100%', height: '100%', padding: '0', border: '0' }}
            >
              <ReactImagePickerEditor
                config={{
                  language: 'en',
                  width: '100%',
                  objectFit: 'fill',
                  hideDeleteBtn: true,
                  hideDownloadBtn: true,
                  hideEditBtn: false,
                  hideAddBtn: true,
                  hideUploadIcon: false,
                  hideUploadBtn: true
                }}
                imageSrcProp={initialState9}
              />
            </Box>
          </div>
        </div>
        <img alt="halfBackground" className="full-view" src={halfBackground} width="100%" height="auto" />
      </div>
      <Stack direction={'row'}>
        {initialState0 &&
          initialState1 &&
          initialState2 &&
          initialState3 &&
          initialState4 &&
          initialState5 &&
          initialState6 &&
          initialState7 &&
          initialState8 &&
          initialState9 &&
          !image &&
          captureScreenshot()}
      </Stack>
    </>
  );
};

TemplateTwo.propTypes = {
  initialState0: PropTypes.string,
  initialState1: PropTypes.string,
  initialState2: PropTypes.string,
  initialState3: PropTypes.string,
  initialState4: PropTypes.string,
  initialState5: PropTypes.string,
  initialState6: PropTypes.string,
  initialState7: PropTypes.string,
  initialState8: PropTypes.string,
  initialState9: PropTypes.string,
  setInitialState0: PropTypes.func.isRequired,
  setInitialState1: PropTypes.func.isRequired,
  setInitialState2: PropTypes.func.isRequired,
  setInitialState3: PropTypes.func.isRequired,
  setInitialState4: PropTypes.func.isRequired,
  setInitialState5: PropTypes.func.isRequired,
  setInitialState6: PropTypes.func.isRequired,
  setInitialState7: PropTypes.func.isRequired,
  setInitialState8: PropTypes.func.isRequired,
  setInitialState9: PropTypes.func.isRequired
};

export default TemplateTwo;
