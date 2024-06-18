import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo';
import TemplateThree from './TemplateThree';
import TemplateFour from './TemplateFour';
import TemplateFive from './TemplateFive';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import Box from '@mui/material/Box';
import TemplateModal from './TemplateModal';
import { setActiveSteplocal } from '../../../store/redux/TemplateSlice';
import { getGalleryImages, uploadPdf } from '../../../store/redux/userSlice';
const TemplateIndex = () => {
  // eslint-disable-next-line no-unused-vars
  const [index, setIndex] = useState({
    page1: false,
    page2: false,
    page3: false,
    page4: false,
    page5: false
  });
  const [currentTemplate1, setCurrentTemplate1] = useState(null);
  const [currentTemplate2, setCurrentTemplate2] = useState(null);
  // const [currentTemplate3, setCurrentTemplate3] = useState(null);
  // eslint-disable-next-line
  const [enableNext, setEnableNext] = useState(false);
  // const [enableSave, setEnableSave] = useState(false);
  const [templateOneInitialState0, setTemplateOneInitialState0] = useState(null);
  const [templateOneInitialState1, setTemplateOneInitialState1] = useState(null);
  const [templateOneInitialState2, setTemplateOneInitialState2] = useState(null);
  const [templateOneInitialState3, setTemplateOneInitialState3] = useState(null);
  const [templateOneInitialState4, setTemplateOneInitialState4] = useState(null);
  const [templateTwoInitialState0, setTemplateTwoInitialState0] = useState(null);
  const [templateTwoInitialState1, setTemplateTwoInitialState1] = useState(null);
  const [templateTwoInitialState2, setTemplateTwoInitialState2] = useState(null);
  const [templateTwoInitialState3, setTemplateTwoInitialState3] = useState(null);
  const [templateTwoInitialState4, setTemplateTwoInitialState4] = useState(null);
  const [templateTwoInitialState5, setTemplateTwoInitialState5] = useState(null);
  const [templateTwoInitialState6, setTemplateTwoInitialState6] = useState(null);
  const [templateTwoInitialState7, setTemplateTwoInitialState7] = useState(null);
  const [templateTwoInitialState8, setTemplateTwoInitialState8] = useState(null);
  const [templateTwoInitialState9, setTemplateTwoInitialState9] = useState(null);
  const [templateThreeInitialState0, setTemplateThreeInitialState0] = useState(null);
  const [templateThreeInitialState1, setTemplateThreeInitialState1] = useState(null);
  const [templateThreeInitialState2, setTemplateThreeInitialState2] = useState(null);
  const [templateThreeInitialState3, setTemplateThreeInitialState3] = useState(null);
  const [templateThreeInitialState4, setTemplateThreeInitialState4] = useState(null);
  const [templateFourInitialState0, setTemplateFourInitialState0] = useState(null);
  const [templateFourInitialState1, setTemplateFourInitialState1] = useState(null);
  const [templateFourInitialState2, setTemplateFourInitialState2] = useState(null);
  const [templateFourInitialState3, setTemplateFourInitialState3] = useState(null);
  const [templateFourInitialState4, setTemplateFourInitialState4] = useState(null);
  const [templateFourInitialState5, setTemplateFourInitialState5] = useState(null);
  const [templateFiveInitialState0, setTemplateFiveInitialState0] = useState(null);
  const [templateFiveInitialState1, setTemplateFiveInitialState1] = useState(null);
  const [templateFiveInitialState2, setTemplateFiveInitialState2] = useState(null);
  const [templateFiveInitialState3, setTemplateFiveInitialState3] = useState(null);
  const [templateFiveInitialState4, setTemplateFiveInitialState4] = useState(null);
  const [templateFiveInitialState5, setTemplateFiveInitialState5] = useState(null);
  const [templateFiveInitialState6, setTemplateFiveInitialState6] = useState(null);
  const [templateFiveInitialState7, setTemplateFiveInitialState7] = useState(null);
  const [templateFiveInitialState8, setTemplateFiveInitialState8] = useState(null);
  const [templateFiveInitialState9, setTemplateFiveInitialState9] = useState(null);
  const [templateFiveInitialState10, setTemplateFiveInitialState10] = useState(null);
  const [templateFiveInitialState11, setTemplateFiveInitialState11] = useState(null);
  const [templateFiveInitialState12, setTemplateFiveInitialState12] = useState(null);
  const [templateFiveInitialState13, setTemplateFiveInitialState13] = useState(null);
  const [templateFiveInitialState14, setTemplateFiveInitialState14] = useState(null);
  const [templateFiveInitialState15, setTemplateFiveInitialState15] = useState(null);
  const [templateFiveInitialState16, setTemplateFiveInitialState16] = useState(null);
  const [templateFiveInitialState17, setTemplateFiveInitialState17] = useState(null);
  const [templateFiveInitialState18, setTemplateFiveInitialState18] = useState(null);
  const [templateFiveInitialState19, setTemplateFiveInitialState19] = useState(null);
  const [value, setValue] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const page = useSelector((state) => state.userAuth?.page);
  const limit = useSelector((state) => state.userAuth?.limit);
  const dispatch = useDispatch();
  const localStep = useSelector((state) => state.template.localStep);
  const showPreviousButton = localStep > 1;
  const showNextButton = localStep < 5;
  // const showDownloadButton = localStep > 4;
  const showSaveButton = localStep > 4;
  let activeTemplateIndex = useSelector((state) => state.template.localStep);
  const teacherId = localStorage.getItem('teacherId');
  const handleNext = () => {
    dispatch(setActiveSteplocal(++activeTemplateIndex));
  };
  const handlePrevious = () => {
    dispatch(setActiveSteplocal(--activeTemplateIndex));
  };

  const savePdf = async () => {
    setValue(true);
    const capture = document.querySelector('#template-all');

    const pdfOptions = {
      margin: 12,
      filename: 'template.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' }
    };

    const pdfBlob = await html2pdf().from(capture).set(pdfOptions).toPdf().output('blob');

    const formData = new FormData();

    formData.append('teacherId', teacherId);
    formData.append('pdfFile', pdfBlob);
    formData.append('imageUrls', [
      templateOneInitialState0,
      templateOneInitialState1,
      templateOneInitialState2,
      templateOneInitialState3,
      templateOneInitialState4,
      templateTwoInitialState0,
      templateTwoInitialState1,
      templateTwoInitialState2,
      templateTwoInitialState3,
      templateTwoInitialState4,
      templateTwoInitialState5,
      templateTwoInitialState6,
      templateTwoInitialState7,
      templateTwoInitialState8,
      templateTwoInitialState9,
      templateThreeInitialState0,
      templateThreeInitialState1,
      templateThreeInitialState2,
      templateThreeInitialState3,
      templateThreeInitialState4,
      templateFourInitialState0,
      templateFourInitialState1,
      templateFourInitialState2,
      templateFourInitialState3,
      templateFourInitialState4,
      templateFourInitialState5,
      templateFiveInitialState0,
      templateFiveInitialState1,
      templateFiveInitialState2,
      templateFiveInitialState3,
      templateFiveInitialState4,
      templateFiveInitialState5,
      templateFiveInitialState6,
      templateFiveInitialState7,
      templateFiveInitialState8,
      templateFiveInitialState9,
      templateFiveInitialState10,
      templateFiveInitialState11,
      templateFiveInitialState12,
      templateFiveInitialState13,
      templateFiveInitialState14,
      templateFiveInitialState15,
      templateFiveInitialState16,
      templateFiveInitialState17,
      templateFiveInitialState18,
      templateFiveInitialState19
    ]);

    dispatch(uploadPdf(formData));

    setValue(false);
  };

  // const savePdf = () => {
  //   dispatch(
  //     setAddImageUrls([
  //       templateOneInitialState0,
  //       templateOneInitialState1,
  //       templateOneInitialState2,
  //       templateOneInitialState3,
  //       templateOneInitialState4,
  //       templateTwoInitialState0,
  //       templateTwoInitialState1,
  //       templateTwoInitialState2,
  //       templateTwoInitialState3,
  //       templateTwoInitialState4,
  //       templateTwoInitialState5,
  //       templateTwoInitialState6,
  //       templateTwoInitialState7,
  //       templateTwoInitialState8,
  //       templateTwoInitialState9,
  //       templateThreeInitialState0,
  //       templateThreeInitialState1,
  //       templateThreeInitialState2,
  //       templateThreeInitialState3,
  //       templateThreeInitialState4,
  //       templateFourInitialState0,
  //       templateFourInitialState1,
  //       templateFourInitialState2,
  //       templateFourInitialState3,
  //       templateFourInitialState4,
  //       templateFourInitialState5,
  //       templateFiveInitialState0,
  //       templateFiveInitialState1,
  //       templateFiveInitialState2,
  //       templateFiveInitialState3,
  //       templateFiveInitialState4,
  //       templateFiveInitialState5,
  //       templateFiveInitialState6,
  //       templateFiveInitialState7,
  //       templateFiveInitialState8,
  //       templateFiveInitialState9,
  //       templateFiveInitialState10,
  //       templateFiveInitialState11,
  //       templateFiveInitialState12,
  //       templateFiveInitialState13,
  //       templateFiveInitialState14,
  //       templateFiveInitialState15,
  //       templateFiveInitialState16,
  //       templateFiveInitialState17,
  //       templateFiveInitialState18,
  //       templateFiveInitialState19
  //     ])
  //   );
  // };

  // const ModalOpen = () => {
  //   setModalOpen(true);

  // };
  useEffect(() => {
    /* console.log('useEfffect Render');
    console.log('currentTemplate1--->', currentTemplate1); */
    dispatch(getGalleryImages({ page: page, limit: limit }));

    if (!currentTemplate1) {
      return;
    }
    if (currentTemplate1 === 1) {
      if (
        templateOneInitialState0 ||
        templateOneInitialState1 ||
        templateOneInitialState2 ||
        templateOneInitialState3 ||
        templateOneInitialState4
      ) {
        setEnableNext(true);
      }
    }
    if (currentTemplate2 === 2) {
      if (
        templateTwoInitialState0 ||
        templateTwoInitialState1 ||
        templateTwoInitialState2 ||
        templateTwoInitialState3 ||
        templateTwoInitialState4 ||
        templateTwoInitialState5 ||
        templateTwoInitialState6 ||
        templateTwoInitialState7 ||
        templateTwoInitialState8 ||
        templateTwoInitialState9
      ) {
        setEnableNext(true);
        // setEnableSave(true);
      }
    }
  });

 /*  console.log('enableNext--->', enableNext);
  console.log('activeTemplateIndex--->', activeTemplateIndex); */

  return (
    <Grid>
      <div id="template-all" style={{ display: 'flex', gap: '50px', flexDirection: 'column' }}>
        <div style={{ display: localStep === 1 || value ? 'block' : 'none' }}>
          <TemplateOne
            initialState0={templateOneInitialState0}
            initialState1={templateOneInitialState1}
            initialState2={templateOneInitialState2}
            initialState3={templateOneInitialState3}
            initialState4={templateOneInitialState4}
            setInitialState0={setTemplateOneInitialState0}
            setInitialState1={setTemplateOneInitialState1}
            setInitialState2={setTemplateOneInitialState2}
            setInitialState3={setTemplateOneInitialState3}
            setInitialState4={setTemplateOneInitialState4}
            setCurrentTemplate1={setCurrentTemplate1}
            setIndex={setIndex}
          />
        </div>

        <div style={{ display: localStep === 2 || value ? 'block' : 'none' }}>
          <TemplateTwo
            initialState0={templateTwoInitialState0}
            initialState1={templateTwoInitialState1}
            initialState2={templateTwoInitialState2}
            initialState3={templateTwoInitialState3}
            initialState4={templateTwoInitialState4}
            initialState5={templateTwoInitialState5}
            initialState6={templateTwoInitialState6}
            initialState7={templateTwoInitialState7}
            initialState8={templateTwoInitialState8}
            initialState9={templateTwoInitialState9}
            setInitialState0={setTemplateTwoInitialState0}
            setInitialState1={setTemplateTwoInitialState1}
            setInitialState2={setTemplateTwoInitialState2}
            setInitialState3={setTemplateTwoInitialState3}
            setInitialState4={setTemplateTwoInitialState4}
            setInitialState5={setTemplateTwoInitialState5}
            setInitialState6={setTemplateTwoInitialState6}
            setInitialState7={setTemplateTwoInitialState7}
            setInitialState8={setTemplateTwoInitialState8}
            setInitialState9={setTemplateTwoInitialState9}
            setCurrentTemplate2={setCurrentTemplate2}
            enableNext={enableNext}
            setEnableNext={setEnableNext}
            setIndex={setIndex}
          />
        </div>

        <div style={{ display: localStep === 3 || value ? 'block' : 'none' }}>
          <TemplateThree
            initialState0={templateThreeInitialState0}
            initialState1={templateThreeInitialState1}
            initialState2={templateThreeInitialState2}
            initialState3={templateThreeInitialState3}
            initialState4={templateThreeInitialState4}
            setInitialState0={setTemplateThreeInitialState0}
            setInitialState1={setTemplateThreeInitialState1}
            setInitialState2={setTemplateThreeInitialState2}
            setInitialState3={setTemplateThreeInitialState3}
            setInitialState4={setTemplateThreeInitialState4}
            setIndex={setIndex}
          />
        </div>

        <div style={{ display: localStep === 4 || value ? 'block' : 'none' }}>
          <TemplateFour
            initialState0={templateFourInitialState0}
            initialState1={templateFourInitialState1}
            initialState2={templateFourInitialState2}
            initialState3={templateFourInitialState3}
            initialState4={templateFourInitialState4}
            initialState5={templateFourInitialState5}
            setInitialState0={setTemplateFourInitialState0}
            setInitialState1={setTemplateFourInitialState1}
            setInitialState2={setTemplateFourInitialState2}
            setInitialState3={setTemplateFourInitialState3}
            setInitialState4={setTemplateFourInitialState4}
            setInitialState5={setTemplateFourInitialState5}
            setIndex={setIndex}
          />
        </div>

        <div style={{ display: localStep === 5 || value ? 'block' : 'none' }}>
          <TemplateFive
            initialState0={templateFiveInitialState0}
            initialState1={templateFiveInitialState1}
            initialState2={templateFiveInitialState2}
            initialState3={templateFiveInitialState3}
            initialState4={templateFiveInitialState4}
            initialState5={templateFiveInitialState5}
            initialState6={templateFiveInitialState6}
            initialState7={templateFiveInitialState7}
            initialState8={templateFiveInitialState8}
            initialState9={templateFiveInitialState9}
            initialState10={templateFiveInitialState10}
            initialState11={templateFiveInitialState11}
            initialState12={templateFiveInitialState12}
            initialState13={templateFiveInitialState13}
            initialState14={templateFiveInitialState14}
            initialState15={templateFiveInitialState15}
            initialState16={templateFiveInitialState16}
            initialState17={templateFiveInitialState17}
            initialState18={templateFiveInitialState18}
            initialState19={templateFiveInitialState19}
            setInitialState0={setTemplateFiveInitialState0}
            setInitialState1={setTemplateFiveInitialState1}
            setInitialState2={setTemplateFiveInitialState2}
            setInitialState3={setTemplateFiveInitialState3}
            setInitialState4={setTemplateFiveInitialState4}
            setInitialState5={setTemplateFiveInitialState5}
            setInitialState6={setTemplateFiveInitialState6}
            setInitialState7={setTemplateFiveInitialState7}
            setInitialState8={setTemplateFiveInitialState8}
            setInitialState9={setTemplateFiveInitialState9}
            setInitialState10={setTemplateFiveInitialState10}
            setInitialState11={setTemplateFiveInitialState11}
            setInitialState12={setTemplateFiveInitialState12}
            setInitialState13={setTemplateFiveInitialState13}
            setInitialState14={setTemplateFiveInitialState14}
            setInitialState15={setTemplateFiveInitialState15}
            setInitialState16={setTemplateFiveInitialState16}
            setInitialState17={setTemplateFiveInitialState17}
            setInitialState18={setTemplateFiveInitialState18}
            setInitialState19={setTemplateFiveInitialState19}
            setIndex={setIndex}
          />
        </div>
      </div>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
        {showSaveButton && index[`page${activeTemplateIndex}`] && (
          <Button
            type="submit"
            variant="outlined"
            onClick={savePdf}
            style={{
              background: 'transparent',
              color: '#00ADEE',
              borderRadius: '10px',
              boxShadow: '0px 4px 4px 0 #00000025',
              textTransform: 'none',
              fontSize: '16px',
              border: '1px solid #00ADEE',
              height: '100%',
              lineHeight: '2.75'
            }}
            sx={{ px: 4, py: 0 }}
          >
            Save
          </Button>
        )}
        {showPreviousButton && (
          <Button
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
              border: '1px solid #00ADEE',
              lineHeight: '2.75'
            }}
            sx={{ px: 4, py: 0 }}
          >
            Previous
          </Button>
        )}
        {showNextButton && index[`page${activeTemplateIndex}`] && (
          <Button
            type="submit"
            onClick={handleNext}
            variant="outlined"
            style={{
              background: 'transparent',
              color: '#00ADEE',
              borderRadius: '10px',
              boxShadow: '0px 4px 4px 0 #00000025',
              textTransform: 'none',
              fontSize: '16px',
              border: '1px solid #00ADEE',
              lineHeight: '2.75'
            }}
            sx={{ px: 4, py: 0 }}
          >
            Next
          </Button>
        )}
        {/* {showSaveButton && (
         <Button
         type="submit"
         variant="outlined"
         onClick={ModalOpen}
         style={{
           background: 'transparent',
           color: '#00ADEE',
           borderRadius: '10px',
           boxShadow: '0px 4px 4px 0 #00000025',
           textTransform: 'none',
           fontSize: '16px',
           border: '1px solid #00ADEE',
           lineHeight:'2.75'
         }}
         sx={{ px: 4, py: 0 }}
       >
         Save
       </Button>
      )} */}
      </Box>
      <TemplateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Grid>
  );
};

export default TemplateIndex;
