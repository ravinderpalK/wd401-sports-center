import React, { Suspense, useState } from "react";
import { useArticlesState } from "../../context/articles/context";
import { Article } from "../../context/articles/types";
import { usePreferencesState } from "../../context/user_preferences/context";
import ArticlesListitem from "./ArticlesListItem";
import { ScrollToNewsDivProps } from ".";
import ErrorBoundary from "../../components/ErrorBoundary";
const Prefrences = React.lazy(() => import("../preferences"));

const sortArticles = (article: Article[], sortBy: string) => {
  switch (sortBy) {
    case "Date":
      article.sort(function (a, b) {
        let dateA = new Date(a.date).getTime();
        let dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;
      });
      break;
    case "Sport":
      article.sort(function (a, b) {
        return (a.sport.name > b.sport.name ? 1 : (b.sport.name > a.sport.name ? -1 : 0));
      })
      break;
  }
}

const getNoOfPages = (length: number) => {
  let i = 1;
  while (length - 10 > 0) {
    i++;
    length = length - 10;
  }
  return i;
}

interface Props extends ScrollToNewsDivProps {
  sortBy: string;
  selectedSport: string | null;
}

const ArticlesList: React.FC<Props> = (props) => {
  const { sortBy, scrollToNewsDiv, selectedSport } = props;
  const [pageNo, setPageNo] = useState(1);
  const articlesState = useArticlesState();
  const preferencesSate = usePreferencesState();
  let { articles, isLoading, isError, errorMessage } = articlesState;
  const { preferences } = preferencesSate;

  if (isError)
    return <span>{errorMessage}</span>
  if (isLoading)
    return <span>Loading...</span>

  const isAuthenticated = !!localStorage.getItem("authToken");
  if (isAuthenticated) {
    articles = articles.filter((article) => preferences.sports?.includes(article.sport.name))
    articles = articles.filter((article) => preferences.teams?.includes(article.teams[0]?.name) || preferences.teams.includes(article.teams[1]?.name))
  }

  if (selectedSport) {
    articles = articles.filter((article) => article.sport.name == selectedSport);
  }

  sortArticles(articles, sortBy);

  const noOfPages = getNoOfPages(articles.length);
  const startIndex = (pageNo - 1) * 10;
  const endIndex = (pageNo * 10);
  articles = articles.slice(startIndex, endIndex);


  const updatePage = (value: number) => {
    setPageNo(pageNo + value);
    scrollToNewsDiv();
  }
  const preferencesButton =
    <div className="underline">Select Prefrences</div>;

  if (articles.length == 0)
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
        {articles.map((article) => {
          return <ArticlesListitem key={article.id} article={article} />
        })}
      </div>
      <div className="flex justify-center">
        {pageNo != 1 ?
          (<>
            <button onClick={() => updatePage(-1)} id="prevArticle" aria-label="prevArticle" className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-2 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            {pageNo != 2 ? <button onClick={() => updatePage(-2)} className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-3 py-1">{pageNo - 2}</button> : null}
            <button onClick={() => updatePage(-1)} className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-3 py-1">{pageNo - 1}</button>
          </>) : null
        }
        {pageNo != noOfPages ?
          (<>
            <button className="rounded-sm bg-gray-800 text-white mx-2 my-1 px-3 py-1">{pageNo}</button>
            <button onClick={() => updatePage(1)} className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-3 py-1">{pageNo + 1}</button>
            {pageNo != noOfPages - 1 ? <button onClick={() => updatePage(2)} className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-3 py-1">{pageNo + 2}</button> : null}
            <button onClick={() => updatePage(1)} id="nextArticle" aria-label="nextArticle" className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-2 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>) : null
        }
      </div>
    </div>
  )
}

export default ArticlesList;