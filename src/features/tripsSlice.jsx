import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllTrips } from '../api/tripService';

export const fetchTrips = createAsyncThunk('trips/fetchTrips', async () => {
  return await fetchAllTrips();
});

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tripsSlice.reducer;