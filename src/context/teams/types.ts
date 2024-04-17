import React from "react";

export interface Team {
  id: number;
  name: string;
  plays: string;
}

export interface TeamsState {
  teams: Team[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum TeamsAvailableActions {
  FETCH_TEAM_REQUEST = "FETCH_TEAM_REQUEST",
  FETCH_TEAM_SUCCESS = "FETCH_TEAM_SUCCESS",
  FETCH_TEAM_FAILURE = "FETCH_TEAM_FAILURE"
}

export type TeamsAction =
  { type: TeamsAvailableActions.FETCH_TEAM_REQUEST } |
  { type: TeamsAvailableActions.FETCH_TEAM_SUCCESS, payload: Team[] } |
  { type: TeamsAvailableActions.FETCH_TEAM_FAILURE, payload: string };

export type TeamsDispatch = React.Dispatch<TeamsAction>;