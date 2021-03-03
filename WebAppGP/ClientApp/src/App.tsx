import * as React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import LearningReact from "./components/learningReact";
import NavMenu from "./components/NavMenu";

import "./styles/learningReact.css";

export default () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <>
        <NavMenu />
        <Route path="/learning-react" component={LearningReact} />
      </>
    </Switch>
  </Layout>
);
