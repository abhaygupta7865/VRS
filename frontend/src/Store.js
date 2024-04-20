// store.js
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

// Initial state
const initialState = {
  loggedIn: false,
  email: '',
};

// Actions
  export const setLoggedIn = (isLoggedIn) => {
      return (dispatch) => {
        dispatch({
          type: 'SET_LOGGED_IN',
          payload: isLoggedIn,
        });
      };
    };
  
  export const setEmail = (email) => {
    return (dispatch) => {
      dispatch({
        type: 'SET_EMAIL',
        payload: email,
      });
    };
  };
  
  export const setDateState = (dateState) => {
    // Convert dateState to a serializable format
    const serializedDateState = dateState.map(item => ({
      ...item,
      startDate: item.startDate.toISOString(),
      endDate: item.endDate ? item.endDate.toISOString() : null,
    }));
  
    return (dispatch) => {
      dispatch({
        type: 'SET_DATE_STATE',
        payload: serializedDateState,
      });
    };
  };
  
  export const setTimeValue = (timeValue) => {
    // Convert timeValue to a serializable format
    const serializedTimeValue = timeValue ? {
      start: timeValue[0].toISOString(),
      end: timeValue[1].toISOString(),
    } : null;
  
    return (dispatch) => {
      dispatch({
        type: 'SET_TIME_VALUE',
        payload: serializedTimeValue,
      });
    };
  };

  export const setLocation = (location) => {
    return (dispatch) => {
      dispatch({
        type: 'SET_LOCATION',
        payload: location,
      });
    };
  };

  export const setCarData = (carData) => {
    return (dispatch) => {
      dispatch({
        type: 'SET_CAR_DATA',
        payload: carData,
      });
    };
  };

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return {
        ...state,
        loggedIn: action.payload,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_DATE_STATE':
      return {
        ...state,
        dateState: action.payload,
      };
    case 'SET_TIME_VALUE':
      return {
        ...state,
        timeValue: action.payload,
      };
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    case 'SET_CAR_DATA':
      return {
        ...state,
        carData: action.payload,
      };
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
