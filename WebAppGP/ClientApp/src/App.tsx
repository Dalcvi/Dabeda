import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "./store/Index";
import { AuthState } from "./store/Authentication";
import { AuthActionCreators as AuthAction } from "./store/actions/AuthActions";
import Layout from "./components/Layout/Layout";
import LoggedOff from "./components/LoggedOff/LoggedOff";
import MainPage from "./components/MainPage";
import NavMenu from "./components/Nav/NavMenu";

import "./styles/learningReact.css";

export const App = () => {
  const isLoggedIn = useSelector<ApplicationState, AuthState["isLoggedIn"]>(
    (state) => state.auth.isLoggedIn
  );

  const dispatch = useDispatch();

  function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== undefined && token !== null) {
      dispatch(AuthAction.authenticate({ token: token }));
      console.log(parseJwt(token).unique_name);
    }
  });

  return (
    <Layout>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (isLoggedIn ? <Redirect to="/user/" /> : <LoggedOff />)}
        />
        <>
          <NavMenu />
          <Route
            path="/user/:id"
            render={() => (isLoggedIn ? <MainPage /> : <LoggedOff />)}
          />
        </>
      </Switch>
    </Layout>
  );
};

export default App;
