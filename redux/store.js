import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  messageReducer,
  userListingReducer,
  getListingReducer,
  videoReducer,
} from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    userListing: userListingReducer,
    getListing: getListingReducer,
    videos: videoReducer,
  },
});

export default store;
