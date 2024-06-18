import React, { useRef, useState, useEffect } from 'react';
import Background from '../../../assets/images/backgroundImageSix.svg';
import PropTypes from 'prop-types';
// import gradient from '../../../assets/images/background/gradient.png';
import './TemplateFive.css';
import './index.css';
import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { getGalleryImages, setPageNumber } from '../../../store/redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useScreenshot } from 'use-react-screenshot';
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material';

// import { setActiveSteplocal } from '../../../store/redux/TemplateSlice';
// import html2pdf from 'html2pdf.js';
// eslint-disable-next-line
const TemplateFive = ({
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
  initialState10,
  initialState11,
  initialState12,
  initialState13,
  initialState14,
  initialState15,
  initialState16,
  initialState17,
  initialState18,
  initialState19,
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
  setInitialState10,
  setInitialState11,
  setInitialState12,
  setInitialState13,
  setInitialState14,
  setInitialState15,
  setInitialState16,
  setInitialState17,
  setInitialState18,
  setInitialState19,
  setIndex
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [loader, setLoader] = useState(false);
  const [boxIndex, setBoxIndex] = useState(false);
  const [image, takeScreenshot] = useScreenshot(false);
  const ref = useRef(null);
  const myImages = useSelector((state) => state.userAuth?.galleryImages);
  const page = useSelector((state) => state.userAuth?.page);
  const totalpages = useSelector((state) => state.userAuth?.totalpages);
  const limit = useSelector((state) => state.userAuth?.limit);

  useEffect(() => {
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
          page5: true
        }));
        break;
      case 1:
        setInitialState1(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 2:
        setInitialState2(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 3:
        setInitialState3(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 4:
        setInitialState4(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 5:
        setInitialState5(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 6:
        setInitialState6(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 7:
        setInitialState7(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 8:
        setInitialState8(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 9:
        setInitialState9(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 10:
        setInitialState10(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 11:
        setInitialState11(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 12:
        setInitialState12(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 13:
        setInitialState13(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 14:
        setInitialState14(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 15:
        setInitialState15(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 16:
        setInitialState16(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 17:
        setInitialState17(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 18:
        setInitialState18(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      case 19:
        setInitialState19(imageUrl);
        setIndex((prevState) => ({
          ...prevState,
          page5: true
        }));
        break;
      default:
        alert('Irrelevent image Clicked');
    }
    handleClose();
  };
  // const ModalOpen = () => {
  //   setModalOpen(true);
  //   takeScreenshot(ref.current);
  // };
  // let activeTemplateIndex = useSelector((state) => state.template.localStep);
  // const handlePrevious = () => {
  //   dispatch(setActiveSteplocal(--activeTemplateIndex));
  // };
  // const downloadPdf = () => {
  //   const capture = document.querySelector('#template-5');
  //   setLoader(true);
  //   console.log(loader);
  //   const pdfOptions = {
  //     margin: 10,
  //     filename: 'template.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' }
  //   };

  //   html2pdf(capture, pdfOptions).then(() => {
  //     setLoader(false);
  //   });
  // };
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
        initialState9 ||
        initialState10 ||
        initialState11 ||
        initialState12 ||
        initialState13 ||
        initialState14 ||
        initialState15 ||
        initialState16 ||
        initialState17 ||
        initialState18 ||
        initialState19
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
    initialState9,
    initialState10,
    initialState11,
    initialState12,
    initialState13,
    initialState14,
    initialState15,
    initialState16,
    initialState17,
    initialState18,
    initialState19
  ]);
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

      <div className="Imagae_bg" id="template-5" ref={ref}>
        <div className="leftpage">
          {/* <div className="single_wide_image teacher">ddd</div>  */}

          <div className="top row_block">
            <div className="single_wide_images left-top">
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
          </div>

          <div className="row_block">
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
          </div>
          <div className="row_block two">
            <div className="single_wide_images one">
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
            <div className="single_wide_images second">
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
            <div className="single_wide_images third">
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
            <div className="single_wide_images second">
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
            <div className="single_wide_images third">
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
          </div>
          <div className="row_block three">
            <div className="single_wide_images one">
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
            <div className="single_wide_images second">
              <Box
                onClick={(e) => handleOpen(e, '10')}
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
                  imageSrcProp={initialState10}
                />
              </Box>
            </div>
            <div className="single_wide_images third">
              <Box
                onClick={(e) => handleOpen(e, '11')}
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
                  imageSrcProp={initialState11}
                />
              </Box>
            </div>
            <div className="single_wide_images second">
              <Box
                onClick={(e) => handleOpen(e, '12')}
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
                  imageSrcProp={initialState12}
                />
              </Box>
            </div>
            <div className="single_wide_images third">
              <Box
                onClick={(e) => handleOpen(e, '13')}
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
                  imageSrcProp={initialState13}
                />
              </Box>
            </div>
          </div>
          <div className="row_block four">
            <div className="single_wide_images one">
              <Box
                onClick={(e) => handleOpen(e, '14')}
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
                  imageSrcProp={initialState14}
                />
              </Box>
            </div>
            <div className="single_wide_images second">
              <Box
                onClick={(e) => handleOpen(e, '15')}
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
                  imageSrcProp={initialState15}
                />
              </Box>
            </div>
            <div className="single_wide_images third">
              <Box
                onClick={(e) => handleOpen(e, '16')}
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
                  imageSrcProp={initialState16}
                />
              </Box>
            </div>
            <div className="single_wide_images second">
              <Box
                onClick={(e) => handleOpen(e, '17')}
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
                  imageSrcProp={initialState17}
                />
              </Box>
            </div>
          </div>
        </div>
        <div className="rightpage">
          <div className="top-wide">
            <Box
              onClick={(e) => handleOpen(e, '18')}
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
                imageSrcProp={initialState18}
              />
            </Box>
          </div>
          <div className="bottom-wide">
            <Box
              onClick={(e) => handleOpen(e, '19')}
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
                imageSrcProp={initialState19}
              />
            </Box>
          </div>
        </div>
        <img alt="backgroundImage" src={Background} width="100%" height="auto" />
      </div>
      <Stack direction={'row'}>
        {
          initialState0 &&
            initialState1 &&
            initialState2 &&
            initialState3 &&
            initialState4 &&
            initialState5 &&
            initialState6 &&
            initialState7 &&
            initialState8 &&
            initialState9 &&
            initialState10 &&
            initialState11 &&
            initialState12 &&
            initialState13 &&
            initialState14 &&
            initialState15 &&
            initialState16 &&
            initialState17 &&
            initialState18 &&
            initialState19 &&
            !image &&
            captureScreenshot()
          // <Button
          //   type="submit"
          //   variant="outlined"
          //   onClick={ModalOpen}
          //   style={{
          //     background: 'transparent',
          //     color: '#00ADEE',
          //     borderRadius: '10px',
          //     boxShadow: '0px 4px 4px 0 #00000025',
          //     textTransform: 'none',
          //     fontSize: '16px',
          //     border: '1px solid #00ADEE'
          //   }}
          //   sx={{ px: 4, py: 0 }}
          // >
          //   Save
          // </Button>
        }

        {/* {image && (
          <Button
            type="submit"
            variant="outlined"
            onClick={downloadPdf}
            style={{
              background: 'transparent',
              color: '#00ADEE',
              borderRadius: '10px',
              boxShadow: '0px 4px 4px 0 #00000025',
              textTransform: 'none',
              fontSize: '16px',
              border: '1px solid #00ADEE',
              height: '100%'
            }}
            sx={{ px: 4, py: 0 }}
          >
            Download{console.warn('download')}
          </Button>
        )} */}
        {/* <Button
          type="submit"
          onClick={handlePrevious}
          variant="outlined"
          style={{
            background: 'transparent',
            color: '#00ADEE',
            borderRadius: '10px',
            boxShadow: '0px 4px 4px 0 #00000025',
            textTransform: 'none',
            fontSize: '16px',
            border: '1px solid #00ADEE'
          }}
          sx={{ px: 4, py: 0 }}
        >
          Previous
        </Button> */}
      </Stack>
    </>
  );
};

TemplateFive.propTypes = {
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
  initialState10: PropTypes.string,
  initialState11: PropTypes.string,
  initialState12: PropTypes.string,
  initialState13: PropTypes.string,
  initialState14: PropTypes.string,
  initialState15: PropTypes.string,
  initialState16: PropTypes.string,
  initialState17: PropTypes.string,
  initialState18: PropTypes.string,
  initialState19: PropTypes.string,
  setInitialState0: PropTypes.func.isRequired,
  setInitialState1: PropTypes.func.isRequired,
  setInitialState2: PropTypes.func.isRequired,
  setInitialState3: PropTypes.func.isRequired,
  setInitialState4: PropTypes.func.isRequired,
  setInitialState5: PropTypes.func.isRequired,
  setInitialState6: PropTypes.func.isRequired,
  setInitialState7: PropTypes.func.isRequired,
  setInitialState8: PropTypes.func.isRequired,
  setInitialState9: PropTypes.func.isRequired,
  setInitialState10: PropTypes.func.isRequired,
  setInitialState11: PropTypes.func.isRequired,
  setInitialState12: PropTypes.func.isRequired,
  setInitialState13: PropTypes.func.isRequired,
  setInitialState14: PropTypes.func.isRequired,
  setInitialState15: PropTypes.func.isRequired,
  setInitialState16: PropTypes.func.isRequired,
  setInitialState17: PropTypes.func.isRequired,
  setInitialState18: PropTypes.func.isRequired,
  setInitialState19: PropTypes.func.isRequired
};
export default TemplateFive;
