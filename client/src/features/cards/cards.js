import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchBoard } from '../boards/boards';

const initialState = [];

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      let currLists = action.payload.lists;
      currLists.forEach(list => delete list.cards);
      const st = state.filter((list) => list.boardId !== currLists.boardId);
      return st.concat(currLists);
    })
  },
});

export default cardSlice.reducer;

/*
state: {
  boards: [{ a list of all the boards}],
  lists: [{ a list of all the lists}],
  cards: [{ a list of all the cards}],
}


*/