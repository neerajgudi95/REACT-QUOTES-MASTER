import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";
import QuoteForm from "../quotes/QuoteForm";
const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
