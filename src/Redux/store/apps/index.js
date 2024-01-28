// ** Toolkit imports
import { combineReducers } from "redux";

 // Import your reducers here
import admins from 'Redux/store/apps/admins';

import {
  combineReducers
} from "redux";

export const rootReducer = combineReducers({
  admins,
  // items: itemsReducer,
})
