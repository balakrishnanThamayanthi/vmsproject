import { combineReducers } from "@reduxjs/toolkit";
import { attoDeskApi } from "../Api/attoDeskApi";
import { AuthReducer } from "./Auth/AuthSlice";
import { AttoDeskReducer } from "./attoDeskSlice";

export const ROOT_ACTIONS = {
  logout: "logout",
};

const staticReducers = {
  [attoDeskApi.reducerPath]: attoDeskApi.reducer,
  auth: AuthReducer,
  attoDeskStore: AttoDeskReducer,
};

const createReducer = (asyncReducers?: any) => (state: any, action: any) => {
    let combinedReducer;
    if (asyncReducers) {
      combinedReducer = combineReducers({
        ...staticReducers,
        ...asyncReducers,
      });
    } else {
      // Else just combine the static reducers
      combinedReducer = combineReducers({
        ...staticReducers,
      });
    }
  
    /**
     * Reset the redux store when user logged out
     */
    if (action.type === ROOT_ACTIONS.logout) {
      state = undefined;
    }
  
    return combinedReducer
      ? combinedReducer(state, action as never)
      : { ...state };
  };
  
  createReducer();
  
  export default createReducer;
