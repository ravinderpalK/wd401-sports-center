import React from "react";

export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  date: string;
  sport: Sport;
  summary: string;
  content?: string;
  teams: Team[];
}

interface Sport {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
}

export interface ArticlesState {
  articles: Article[],
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum ArticlesAvailableActions {
  FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST",
  FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
  FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE",



}

export type ArticlesAction =
  { type: ArticlesAvailableActions.FETCH_ARTICLES_REQUEST } |
  { type: ArticlesAvailableActions.FETCH_ARTICLES_SUCCESS, payload: Article[] } |
  { type: ArticlesAvailableActions.FETCH_ARTICLES_FAILURE, payload: string };

export type ArticlesDispatch = React.Dispatch<ArticlesAction>;