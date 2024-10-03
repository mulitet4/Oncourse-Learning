import { createSlice } from '@reduxjs/toolkit';

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: {},
  },
  reducers: {
    setPatients: (state, data) => {
      state.patients = data.payload;
    },
  },
});

export const patientsActions = patientsSlice.actions;
export default patientsSlice;
