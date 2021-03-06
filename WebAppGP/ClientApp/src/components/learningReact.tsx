import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toArray from "lodash/toArray";
import filter from "lodash/filter";
import { ApplicationState } from "../store/Index";
import { GetPrograms, DeleteProgram } from "../services/user";
import { NewProgramModal, EditProgramModal } from "./ProgramModal";
import { ProgramsState } from "../store/ProgramsReducer";
import { DaysState } from "../store/DaysReducer";
import * as RB from "react-bootstrap";
import "../styles/learningReact.css";

export const LearningReact = () => {
  const [showId, setShowId] = useState(-1);

  const dispatch = useDispatch();
  console.log(showId);

  useEffect(() => {
    GetPrograms(dispatch);
  }, []);

  return (
    <RB.Container fluid style={{ padding: "0px" }}>
      <div id="programList">
        <RB.Container>
          <div id="programListBox">
            <div
              style={{ width: "100%", marginBottom: "1rem" }}
              className="d-flex justify-content-end"
            >
              <NewProgramModal program={{ programName: "" }} />
            </div>
            <ProgramListTable showId={setShowId} />
          </div>
        </RB.Container>
      </div>
      <div id="workoutPlate">
        <RB.Container>
          <Days programId={showId} />
        </RB.Container>
      </div>
    </RB.Container>
  );
};

const ProgramListTable = (props: any) => {
  const allPrograms = useSelector<ApplicationState, ProgramsState["programs"]>(
    (state) => state.programs.programs
  );
  console.log(allPrograms);
  const programs = toArray(allPrograms);
  interface Program {
    id: number;
    programName: string;
    days: [];
  }

  return (
    <RB.Table variant="dark" responsive hover bordered id="programListTable">
      <tbody>
        {programs.map((program) => (
          <tr key={(program as Program).id}>
            <td
              className="d-flex align-items-center justify-content-between"
              onClick={() => props.showId((program as Program).id)}
            >
              <span style={{ fontSize: "1.4em" }}>
                {(program as Program).programName}
              </span>
              <div className="d-flex">
                <EditProgramModal program={program} />

                <DeleteProgramButton id={(program as Program).id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </RB.Table>
  );
};

const DeleteProgramButton = (props: any) => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginLeft: "1em" }}>
      <RB.Button
        variant="danger"
        onClick={() => DeleteProgram(dispatch, props.id)}
        value="Delete"
      >
        Delete
      </RB.Button>
    </div>
  );
};

const Days = (props: any) => {
  interface Day {
    id: number;
    dayName: string;
    programId: number;
  }
  if (props.programId == -1) {
    return <div>Nothing to see here</div>;
  } else {
    const [selectedDay, setSelectedDay] = useState({} as Day);

    const allDays = useSelector<ApplicationState, DaysState["days"]>(
      (state) => state.days.days
    );
    const programDays = toArray(
      filter(allDays, (day) => (day as Day).programId === props.programId)
    );

    useEffect(() => {
      if (programDays.length > 0) setSelectedDay(programDays[0]);
      else setSelectedDay({} as Day);
    }, [props.programId]);

    let seletedDayName = selectedDay.dayName;
    return (
      <div>
        <h2>Select:</h2>
        <RB.Dropdown>
          <RB.Dropdown.Toggle variant="success" id="dropdown-basic">
            <span style={{ marginRight: "5.4em" }}>Days</span>
          </RB.Dropdown.Toggle>

          <RB.Dropdown.Menu>
            {programDays.map((day) => {
              return (
                <RB.Dropdown.Item
                  key={(day as Day).id}
                  onClick={() => {
                    setSelectedDay(day as Day);
                  }}
                >
                  <span style={{ fontSize: "1.4em" }}>
                    {(day as Day).dayName}
                  </span>
                </RB.Dropdown.Item>
              );
            })}
          </RB.Dropdown.Menu>
        </RB.Dropdown>
        <h1 className="text-center">Selected day: {seletedDayName}</h1>
      </div>
    );
  }
};

export default LearningReact;
