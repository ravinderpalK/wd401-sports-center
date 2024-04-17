import React, { createContext, useContext, useReducer } from "react";
import { initialSportsState, sportsReducer } from "./reducer";
import { SportsDispatch, SportsState } from "./types";

const SportsStateContext = createContext<SportsState>(initialSportsState);
const SportsDispatchContext = createContext<SportsDispatch>(() => { });

export const SportsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(sportsReducer, initialSportsState);
  return (
    <SportsStateContext.Provider value={state}>
      <SportsDispatchContext.Provider value={dispatch}>
        {children}
      </SportsDispatchContext.Provider>
    </SportsStateContext.Provider>
  )
}

export const useSportState = () => useContext(SportsStateContext);
export const useSportsDispatch = () => useContext(SportsDispatchContext);