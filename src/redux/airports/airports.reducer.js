import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAirports = createAsyncThunk(
  'airports/fetchAirports', // Ім'я дії
  async (searchTerm, thunkAPI) => {
    try {
      console.log('Запит до API з пошуковим терміном:', searchTerm);
      const response = await axios.get(
        `https://www.ryanair.com/api/views/locate/3/airports/en/active`,
        {
          params: { query: searchTerm },
        }
      );
      console.log('Отримані дані:', response.data);
      return response.data;
    } catch (error) {
      console.error('Помилка при запиті:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const airportsSlice = createSlice({
  name: 'airports',
  initialState: {
    airports: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAirports.pending, state => {
        state.loading = true;
        console.log('Запит у процесі...');
      })
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.loading = false;
        state.airports = action.payload;
        console.log(
          'Запит успішно завершено, отримано аеропорти:',
          action.payload
        );
        console.log(
          'Запит успішно завершено, отримано аеропорти:',
          action.payload
        );
        console.log('airports після завантаження:', state.airports); // Лог для перевірки аеропортів
      })
      .addCase(fetchAirports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Запит не вдалося виконати, помилка:', action.payload);
      });
  },
});

export const airportsReducer = airportsSlice.reducer;
