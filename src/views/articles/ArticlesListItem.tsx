import React, { Suspense, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useTranslation } from "react-i18next";
const ArticleDetails = React.lazy(() => import("./ArticleDetails"));


const ArticlesListitem = (props: any) => {
  const { article } = props;

  const formatDate = (date: string): string => {
    const formattedDate = new Date(date).toDateString();
    return formattedDate;
  }
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation();


  return (
    <div key={article.id} className="my-2 lg:my-4 h-32 lg:h-44 bg-white trending-new-article">
      <div className="relative inline-block w-2/3 md:w-3/4 align-top p-2 lg:p-3 h-full">
        <div className="w-10/12 md:w-9/12">
          <div>{article.sport.name}</div>
          <div className="font-semibold md:font-bold text-sm lg:text-lg lg:pt-2 line-clamp-2 lg:line-clamp-1">{article.title}</div>
          <div className="line-clamp-2">{article.summary}</div>
          <div className="lg:pt-2">{formatDate(article.date)}</div>
        </div>
        <button onClick={() => setIsOpen(true)} className={`absolute bottom-1 right-3 text-xxs lg:text-sm font-semibold ${article.id}`}>{t('readMore')}</button>
        <ErrorBoundary>
          <Suspense>
            {isOpen && (
              <ArticleDetails id={article.id} isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="inline-block w-1/3 md:w-1/4 h-full">
        <img src={article.thumbnail} alt={`${article.sport.name} image`} className="w-full h-full " />
      </div>
    </div>
  )
}

export default ArticlesListitem; 