import { API_ENDPOINT } from "../../config/constants";
import { PreferencesAvailableActions, PreferencesDispatch } from "./types";

export const fetchPreferences = async (dispatch: PreferencesDispatch) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: PreferencesAvailableActions.FETCH_PREFERENCES_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response)
      throw new Error("cannot fetch user prefrences");

    if (!response.ok) {
      throw await response.json();
    }
    const data = await response.json();
    dispatch({ type: PreferencesAvailableActions.FETCH_PREFERENCES_SUCCESS, payload: data.preferences });
    return { ok: true, error: null }
  }
  catch (error: any) {
    dispatch({ type: PreferencesAvailableActions.FETCH_PREFERENCES_FAILURE, payload: "unable to fetch user prefrences" });
    return { ok: false, error: error };
  }
}

export const updatePreferences = async (dispatch: PreferencesDispatch, prefrences: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: PreferencesAvailableActions.UPDATE_PREFERENCES_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(prefrences),
    });

    if (!response)
      throw new Error("cannot fetch user prefrences");
    dispatch({ type: PreferencesAvailableActions.UPDATE_PREFERENCES_SUCCESS });
    await fetchPreferences(dispatch);
  }
  catch (error: any) {
    console.log(error);
    dispatch({ type: PreferencesAvailableActions.UPDATE_PREFERENCES_FAILURE, payload: "failed to update user prefrences" });
  }
}