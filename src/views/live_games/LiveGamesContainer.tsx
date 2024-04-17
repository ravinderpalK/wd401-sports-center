import { useEffect } from "react";
import { fetchAllMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";
import LiveGamesList from "./LiveGamesList";

const LiveGamesListContainer = () => {
  const matchesDispatch = useMatchesDispatch();
  useEffect(() => {
    fetchAllMatches(matchesDispatch);
  }, [matchesDispatch]);
  return (
    <div className="mb-2 mt-1 w-full">
      <LiveGamesList />
    </div>
  )
}

export default LiveGamesListContainer;