import { API_ENDPOINT } from "../../config/constants";
import { ArticlesAvailableActions, ArticlesDispatch } from "./types";

export const fetchArticles = async (dispatch: ArticlesDispatch) => {
  try {
    dispatch({ type: ArticlesAvailableActions.FETCH_ARTICLES_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response)
      throw new Error("fetch articles failed");

    const data = await response.json();
    dispatch({ type: ArticlesAvailableActions.FETCH_ARTICLES_SUCCESS, payload: data });
  }
  catch (error) {
    console.log(error);
    dispatch({ type: ArticlesAvailableActions.FETCH_ARTICLES_FAILURE, payload: "error in fetching articles" });
  }
}