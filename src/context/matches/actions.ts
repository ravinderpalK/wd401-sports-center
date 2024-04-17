import { MatchesAvailableActions, MatchesDispatch } from "./types";
import { API_ENDPOINT } from "../../config/constants";
export const fetchAllMatches = async (dispatch: MatchesDispatch) => {
  try {
    dispatch({ type: MatchesAvailableActions.FETCH_ALL_MATCHES_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response)
      throw new Error("fetch matches failure");

    const data = await response.json();
    dispatch({ type: MatchesAvailableActions.FETCH_ALL_MATCHES_SUCCESS, payload: data.matches });
  }
  catch (error) {
    dispatch({ type: MatchesAvailableActions.FETCH_ALL_MATCHES_FAILURE, payload: "error in fetching matches" })
    console.log(error);
  }
}





