import { Reducer } from "react";
import { ArticlesAction, ArticlesAvailableActions, ArticlesState } from "./types";

export const initialArticleState: ArticlesState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
}

export const articlesReducer: Reducer<ArticlesState, ArticlesAction> = (state = initialArticleState, action): ArticlesState => {
  switch (action.type) {
    case ArticlesAvailableActions.FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case ArticlesAvailableActions.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      }
    case ArticlesAvailableActions.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload
      }
    default:
      return state;
  }
}