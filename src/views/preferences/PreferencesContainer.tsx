import { useState, useEffect } from "react";
import { fetchPreferences } from "../../context/user_preferences/actions";
import PreferedSportsAndTeams from "./PreferedSportsAndTeams";
import { usePreferencesDispatch } from "../../context/user_preferences/context";


const PreferencesContainer = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const prefrencesDispatch = usePreferencesDispatch();
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await fetchPreferences(prefrencesDispatch);
      setIsLoading(false);
    })();
  }, [prefrencesDispatch]);

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>
    )
  return (
    <PreferedSportsAndTeams setIsOpen={props.setIsOpen} />

  )
}

export default PreferencesContainer;