import React, { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import NoQuotesFound from "../quotes/NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const routeMatch = useRouteMatch();
  const {
    sendRequest: fetchSelectedQuote,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const { quoteId } = params;
  useEffect(() => {
    fetchSelectedQuote(quoteId);
  }, [fetchSelectedQuote, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />;
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (!loadedQuote && status === "completed") {
    return <NoQuotesFound />;
  }

  return (
    <Fragment>
      <HighlightedQuote quote={loadedQuote} />
      <Route path={routeMatch.path} exact>
        <div className="centered">
          <Link to={`${routeMatch.url}/comments`} className="btn--flat">
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${routeMatch.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
