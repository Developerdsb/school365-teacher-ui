import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customBase } from '../../utils/customBase';
import { clearTokenInLocalStorage } from '../../utils/localStorage';

const initialState = {
  userRegister: { created: false },
  userLogin: {},
  isLoading: false,
  error: null,
  isAuthenticated: false,
  teacherData: {}
};

export const registerUser = createAsyncThunk('user/registerUser', async (data, thunkAPI) => {
  try {
    const response = await customBase.post('/signup', data);

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
    const response = await customBase.get('/verify_token');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// get Teacher Dashboard data
export const getTeacherDetails = createAsyncThunk('user/data', async (_, thunkAPI) => {
  try {
    const response = await customBase.get('/getuser');
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

const usersSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setRegistrationStatus: (state, action) => {
      state.userRegister.created = action.payload;
    },
    logoutUserSuccess: (state) => {
      state.isAuthenticated = false;
      // Clear other user-related state if needed
    },
    setRegistration: (state, action) => {
      state[action.payload.key] = action.payload.value;
    }
  },

  extraReducers: (builder) => {
    builder
      // register state
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false; // Make sure to set isLoading to false
        state.userRegister = { created: payload.success };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // login state
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userLogin = {
          ...state.userLogin,
          sent: true
        };
        (state.status = true), console.log('payload', payload);
        localStorage.setItem('authToken', payload);
        // Store the JWT token in local storage
        // storeTokenInLocalStorage(payload);
      })

      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
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
      })
      .addCase(getLoginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getTeacherDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeacherDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.teacherData = payload;
      })
      .addCase(getLoginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  }
});

export const { setRegistrationStatus, logoutUserSuccess, setRegistration } = usersSlice.actions;
export default usersSlice.reducer;
