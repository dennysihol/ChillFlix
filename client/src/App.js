import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
import NavbarTop from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, AddMovie, Series, EditMovie, Favorites } from "./pages";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavbarTop />
        <div>
          <Switch>
            <Route path="/add">
              <AddMovie />
            </Route>
            <Route path="/edit/:id">
              <EditMovie />
            </Route>
            <Route path="/series">
              <Series />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;