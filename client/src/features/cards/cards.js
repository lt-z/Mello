import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchBoard } from '../boards/boards';

const initialState = [];

const fetchCard = createAsyncThunk('cards/fetchCard', async (id) => {
  const data = await apiClient.getCard(id);
  return data;
});

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const cards = action.payload.lists.reduce((prev, curr) => {
        prev = prev.concat(...curr['cards']);
        return prev;
      }, []);
      const st = state.filter(
        (card) => card.listId !== action.payload.lists._id
      );
      return st.concat(...cards);
    }),
      builder.addCase(fetchCard.fulfilled, (state, action) => {
        const st = state.filter((card) => card._id !== action.payload._id);
        return st.concat(action.payload);
      });
  },
});

export default cardSlice.reducer;
