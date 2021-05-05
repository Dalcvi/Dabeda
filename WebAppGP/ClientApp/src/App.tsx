import { useEffect } from "react";
import { Route, Switch } from "react-router";
import { Redirect, BrowserRouter, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "./store/index";
import { AuthState } from "./store/Authentication";
import { AuthActionCreators as AuthAction } from "./store/actions/AuthActions";
import Layout from "./components/Layout/Layout";
import LoggedOff from "./components/LoggedOff/LoggedOff";
import MainPage from "./components/MainPage";
import NavMenu from "./components/Nav/NavMenu";
import Settings from "./components/Settings";
import { GetInfo } from "./services/user";

import "./styles/learningReact.css";

export const App = () => {
  const isLoggedIn = useSelector<ApplicationState, AuthState["isLoggedIn"]>(
    (state) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch();
  let location = useLocation();
  if (isLoggedIn && location.pathname === "/") {
    location.pathname = "/main";
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== undefined && token !== null) {
      dispatch(AuthAction.authenticate({ token: token }));
      GetInfo(dispatch);
    }
  }, []);

  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isLoggedIn ? <Redirect to={location.pathname} /> : <LoggedOff />
            }
          />
          <>
            <NavMenu />
            <Route
              exact
              path="/main"
              render={() => (isLoggedIn ? <MainPage /> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/settings"
              render={() => (isLoggedIn ? <Settings /> : <Redirect to="/" />)}
            />
          </>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
