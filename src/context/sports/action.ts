import { API_ENDPOINT } from "../../config/constants";
import { SportsAvailableActions, SportsDispatch } from "./types";


export const fetchSports = async (dispatch: SportsDispatch) => {
  try {
    dispatch({ type: SportsAvailableActions.FETCH_SPORTS_REQUEST })
    const response = await fetch(`${API_ENDPOINT}/sports`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response)
      throw new Error("fetch sports failure");

    const data = await response.json();
    dispatch({ type: SportsAvailableActions.FETCH_SPORTS_SUCCESS, payload: data.sports });
  }
  catch (error) {
    console.error();
    dispatch({ type: SportsAvailableActions.FETCH_SPORTS_FAILURE, payload: "error in fetching sports" })
  }
}