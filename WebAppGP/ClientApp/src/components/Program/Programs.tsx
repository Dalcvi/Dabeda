import { ProgramBar } from "./ProgramBar";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import toArray from "lodash/toArray";
import { ProgramsState } from "../../store/ProgramsReducer";
import { Accordion } from "react-bootstrap";
import { AddProgram } from "./AddProgram";

interface Program {
  id: number;
  name: string;
}

export const Programs = (props: any) => {
  const userPrograms = useSelector<ApplicationState, ProgramsState["programs"]>(
    (state) => state.programs.programs
  );
  const arrayUserPrograms = toArray(userPrograms);
  const items = [] as any;
  arrayUserPrograms.map((program) => {
    items.push(
      <ProgramBar
        key={(program as Program).id}
        program={program as Program}
        selectedProgram={props.selectedProgram}
        setSelectedProgram={props.setSelectedProgram}
        selectedDay={props.selectedDay}
        setSelectedDay={props.setSelectedDay}
      />
    );
  });
  items.push(<AddProgram key={1}/>);
  return (
    <>
      <Accordion>{items}</Accordion>
    </>
  );
};
