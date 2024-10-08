import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    verificationRequest: (state) => {
      state.loading = true;
    },
    verificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    verificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    fetchUserListingsRequest: (state) => {
      // <- Remove the trailing comma here
      state.userLoading = true;
    },
    fetchUserListingsSuccess: (state, action) => {
      // <- Remove the trailing comma here
      state.userLoading = false;
      state.userListings = action.payload;
    },
    fetchUserListingsFailure: (state, action) => {
      // <- Remove the trailing comma here
      state.userLoading = false;
      state.userError = action.payload;
    },
  } // <- Remove the trailing comma here
);

export const messageReducer = createReducer(
  {},
  {
    addTaskRequest: (state) => {
      state.loading = true;
    },
    addTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateTaskRequest: (state) => {
      state.loading = true;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTaskRequest: (state) => {
      state.loading = true;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    forgetPasswordRequest: (state) => {
      state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }
);

//Add a getListingReducer to redux/reducer.js
export const getListingReducer = createReducer(
  {
    loading: false,
    listings: [],
    error: null,
  },
  {
    getListingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getListingSuccess: (state, action) => {
      state.loading = false;
      state.listings = action.payload;
      state.error = null;
    },
    getListingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const videoReducer = createReducer(
  {
    videos: [], // Initial state for videos
  },
  {
    // Upload Video Actions
    uploadVideoRequest: (state) => {
      state.loading = true;
    },
    uploadVideoSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    uploadVideoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch User Videos Actions
    getUserVideosRequest: (state) => {
      state.loading = true;
    },
    getUserVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    getUserVideosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear Errors and Messages
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);


//Add a UserListingReducer to redux/reducer.js
export const userListingReducer = createReducer(
  {
    userLoading: false,
    userListings: [],
    userError: null,
    userMessage: null,
  },
  {
    getUserListingRequest: (state) => {
      state.userLoading = true;
    },
    getUserListingSuccess: (state, action) => {
      state.userLoading = false;
      state.userListings = action.payload;
    },
    getUserListingFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    updateUserListingRequest: (state) => {
      state.userLoading = true;
    },
    updateUserListingSuccess: (state, action) => {
      state.userLoading = false;
      state.userMessage = action.payload;
    },
    updateUserListingFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    deleteUserListingRequest: (state) => {
      state.userLoading = true;
    },
    deleteUserListingSuccess: (state, action) => {
      state.userLoading = false;
      state.userMessage = action.payload;
    },
    deleteUserListingFailure: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    clearUserError: (state) => {
      state.userError = null;
    },
    clearUserMessage: (state) => {
      state.userMessage = null;
    },
  }
);
