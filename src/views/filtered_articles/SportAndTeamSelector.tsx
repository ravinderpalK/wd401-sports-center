import React, { Suspense, useEffect, useState } from "react";
import { useSportState } from "../../context/sports/context";
import { useTeamsState } from "../../context/teams/context";
import FilteredArticlesList from "./FilteredArticlesList";
import { usePreferencesState } from "../../context/user_preferences/context";
import { Team } from "../../context/teams/types";
import { ScrollToNewsDivProps } from "../articles";
import ErrorBoundary from "../../components/ErrorBoundary";
import Prefrences from "../preferences";


const SportAndTeamSelector: React.FC<ScrollToNewsDivProps> = (props) => {
  const sportsState = useSportState()
  const teamsState = useTeamsState();
  const preferencesState = usePreferencesState();
  let { sports } = sportsState;
  const { teams } = teamsState;
  const { preferences } = preferencesState;
  const [selectedSport, setSelectedSport] = useState<string>(sports[0]?.name);
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const isAuthenticated = !!localStorage.getItem("authToken");
  let selectedSportTeams: Team[];

  if (isAuthenticated) {
    if (preferences.sports) sports = sports.filter((sport) => preferences.sports?.includes(sport.name));
    else sports = [];
    selectedSportTeams = teams.filter((team) => team.plays == selectedSport);
    if (preferences.teams) selectedSportTeams = selectedSportTeams.filter((team) => preferences.teams?.includes(team.name));
    else selectedSportTeams = [];
  }
  else {
    selectedSportTeams = teams.filter((team) => team.plays == selectedSport);
  }

  let initialSelectedTeam = selectedSportTeams[0]?.name;
  useEffect(() => {
    setSelectedTeam(initialSelectedTeam);
  }, [initialSelectedTeam])


  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(e.target.value);
  }

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value);
  }

  if (sportsState.isLoading || teamsState.isLoading)
    return <div>Loading</div>

  const preferencesButton =
    <div className="underline">Select Prefrences</div>;

  if (sports.length == 0)
    return <div className="mt-2">
      {isAuthenticated &&
        (
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <Prefrences button={preferencesButton} />
            </Suspense>
          </ErrorBoundary>
        )}
    </div>

  return (
    <div>
      <div>
        <div className="mt-2 inline">
          <select onChange={handleSportChange} value={selectedSport} id="SportsSelector" aria-label="Sports" className="bg-white border-2 border-gray-400 px-2 py-1 w-2/5 md:w-3/12 lg:w-8/12">
            {sports.map((sport) => {
              return (
                <option key={sport.name} value={sport.name}>{sport.name}</option>
              )
            })}
            {sports.length == 0 ? <option>Select</option> : null}
          </select>
        </div>
        <div className="mt-2 inline ml-2 md:ml-4 lg:ml-0">
          <select onChange={handleTeamChange} id="TeamsSelector" aria-label="Teams" className="bg-white border-2 border-gray-400 px-2 py-1 lg:mt-1 w-2/5 md:w-3/12 lg:w-8/12">
            {selectedSportTeams.map((team) => {
              return (
                <option key={team.id} value={team.name}>{team.name}</option>
              )
            })}
            {selectedSportTeams.length == 0 ? <option>Select</option> : null}
          </select>
        </div>
      </div>
      <div>
        <FilteredArticlesList scrollToNewsDiv={props.scrollToNewsDiv} selectedSport={selectedSport} selectedTeam={selectedTeam} />
      </div>
    </div>
  )
}

export default SportAndTeamSelector;