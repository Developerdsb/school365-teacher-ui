import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiAuth } from '../../utils/customBase';
import { toast } from 'react-toastify';

const initialState = {
  studentClubs: [],
  error: '',
  loading: false
};

// get clubs list
export const getClubs = createAsyncThunk('user/getclubs', async (payload, thunkAPI) => {
  try {
    const response = await apiAuth.get(
      `/clubs/list?schoolId=${payload.schoolId}&page=${payload.page}&limit=${payload.limit}&search=${payload.search}`
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// post clubs
export const postClubs = createAsyncThunk('user/postclubs', async (data, thunkAPI) => {
  // const {studentId , eventId  } = data
  try {
    const response = await apiAuth.post('/assignClubs', data);
    
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

const ClubSlice = createSlice({
  name: 'Club',
  initialState,

  extraReducers: (builder) => {
    builder
      // get clubs
      .addCase(getClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClubs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.studentClubs = payload;
      })
      .addCase(getClubs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // post clubs
      .addCase(postClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postClubs.fulfilled, (state, { payload }) => {
        toast.success(payload.message);
        state.loading = false;
      })
      .addCase(postClubs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
});

export default ClubSlice.reducer;
