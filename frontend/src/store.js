import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer
} from "./redux/reducer/userLoginReducer";
import {
  noteReducer,
  noteCreateReducer,
  noteDeleteReducer,
  noteUpdateReducer,
} from "./redux/reducer/noteReducer";
const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  userUpdate:userUpdateReducer
});
const composeEnhancers = composeWithDevTools({
  serialize: true,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
