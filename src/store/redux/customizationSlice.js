import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';

// Define initial state
const initialState = {
  isOpen: [],
  defaultId: 'default',
  fontFamily: config.fontFamily,
  opened: true
};

// Create a slice
const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    menuOpen: (state, action) => {
      const id = action.payload;
      state.isOpen = [id];
    },
    setMenu: (state, action) => {
      state.opened = action.payload;
    },
    SETFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    }
  }
});

export const { menuOpen, setMenu, SETFontFamily } = customizationSlice.actions;
export default customizationSlice.reducer;
