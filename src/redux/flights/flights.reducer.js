import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk для запиту рейсів
export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (
    {
      origin,
      destination,
      departDate,
      returnDate,
      adults = 1,
      children = 0,
      infants = 0,
      promoCode = '',
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        'https://www.ryanair.com/api/booking/v4/en-gb/availability',
        {
          params: {
            ADT: adults,
            CHD: children,
            INF: infants,
            DateOut: departDate,
            Destination: destination,
            Origin: origin,
            Disc: 0,
            TEEN: 0,
            promoCode,
            IncludeConnectingFlights: false,
            FlexDaysBeforeOut: 4,
            FlexDaysOut: 2,
            FlexDaysBeforeIn: 2,
            FlexDaysIn: 2,
            RoundTrip: returnDate ? 'true' : 'false',
            DateIn: returnDate,
            ToUs: 'AGREED',
          },
        }
      );
      return response.data;
      // Повертаємо дані з API
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Локальний редуктор для очищення списку рейсів
    clearFlights: state => {
      state.flights = [];
      state.error = null;
    },

    // Локальний редуктор для встановлення помилки
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Локальний редуктор для додавання рейсів
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFlights.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFlights, setError, setFlights } = flightsSlice.actions;
export const flightsReducer = flightsSlice.reducer;
