import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store/Index";
import toArray from "lodash/toArray";
import { EditProgramModal, NewProgramModal } from "./Modals/ProgramModal";
import { ProgramsState } from "../store/ProgramsReducer";
import { Table, Container } from "react-bootstrap";
import { DeleteProgramButton } from "./DeleteProgramButton";
import { Days } from "./Days";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { copyFile } from "fs/promises";

interface Program {
  id: number;
  name: string;
}

export const Programs = (props: any) => {
  const [showProgramId, setShowProgramId] = useState(-1);

  const userPrograms = useSelector<ApplicationState, ProgramsState["programs"]>(
    (state) => state.programs.programs
  );

  const arrayUserPrograms = toArray(userPrograms);
  changeShownProgram(showProgramId, setShowProgramId, arrayUserPrograms);

  useEffect(() => {
    if (showProgramId != -1 && arrayUserPrograms.length == 0)
      setShowProgramId(-1);
    if (!userPrograms.hasOwnProperty(showProgramId.toString())) {
      setShowProgramId(-1);
    }
  });

  useEffect(() => {
    changeShownProgram(showProgramId, setShowProgramId, arrayUserPrograms);
  }, [showProgramId]);

  return (
    <div id="programs">
      <div id="programList">
        <Container>
          <h1 className="text-center">Hello {props.username}</h1>
          <NewProgramModal program={{ name: "" }} />
          <Table variant="dark" responsive hover bordered id="programListTable">
            <tbody>
              {arrayUserPrograms.map((program) => (
                <tr key={(program as Program).id}>
                  <td
                    className="d-flex align-items-center justify-content-between"
                    onClick={() => setShowProgramId((program as Program).id)}
                  >
                    <span style={{ fontSize: "1.4em" }}>
                      {(program as Program).name}
                    </span>
                    <div className="d-flex">
                      <EditProgramModal program={program} />

                      <DeleteProgramButton id={(program as Program).id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
      <Container>
        <Days programId={showProgramId} />
      </Container>
    </div>
  );
};

const changeShownProgram = (
  program: number,
  setProgram: any,
  programArray: any
) => {
  if (program == -1 && programArray.length > 0)
    setProgram((programArray[0] as Program).id);
};
