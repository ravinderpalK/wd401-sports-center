import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useTranslation } from "react-i18next";
const LiveGamesContainer = React.lazy(() => import("./LiveGamesContainer"));

const LiveGames: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div >
      <h2 className="text-lg lg:text-xl font-bold mt-2">{t('liveGames')}</h2>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <LiveGamesContainer />
        </Suspense>
      </ErrorBoundary>
    </div >
  )
}

export default LiveGames;