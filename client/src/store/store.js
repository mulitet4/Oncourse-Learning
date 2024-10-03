import { configureStore } from '@reduxjs/toolkit';
import pointsSlice from './slices/points.js';
import patientsSlice from './slices/patients.js';

const store = configureStore({
  reducer: {
    points: pointsSlice.reducer,
    patients: patientsSlice.reducer,
  },
});

export default store;
