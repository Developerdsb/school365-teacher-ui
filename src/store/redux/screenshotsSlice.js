// src/features/screenshots/screenshotsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const screenshotsSlice = createSlice({
  name: 'screenshots',
  initialState: {
    templateOne: null,
    templateTwo: null
  },
  reducers: {
    setTemplateOneScreenshot: (state, action) => {
      state.templateOne = action.payload;
    },
    setTemplateTwoScreenshot: (state, action) => {
      state.templateTwo = action.payload;
    }
  }
});

export const { setTemplateOneScreenshot, setTemplateTwoScreenshot } = screenshotsSlice.actions;

export default screenshotsSlice.reducer;
