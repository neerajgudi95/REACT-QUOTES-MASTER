import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQuotes from "./components/pages/AllQuotes";
import NewQuote from "./components/pages/NewQuote";
import QuoteDetail from "./components/pages/QuoteDetail";
import NotQuotesFound from "./components/quotes/NoQuotesFound";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route path="*">
          <NotQuotesFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
