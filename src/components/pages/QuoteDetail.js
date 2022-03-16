import React, { Fragment } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import DUMMY_QUOTES from "../../dummyData";
import HighlightedQuote from "../quotes/HighlightedQuote";

const QuoteDetail = () => {
  const params = useParams();
  const routeMatch = useRouteMatch();
  const selectedQuote = DUMMY_QUOTES.reduce((quote, curr) => {
    if (curr.id === params.quoteId)
      quote = {
        id: curr.id,
        author: curr.author,
        text: curr.text,
      };
    return quote;
  });
  if (!selectedQuote) {
    return <p>Quote not found</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote quote={selectedQuote} />
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
