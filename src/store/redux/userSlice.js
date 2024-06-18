import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customBase, apiAuth, adminBase, studentAuth } from '../../utils/customBase';
import { clearTokenInLocalStorage } from '../../utils/localStorage';
import { toast } from 'react-toastify';

const initialState = {
  userRegister: { created: false },
  userLogin: {},
  classes: {},
  schools: {},
  isLoading: false,
  loading: false,
  error: null,
  isAuthenticated: false,
  user: {},
  studentList: [],
  galleryImages: [],
  studentGalleryImages: [],
  imageUrls: [],
  page: 1,
  studentPage: 1,
  limit: 20,
  studentLimit: 10,
  totalCount: '',
  singleStudent: {},
  studentId: '',
  studentGalleryTotalPages: '',
  yearbookStudent: [],
  deleteIsLoading: '',
  totalpages: '',
  teacherCardsInfo: {}
};

export const registerUser = createAsyncThunk('teacher/registerUser', async (data, thunkAPI) => {
  try {
    const response = await customBase.post('/signup', data);
    console.log(response.data);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (data, thunkAPI) => {
  try {
    const response = await customBase.post('/login', data);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// Create the logoutUser action
export const getLoginUser = createAsyncThunk('user/getLoginUser', async (_, thunkAPI) => {
  try {
    const response = await apiAuth.get('/verify_token');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// Create the logoutUser action
export const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) => {
  try {
    // Optionally, you can make an API call to log the user out on the server

    // Clear the JWT token from local storage
    clearTokenInLocalStorage();

    // Return a success message or other data if needed
    return 'Logout successful';
  } catch (e) {
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

// get classes from admin
export const getClasses = createAsyncThunk('user/classes', async (payload, thunkAPI) => {
  try {
    const response = await adminBase.get(`/classes/list?page=${payload.page}&limit=${payload.limit}&search=${payload.search}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// get schools from admin
export const getSchools = createAsyncThunk('user/schools', async (payload, thunkAPI) => {
  try {
    const response = await adminBase.get(`/schools/list?page=${payload.page}&limit=${payload.limit}&search=${payload.search}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// get user data
export const getUser = createAsyncThunk('user/list', async (payload, thunkAPI) => {
  try {
    const response = await apiAuth.get('/getuser', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    // const { fetchStudent, page, limit } = payload;
    if (payload) {
      // const schoolId = localStorage.getItem('schoolId')
      // const classId = localStorage.getItem('classId')
      thunkAPI.dispatch(
        getStudent({
          schoolId: response.data.userDetails.user.schoolId,
          classId: response.data.userDetails.user.classId._id,
          page: payload.page,
          limit: payload.limit
        })
      );
    }
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// get students
/* export const getStudent = createAsyncThunk('user/dataa', async (payload, thunkAPI) => {
  try {
    const response = await apiAuth.get(
      `/studentList?schoolId=${payload.schoolId}&classId=${payload.classId}&page=${payload.page}&limit=${payload.limit}`
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
}); */
export const getStudent = createAsyncThunk('user/dataa', async (payload, thunkAPI) => {
  // console.warn('payload--->', payload);
  const { page, search, limit, classId, schoolId } = payload;
  try {
    const response = await apiAuth.get(
      `studentList?page=${page ? page : ''}&limit=${limit ? limit : ''}&classId=${classId ? classId : ''}&schoolId=${
        schoolId ? schoolId : ''
      }&search=${search ? search : ''}`
    );
    // console.warn('response--->', response);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// get Gallery Images
export const getGalleryImages = createAsyncThunk('user/getGalleryImages', async (data, thunkAPI) => {
  const { page, limit } = data;
  try {
    const response = await apiAuth.get(`/getgallery?page=${page ? page : ''}&limit=${limit ? limit : ''}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

//get student yearbook
export const getYearbook = createAsyncThunk('student/getYearbook', async (id, thunkAPI) => {
  try {
    const response = await studentAuth.get(`/student/getpdfurl/${id}`);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// update user data
export const updateUser = createAsyncThunk('user/update', async (userData, thunkAPI) => {
  try {
    const response = await apiAuth.put(`/updateprofile?_id=${userData.get('_id')}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// upload pdf
export const uploadPdf = createAsyncThunk('user/uploadPdf', async (userData, thunkAPI) => {
  try {
    const response = await apiAuth.post('/uploadpdf', userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const addStudent = createAsyncThunk('students/add', async (userData, thunkAPI) => {
  console.log('userData---', userData);
  try {
    const response = await apiAuth.post('/students/create', userData);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const singleStudent = createAsyncThunk('students/singleStudent', async (id, thunkAPI) => {
  // console.log('id---', id);
  try {
    const response = await apiAuth.post('/students/getAStudent', {
      student_id: id
    });
    // console.log('response.data---->', response.data);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const studentUpdate = createAsyncThunk('students/update', async (studentData, thunkAPI) => {
  console.log('studentData---', studentData);
  try {
    const response = await apiAuth.post('/students/update', studentData);
    // console.warn('response--->', response);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const studentGalleryImages = createAsyncThunk('student/galleryImages', async (data, thunkAPI) => {
  const { studentId, page, limit } = data;
  // console.warn('data--->', data);
  try {
    const response = await apiAuth.post(
      `students/gallery?userId=${studentId ? studentId : ''}&page=${page ? page : ''}&limit=${limit ? limit : ''}`
    );
    // console.warn('response.data-->', response.data);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const deleteStudent = createAsyncThunk('teacher/studentDelete', async (id, thunkAPI) => {
  console.log('id delete student--->', id);
  try {
    const response = await apiAuth.delete(`students/delete/${id}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const studentYearbook = createAsyncThunk('student/Yearbook', async (id, thunkAPI) => {
  try {
    const response = await apiAuth.post(`/students/yearbooks?userId=${id ? id : ''}`);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

//get teacher card details
export const teacherCardDetails = createAsyncThunk('teacher/details', async (data, thunkAPI) => {
  const { schoolId, classId } = data;
  try {
    const response = await apiAuth.get(`/dashboard?schoolId=${schoolId ? schoolId : ''}&classId=${classId ? classId : ''}`);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

const usersSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setAddImageUrls: (state, action) => {
      state.imageUrls.push(...action.payload);
    },
    setRegistrationStatus: (state, action) => {
      state.userRegister.created = action.payload;
    },
    logoutUserSuccess: (state) => {
      state.isAuthenticated = false;
    },
    setRegistration: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setStudentData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setPageNumber: (state, action) => {
      state.page = action.payload;
    },
    setStudentId: (state, action) => {
      // console.warn('action---', action.payload);
      state.studentId = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      // register state
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userRegister.created = payload.status;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        toast.error(payload);
        state.isLoading = false;
        state.error = payload;
      })

      // login state
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userLogin = payload;
        state.status = true;
        localStorage.setItem('authToken', payload.token);
        localStorage.setItem('schoolId', payload.schoolId);
        localStorage.setItem('classId', payload.classId);
        // Store the JWT token in local storage
        // storeTokenInLocalStorage(payload);
      })

      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload, {
          autoClose: 2000
        });
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        // Dispatch the logoutUserSuccess action
        usersSlice.caseReducers.logoutUserSuccess(state);
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLoginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.userinfo = payload;
      })
      .addCase(getLoginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // get classes api
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClasses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.classes = payload;
      })
      .addCase(getClasses.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // get schools api
      .addCase(getSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSchools.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.schools = payload;
      })
      .addCase(getSchools.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        localStorage.setItem('teacherId', payload.userDetails.user._id);
        state.isLoading = false;
        state.user = payload.userDetails;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStudent.fulfilled, (state, { payload }) => {
        // console.warn('student list payload--->', payload);
        state.studentList = payload.students;
        state.totalCount = payload.totalpages;
        state.isLoading = false;
      })
      .addCase(getStudent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getGalleryImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGalleryImages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.galleryImages = payload?.data;
        state.totalpages = payload?.totalpages;
      })
      .addCase(getGalleryImages.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getYearbook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getYearbook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        window.open(action.payload.templateUrl, '_blank');
      })
      .addCase(getYearbook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // upload pdf
      .addCase(uploadPdf.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPdf.fulfilled, (state, { payload }) => {
        toast.success(payload.message);
        state.loading = false;
      })
      .addCase(uploadPdf.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // addStudent
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStudent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addStudent.rejected, (state) => {
        state.loading = false;
      })
      //singleStudent
      .addCase(singleStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleStudent.fulfilled, (state, { payload }) => {
        // console.warn('single student', payload.data);
        state.loading = false;
        state.singleStudent = payload.data;
      })
      .addCase(singleStudent.rejected, (state) => {
        state.loading = false;
      })
      // studentUpdate
      .addCase(studentUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(studentUpdate.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(studentUpdate.rejected, (state) => {
        state.loading = false;
      })
      //studentGalleryImages
      .addCase(studentGalleryImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(studentGalleryImages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.studentGalleryImages = payload.data;
        state.studentGalleryTotalPages = payload.totalpages;
      })
      .addCase(studentGalleryImages.rejected, (state) => {
        state.isLoading = false;
      })
      // delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.deleteIsLoading = 'deleloading';
      })
      .addCase(deleteStudent.fulfilled, (state) => {
        state.deleteIsLoading = 'delsuccess';
      })
      .addCase(deleteStudent.rejected, (state) => {
        state.deleteIsLoading = 'delfailed';
      })
      //  studentYearbook
      .addCase(studentYearbook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(studentYearbook.fulfilled, (state, { payload }) => {
        // console.warn('yearbookStudent--->', payload);
        state.isLoading = false;
        state.yearbookStudent = payload?.templates;
      })
      .addCase(studentYearbook.rejected, (state) => {
        state.isLoading = true;
      })
      //teacherCardDetails
      .addCase(teacherCardDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(teacherCardDetails.fulfilled, (state, { payload }) => {
        // console.warn('payload --->', payload);
        state.isLoading = false;
        state.teacherCardsInfo = payload;
      })
      .addCase(teacherCardDetails.rejected, (state) => {
        state.isLoading = true;
      });
  }
});

export const { setRegistrationStatus, logoutUserSuccess, setRegistration, setStudentData, setAddImageUrls, setPageNumber, setStudentId } =
  usersSlice.actions;
export default usersSlice.reducer;
