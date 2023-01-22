import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../features/modalSlice'
import habitsReducer from '../features/habitsSlice'

// creating the redux store and passing all the reducers to it
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    habits: habitsReducer,
  },
});
