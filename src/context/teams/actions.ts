import { API_ENDPOINT } from "../../config/constants";
import { TeamsAvailableActions, TeamsDispatch } from "./types";

export const fetchTeams = async (dispatch: TeamsDispatch) => {
  try {
    dispatch({ type: TeamsAvailableActions.FETCH_TEAM_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response)
      throw new Error("fetch teams failure");

    const data = await response.json();
    dispatch({ type: TeamsAvailableActions.FETCH_TEAM_SUCCESS, payload: data });
  }
  catch (error) {
    console.log(error);
    dispatch({ type: TeamsAvailableActions.FETCH_TEAM_FAILURE, payload: "error in fetching teams" });
  }
} 