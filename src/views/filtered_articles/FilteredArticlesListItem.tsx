import { useState } from "react";
import ArticleDetails from "../articles/ArticleDetails";
import { useTranslation } from "react-i18next";


const FilteredArticlesListItem = (props: any) => {
  const { article } = props;
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation();

  return (
    <div className="flex-none w-2/5 md:w-1/4 lg:w-full mr-2 md:mr-3 lg:mr-0 bg-white my-3 lg:my-4 p-2 favourite-article">
      <div className="font-bold line-clamp-3 h-12">{article.title}</div>
      <div className="mt-1 lg:mt-2 h-12 lg:h-20 line-clamp-3">{article.summary}</div>
      <button onClick={() => setIsOpen(true)} className="w-full bg-gray-600 text-white lg:mt-4 lg:mb-2 p-1">{t('readMore')}</button>
      {isOpen && (
        <ArticleDetails id={article.id} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  )
}

export default FilteredArticlesListItem;