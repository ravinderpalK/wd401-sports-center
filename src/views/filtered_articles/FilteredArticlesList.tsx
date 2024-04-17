import React, { useState } from "react";
import { useArticlesState } from "../../context/articles/context";
import FilteredArticlesListItem from "./FilteredArticlesListItem";
import { ScrollToNewsDivProps } from "../articles";

const getNoOfPages = (length: number) => {
  let i = 1;
  while (length - 8 > 0) {
    i++;
    length = length - 8;
  }
  return i;
}

interface Props extends ScrollToNewsDivProps {
  selectedSport: string;
  selectedTeam: string;
}

const FilteredArticlesList: React.FC<Props> = (props: any) => {
  const { selectedSport, selectedTeam, scrollToNewsDiv } = props;
  const [pageNo, setPageNo] = useState(1);

  const articlesState = useArticlesState();
  const { articles } = articlesState;
  let filteredArticles = articles.filter((article) => article.sport.name == selectedSport);
  filteredArticles = filteredArticles.filter((article) => article.teams[0]?.name == selectedTeam || article.teams[1]?.name == selectedTeam);

  const noOfPages = getNoOfPages(filteredArticles.length);
  const startIndex = (pageNo - 1) * 8;
  const endIndex = (pageNo * 8);
  filteredArticles = filteredArticles.slice(startIndex, endIndex);

  const updatePage = (value: number) => {
    setPageNo(pageNo + value);
    scrollToNewsDiv();
  }

  return (
    <div>
      <div className="flex flex-row lg:flex-col overflow-x-scroll lg:overflow-hidden">
        {filteredArticles.map((article) => {
          return (
            <FilteredArticlesListItem key={article.id} article={article} />
          )
        })}
      </div>
      <div className="flex justify-center">
        {(pageNo) != 1 ?
          (<>
            <button onClick={() => updatePage(-1)} id="prevFilteredArticle" aria-label="prevFilteredArticle" className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-2 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={() => updatePage(-1)} className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-3 py-1">{pageNo - 1}</button>
          </>) : null
        }
        {(pageNo) != noOfPages ?
          (<>
            <button className="rounded-sm bg-gray-800 text-white mx-2 my-1 px-3 py-1">{pageNo}</button>
            <button onClick={() => updatePage(1)} className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-3 py-1">{pageNo + 1}</button>
            <button onClick={() => updatePage(1)} id="nextFilteredArticle" aria-label="nextFilteredArticle" className="rounded-sm bg-gray-600 text-white mx-2 my-1 px-2 py-1">
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

export default FilteredArticlesList;