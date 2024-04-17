import { Listbox, Tab, Transition } from "@headlessui/react";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticlesList from "./ArticlesList";
import { Fragment, useEffect, useState } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ScrollToNewsDivProps } from ".";
import { useSportState } from "../../context/sports/context";
import { useTranslation } from "react-i18next";


const ArticlesContainer: React.FC<ScrollToNewsDivProps> = (props) => {
  const articlesDispatch = useArticlesDispatch();
  const sportState = useSportState();
  const { sports } = sportState;
  useEffect(() => {
    fetchArticles(articlesDispatch);
  }, [articlesDispatch]);

  const sort = [
    'Date',
    'Sport',
  ]

  const {t} = useTranslation();

  const [sortBy, setSortBy] = useState(sort[0]);
  const isAuthenticated = !!localStorage.getItem("authToken");


  if (sports.length == 0)
    return <div>Loading..</div>

  return (
    <div>
      <Tab.Group>
        <Tab.List className={`relative `} >
          <Tab className={({ selected }) => `${selected ? 'border-gray-600 text-black' : ' text-gray-900'} 'flex-1 w-16 md:w-32 lg:w-44 whitespace-nowrap border-b-2 px-1 py-1 text-xs md:text-sm lg:text-base font-medium'`}>
            {isAuthenticated ? t(`yourNews`) : t('allNews')}
          </Tab>
          {!isAuthenticated && (
            <>
              <Tab className={({ selected }) => `${selected ? 'border-gray-600 text-black' : ' text-gray-900'} 'flex-1 w-16 md:w-32 lg:w-44 whitespace-nowrap border-b-2 px-1 py-1 text-xs md:text-sm lg:text-base font-medium'`}>
                {sports[0].name}
              </Tab>
              {sports[1] && (
                <Tab className={({ selected }) => `${selected ? 'border-gray-600 text-black' : ' text-gray-900'} 'flex-1 w-16 md:w-32 lg:w-44 whitespace-nowrap border-b-2 px-1 py-1 text-xs md:text-sm lg:text-base font-medium'`}>
                  {sports[1].name}
                </Tab>
              )}
            </>
          )}
          <div className="inline absolute right-0 lg:w-42 origin-top-right rounded-sm bg-gray-200 shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none text-xs md:text-sm lg:text-base">
            <Listbox value={sortBy} onChange={setSortBy}>
              <Listbox.Button className={` cursor-default py-1`}>
                <span className="pl-2">{t('sortBy')} {t(sortBy)}</span>
                <ChevronDownIcon className="h-5 w-5 text-gray-700 inline"
                  aria-hidden="true" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className={`shadow-md`}>
                  {sort.map((item) => (
                    <Listbox.Option
                      key={item}
                      value={item}
                      className={({ active }) => `relative cursor-default select-none pl-2 py-1 pr-4 ${active ? 'bg-gray-300 text-gray-900' : 'text-gray-800'
                        }`}
                    >
                      {t(item)}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ArticlesList sortBy={sortBy} scrollToNewsDiv={props.scrollToNewsDiv} selectedSport={null} />
          </Tab.Panel>
          <Tab.Panel>
            <ArticlesList sortBy={sortBy} scrollToNewsDiv={props.scrollToNewsDiv} selectedSport={sports[0].name} />
          </Tab.Panel>
          <Tab.Panel>
            <ArticlesList sortBy={sortBy} scrollToNewsDiv={props.scrollToNewsDiv} selectedSport={sports[1].name} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

    </div>
  )
}

export default ArticlesContainer;