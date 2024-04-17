import React, { createContext, useContext, useReducer } from "react";
import { initialTeamsState, teamsReducer } from "./reducer";
import { TeamsDispatch, TeamsState } from "./types";

const TeamsStateContext = createContext<TeamsState>(initialTeamsState);
const TeamsDispatchContext = createContext<TeamsDispatch>(() => { });

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(teamsReducer, initialTeamsState);
  return (
    <TeamsStateContext.Provider value={state}>
      <TeamsDispatchContext.Provider value={dispatch}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamsStateContext.Provider>
  )
}

export const useTeamsState = () => useContext(TeamsStateContext);
export const useTeamsDispatch = () => useContext(TeamsDispatchContext);