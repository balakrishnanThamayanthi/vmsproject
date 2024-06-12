import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '.';
import { AttoDeskItem } from './attoDeskSlice';

export const selectAttoDeskStore = (state: RootState) => state.attoDeskStore;

export const selectItems = createSelector(
  selectAttoDeskStore,
  (attoDeskStore) => attoDeskStore as AttoDeskItem
);
