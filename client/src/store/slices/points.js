import { createSlice } from '@reduxjs/toolkit';

const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    labPoints: 0,
    labTotalPoints: 0,
    diagnosisPoints: 0,
    diagnosisTotalPoints: 0,
  },
  reducers: {
    addLabPoints: (state, data) => {
      state.labPoints += data.payload;
    },
    addLabTotalPoints: (state, data) => {
      state.labTotalPoints += data.payload;
    },
    resetAllPoints: (state, data) => {
      state.labPoints = 0;
      state.labTotalPoints = 0;
      state.diagnosisPoints = 0;
      state.diagnosisTotalPoints = 0;
    },

    addDiagnosisPoints: (state, data) => {
      state.diagnosisPoints += data.payload;
    },
    addDiagnosisTotalPoints: (state, data) => {
      state.diagnosisTotalPoints += data.payload;
    },
  },
});

export const pointsActions = pointsSlice.actions;
export default pointsSlice;
