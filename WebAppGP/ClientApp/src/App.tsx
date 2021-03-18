import { useEffect } from "react";
import { Route, Switch } from "react-router";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "./store/Index";
import { AuthState } from "./store/Authentication";
import { AuthActionCreators as AuthAction } from "./store/actions/AuthActions";
import Layout from "./components/Layout/Layout";
import LoggedOff from "./components/LoggedOff/LoggedOff";
import MainPage from "./components/MainPage";
import NavMenu from "./components/Nav/NavMenu";
import { GetInfo } from "./services/user";

import "./styles/learningReact.css";

export const App = () => {
  const isLoggedIn = useSelector<ApplicationState, AuthState["isLoggedIn"]>(
    (state) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== undefined && token !== null) {
      dispatch(AuthAction.authenticate({ token: token }));
      GetInfo(dispatch).then((name) => {
        console.log(token);
      });
    }
  }, []);

  return (
    <Layout>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isLoggedIn ? <Redirect to="/user/:id" /> : <LoggedOff />
          }
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
