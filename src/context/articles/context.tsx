import React, { createContext, useContext, useReducer } from "react";
import { articlesReducer, initialArticleState } from "./reducer";
import { ArticlesDispatch, ArticlesState } from "./types";

const ArticlesStateContext = createContext<ArticlesState>(initialArticleState);
const ArticlesDispatchContext = createContext<ArticlesDispatch>(() => { });

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(articlesReducer, initialArticleState);
  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
}

export const useArticlesState = () => useContext(ArticlesStateContext);
export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);