import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import { Pagination } from '@mui/material';

import TableRow from '@mui/material/TableRow';
import { Typography, Button } from '@mui/material';
import { Divider } from '@mui/material';
import { Stack } from '@mui/system';
import EventAddModal from './EventAddModal';
import ClubAddModal from './ClubAddModal';
import { useDispatch, useSelector } from 'react-redux';
import { getStudent, setPageNumber, setStudentId } from '../../../store/redux/userSlice';
import { ThreeDots } from 'react-loader-spinner';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddStudentModal from './AddStudentModal';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteModal from './DeleteModal';

const columns = [
  {
    id: 'name',
    label: 'Name',
    align: 'center',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US')
  },

  { id: 'classname', label: 'Class name', minWidth: 50, align: 'center' },
  {
    id: 'events',
    label: 'Events',
    align: 'center',
    minWidth: 20
  },
  {
    id: 'clubs',
    label: 'Clubs',
    align: 'center',
    minWidth: 20
  },
  {
    id: 'action',
    label: 'Action',
    align: 'center',
    minWidth: 20
  }
];

export default function Students() {
  const dispatch = useDispatch();
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [addClubModalOpen, setAddClubModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState();
  const [addStudent, setAddStudent] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const studentList = useSelector((state) => (state.userAuth?.studentList ? state.userAuth?.studentList : []));
  // console.warn('studentList index---->', studentList);
  const page = useSelector((state) => state.userAuth?.page);
  const limit = useSelector((state) => state.userAuth?.studentLimit);
  const schoolId = localStorage.getItem('schoolId');
  const classId = localStorage.getItem('classId');
  const totalCount = useSelector((state) => state.userAuth?.totalCount);
  // const totalStudents = useSelector((state) => state.userAuth?.totalStudents || 0);
  const isLoading = useSelector((state) => state.userAuth?.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStudent({ page: page, search: '', limit: limit, classId: classId, schoolId: schoolId }));

    // eslint-disable-next-line
  }, []);

  const addEvent = (id, e) => {
    // console.log('id', id);
    e.stopPropagation();
    setSelectedStudentId(id);
    setAddEventModalOpen(true);
  };
  const addClub = (e, id) => {
    // console.log('id', id);
    e.stopPropagation();
    setSelectedStudentId(id);
    setAddClubModalOpen(true);
  };

  const handleClose = () => {
    setAddStudent(false);
  };
  const handleNavigate = (id) => {
    // console.warn('student id---', id);
    dispatch(setStudentId(id));
    // navigate('/studentprofileupdate');
    navigate('/students/studentprofileupdate');
  };
  const handleSearchChange = (e) => {
    // console.log('hello', e.target.value);
    dispatch(getStudent({ page: '', search: e.target.value, limit: '' }));
  };
  const handlePagination = (event, value) => {
    // dispatch(fetchMentorList({ page: value, limit: totalLimit, status: mentorStatus }));
    dispatch(setPageNumber(value));
    dispatch(getStudent({ page: value, search: '', limit: limit, classId: classId, schoolId: schoolId }));
  };
  const handleDeleteModalOpen = (studentId) => {
    // console.log('studentId-->', studentId);
    dispatch(setStudentId(studentId));
    setDeleteModalOpen(true);
  };
  const handleEditClose = () => {
    setDeleteModalOpen(false);
  };
  return (
    <>
      {deleteModalOpen && <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} handleClose={handleEditClose} />}
      <Stack sx={{ marginBottom: '16px' }} direction={{ md: 'row', sm: 'column' }} justifyContent={{ md: 'space-between' }} gap={'18px'}>
        {/* <Typography variant="h2">Msmes </Typography> */}
        <Typography variant="h2" component="div" marginTop={{ sm: '12px' }}>
          Students
        </Typography>

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: '18px', md: '0' }}>
          <TextField
            id="outlined-basic"
            label="Seach by name"
            variant="outlined"
            sx={{ width: { xs: '100%', md: '200px' }, mr: 1 }}
            onChange={handleSearchChange}
          />
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: '#38c7fc',
              color: 'white',
              width: { xs: '100%', sm: '200px' },
              '&:hover': {
                color: '#38c7fc'
              }
            }}
            endIcon={<AddCircleIcon />}
            onClick={() => setAddStudent(true)}
          >
            Add
          </Button>
        </Box>
      </Stack>
      <>
        <EventAddModal open={addEventModalOpen} setOpen={setAddEventModalOpen} studentId={selectedStudentId} />
        <ClubAddModal open={addClubModalOpen} setOpen={setAddClubModalOpen} studentId={selectedStudentId} />
        {/* <SchoolEditModal open={editModalOpen} setOpen={setEditModalOpen} editSchoolData={selectedSchoolData} /> */}
        {/* <SchoolDeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} deleteStudentData={deleteStudentData} /> */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Divider />
          {/* rows and column data */}
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor: '#38c7fc', color: 'white' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
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
                    </TableCell>
                  </TableRow>
                ) : studentList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                      {' '}
                      {/* Span all columns and apply center alignment */}
                      <Typography variant="subtitle1" color="textSecondary">
                        No Student found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  studentList?.map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      onClick={() => handleNavigate(row._id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {/* <TableCell>{index + 1 + (page - 1) * rowsPerPage}</TableCell> */}
                      {/* <TableCell>{index + 1} </TableCell> */}
                      <TableCell align="center">{row?.name} </TableCell>
                      {/* <TableCell align="center">{studentList?.schoolName ? studentList?.schoolName : 'School not exists'} </TableCell> */}
                      {/* <TableCell align="center">{studentList?.className ? studentList?.className : 'Class not exists'} </TableCell> */}
                      <TableCell align="center">{row?.classId?.className ? row?.classId?.className : 'Class not exists'} </TableCell>
                      {/*  <TableCell>
                        <Stack
                          direction={'row'}
                          sx={{ color: '#1EABE6', cursor: 'pointer' }}
                          spacing={0.5}
                          onClick={() => handleYearbook(row._id)}
                          justifyContent="center"
                        >
                          <VisibilityIcon fontSize="small" />

                          <Typography variant="h6">View</Typography>
                        </Stack>
                      </TableCell> */}
                      <TableCell>
                        <Stack direction="row" justifyContent="center">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: '#38c7fc',
                              color: 'white',
                              '&:hover': {
                                color: '#38c7fc'
                              }
                            }}
                            endIcon={<AddCircleIcon />}
                            onClick={(e) => addEvent(row._id, e)}
                          >
                            Add Event
                          </Button>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" justifyContent="center">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: '#38c7fc',
                              color: 'white',
                              '&:hover': {
                                color: '#38c7fc'
                              }
                            }}
                            endIcon={<AddCircleIcon />}
                            onClick={(e) => addClub(e, row._id)}
                          >
                            Add Club
                          </Button>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" justifyContent="center">
                          {/*  <Button onClick={() => handleNavigate(row._id)}>
                              <BorderColorTwoToneIcon sx={{ color: '#1EABE6', cursor: 'pointer' }} />
                            </Button> */}
                          {/*  <Stack>
                            <Link to={`${row._id}`}>
                              <VisibilityIcon fontSize="small" sx={{ color: '#1EABE6', cursor: 'pointer' }} />
                            </Link>
                          </Stack> */}
                          <IconButton>
                            <DeleteOutlineTwoToneIcon
                              color="error"
                              style={{
                                fontSize: '20px',
                                cursor: 'pointer'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteModalOpen(row._id);
                              }}
                            />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems={'center'} p={2}>
            <Pagination count={totalCount} page={page} variant="outlined" onChange={handlePagination} shape="rounded" />
          </Stack>
        </Paper>
        <AddStudentModal open={addStudent} handleClose={handleClose} />
      </>
    </>
  );
}
