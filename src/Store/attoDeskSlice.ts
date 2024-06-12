import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AttoDeskStores } from '../Core/Enum/enum';

export interface AttoDeskItem {
  component: AttoDeskStores;
  data: Object;
}

const initialState: AttoDeskItem = {
  component: AttoDeskStores.DEFAULT,
  data: {},
};

export const attoDeskStore = createSlice({
  name: 'attoDeskStore',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AttoDeskItem>) => {
      state.component = action.payload.component;
      state.data = action.payload.data;
    },
    restore: (state) => {
      state.component = AttoDeskStores.DEFAULT;
      state.data = {};
    },
  },
});

export const { addItem, restore } = attoDeskStore.actions;

export const AttoDeskReducer = attoDeskStore.reducer;

export { initialState as AttoDeskInitialState };
