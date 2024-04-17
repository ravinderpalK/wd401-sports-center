import { Reducer } from "react";
import { MatchesActions, MatchesAvailableActions, MatchesState } from "./types";

export const initialMatchesState: MatchesState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
}

export const matchesReducer: Reducer<MatchesState, MatchesActions> = (state = initialMatchesState, action): MatchesState => {
  switch (action.type) {
    case MatchesAvailableActions.FETCH_ALL_MATCHES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case MatchesAvailableActions.FETCH_ALL_MATCHES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case MatchesAvailableActions.FETCH_ALL_MATCHES_FAILURE:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}