import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { MatchesProvider } from "./context/matches/context"
import { ArticlesProvider } from "./context/articles/context"
import { TeamsProvider } from "./context/teams/context"
import { SportsProvider } from "./context/sports/context"
import { PreferencesProvider } from "./context/user_preferences/context"
import "./i18";

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
