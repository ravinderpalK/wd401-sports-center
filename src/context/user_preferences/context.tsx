import React, { createContext, useContext, useReducer } from "react";
import { initialUserPreferencesState, preferencesReducer } from "./reducer";
import { PreferencesDispatch, PreferencesState } from "./types";


const PreferencesStateContext = createContext<PreferencesState>(initialUserPreferencesState);
const PreferencesDispatchContext = createContext<PreferencesDispatch>(() => { });

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialUserPreferencesState);
  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  )
}

export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () => useContext(PreferencesDispatchContext);  