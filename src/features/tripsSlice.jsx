import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTrips = createAsyncThunk('trips/fetchTrips', async () => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  const response = await fetch('http://localhost:3005/api/trips', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch trips');
  }
  return response.json();
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