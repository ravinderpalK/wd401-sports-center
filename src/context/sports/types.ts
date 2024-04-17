import React from "react";

export interface Sport {
  id: number;
  name: string;
}

export interface SportsState {
  sports: Sport[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum SportsAvailableActions {
  FETCH_SPORTS_REQUEST = "FETCH_SPORTS_REQUEST",
  FETCH_SPORTS_SUCCESS = "FETCH_SPORTS_SUCCESS",
  FETCH_SPORTS_FAILURE = "FETCH_SPORTS_FAILURE",
}

export type SportsActions =
  { type: SportsAvailableActions.FETCH_SPORTS_REQUEST } |
  { type: SportsAvailableActions.FETCH_SPORTS_SUCCESS, payload: Sport[] } |
  { type: SportsAvailableActions.FETCH_SPORTS_FAILURE, payload: string };

export type SportsDispatch = React.Dispatch<SportsActions>;

