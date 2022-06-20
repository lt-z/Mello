import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/ApiClient';

const initialState = [];

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const data = await apiClient.getBoards();
  return data;
});

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (newBoard, callback) => {
    const data = await apiClient.createBoard(newBoard);
    if (callback) {
      callback();
    }
    return data;
  }
);

export const fetchBoard = createAsyncThunk('boards/fetchBoard', async (id) => {
  const data = await apiClient.getBoard(id);
  return data;
});

export const editList = createAsyncThunk('boards/editList', async (args) => {
  const { id, updatedList } = args;
  const data = await apiClient.editList(id, updatedList);
  return data;
});

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      return action.payload;
    }),
      builder.addCase(createBoard.fulfilled, (state, action) => {
        state.push(action.payload);
      }),
      builder.addCase(fetchBoard.fulfilled, (state, action) => {
        // eslint-disable-next-line
        const { lists, ...boardWithoutLists } = action.payload;
        const filteredList = state.filter((b) => b._id !== action.payload._id);
        return filteredList.concat(boardWithoutLists);
      });
  },
});

export default boardSlice.reducer;

/*
on hard refresh ->
state = {
  empty state
}

/boards/2
API.fetchBoard(2)
  * Need a guard clause in the component.
  * Once we get it:
  * Check if it is in the state
  * If found -> return state.
  * Else ->
  *  F
*/
