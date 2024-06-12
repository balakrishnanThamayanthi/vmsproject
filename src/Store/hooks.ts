import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index';


// Use throughout your app instead of plain `useDispatch` and `useSelector`
// Ref: https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =
useSelector;
