import React, { createContext, useContext, useReducer } from "react";
import { initialMatchesState, matchesReducer } from "./reducer";
import { MatchesDispatch, MatchesState } from "./types";

const MatchesStateContext = createContext<MatchesState>(initialMatchesState)
const MatchesDispatchContext = createContext<MatchesDispatch>(() => { });

export const MatchesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(matchesReducer, initialMatchesState);
  return (
    <MatchesStateContext.Provider value={state}>
      <MatchesDispatchContext.Provider value={dispatch}>
        {children}
      </MatchesDispatchContext.Provider>
    </MatchesStateContext.Provider>
  )
}

export const useMatchesState = () => useContext(MatchesStateContext);
export const useMatchesDispatch = () => useContext(MatchesDispatchContext);