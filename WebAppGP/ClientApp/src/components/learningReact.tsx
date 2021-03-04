import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import toArray from "lodash/toArray";
import { useTypedSelector } from "../store/index";
import { GetPrograms } from "../services/user";
import { NewProgramModal } from "./ProgramModal";
import * as RB from "react-bootstrap";
import "../styles/learningReact.css";

export const LearningReact = () => {
  return (
    <RB.Container fluid style={{ padding: "0px" }}>
      <div id="programList">
        <RB.Container>
          <div
            style={{ width: "100%", marginTop: "1rem" }}
            className="d-flex justify-content-end"
          >
            <NewProgramModal program={{ programName: "" }} />
          </div>
          <ProgramListTable />
        </RB.Container>
      </div>
      <div id="workoutPlate"></div>
    </RB.Container>
  );
};

const ProgramListTable = () => {
  const allPrograms = useTypedSelector((state) => state.user.programs);
  const programs = toArray(allPrograms);
  interface Program {
    id: number;
    programName: string;
    days: [];
  }
  window.addEventListener("resize", function () {
    return window.innerWidth;
  });

  programs.map((program) => console.log(program));

  return (
    <RB.ListGroup id="programListTable">
      {programs.map((program) => (
        <RB.ListGroup.Item key={(program as Program).id} action>
          {(program as Program).programName}
          <RB.Button className="btn btn-success" style={{ float: "right" }}>
            EDIT
          </RB.Button>
        </RB.ListGroup.Item>
      ))}
    </RB.ListGroup>
  );
};

export default LearningReact;
