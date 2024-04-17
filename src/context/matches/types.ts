import React from "react";

export interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  startsAt?: string,
  score?: any,
  endsAt: string;
  isRunning: boolean;
  playingTeam?: number,
  story?: string,
  teams: Team[];
}


interface Team {
  id: number;
  name: string;
}

export interface MatchesState {
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum MatchesAvailableActions {
  FETCH_ALL_MATCHES_REQUEST = "FETCH_ALL_MATCHES_REQUEST",
  FETCH_ALL_MATCHES_SUCCESS = "FETCH_ALL_MATCHES_SUCCESS",
  FETCH_ALL_MATCHES_FAILURE = "FETCH_ALL_MATCHES_FAILURE",

}

export type MatchesActions =
  { type: MatchesAvailableActions.FETCH_ALL_MATCHES_REQUEST } |
  { type: MatchesAvailableActions.FETCH_ALL_MATCHES_SUCCESS, payload: Match[] } |
  { type: MatchesAvailableActions.FETCH_ALL_MATCHES_FAILURE, payload: string };

export type MatchesDispatch = React.Dispatch<MatchesActions>; 