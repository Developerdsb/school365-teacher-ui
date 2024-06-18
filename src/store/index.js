import { configureStore } from '@reduxjs/toolkit';
import customizationSlice from './redux/customizationSlice';
import usersSlice from './redux/userSlice';
import TemplateSlice from './redux/TemplateSlice';
import screenshotsSlice from './redux/screenshotsSlice';
import EventReducer from './redux/EventSlice';
import ClubReducer from './redux/ClubSlice';
const store = configureStore({
  reducer: {
    customization: customizationSlice,
    userAuth: usersSlice,
    template: TemplateSlice,
    screenshots: screenshotsSlice,
    events: EventReducer,
    clubs: ClubReducer
  }
});

export default store;
