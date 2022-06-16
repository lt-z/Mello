import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchBoard } from '../boards/boards';

const initialState = [];

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const { lists } = action.payload;
      lists.forEach(list => delete list.cards);
      const filteredList = state.filter((list) => list.boardId !== lists.boardId);
      return filteredList.concat(lists);
    })
  },
});

export default listSlice.reducer;

/*
state: {
  boards: [{ a list of all the boards}],
  lists: [{ a list of all the lists}],
  cards: [{ a list of all the cards}],
}


*/