
export interface Preferences {
  sports: string[],
  teams: string[]
}

export interface PreferencesState {
  preferences: Preferences,
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum PreferencesAvailableActions {
  FETCH_PREFERENCES_REQUEST = "FETCH_PREFERENCES_REQUEST",
  FETCH_PREFERENCES_SUCCESS = "FETCH_PREFERENCES_SUCCESS",
  FETCH_PREFERENCES_FAILURE = "FETCH_PREFERENCES_FAILURE",

  UPDATE_PREFERENCES_REQUEST = "UPDATE_PREFERENCES_REQUEST",
  UPDATE_PREFERENCES_SUCCESS = "UPDATE_PREFERENCES_SUCCESS",
  UPDATE_PREFERENCES_FAILURE = "UPDATE_PREFERENCES_FAILURE",
}

export type PreferencesActions =
  { type: PreferencesAvailableActions.FETCH_PREFERENCES_REQUEST } |
  { type: PreferencesAvailableActions.FETCH_PREFERENCES_SUCCESS, payload: Preferences } |
  { type: PreferencesAvailableActions.FETCH_PREFERENCES_FAILURE, payload: string } |

  { type: PreferencesAvailableActions.UPDATE_PREFERENCES_REQUEST } |
  { type: PreferencesAvailableActions.UPDATE_PREFERENCES_SUCCESS } |
  { type: PreferencesAvailableActions.UPDATE_PREFERENCES_FAILURE, payload: string };

export type PreferencesDispatch = React.Dispatch<PreferencesActions>;