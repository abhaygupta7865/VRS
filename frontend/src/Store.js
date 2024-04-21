import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

// Initial state
const initialState = {
  loggedIn: false,
  email: '',
  // userDetails: null,
};

// Actions
export const setLoggedIn = (isLoggedIn) => (dispatch) => {
  dispatch({
    type: 'SET_LOGGED_IN',
    payload: isLoggedIn,
  });
};

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: 'SET_EMAIL',
    payload: email,
  });
};

export const setUserDetails = (userDetails) => ({
  type: 'SET_USER_DETAILS',
  payload: userDetails,
});

export const setDateState = (dateState) => (dispatch) => {
  dispatch({
    type: 'SET_DATE_STATE',
    payload: dateState,
  });
};

export const setTimeValue = (timeValue) => (dispatch) => {
  dispatch({
    type: 'SET_TIME_VALUE',
    payload: timeValue,
  });
};

export const setLocation = (location) => (dispatch) => {
  dispatch({
    type: 'SET_LOCATION',
    payload: location,
  });
};

export const setCarData = (carData) => (dispatch) => {
  dispatch({
    type: 'SET_CAR_DATA',
    payload: carData,
  });
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return { ...state, loggedIn: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_DATE_STATE':
      return { ...state, dateState: action.payload };
    case 'SET_TIME_VALUE':
      return { ...state, timeValue: action.payload };
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_CAR_DATA':
      return { ...state, carData: action.payload };
    case 'SET_USER_DETAILS':
      return { ...state, userDetails: action.payload};
    default:
      return state;
  }
};

// Create store
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
