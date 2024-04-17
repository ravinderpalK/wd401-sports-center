import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { MatchesProvider } from "./context/matches/context"
import { ArticlesProvider } from "./context/articles/context"
import { TeamsProvider } from "./context/teams/context"
import { SportsProvider } from "./context/sports/context"
import { PreferencesProvider } from "./context/user_preferences/context"
import "./i18";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://563fdd72b574bb5b2831f2f10136a9a9@o4506932591788032.ingest.us.sentry.io/4507101508599808",  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


function App() {
  return (
    <div>
      <MatchesProvider>
        <ArticlesProvider>
          <TeamsProvider>
            <SportsProvider>
              <PreferencesProvider>
                <RouterProvider router={router} />
              </PreferencesProvider>
            </SportsProvider>
          </TeamsProvider>
        </ArticlesProvider>
      </MatchesProvider>
    </div>
  )
}

export default App
