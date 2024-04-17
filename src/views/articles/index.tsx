import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const ArticlesContainer = React.lazy(() => import("./ArticlesContainer"));

export interface ScrollToNewsDivProps {
  scrollToNewsDiv: () => void;
}

const Articles: React.FC<ScrollToNewsDivProps> = (props) => {
  return (
    <div className="m-2 md:m-3 lg:m-3 lg:m-4 text-xs lg:text-base">
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <ArticlesContainer scrollToNewsDiv={props.scrollToNewsDiv} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default Articles;