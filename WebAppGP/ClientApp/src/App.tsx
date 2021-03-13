import * as React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout/Layout";
import LoggedOff from "./components/LoggedOff/LoggedOff";
import MainPage from "./components/MainPage";
import NavMenu from "./components/Nav/NavMenu";

import "./styles/learningReact.css";

export const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={LoggedOff} />
        <>
          <NavMenu />
          <Route path="/user/:id" component={MainPage} />
        </>
      </Switch>
    </Layout>
  );
};

export default App;
