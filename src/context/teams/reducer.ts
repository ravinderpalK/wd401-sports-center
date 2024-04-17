import { Reducer } from "react";
import { TeamsAction, TeamsAvailableActions, TeamsState } from "./types";

export const initialTeamsState: TeamsState = {
  teams: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
}

export const teamsReducer: Reducer<TeamsState, TeamsAction> = (state = initialTeamsState, action): TeamsState => {
  switch (action.type) {
    case TeamsAvailableActions.FETCH_TEAM_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case TeamsAvailableActions.FETCH_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teams: action.payload,
      }
    case TeamsAvailableActions.FETCH_TEAM_FAILURE:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      }
    default:
      return state;
  }
}