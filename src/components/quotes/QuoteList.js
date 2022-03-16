import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteList = ({ quotes }) => {
  const history = useHistory();
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search);
  const isSortAsc = queryParam.get("sort") === "asc";

  const changeSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortAsc ? "desc" : "asc"}`,
    });
  };

  const sortQuotes = (quotesList, sortAsc) => {
    return [...quotesList].sort((quoteA, quoteB) => {
      if (sortAsc) {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else return quoteA.id < quoteB.id ? 1 : -1;
    });
  };

  const sortedQuotes = sortQuotes(quotes, isSortAsc);
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort Quotes {isSortAsc ? "desc" : "asc"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
