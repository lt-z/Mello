import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/boards/boards';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

export default store;
