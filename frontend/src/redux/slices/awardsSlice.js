import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  awards: [],
  isLoading: false,
  error: null,
};

const awardsSlice = createSlice({
  name: 'awards',
  initialState,
  reducers: {
    setAwards: (state, action) => {
      state.awards = action.payload;
    },
    addAward: (state, action) => {
      state.awards.push(action.payload);
    },
    updateAward: (state, action) => {
      const index = state.awards.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.awards[index] = action.payload;
      }
    },
    deleteAward: (state, action) => {
      state.awards = state.awards.filter(a => a.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAwards, addAward, updateAward, deleteAward, setLoading, setError } = awardsSlice.actions;
export default awardsSlice.reducer;
