//importaciones
import { combineReducers } from "redux";

//reducers
import posts from "./posts.reducers";
import authReducer from "./auth.reducers";

//exports
export const reducers = combineReducers({
  posts,
  authReducer,
});
