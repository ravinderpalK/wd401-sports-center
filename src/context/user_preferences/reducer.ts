import { Reducer } from "react";
import { Preferences, PreferencesActions, PreferencesAvailableActions, PreferencesState } from "./types";

const initialPreferences: Preferences = {
  sports: [],
  teams: []
}

export const initialUserPreferencesState = {
  preferences: initialPreferences,
  isLoading: false,
  isError: false,
  errorMessage: ""
}

export const preferencesReducer: Reducer<PreferencesState, PreferencesActions> = (state = initialUserPreferencesState, action): PreferencesState => {
  switch (action.type) {
    case PreferencesAvailableActions.FETCH_PREFERENCES_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case PreferencesAvailableActions.FETCH_PREFERENCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      }
    case PreferencesAvailableActions.FETCH_PREFERENCES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      }
    case PreferencesAvailableActions.UPDATE_PREFERENCES_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case PreferencesAvailableActions.UPDATE_PREFERENCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case PreferencesAvailableActions.UPDATE_PREFERENCES_FAILURE:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      }
  }
} 