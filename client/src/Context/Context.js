import { createContext, useReducer } from "react";
import Reducer from "./Reducers/Reducer";
import { useEffect } from "react";
import React from 'react';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("timesheet_user437")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  
   useEffect(()=>{
      localStorage.setItem("timesheet_user437",JSON.stringify(state.user))
   },[state.user])
   
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
