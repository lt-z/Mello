import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchBoard } from '../boards/boards';

const initialState = [];

export const fetchCard = createAsyncThunk('cards/fetchCard', async (id) => {
  const data = await apiClient.getCard(id);
  return data;
});

export const createCard = createAsyncThunk('cards/createCard', async (args) => {
  const { newCard, setCardTitle, toggleAddCard } = args;
  const data = await apiClient.createCard(newCard);

  if (setCardTitle) {
    setCardTitle('');
  }
  if (toggleAddCard) {
    toggleAddCard();
  }
  return data;
});

export const updateCard = createAsyncThunk('cards/updateCard', async (args) => {
  const data = await apiClient.updateCard(args);
  return data;
});

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const filterCards = state.filter(
        (card) => card.boardId !== action.payload._id
      );
      const cards = action.payload.lists.reduce((prev, curr) => {
        prev = prev.concat(...curr['cards']);
        return prev;
      }, []);
      return filterCards.concat(...cards);
    }),
      builder.addCase(fetchCard.fulfilled, (state, action) => {
        const st = state.filter((card) => card._id !== action.payload._id);
        return st.concat(action.payload);
      }),
      builder.addCase(createCard.fulfilled, (state, action) => {
        return state.concat(action.payload);
      }),
      builder.addCase(updateCard.fulfilled, (state, action) => {
        return state.map((card) =>
          card._id === action.payload._id ? action.payload : card
        );
      });
  },
});

export default cardSlice.reducer;
