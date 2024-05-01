import React, { Suspense, useEffect } from "react";
import { useTeamsDispatch, } from "../../context/teams/context";
import { fetchTeams } from "../../context/teams/actions";
import { useSportState, useSportsDispatch } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/action";
import { ScrollToNewsDivProps } from "../articles";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useTranslation } from "react-i18next";
const SportAndTeamSelector = React.lazy(() => import("./SportAndTeamSelector"));


const Filter: React.FC<ScrollToNewsDivProps> = (props) => {
  const teamsDispatch = useTeamsDispatch();
  const sportsDispatch = useSportsDispatch();
  const sportsState = useSportState();
  useEffect(() => {
    fetchTeams(teamsDispatch);
    fetchSports(sportsDispatch);
  }, [teamsDispatch, sportsDispatch]);

  const {t} = useTranslation();
  if (sportsState.isLoading)
    return <div>Lading</div>

  return (
    <div className="my-1 lg:my-4 mx-2 md:mx-3 lg:mx-4 text-xs lg:text-base">
      <h3 className="font-bold pt-1 pb-2 lg:pt-2">{t('favourities')}</h3>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <SportAndTeamSelector scrollToNewsDiv={props.scrollToNewsDiv} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default Filter;