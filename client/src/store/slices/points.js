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
    setCurrentTotalPoints: (state, data) => {
      state.currentTotalPoints = data.payload;
    },
    incrementGlobalPoints: (state, data) => {
      state.globalPoints += data.payload;
    },
    incrementGlobalTotalPoints: (state, data) => {
      state.globalTotalPoints += data.payload;
    },
  },
});

export const pointsActions = pointsSlice.actions;
export default pointsSlice;
