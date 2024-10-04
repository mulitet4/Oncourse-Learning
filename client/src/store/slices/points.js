import { createSlice } from '@reduxjs/toolkit';

const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    currentPoints: 0,
    currentTotalPoints: 0,
    globalPoints: 0,
    globalTotalPoints: 0,
  },
  reducers: {
    incrementCurrentPoints: (state, data) => {
      state.currentPoints += data.payload;
    },
    incrementCurrentTotalPoints: (state, data) => {
      state.currentTotalPoints += data.payload;
    },
    incrementGlobalPoints: (state, data) => {
      state.globalPoints += data.payload;
    },
    incrementGlobalTotalPoints: (state, data) => {
      state.globalTotalPoints += data.payload;
    },
    resetCurrentPoints: (state, data) => {
      state.currentPoints = 0;
    },
    resetCurrentTotalPoints: (state, data) => {
      state.currentTotalPoints = 0;
    },
  },
});

export const pointsActions = pointsSlice.actions;
export default pointsSlice;
