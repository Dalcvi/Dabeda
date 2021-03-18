import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store/Index";
import "../styles/learningReact.css";
import { UserState } from "../store/User";
import { Programs } from "./Programs";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export const MainPage = () => {
  const username = useSelector<ApplicationState, UserState["username"]>(
    (state) => state.user.username
  );

  return (
    <Container fluid style={{ padding: "0px" }}>
      <Programs username={username} />
    </Container>
  );
};

export default MainPage;
