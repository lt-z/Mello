import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';
import { fetchBoard } from '../boards/boards';

const initialState = [];

export const createList = createAsyncThunk('lists/createList', async (args) => {
  // TODO: handle empty input
  const { newList, setNewListClass: callback } = args;

  const data = await apiClient.createList(newList);
  if (callback) {
    callback('new-list');
  }
  return data;
});

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const { lists } = action.payload;
      const filteredList = state.filter(
        (list) => list.boardId !== action.payload._id
      );
      return filteredList.concat(lists);
    }),
      builder.addCase(createList.fulfilled, (state, action) => {
        return state.concat(action.payload);
      });
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
