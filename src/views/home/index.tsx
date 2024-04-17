import React, { useEffect, useRef } from "react"
import Filter from "../filtered_articles";
import Articles from "../articles";
import LiveGames from "../live_games";
import { usePreferencesDispatch, usePreferencesState } from "../../context/user_preferences/context";
import { fetchPreferences } from "../../context/user_preferences/actions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";



const HomePage: React.FC = () => {
  const newsRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => newsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const isAuthenticated = !!localStorage.getItem("authToken");
  const navigate = useNavigate();
  const prefrencesDispatch = usePreferencesDispatch();
  const preferencesState = usePreferencesState();
  const {t} = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const response = await fetchPreferences(prefrencesDispatch)
        if (!response.ok) {
          if (response.error.errors.includes("Invalid auth token"))
            navigate("/signout");
        }
      })();
    }
  }, [prefrencesDispatch]);


  if (preferencesState.isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>
    )

  return (
    <div className="mx-auto w-16/17 h-5/6">
      <LiveGames />
      <h2 ref={newsRef} className="font-bold text-lg lg:text-xl">{t('trendingNews')}</h2>
      <div className="flex flex-col lg:flex-row my-2 h-5/6 ">
        <div className="w-full order-2 lg:order-1 lg:w-4/5 bg-gray-100 ">
          <Articles scrollToNewsDiv={scrollToTop} />
        </div>
        <div className="w-full order-1 lg:w-1/5 bg-gray-200">
          <Filter scrollToNewsDiv={scrollToTop} />
        </div>
      </div>
    </div>
  )
};

export default HomePage;