import { useMatchesState } from "../../context/matches/context";
import { Match } from "../../context/matches/types";
import { usePreferencesState } from "../../context/user_preferences/context";
import LiveGamesListItem from "./LiveGamesListitem";

const fetchLiveMatches = (matches: Match[]) => {
  const liveMatches = matches.filter((match) => match.isRunning != false);
  return liveMatches;
}

const LiveGamesList = () => {
  const matchesState = useMatchesState();
  const preferencesState = usePreferencesState();
  const { matches } = matchesState;
  const { preferences } = preferencesState;

  let liveMatches = fetchLiveMatches(matches);
  const isAuthenticated = !!localStorage.getItem("authToken");
  if (isAuthenticated) {
    liveMatches = liveMatches.filter((match) => preferences.sports?.includes(match.sportName));
    liveMatches = liveMatches.filter((match) => preferences.teams?.includes(match.teams[0]?.name) || preferences.teams.includes(match.teams[1]?.name))
  }

  if (liveMatches.length == 0)
    return <div className="mr-6 my-2 h-28 p-2">No Live Matches</div>

  return (
    <div className="flex w-full overflow-x-scroll pb-2">
      {Array.isArray(liveMatches) && liveMatches.map((match) => {
        return (
          <LiveGamesListItem key={match.id} match={match} />
        )
      })}
    </div>
  )
}

export default LiveGamesList;

