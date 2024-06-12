import { Action, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import createReducer from "./routeReducer";
import { attoDeskApi } from "../Api/attoDeskApi";
import { setupListeners } from "@reduxjs/toolkit/query";

if (process.env.NODE_ENV === "development" && (module as any).hot) {
  (module as any).hot.accept("./routeReducer", () => {
    const newRootReducer = require("./routeReducer").default;
    store.replaceReducer(newRootReducer.createReducer());
  });
}

export const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(attoDeskApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, void, Action>;

export default store;
