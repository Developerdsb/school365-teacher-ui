import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiAuth } from '../../utils/customBase';
import { toast } from 'react-toastify';

const initialState = {
  studentEvents: [],
  error: '',
  loading: false,
  dashboardEventsList: []
};

// get events list
export const getEvents = createAsyncThunk('user/getevents', async (payload, thunkAPI) => {
  try {
    const response = await apiAuth.get(
      `/events/list?schoolId=${payload.schoolId}&page=${payload.page}&limit=${payload.limit}&search=${payload.search}`
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// post events
export const postEvents = createAsyncThunk('user/postevents', async (data, thunkAPI) => {
  try {
    const response = await apiAuth.post('/assignevents', data);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const eventsList = createAsyncThunk('teacher/eventsList', async (data, thunkAPI) => {
  const { page, limit, schoolId } = data;
  try {
    const response = await apiAuth.get(
      `/events/list?schoolId=${schoolId ? schoolId : ''}&page=${page ? page : ''}&limit=${limit ? limit : ''}&studentcount=${'true'}
      `
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

const EventSlice = createSlice({
  name: 'Event',
  initialState,

  extraReducers: (builder) => {
    builder
      // get events
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.studentEvents = payload;
      })
      .addCase(getEvents.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // post events
      .addCase(postEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postEvents.fulfilled, (state, { payload }) => {
        toast.success(payload.message);
        state.loading = false;
      })
      .addCase(postEvents.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // events List
      .addCase(eventsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(eventsList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dashboardEventsList = payload.events;
      })
      .addCase(eventsList.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default EventSlice.reducer;
