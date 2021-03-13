import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../store/Index";
import { GetPrograms } from "../services/user";
import { NewProgramModal } from "./Modals/ProgramModal";
import { Days } from "./Days";
import "../styles/learningReact.css";
import { UserState } from "../store/User";
import { Programs } from "./Programs";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const MainPage = () => {
  interface user {
    id: string;
  }

  const useris = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    GetPrograms(dispatch);
  }, [(useris as user).id]);

  return (
    <Container fluid style={{ padding: "0px" }}>
      <Programs username={(useris as user).id} />
    </Container>
  );
};

export default MainPage;
