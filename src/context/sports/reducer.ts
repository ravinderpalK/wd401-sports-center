import { Reducer } from "react";
import { SportsActions, SportsAvailableActions, SportsState } from "./types";

export const initialSportsState: SportsState = {
  sports: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
}

export const sportsReducer: Reducer<SportsState, SportsActions> = (state, action): SportsState => {
  switch (action.type) {
    case SportsAvailableActions.FETCH_SPORTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case SportsAvailableActions.FETCH_SPORTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sports: action.payload
      }
    case SportsAvailableActions.FETCH_SPORTS_FAILURE:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      }
    default:
      return state;
  }
}