import * as React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import LoggedOff from "./components/LoggedOff";
import LearningReact from "./components/learningReact";
import { useTypedSelector } from "./store/index";
import NavMenu from "./components/NavMenu";

import "./styles/learningReact.css";

export const App = () => {
  const username = useTypedSelector((state) => state.user.username);

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={LoggedOff} />
        <>
          <NavMenu />
          <Route path="/user" component={LearningReact} />
        </>
      </Switch>
    </Layout>
  );
};

export default App;
