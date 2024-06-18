import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Box, Stack } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs, postClubs } from '../../../store/redux/ClubSlice';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
const schema = Yup.object({
  clubs: Yup.array().min(1, 'At least one club must be selected').required('Club is required')
});
const defaultTheme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '300px', sm: '500px' },
  backgroundColor: 'background.paper',
  boxShadow: 24,
  padding: '30px 4px',
  borderRadius: '5px'
};
// const textFieldSpace = {
//   marginBottom: '3px',
//   height: '65px'
// };
const SignUpBtnStyle = {
  marginTop: '22px',
  backgroundColor: '#38c7fc'
};

ClubAddModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  studentId: PropTypes.string
};
export default function ClubAddModal({ open, setOpen, studentId }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.studentClubs.clubs);
  const loading = useSelector((state) => state.clubs.loading);
  // console.warn('clubs loading---->', loading);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const schoolId = localStorage.getItem('schoolId');
  useEffect(() => {
    dispatch(getClubs({ schoolId: schoolId, page: 1, limit: 5, search: '' }));
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data) => {
    console.warn('submit errors----->', errors); // Log errors to the console
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      return;
    }
    const clubIds = data.clubs;
    const formattedData = { clubIds, studentId: studentId };
    dispatch(postClubs(formattedData))
      .unwrap()
      .then(() => {
        setOpen(false);
        reset();
      });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const setSearchCatg = (e, val) => {
    dispatch(getClubs({ schoolId: schoolId, page: 1, limit: 5, search: val }));
  };

  return (
    <Modal
      aria-labelledby="add-modal-title"
      aria-describedby="add-modal-description"
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box>
                <Box>
                  <Typography variant="h6" component="h2" align="center" gutterBottom marginBottom="12px">
                    Add Club
                  </Typography>
                </Box>
                <Box>
                  <form onSubmit={handleSubmit(onSubmit)} method="POST">
                    <Box>
                      <Controller
                        name="clubs"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <Autocomplete
                            value={clubs.find((option) => option._id === field.value)}
                            multiple
                            id="tags-outlined"
                            onInputChange={setSearchCatg}
                            options={clubs.filter((item) => !selectedValues.some((selected) => selected.title === item.title))}
                            getOptionLabel={(option) => option.title}
                            filterSelectedOptions
                            onChange={(e, value) => {
                              const selectedIds = value.map((item) => item._id);
                              setSelectedValues(selectedIds);
                              field.onChange(selectedIds);
                            }}
                            renderInput={(params) => <TextField {...field} {...params} label="Clubs" />}
                          />
                        )}
                      />
                    </Box>
                    {errors.clubs && (
                      <Typography color="error" sx={{ marginTop: '6px' }}>
                        {errors.clubs.message}
                      </Typography>
                    )}
                    {!loading ? (
                      <Box align="center">
                        <Button type="submit" fullWidth variant="contained" color="primary" style={SignUpBtnStyle}>
                          Save
                        </Button>
                      </Box>
                    ) : (
                      <Stack justifyContent={'center'} alignSelf={'center'} alignItems={'center'} spacing={2} direction="row">
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
                    )}
                  </form>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Fade>
    </Modal>
  );
}
