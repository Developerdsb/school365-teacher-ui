import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiAuth } from '../../utils/customBase';
const initialState = {
  localStep: 1,
  isLoading: false,
  templatePdf: [],
  status: ''
};

export const getTemplatePdf = createAsyncThunk('teacher/TemplatePdf', async (_, thunkAPI) => {
  try {
    const response = await apiAuth.get('/getpdfurl');
    return response?.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});
const templateSlice = createSlice({
  name: 'templateSlice',
  initialState,
  reducers: {
    setActiveSteplocal: (state, action) => {
      state.localStep = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTemplatePdf.pending, (state) => {
        state.isLoading = true;
        state.status = 'templateloading';
      })
      .addCase(getTemplatePdf.fulfilled, (state, { payload }) => {
        // console.warn('payload--->', payload);
        state.isLoading = false;
        state.templatePdf = payload?.data;
        state.status = 'templatesuccess';
      })
      .addCase(getTemplatePdf.rejected, (state) => {
        state.isLoading = false;
        state.status = 'templatefailed';
      });
  }
});
export const { setActiveSteplocal } = templateSlice.actions;
export default templateSlice.reducer;
